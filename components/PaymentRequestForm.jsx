import { useState, useEffect } from 'react'
import { useStripe } from '@stripe/react-stripe-js'

const PaymentRequestForm = ({ onPaymentMethod }) => {
  const [canMakePayment, setCanMakePayment] = useState(null)
  const [processing, setProcessing] = useState(false)
  const stripe = useStripe()

  useEffect(() => {
    if (!stripe) return

    const paymentRequest = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Start Trial (7 day free)',
        amount: 5999,
      },
      requestPayerEmail: true,
    })

    paymentRequest.on('paymentmethod', async (ev) => {
      try {
        await onPaymentMethod(
          ev.paymentMethod,
          ev.payerName,
        )
        ev.complete('success')
      } catch {
        ev.complete('fail')
      }

      setProcessing(false)
    })

    paymentRequest.on('cancel', () => {
      setProcessing(false)
    })

    paymentRequest.on('error', () => {
      setProcessing(false)
    })

    paymentRequest.canMakePayment().then((res) => {
      if (res && (res.applePay || res.googlePay)) {
        setCanMakePayment(paymentRequest)
      }
    })
  }, [stripe])

  const showPaymentRequest = () => {
    setProcessing(true)
    canMakePayment.show()
  }

  return (
    canMakePayment && (
      <div>
        <button
          type='button'
          className='btn btn-dark'
          onClick={showPaymentRequest}
          disabled={processing}
        >
          <img src='/images/pay-apple.png' alt='apple-pay' width='75' />
        </button>
        <style jsx>{`
          .btn-dark {
            background-color: #222;
          }
        `}</style>
      </div>
    )
  )
}

export default PaymentRequestForm
