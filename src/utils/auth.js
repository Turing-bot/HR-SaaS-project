import Cookies from 'js-cookie'

const TokenKey = 'I_LOVE_YOU'
const TimeKey = 'Hello_Would'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

// 获取时间戳
export function getTimeStamp () {
  return Cookies.get(TimeKey)
}

// 设置时间戳
export function setTimeStamp () {
  Cookies.set(TimeKey, Date.now())
}
