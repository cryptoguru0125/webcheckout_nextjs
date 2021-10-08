import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState, useMemo } from 'react'
import TagManager from 'react-gtm-module'
import { cancelSubscription } from 'helpers/api'
import swal from 'sweetalert'
import moment from 'moment'

const SubscriptionCancelPage = () => {
  const router = useRouter()
  const [canceled, setCanceled] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        page: 'Manage Subscription',
      },
    })
  })

  const handleCancelClick = () => {
    setLoading(true)

    cancelSubscription(router.query.app_user_id)
      .then((res) => {
        const { data: subscription } = res

        setCanceled({
          isTrial: subscription.current_period_end === subscription.trial_end,
          endDate: moment
            .unix(subscription.current_period_end)
            .format('MMMM DD, YYYY'),
        })
      })
      .catch(() => {
        swal(
          'Failed!',
          'Sorry. we failed on cancelling your subscription. Please check if your subscription id is valid',
          'error',
        )
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const subText = useMemo(() => {
    if (!canceled) return ''
    return canceled.isTrial ? 'trial' : 'subscription'
  }, [canceled])

  return (
    <div className='container'>
      <Head>
        <title>Manage Subscription</title>
      </Head>
      <h1 className='text-center'>Manage Subscription</h1>

      {!canceled ? (
        <section className='cancel-text'>
          <p className='text-lg-center'>
            In case you need to cancel your&nbsp;
            <span className='d-sm-block' />
            subscription please cancel blow
          </p>

          <button
            className='btn btn-primary'
            onClick={handleCancelClick}
            disabled={loading}
          >
            Cancel Subscription
          </button>

          <p className='text-lg-center'>
            In case you need to contact our support&nbsp;
            <span className='d-sm-block' />
            please email{' '}
            <a href='mailto:support@enjoybloom.com' target='_blank'>
              support@enjoybloom.com
            </a>
          </p>
        </section>
      ) : (
        <section className='canceled-text'>
          <p>
            You have successfully canceled your {subText}.<br />
            You {subText} will end on <strong>{canceled.endDate}</strong> and
            you can fully use Bloom until then.
          </p>
          <p>
            Thank you for trying out Bloom and we hope you are staying healthy
            and mindful and hope to see you back on Bloom one day.
          </p>
          <p>
            If you’d ever like to contact us - shoot us a message to&nbsp;
            <a href='mailto:support@enjoybloom.com' target='_blank'>
              <strong>
                support<span className='text-blue'>@enjoybloom.com</span>
              </strong>
            </a>
          </p>
          <p>You may close this window now.</p>
          <p>
            Have a good day,
            <br />
            Team Bloom
          </p>
        </section>
      )}

      <style jsx>
        {`
          h1 {
            color: black;
            margin-bottom: 10vh;
          }
          .btn-primary {
            margin-top: 1rem;
            margin-bottom: 1.3rem;
          }
          p {
            padding: 0 0.6rem;
          }
          .canceled-text p {
            margin-bottom: 1rem;
          }
          @media (max-width: 559px) {
            h1 {
              font-size: 16px;
            }
          }
        `}
      </style>
    </div>
  )
}

export default SubscriptionCancelPage
