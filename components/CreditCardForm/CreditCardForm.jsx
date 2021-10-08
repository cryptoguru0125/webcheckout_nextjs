import { useState } from 'react'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import WebCheckoutModal from 'components/WebCheckoutModal'
import CreditImage from 'assets/icons/credit.svg'
import CardInput from './CardInput'

const CreditCardForm = ({ onPaymentMethod }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [errors, setError] = useState({})
  const [paymentError, setPaymentError] = useState(null)
  const [cvcModal, showCVCModal] = useState(false)
  const [cardOwnerName, setCardOwnerName] = useState('')
  const [loading, setLoading] = useState(false)

  const hasError = Object.values(errors).find((item) => !!item)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements || hasError) {
      return
    }

    setLoading(true)
    try {
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: cardOwnerName,
        },
      })

      if (error) {
        throw new Error(error)
      } else {
        await onPaymentMethod(paymentMethod, cardOwnerName)
      }
    } catch {
      setPaymentError('Sorry, we had an problem on paying with this card')
    }

    setLoading(false)
  }

  const checkError =
    (name) =>
    (event, ...params) => {
      setError({
        ...errors,
        [name]: event.error,
      })
    }

  const options = {
    style: {
      base: {
        fontFamily: 'Avenir',
        fontSize: '14px',
        fontWeight: 900,
        color: '#31556f',
      },
    },
  }

  return (
    <form className='form-creditcard' onSubmit={handleSubmit}>
      <div className='sm-title'>
        <CreditImage /> Credit or Debit
      </div>
      <div className='cards'>
        <img src='/images/card_visa.png' alt='visa' />
        <img src='/images/card_master.png' alt='visa' />
        <img src='/images/card_american.png' alt='visa' />
        <img src='/images/card_discover.png' alt='visa' />
      </div>

      <CardInput label='Name on Card'>
        <input
          type='text'
          name='name'
          value={cardOwnerName}
          onChange={(e) => {
            setCardOwnerName(e.target.value)
          }}
          disabled={loading}
        />
      </CardInput>

      <CardInput
        label='Card Number'
        error={errors.number}
        errorMsg={'Hmm, try double checking your Card Number'}
      >
        <CardNumberElement options={options} onChange={checkError('number')} />
      </CardInput>

      <div className='additional-row'>
        <CardInput label='Exp (MM/YY)' error={errors.expiry}>
          <CardExpiryElement
            options={options}
            onChange={checkError('expiry')}
          />
        </CardInput>

        <CardInput label='CVC' error={errors.cvc}>
          <CardCvcElement options={options} onChange={checkError('cvc')} />
        </CardInput>

        <button
          type='button'
          className='btn-cvc-help'
          onClick={() => showCVCModal(true)}
        >
          ?
        </button>
      </div>

      {paymentError && <div className='checkout-error'>{paymentError}</div>}

      <div className='pay-comment'>
        <p>
          You won’t be charged until <b>after your 7-day free trial</b>
        </p>
        <p>
          We’ll email you a reminder <b>two days</b>
          <span className='d-sm-block'></span> before your Bloom Premium trial
          ends.
        </p>
      </div>

      <button
        type='submit'
        className='btn btn-primary mt-auto'
        disabled={!cardOwnerName || loading || hasError}
      >
        {loading ? 'Checking out...' : 'Start Free Trial'}
      </button>

      <WebCheckoutModal
        isOpen={cvcModal}
        onClose={() => showCVCModal(false)}
        width={327}
        height={377}
      >
        <div className='cvc-help'>
          <p>
            You card’s security code (CVC) is the 3 or 4 digit number located on
            the back of most cards
          </p>
          <img src='/images/card_cvc.png' alt='cvc' />
        </div>
      </WebCheckoutModal>

      <style jsx>
        {`
          .cards {
            display: flex;
          }
          .cards img {
            height: 33px;
          }
          .additional-row {
            position: relative;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 8px;
          }
          .additional-row > div {
            flex: 1;
          }
          .additional-row > :first-child {
            margin-right: 8px;
          }
          input {
            font-family: Avenir;
            font-size: 14px;
            font-weight: 900;
            color: #31556f;
            border: 0;
            background: transparent;
            width: 100%;
            outline: none;
          }
          .btn-cvc-help {
            position: absolute;
            right: 12px;
            top: 14px;
            display: block;
            width: 23px;
            height: 23px;
            padding: 0;
            line-height: 23px;
            text-align: center;
            border: solid 1px #d6d6d6;
            border-radius: 100%;
            font-size: 12px;
            font-weight: 500;
            color: #d6d6d6;
            background: transparent;
          }
          .cvc-help {
            padding: 12px;
          }
          .cvc-help p {
            font-size: 18px;
            text-align: center;
            color: #6f8797;
          }
          .cvc-help img {
            width: 100%;
            display: block;
            margin-top: 24px;
          }
          .sm-title {
            display: none;
          }
          @media (max-width: 559px) {
            .form-creditcard {
              position: absolute;
              left: 0;
              right: 0;
              top: 0;
              min-height: 100vh;
              background-color: #f9f2ea;
              padding: 64px 16px 60px 16px;
              display: flex;
              flex-direction: column;
            }
            .sm-title {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 50px;
              font-size: 16px;
              font-weight: 900;
              color: black;
            }
            .sm-title svg {
              margin-right: 12px;
            }
          }
        `}
      </style>
    </form>
  )
}

export default CreditCardForm
