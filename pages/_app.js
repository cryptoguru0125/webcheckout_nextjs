import React, { useEffect } from 'react'
import Head from 'next/head'
import TagManager from 'react-gtm-module'
import '../styles/globals.scss'

class MyApp extends React.Component {
  componentDidMount() {
    TagManager.initialize({
      gtmId: process.env.NEXT_PUBLIC_ANALYTICS_ID,
    })

    window.addEventListener('resize', this.appHeight)
    this.appHeight()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.appHeight)
  }

  appHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, maximum-scale=1'
          />
          <link rel="icon" sizes="192x192" href="/logo.png"></link>
          <link rel="shortcut icon" href="/logo.png" type="image/png"></link>
          <link rel="apple-touch-icon" href="/logo.png" type="image/png"></link>
        </Head>
        <Component {...pageProps} />
      </>
    )
  }
}

export default MyApp
