import cookie from "cookie"
import reactCookies from 'react-cookies'

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
}

export function setCookie(value) {
  reactCookies.save('bloom', value)
}

export function getUrlWithParams(url) {
  return `${url}${location.search}`;
}