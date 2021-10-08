import Head from 'next/head'
import { useState, useEffect } from 'react'
import TagManager from 'react-gtm-module'
import { useRouter } from 'next/router'
import { getUrlWithParams, setCookie } from 'helpers'
import CookieHOC from 'components/CookieHOC'
import WebCheckoutProgress from 'components/WebCheckoutProgress'
import WebCheckoutPrevButton from 'components/WebCheckoutPrevButton'
import GuiderOption from 'components/GuiderOption'

const ChooseGuidePage = ({ cookies }) => {
  const [guider, selectGuider] = useState(cookies.guider)
  const router = useRouter()

  const bindClick = (option) => () => {
    selectGuider(option)
  }

  const nextStep = () => {
    setCookie({
      ...cookies,
      guider,
    })

    TagManager.dataLayer({
      dataLayer: {
        event: 'choose-guide',
        guider,
      },
    })

    router.push(getUrlWithParams('/love-bloom'))
  }

  const prevStep = () => {
    router.push(getUrlWithParams('/practiced-cbt'))
  }

  // check if practiced-cbt selected
  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        page: 'choose-guide',
      },
    })
  }, [cookies])

  const guiders = [
    {
      avatar: '/images/avatar/Shernita_Headshot_2021.png',
      name: 'Shernita',
      role: 'Direct & Empowering',
      desc: 'Shernita’s empowering energy makes you believe in yourself & live with courage.',
    },
    {
      avatar: '/images/avatar/Mike_Headshot_2021.png',
      name: 'Mike',
      role: 'Empathic & Caring',
      desc: 'Mike’s soothing voice helps to connect with yourself and find peace.',
    },
  ]

  return (
    <div className='container'>
      <Head>
        <title>Choose your guide</title>
      </Head>
      <WebCheckoutProgress percent={3 / 10} />
      <WebCheckoutPrevButton onClick={prevStep} />
      <div className='wc-step'>
        <section className='title-section text-lg-center'>
          <h1>Choose your guide</h1>
          <p>
            They will guide you through the different exercises. You can swap
            anytime.
          </p>
        </section>
        <div className='wc-option-list'>
          {guiders.map((item) => (
            <GuiderOption
              key={item.name}
              data={item}
              selected={guider === item.name}
              onClick={bindClick(item.name)}
            />
          ))}
        </div>
      </div>

      <button
        type='button'
        className='btn btn-primary btn-bottom'
        onClick={nextStep}
        disabled={!guider}
      >
        Continue
      </button>
      <style jsx>{`
        .title-section {
          min-height: 120px;
        }
      `}</style>
    </div>
  )
}

export default CookieHOC(ChooseGuidePage, ['practiced_cbt'], '/practiced-cbt')
