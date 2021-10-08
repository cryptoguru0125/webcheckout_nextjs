import { useEffect } from 'react'
import Head from 'next/head'
import TagManager from 'react-gtm-module'
import { useRouter } from 'next/router'
import { getUrlWithParams } from 'helpers'

const OnboardingPage = () => {
  const router = useRouter()

  const nextStep = () => {
    router.push(getUrlWithParams(`/`))
  }

  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        page: 'Onboarding Page',
      },
    })
  })

  return (
    <div className='page-onboarding'>
      <img
        className='bg'
        src='/images/onboarding.webp'
        alt='Value Prop 1 TRANSPARENT.png'
      />
      <div className='container'>
        <Head>
          <title>Bloom | Start Your 7-days Free Trial</title>
        </Head>

        <section className='title-section text-lg-center small-container'>
          <h1 className='mb-3'>Be your own therapist</h1>
          <p className='big-font'>
            Bloom is an interactive video-guided CBT Therapy app to calm
            anxiety, reduce stress, and boost mood.
          </p>
        </section>

        <button type='button' className='btn btn-primary' onClick={nextStep}>
          Try Bloom for Free
        </button>

        <section className='small-container'>
          <h3 className='text-center mb-2'>AS SEEN IN</h3>
          <div className='text-center text-center'>
            <span>
              <img src='/images/vogue1.png' height='23px' alt='vougue' />
            </span>
            <span className='mx-4'>
              <img src='/images/cnn1.png' height='23px' alt='cnn' />
            </span>
            <span>
              <img
                src='/images/business_insider1.png'
                height='23px'
                alt='business_insider'
              />
            </span>
          </div>
        </section>

        <section className='section-mission small-container'>
          <h2 className='mt-6 mb-4'>
            Our mission: Help 1 billion people improve their mental health.
          </h2>
          <p className='mb-5'>
            “We struggled with anxiety, stress and depressive periods and tried
            to get help and didn’t. When we realized that 80% of Americans can’t
            afford therapy and that 2 billion people will be affected by mental
            disorders in their lifetime but only 2/3rds get treatment - we set
            out to build a more scalable and affordable treatment to mental
            health problems”
          </p>
          <p>
            Leon &amp; Daniel
            <br />
            Founder of Bloom
          </p>
        </section>

        <button type='button' className='btn btn-primary' onClick={nextStep}>
          Try Bloom for Free
        </button>

        <section className='small-container'>
          <h2 className='mb-2'>
            Hear it from
            <br /> our user:
          </h2>
          <p className='mb-7'>
            With over 1 Million downloads users around the world find value in
            Bloom.
          </p>

          <div className='review-list'>
            <div>
              <img src='/images/review1.webp' alt='review' width='100%' />
            </div>
            <div>
              <img src='/images/review2.webp' alt='review' width='100%' />
            </div>
            <div>
              <img src='/images/review3.webp' alt='review' width='100%' />
            </div>
          </div>
        </section>

        <button type='button' className='btn btn-primary' onClick={nextStep}>
          Try Bloom for Free
        </button>

        <section className='digital-section'>
          <div>
            <h4 className='mb-3'>The world's first Digital Therapist</h4>
            <p className='mb-3'>
              Bloom brings personalized therapy to you. Start your journey with
              daily therapy sessions based on CBT.
            </p>
            <img
              src='/images/IP1.webp'
              width='159px'
              alt='IP1'
              className='img-ip1'
            />
            <img
              src='/images/IP2.webp'
              width='152px'
              alt='IP2'
              className='img-ip2'
            />
          </div>

          <div className='text-right'>
            <img
              src='/images/Phone 2.webp'
              width='260px'
              className='img-phone'
              alt='Phone'
            />

            <h4 className='mb-4'>Guided Video Therapy Sessions</h4>
            <p>
              Designed by leading therapists to help you work on Anxiety,
              Stress, Depression &amp; more. Your guides work with you through
              the sessions.
            </p>
          </div>
        </section>

        <button type='button' className='btn btn-primary' onClick={nextStep}>
          Try Bloom for Free
        </button>

        <section className='small-container'>
          <h2 className='mb-3 h-22px'>
            Interactive Video<span className='d-sm-block'></span>Sessions &amp;
            Exercises
          </h2>
          <p className='ml-0' style={{ fontSize: '12px', width: '50%' }}>
            Get personalized therapy sessions with a unique mix of video,
            journaling &amp; meditation
          </p>

          <div className='interactive-images'>
            <img
              src='/images/Ip6.png'
              className='ip6'
              alt='understood'
              width='230px'
            />
            <img
              src='/images/understood.png'
              className='understood'
              alt='understood'
              width='231px'
            />
          </div>
        </section>

        <section className='mx-auto text-center section-clinical'>
          <h2 className='mb-4 h-22px'>
            Scientifically proven clinical exercises
          </h2>
          <p>
            Cognitive Behavioral Therapy is a scientifically proven way to
            improve our well-being.
          </p>
        </section>

        <button type='button' className='btn btn-primary' onClick={nextStep}>
          Try Bloom for Free
        </button>
      </div>

      <style jsx>
        {`
          .page-onboarding {
            max-width: 375px;
            margin: 0 auto;
            overflow-x: hidden;
          }
          .container {
            padding-top: 0;            
            line-height: 1.1;
            --shd: 0.00px 1.00px 9px 0px rgba(0,0,0,0.23);
            font-family: avenir-lt-w01_85-heavy1475544,sans-serif;
          }
          .bg {
            display: block;
            width: 100%;
          }
          p {
            color: #95A3AC;
            letter-spacing -0.28px;
            line-height: 1.3;
          }
          .btn-primary {
            margin-top: 1.8rem;
            margin-bottom: 2.4rem;
          }
          .small-container {
            padding: 0 16px;
          }
          .review-list div {
            border-radius: 3px;
            box-shadow: var(--shd,0 1px 3px rgba(0,0,0,.5));
            margin-bottom: 10px;
            overflow: hidden;
          }
          .digital-section {
            display: grid;
            grid-template-columns: 50% 50%;
            padding: 0 6px;
          }
          .img-ip1 {
            margin-left: -19px;
          }
          .img-ip2 {
            margin-top: -72px;
            margin-left: -1px;
          }
          .img-phone {
            display: block;
            position: relative;
            right: 48px;
            margin-top: -30px;
          }
          .h-22px {
            font-size: 22px;
          }
          .interactive-images {
            position: relative;
          }
          .interactive-images .understood {
            position: relative;
            z-index: 5;
          }
          .interactive-images .ip6 {
            position: absolute;
            right: -25px;
            top: -93px;
          }
          h1, h2 {
              font-size: 29px;
            }
            h3 {
              font-size: 19px;
            }
            h4 {
              font-size: 18px;
            }
            p {
              font-size: 13px;
            }
            .container {
              padding-left: 13px;
              padding-right: 13px;
            }
            .title-section {
              max-width: 255px;
            }
            .title-section p {
              font-size: 14px;
            }
            .section-clinical {
              max-width: 253px;
            }
            .section-clinical p {
              font-size: 15px;
            }
            .section-mission {
              max-width: 275px;
            }
        `}
      </style>
    </div>
  )
}

export default OnboardingPage
