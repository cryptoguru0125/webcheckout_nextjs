import Head from 'next/head'
import { useState, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import TagManager from 'react-gtm-module'
import { useRouter } from 'next/router'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { getUrlWithParams, setCookie } from 'helpers'
import * as api from 'helpers/api'
import CookieHOC from 'components/CookieHOC'
import WebCheckoutModal from 'components/WebCheckoutModal'
import WebCheckoutPrevButton from 'components/WebCheckoutPrevButton'
import PaymentRequestForm from 'components/PaymentRequestForm'
import CreditCardForm from 'components/CreditCardForm'
import WebCheckoutProgress from 'components/WebCheckoutProgress'
import CreditImage from 'assets/icons/credit.svg'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY)

const CheckoutPage = ({ cookies }) => {
  const router = useRouter()
  const [modalIsOpen, setIsOpen] = useState(false)
  const [payMethod, setPayMethod] = useState(null)

  const openWhyboxModal = () => {
    setIsOpen(true)
  }

  const closeWhyboxModal = () => {
    setIsOpen(false)
  }

  const prevStep = () => {
    // hide credit card form on mobile when back is clicked
    if (isMobile && payMethod === 'card') {
      setPayMethod(null)
    } else {
      router.push(`/email-register${location.search}`)
    }
  }

  const handlePayment = async (paymentMethod, payerName) => {
    try {
      const { data: payRes } = await api.confirmPayment({
        email: cookies.email,
        name: payerName,
        payment_method_id: paymentMethod.id,
      })

      const { userRecord, subscription } = payRes

      setCookie({
        ...cookies,
        paid: true,
        name: payerName,
        uid: userRecord.uid,
      })

      setTimeout(() => {
        router.replace(getUrlWithParams('/secure-account'))
      }, 5)

      return subscription
    } catch {
      console.log('failed on confirming payment...')
    }
  }

  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        page: 'checkout',
      },
    })
  }, [cookies])

  return (
    <Elements stripe={stripePromise}>
      <Head>
        <title>Precheckout</title>
      </Head>
      <div className='container'>
        <WebCheckoutProgress percent={8 / 10} />
        <WebCheckoutPrevButton onClick={prevStep} />
        <h1 className='d-sm-none'>
          For limited time, <br />
          try Bloom Premium for <b>Free</b>
        </h1>
        <section className='wc-premium-panel d-sm-none'>
          <h4>Basic Plan</h4>
          <ul className='wc-circlebox-list'>
            <li className='default'>Limited access to content</li>
          </ul>
        </section>
        <section className='wc-premium-panel premium d-sm-none'>
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

        <h1 className='mb-0'>Start your 7-day free trial</h1>
        <p className='text-center no-commit'>No commitment. Cancel anytime.</p>
        <div className='wc-option-list'>
          <div className='wc-cost-panel'>
            <div className='wc-trial-cost'>
              <span>Total due today*</span>
              <span>$0.00</span>
            </div>
            <div className='cost-per-month'>
              <span>Cost per month</span>
              <span>$4.99</span>
            </div>
            <div className='billed'>
              *$59.99 billed annually after 7-day trial
            </div>
          </div>
          <div className='wc-payment-details'>
            <h1 className='mx-0 mb-0'>Payment details</h1>
            <span className='btn-modal' role='button' onClick={openWhyboxModal}>
              Why now?
            </span>
          </div>

          <section className='wc-choose-payment'>
            <h3>Choose a payment method:</h3>

            <PaymentRequestForm onPaymentMethod={handlePayment} />

            <button
              type='button'
              className='btn btn-dark-outline'
              onClick={() => {
                setPayMethod('card')
              }}
            >
              {payMethod === 'card' && <span className='round-check' />}
              <CreditImage /> Credit or Debit
            </button>

            {payMethod === 'card' ? (
              <CreditCardForm
                email={cookies.email}
                onPaymentMethod={handlePayment}
              />
            ) : (
              <div className='pay-comment'>
                <p>
                  You won’t be charged until <b>after your 7-day free trial</b>
                </p>
                <p>
                  We’ll email you a reminder <b>two days</b>
                  <span className='d-sm-block'></span> before your Bloom Premium
                  trial ends.
                </p>
              </div>
            )}
          </section>
        </div>

        <WebCheckoutModal
          isOpen={modalIsOpen}
          onClose={closeWhyboxModal}
          width={480}
          height={392}
        >
          <div className='wc-modal-body'>
            <p>
              We ask for your payment details now, so you can keep enjoying
              Bloom without any interruption after your 7-day trial is over.
            </p>
            <p>
              If you cancel anytime before the end of the 7-day trial, you won’t
              be charged.
            </p>
            <button
              type='button'
              className='btn btn-primary'
              onClick={closeWhyboxModal}
            >
              Got it
            </button>
          </div>
        </WebCheckoutModal>

        <style jsx>{`
          h1 {
            font-size: 35px;
            font-weight: normal;
            text-align: center;
            margin-bottom: 27px;
          }
          h4 {
            font-weight: 900;
          }
          p {
            max-width: none;
          }
          .wc-premium-panel.premium {
            margin-bottom: 75px;
          }

          .wc-option-list {
            align-items: normal;
            padding-bottom: 57px;
          }

          .wc-step-comment {
            padding-bottom: 21px;
          }

          .wc-cost-panel {
            padding: 20px 0 34px;
            border-top: 1px solid #bf9564;
            border-bottom: 1px solid #bf9564;
          }

          .wc-trial-cost {
            display: flex;
            justify-content: space-between;
            padding: 2px 0;
            font-size: 20px;
            font-weight: 900;
          }

          .cost-per-month {
            display: flex;
            justify-content: space-between;
            font-size: 20px;
            font-weight: 500;
            color: #6f8797;
          }

          .billed {
            font-size: 14px;
            font-weight: 900;
            text-align: left;
            margin-top: 4px;
          }

          .wc-payment-details {
            display: flex;
            margin: 24px 0 35px;
            align-items: baseline;
          }

          .wc-payment-details h1 {
            font-weight: 500;
          }

          .btn-modal {
            font-size: 20px;
            font-weight: 900;
            color: #5793e2;
            margin-left: 10px;
            text-decoration: underline;
          }
          .wc-modal-body p {
            font-size: 22px;
            line-height: 1.2;
            text-align: center;
            color: #6f8797;
            font-weight: 500;
            max-width: 370px;
          }

          .wc-modal-body p:first-child {
            margin-bottom: 43px;
          }
          .wc-modal-body .btn-primary {
            margin-top: 33px;
          }
          .btn-dark-outline {
            position: relative;
          }
          .round-check {
            position: absolute;
            left: 17px;
            top: 10px;
          }
          @media (max-width: 559px) {
            h1 {
              font-size: 25px;
            }
            .no-commit {
              font-size: 16px;
            }
            .wc-option-list {
              margin-top: 12px;
            }
            .wc-cost-panel {
              padding: 14px 0 16px 0;
            }
            .wc-payment-details {
              margin: 34px 0 17px 0;
            }
            .wc-premium-panel {
              display: none;
            }
            .btn-modal {
              font-size: 16px;
              font-weight: normal;
            }

            .wc-trial-cost {
              font-size: 16px;
            }
            .cost-per-month {
              font-size: 16px;
            }
            .billed {
              font-size: 12px;
            }
            .wc-modal-body p {
              font-weight: normal;
              font-size: 18px;
              padding: 12px;
            }
            .wc-modal-body p:first-child {
              margin-bottom: 0;
            }
          }
        `}</style>
      </div>
    </Elements>
  )
}

export default CookieHOC(CheckoutPage, ['email'], '/email-register')
