import Head from 'next/head'
import { useEffect } from 'react'
import TagManager from 'react-gtm-module'
import { useRouter } from 'next/router'
import CookieHOC from 'components/CookieHOC'
import WebCheckoutProgress from 'components/WebCheckoutProgress'
import WebCheckoutPrevButton from 'components/WebCheckoutPrevButton'
import WebCheckoutReviewItem from 'components/WebCheckoutReviewItem'
import { getUrlWithParams } from 'helpers'

const WebCheckoutStepLoveBloom = ({ cookies }) => {
  const router = useRouter()

  const nextStep = () => {
    router.push(getUrlWithParams('/program-ready'))
  }
  const prevStep = () => {
    router.push(getUrlWithParams('/choose-guide'))
  }

  // check if practiced-cbt selected
  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        page: 'love-bloom',
      },
    })
  }, [cookies])

  const reviews = [
    {
      author: 'Nadia J.',
      rating: 5,
      content: `I love working with my guide. I feel more calm and relaxed after ever session. At first it felt weird, but after a few minutes I loved it. What a great app.`,
    },
    {
      author: 'James L.',
      rating: 5,
      content: `I have to say I’ve just started using the app today and after two
      short sessions I already feel better and more positive! I will
      definitely keep on using the app in the long term!`,
    },
    {
      author: 'Sarah W.',
      rating: 5,
      content: `This is such a wonderful app. I cried from relief that such a
      thing exists as soon as I watched the first video! I now know how
      to train my mind with the right guidance.`,
    },
  ]

  return (
    <div className='container'>
      <Head>
        <title>People love Bloom</title>
      </Head>
      <WebCheckoutProgress percent={4 / 10} />
      <WebCheckoutPrevButton onClick={prevStep} />
      <div className='wc-step'>
        <section className='title-section text-lg-center'>
          <h1>People love Bloom</h1>
          <p>
            Based on over 7,000 ratings<span className='d-sm-block'></span> from
            across the globe
          </p>
        </section>

        <section className='wc-option-list mx-auto'>
          {reviews.map((item) => (
            <WebCheckoutReviewItem key={item.author} data={item} />
          ))}
        </section>
      </div>

      <button
        type='button'
        className='btn btn-primary btn-bottom'
        onClick={nextStep}
      >
        Continue
      </button>

      <style jsx>{`
        p {
          max-width: 400px;
        }
        .wc-option-list {
          max-width: 284px;
        }
        @media (max-width: 559px) {
          .container {
            background: url('/images/morning.jpg') no-repeat;
            background-size: cover;
          }
          .wc-option-list {
            margin-top: 20px;
          }
        }
      `}</style>
    </div>
  )
}

export default CookieHOC(WebCheckoutStepLoveBloom, ['guider'], '/choose-guide')
