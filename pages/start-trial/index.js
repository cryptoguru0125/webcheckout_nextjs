import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import TagManager from 'react-gtm-module'
import CookieHOC from 'components/CookieHOC'
import WebCheckoutProgress from 'components/WebCheckoutProgress'
import WebCheckoutPrevButton from 'components/WebCheckoutPrevButton'
import { getUrlWithParams } from 'helpers'

const StartTrialPage = ({ cookies }) => {
  const router = useRouter()

  const nextStep = () => {
    router.push(getUrlWithParams('/checkout'))
  }

  const prevStep = () => {
    router.push(getUrlWithParams('/program-ready'))
  }

  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        page: 'start-trial',
      },
    })
  }, [cookies])

  return (
    <div className='container'>
      <Head>
        <title>Start Trial</title>
      </Head>
      <WebCheckoutProgress percent={7 / 10} />
      <WebCheckoutPrevButton onClick={prevStep} />
      <div className='wc-step'>
        <h1 className='text-center'>
          For limited time, <br />
          try Bloom Premium for <b>Free</b>
        </h1>
        <section className='wc-premium-panel'>
          <h4>Basic Plan</h4>
          <ul className='wc-circlebox-list'>
            <li className='default'>Limited access to content</li>
          </ul>
        </section>
        <section className='wc-premium-panel'>
          <h4>Premium Membership</h4>
          <ul className='wc-circlebox-list'>
            <li>Personalized therapy sessions</li>
            <li>Unlimited access to content</li>
            <li>100+ CBT Guided Journals</li>
            <li>100+ Therapeutic Exercises</li>
            <li>Exclusive therapy programs</li>
            <li>New content every week</li>
            <li>Cancel anytime</li>
          </ul>
        </section>
      </div>
      <button
        type='button'
        className='btn btn-primary mt-auto'
        onClick={nextStep}
      >
        Continue
      </button>
      <style jsx>{`
        h1 {
          font-size: 35px;
          font-weight: normal;
          margin-bottom: 27px;
        }
        h4 {
          font-weight: 900;
        }
        .wc-step {
          margin-bottom: 68px;
        }
        @media (max-width: 559px) {
          h1 {
            font-size: 20px;
            margin-bottom: 11px;
          }
          .wc-step {
            padding: 0 6px;
          }
        }
        @media (max-width: 559px) and (max-height: 809px) {
          .container {
            padding-top: 70px;
          }
        }
      `}</style>
    </div>
  )
}

export default CookieHOC(StartTrialPage, ['email'], '/email-register')
