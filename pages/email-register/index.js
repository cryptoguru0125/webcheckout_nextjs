import Head from 'next/head'
import { useEffect } from 'react'
import { Form, Field } from 'react-final-form'
import TagManager from 'react-gtm-module'
import { useRouter } from 'next/router'
import axios from 'axios'
import { getUrlWithParams, setCookie } from 'helpers'
import CookieHOC from 'components/CookieHOC'
import WebCheckoutProgress from 'components/WebCheckoutProgress'
import WebCheckoutPrevButton from 'components/WebCheckoutPrevButton'
import FinalFormInput from 'components/forms/FinalFormInput'
import { isEmail } from 'components/forms/validators'
import VOGUE from 'assets/icons/VOGUE.svg'
import Forbes from 'assets/icons/Forbes.svg'
import Comopolitan from 'assets/icons/Comopolitan.svg'
import CNN from 'assets/icons/CNN.svg'
import CBS from 'assets/icons/CBS.svg'
import BusinessInsider from 'assets/icons/business_insider.svg'

const EmailRegisterPage = ({ cookies }) => {
  const router = useRouter()

  const prevStep = () => {
    router.push(getUrlWithParams('/program-ready'))
  }

  const nextStep = async (values) => {
    try {
      await axios.post('/api/subscribe-email', values)
    } catch (err) {
      return {
        email: err.response.status === 422 ? 'Email has been registered already' : 'Unknown Error',
      }
    }

    // set cookies`
    setCookie({
      ...cookies,
      email: values.email,
    })

    TagManager.dataLayer({
      dataLayer: {
        event: 'register-email',
        email: values.email,
      },
    })

    router.push(getUrlWithParams('/start-trial'))
  }

  // check if guider selected
  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        page: 'email-register',
      },
    })
  }, [cookies])

  return (
    <div className='container'>
      <Head>
        <title>Email Register</title>
      </Head>
      <WebCheckoutProgress percent={6 / 10} />
      <WebCheckoutPrevButton onClick={prevStep} />

      <Form
        onSubmit={nextStep}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit} autoComplete='off'>
            <section className='wc-step mt-0'>
              <h1>Enter your email to start your first session with Bloom.</h1>
            </section>

            <Field
              name='email'
              validate={isEmail}
              showMsg={true}
              defaultValue={cookies.email}
            >
              {(props) => <FinalFormInput label='Email' {...props} />}
            </Field>

            <section className='wc-step'>
              <p>
                <strong>Did you know?</strong>
              </p>
              <p className='mt-1'>
                CBT places an emphasis on helping individuals learn to be their
                own therapists. Through exercises in the session users are
                helped to develop coping skills, whereby they can learn to
                change their own thinking, problematic emotions and behavior.
              </p>
              <div className='american-image'>
                <img
                  src='/images/american_psychological_assc.png'
                  width='100'
                  alt='american image'
                />
              </div>

              <h6 className='text-center'>FEATURED IN</h6>
              <div className='vendors'>
                <span className='text-right'>
                  {/* <img src='/images/Vogue.png' alt='Vogue' /> */}
                  <VOGUE />
                </span>
                <span>
                  {/* <img src='/images/Forbes.png' alt='Forbes' /> */}
                  <Forbes />
                </span>
                <span className='text-left'>
                  {/* <img src='/images/Cosmopolitan.png' alt='Cosmopolitan' /> */}
                  <Comopolitan />
                </span>
              </div>
              <div className='vendors'>
                <span className='text-right'>
                  {/* <img src='/images/CNN.png' alt='CNN' /> */}
                  <CNN />
                </span>
                <span>
                  {/* <img src='/images/CBS.png' alt='CBS' /> */}
                  <CBS />
                </span>
                <span className='text-left'>
                  {/* <img src='/images/BUSINESS_INSIDER.png' alt='BUSINESS_INSIDER' /> */}
                  <BusinessInsider />
                </span>
              </div>
            </section>

            <button
              type='submit'
              className='btn btn-primary'
              disabled={submitting}
            >
              Continue
            </button>
          </form>
        )}
      />

      <footer className='mx-auto'>
        By clicking “Continue” you agree to Bloom’s{' '}
        <a href='https://www.enjoybloom.com/terms' target='_blank'>
          Terms
        </a>{' '}
        &amp;{' '}
        <a href='https://www.enjoybloom.com/privacy' target='_blank'>
          Privacy Policy
        </a>
        .
      </footer>
      <style jsx>
        {`
          h1 {
            text-align: center;
            margin-bottom: 22px;
            font-weight: normal;
          }
          .vendors {
            display: flex;
            align-items: center;
            margin-left: -10px;
            margin-right: -10px;
            margin-top: 11px;
            text-align: center;
          }
          .vendors > span {
            width: 33.33%;
          }
          .btn-primary {
            margin-top: 45px;
          }
          h6 {
            color: #6f8797;
            font-size: 18px;
            font-weight: 900;
            margin-top: 60px;
            letter-spacing: 0.91px;
          }
          footer {
            font-size: 16px;
            font-weight: 500;
            color: #6f8797;
            text-align: center;
            margin-top: 22px;
          }
          .wc-step,
          .wc-step p {
            text-align: left;
            max-width: 450px;
          }
          a {
            text-decoration: underline;
          }
          @media (max-width: 559px) {
            h1 {
              font-size: 20px;
            }
            .wc-step {
              margin-top: 32px;
            }
            .wc-step p {
              color: #6f8797;
              font-size: 14px;
            }
            footer {
              font-size: 12px;
              max-width: 225px;
            }
            .american-image {
              margin-top: 8px;
            }
            h6 {
              font-size: 13px;
            }
          }
          @media (max-width: 559px) and (max-height: 809px) {
            h6 {
              margin-top: 20px;
            }
            .btn-primary {
              margin-top: 20px;
            }
          }
        `}
      </style>
    </div>
  )
}

export default CookieHOC(EmailRegisterPage, ['guider'], '/choose-guide')
