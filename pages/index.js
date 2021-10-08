import { useEffect } from 'react'
import TagManager from 'react-gtm-module'
import { isAndroid } from 'react-device-detect'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getUrlWithParams } from 'helpers'

export default function AndroidStep() {
  const router = useRouter()
  useEffect(() => {
    if (!isAndroid) {
      router.replace(getUrlWithParams(`/bloom`))
      return null
    }

    TagManager.dataLayer({
      dataLayer: {
        page: 'android-welcome',
      },
    })
  }, [router, isAndroid])

  if (!isAndroid) return null;

  return (
    <div className="container">
      <img className="bg" src='/images/onboarding-illustration-02.png' alt='background' />
      <div className='wc-step'>
        <p>Before we begin...</p>
        <h1>Do you use an iPhone?</h1>
        <p>
          Sorry, but your browser just indicated that you might be using an
          Android. Bloom is currently only available on iOS. Please confirm you
          have an iPhone to continue.
        </p>
      </div>
      <Link href={getUrlWithParams(`/bloom`)}>
        <button type='button' className='btn btn-primary'>
          Yes, I have an iPhone
        </button>
      </Link>
      <a href='https://www.enjoybloom.com' className='btn btn-secondary'>Sorry Android. Join the Waitlist.</a>

      <style jsx>{`
        .container {
          padding-top: 0;
        }
        .bg {
          width: 100vw;
          margin-left: -16px;
          margin-right: -16px;
          margin-bottom: -80px;
        }
        .wc-step {
          padding-left: 26px;
          padding-right: 0;
        }
				p {
          font-size: 19px;
          font-weight: 500;
        }
        .btn-primary {
          margin-top: 24px;
        }
        h1 {
          margin: 2px 0 8px 0;
        }
			`}</style>
    </div>
  )
}
