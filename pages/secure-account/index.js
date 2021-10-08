import Head from 'next/head'
import { useEffect } from 'react'
import TagManager from 'react-gtm-module'
import { Form, Field } from 'react-final-form'
import { FORM_ERROR } from 'final-form'
import { useRouter } from 'next/router'
import { getUrlWithParams, setCookie } from 'helpers'
import * as api from 'helpers/api'
import CookieHOC from 'components/CookieHOC'
import WebCheckoutProgress from 'components/WebCheckoutProgress'
import FinalFormInput from 'components/forms/FinalFormInput'
import {
  isEmail,
  required,
  isStrongPassword,
} from 'components/forms/validators'

const SecureAccountPage = ({ cookies }) => {
  const router = useRouter()

  const nextStep = async (values) => {
    try {
      const { data: account } = await api.updateUser({
        ...values,
        uid: cookies.uid,
      })
      
      setCookie({
        ...cookies,
        ...values,
        registered: account,
      })
      router.push(getUrlWithParams('/final'))
    } catch {
      return {
        [FORM_ERROR]: 'Sorry, there was a problem while creating an account',
      }
    }
  }

  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        page: 'secure-account',
      },
    })
  }, [cookies])

  return (
    <div>
      <Form
        onSubmit={nextStep}
        render={({ handleSubmit, submitting, submitError }) => (
          <form
            className='container'
            onSubmit={handleSubmit}
            autoComplete='off'
          >
            <Head>
              <title>Secure your account</title>
            </Head>
            <WebCheckoutProgress percent={9 / 10} />

            <div className='wc-step'>
              <div>
                <img src='/images/secure_account.png' alt='secure account' />
              </div>
              <h1>Yay, almost there...</h1>
              <h3>Now protect your plan with a password</h3>
            </div>
            <div>
              <Field
                name='name'
                type='text'
                validate={required}
                showMsg={false}
                defaultValue={cookies.name}
              >
                {(props) => <FinalFormInput label='Name' {...props} />}
              </Field>

              <Field
                name='email'
                type='text'
                validate={isEmail}
                showMsg={false}
                defaultValue={cookies.email}
              >
                {(props) => <FinalFormInput label='Email' {...props} />}
              </Field>

              <Field
                name='password'
                type='password'
                validate={isStrongPassword}
              >
                {(props) => <FinalFormInput label='Password' {...props} />}
              </Field>
            </div>

            {submitError && <div className='checkout-error'>{submitError}</div>}

            <button
              type='submit'
              className='btn btn-primary btn-bottom'
              disabled={submitting}
            >
              Save and Begin
            </button>
          </form>
        )}
      />

      <style jsx>
        {`
          .wc-step {
            text-align: center;
          }
          h1 {
            font-weight: normal;
            margin-top: 25px;
          }
          h3 {
            font-size: 28px;
            font-weight: 900;
            margin-bottom: 40px;
          }
          .wc-step {
            max-width: 450px;
            margin: 0 auto;
          }
          @media (max-width: 559px) {
            .wc-step {
              max-width: 270px;
            }
            h1 {
              font-size: 25px;
              margin-top: 13px;
            }
            h3 {
              font-size: 20px;
              font-weight: 900;
              margin-bottom: 25px;
            }
          }
        `}
      </style>
    </div>
  )
}

export default CookieHOC(SecureAccountPage, ['uid'], '/checkout')
