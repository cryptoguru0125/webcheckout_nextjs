import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import TagManager from 'react-gtm-module'
import WebCheckoutProgress from 'components/WebCheckoutProgress'
import WebCheckoutPrevButton from 'components/WebCheckoutPrevButton'
import { getUrlWithParams } from 'helpers'

const WebCheckoutStepReady = () => {
  const router = useRouter()

  const nextStep = () => {
    router.push(getUrlWithParams('/email-register'))
  }
  const prevStep = () => {
    router.push(getUrlWithParams('/love-bloom'))
  }

  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        page: 'program-ready',
      },
    })
  }, [])

  return (
    <div className='container page-program-ready'>
      <Head>
        <title>Your program is ready!</title>
      </Head>
      <WebCheckoutProgress percent={5 / 10} />
      <WebCheckoutPrevButton onClick={prevStep} />

      <div className='text-center'>
        <img className='logo' src={`/images/logo.png`} alt='Logo' />
      </div>

      <div className='wc-step mx-auto'>
        <section className='title-section text-center'>
          <h1>Your program is ready!</h1>
          <p>
            87% of Bloom users who practice for 10 mins a day, 3x a week, report
            significant improvements in their mental health.
          </p>
        </section>

        <div className='wc-chart-list'>
          <img
            className='img-chart'
            src={`/images/chart.png`}
            alt='WebCheckout Chart'
            width='100%'
          />
        </div>
      </div>

      {/* <section className='preview'>
        <h2>Your program preview</h2>
        <div className='preview-list'>
          <div>
            <h4>Personalized therapy programs</h4>
            <img src='/images/therapy.png' width='100%' alt='bg' />
          </div>

          <div>
            <h4>Guided CBT Exercises</h4>
            <img src='/images/cbt.png' width='100%' alt='bg' />
          </div>

          <div>
            <h4>Daily mental check-in</h4>
            <img src='/images/daily.png' width='100%' alt='bg' />
          </div>

          <div>
            <h4>Positive Habit Routine</h4>
            <img src='/images/habbit.png' width='100%' alt='bg' />
          </div>

          <div>
            <h4>
              Mindful
              <br />
              Activites
            </h4>
            <img className='original' src='/images/mindful.png' alt='bg' />
          </div>

          <div>
            <h4>
              Guided
              <br />
              Journaling
            </h4>
            <img className='original' src='/images/guided.png' alt='bg' />
          </div>
        </div>
      </section> */}
      <button
        type='button'
        className='btn btn-primary mt-auto'
        onClick={nextStep}
      >
        Let's get started
      </button>
      <style jsx>{`
        .container {
          padding-top: 68px;
        }
        h1 {
          margin-top: 22px;
        }
        .title-section p {
          color: #6f8797;
          font-size: 20px;
          margin-top: 22px;
          margin-bottom: 44px;
          line-height: 1.2;
        }
        .wc-step {
          max-width: 395px;
          text-align: center;
        }
        .wc-chart-list {
          margin-bottom: 138px;
          text-align: center;
        }
        h2 {
          font-size: 20px;
          font-weight: 900;
          margin-bottom: 15px;
        }
        .preview-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 10px;
          margin-bottom: 33px;
        }

        .preview-list > div {
          border-radius: 10px;
          box-shadow: 2px 4px 4px 2px rgba(0, 0, 0, 0.06);
          background-color: #fffaf5;
          padding: 8px 16px;
          position: relative;
        }
        .preview-list > div:before {
          content: '';
          display: block;
          width: 100%;
          padding-top: 110%;
        }
        .preview-list h4 {
          position: absolute;
          left: 16px;
          top: 8px;
          width: calc(100% - 32px);
          z-index: 1;
          line-height: 1.2;
          font-size: 16px;
          font-weight: 900;
        }
        .preview-list img {
          position: absolute;
          height: auto;
          right: 0;
          bottom: 0;
        }
        .preview-list img.original {
          right: 16px;
          bottom: 8px;
        }
        @media (min-width: 560px) {
          .preview {
            display: none;
          }
        }
        @media (max-width: 559px) {
          .container {
            padding-top: 40px;
          }
          .wc-step {
            padding: 0;
          }
          .logo {
            height: 30px;
          }
          h1 {
            margin-top: 28px;
            font-size: 22px;
          }
          .wc-chart-list {
            margin-bottom: 40px;
          }
          .title-section p {
            font-size: 16px;
            margin: 8px auto 22px auto;
            max-width: 300px;
          }
          .wc-btn-prev {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export default WebCheckoutStepReady
