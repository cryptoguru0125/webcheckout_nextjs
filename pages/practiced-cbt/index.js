import Head from 'next/head'
import { useState, useEffect } from 'react'
import TagManager from 'react-gtm-module'
import { useRouter } from 'next/router'
import { getUrlWithParams, setCookie } from 'helpers'
import CookieHOC from 'components/CookieHOC'
import WebCheckoutOptionItem from 'components/WebCheckoutOptionItem'
import WebCheckoutProgress from 'components/WebCheckoutProgress'
import WebCheckoutPrevButton from 'components/WebCheckoutPrevButton'
import HappinessImage from 'assets/icons/happiness.svg'
import TargetImage from 'assets/icons/target.svg'
import CrownImage from 'assets/icons/crown.svg'

const PracticedCBTPage = ({ cookies }) => {
  const router = useRouter()
  const [cbt, selectCBT] = useState(cookies.practiced_cbt)

  const bindClick = (option) => () => {
    selectCBT(option)
  }

  const nextStep = () => {
    setCookie({
      ...cookies,
      practiced_cbt: cbt,
    })

    TagManager.dataLayer({
      dataLayer: {
        event: 'select-CBT',
        practiced_cbt: cbt,
      },
    })

    router.push(getUrlWithParams('/choose-guide'))
  }

  const prevStep = () => {
    router.push(getUrlWithParams('/bloom'))
  }

  // check if bloom has been selected
  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        page: 'practiced-cbt',
      },
    })
  }, [cookies])

  return (
    <div className='container'>
      <Head>
        <title>Have you practiced CBT?</title>
      </Head>
      <WebCheckoutPrevButton onClick={prevStep} />
      <WebCheckoutProgress percent={2 / 10} />

      <div className='wc-step'>
        <section className='title-section text-lg-center'>
          <h1>Have you practiced CBT?</h1>
          <p>
            Our sessions are based on the science of cognitive behavioral
            therapy.
          </p>
        </section>
        <div className='wc-option-list'>
          <WebCheckoutOptionItem
            selected={cbt === 'Beginner'}
            onClick={bindClick('Beginner')}
          >
            <HappinessImage className='wc-option-icon' />
            Beginner
          </WebCheckoutOptionItem>

          <WebCheckoutOptionItem
            selected={cbt === 'Intermediate'}
            onClick={bindClick('Intermediate')}
          >
            <TargetImage className='wc-option-icon' />
            Intermediate
          </WebCheckoutOptionItem>

          <WebCheckoutOptionItem
            selected={cbt === 'Expert'}
            onClick={bindClick('Expert')}
          >
            <CrownImage className='wc-option-icon' />
            Expert
          </WebCheckoutOptionItem>
        </div>
      </div>
      <button
        type='button'
        className='btn btn-primary btn-bottom'
        onClick={nextStep}
        disabled={!cbt}
      >
        Continue
      </button>
    </div>
  )
}

export default CookieHOC(PracticedCBTPage, ['goals'], '/bloom')
