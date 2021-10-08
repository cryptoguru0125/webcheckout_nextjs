import { useState, useEffect } from 'react'
import Head from 'next/head'
import TagManager from 'react-gtm-module'
import { useRouter } from 'next/router'
import { getUrlWithParams, setCookie } from 'helpers'
import WebCheckoutProgress from 'components/WebCheckoutProgress'
import WebCheckoutOptionItem from 'components/WebCheckoutOptionItem'
import CookieHOC from 'components/CookieHOC'
import SunlightImage from 'assets/icons/sunlight.svg'
import LeafImage from 'assets/icons/leaf.svg'
import FlowerImage from 'assets/icons/flower.svg'
import EyeImage from 'assets/icons/eyes.svg'
import UmbrellaImage from 'assets/icons/umbrella.svg'
import EmpowerImage from 'assets/icons/empower.svg'

const BloomPage = ({ cookies }) => {
  const router = useRouter()
  const [goals, selectGoal] = useState(cookies.goals)

  const bindClick = (option) => () => {
    let index = goals.indexOf(option)
    if (index === -1) {
      selectGoal([...goals, option])
    } else {
      selectGoal(goals.filter((item) => item !== option))
    }
  }

  const nextStep = () => {
    setCookie({
      ...cookies,
      goals,
    })

    TagManager.dataLayer({
      dataLayer: {
        event: 'select-goals',
        goals: goals,
      },
    })

    router.push(getUrlWithParams(`/practiced-cbt`))
  }

  const isSelected = (option) => {
    return goals.indexOf(option) !== -1
  }

  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        page: 'bloom',
      },
    })
  })

  return (
    <div className='container'>
      <Head>
        <title>What brings you to Bloom?</title>
      </Head>
      <WebCheckoutProgress percent={1 / 10} />
      <div className='wc-step'>
        <section className='title-section text-lg-center'>
          <h1>What brings you to Bloom?</h1>
          <p>We'll personalize recommendations based on your goals.</p>
        </section>
        <div className='wc-option-list'>
          <WebCheckoutOptionItem
            selected={isSelected('Boost Mood')}
            onClick={bindClick('Boost Mood')}
          >
            <SunlightImage className='wc-option-icon' />
            Boost Mood
          </WebCheckoutOptionItem>
          <WebCheckoutOptionItem
            selected={isSelected('Worry Less')}
            onClick={bindClick('Worry Less')}
          >
            <LeafImage className='wc-option-icon' />
            Worry Less
          </WebCheckoutOptionItem>
          <WebCheckoutOptionItem
            className='calm-anxiety'
            selected={isSelected('Calm Anxiety')}
            onClick={bindClick('Calm Anxiety')}
          >
            <FlowerImage className='wc-option-icon stroke' />
            Calm Anxiety
          </WebCheckoutOptionItem>
          <WebCheckoutOptionItem
            selected={isSelected('Be More Present')}
            onClick={bindClick('Be More Present')}
          >
            <EyeImage className='wc-option-icon stroke' />
            Be More Present
          </WebCheckoutOptionItem>
          <WebCheckoutOptionItem
            selected={isSelected('Reduce Stress')}
            onClick={bindClick('Reduce Stress')}
          >
            <UmbrellaImage className='wc-option-icon' />
            Reduce Stress
          </WebCheckoutOptionItem>
          <WebCheckoutOptionItem
            selected={isSelected('Feel Empowered')}
            onClick={bindClick('Feel Empowered')}
          >
            <EmpowerImage className='wc-option-icon' />
            Feel Empowered
          </WebCheckoutOptionItem>
        </div>
      </div>
      <button
        type='button'
        className='btn btn-primary btn-bottom'
        onClick={nextStep}
        disabled={!goals.length}
      >
        Continue
      </button>
      <style jsx>
        {`
          @media (min-width: 560px) {
            p {
              max-width: 400px;
            }
          }
        `}
      </style>
    </div>
  )
}

export default CookieHOC(BloomPage)
