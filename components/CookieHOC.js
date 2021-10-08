import Router from 'next/router'
import { parseCookies } from 'helpers'

const getInitialProps =
  (requiredCookies, redirectUrl) =>
  async ({ req, res }) => {
    const data = parseCookies(req)

    if (res) {
      if (Object.keys(data).length === 0 && data.constructor === Object) {
        res.writeHead(301, { Location: '/' })
        res.end()
      }
    }

    const bloomCookies = {
      last_step: 0,
      goals: [],
      practiced_cbt: null,
      guider: null,
      email: '',
      password: '',
      name: '',
      uid: null,
      ...(data && data.bloom ? JSON.parse(data.bloom) : {}),
    }

    // check if required params exist
    for (let key of requiredCookies) {
      if (
        !bloomCookies[key] ||
        (Array.isArray(bloomCookies[key]) && !bloomCookies[key].length)
      ) {
        // redirect
        if (res) {
          res.writeHead(302, { Location: redirectUrl })
          res.end()
        } else {
          Router.push(redirectUrl)
        }
      }
    }

    return {
      cookies: bloomCookies,
    }
  }

export default function CookieHOC(
  Component,
  requiredCookies = [],
  redirectUrl = '',
) {
  Component.getInitialProps = getInitialProps(requiredCookies, redirectUrl)

  return Component
}
