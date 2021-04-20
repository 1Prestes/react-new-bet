import Cookies from 'universal-cookie'

const cookie = new Cookies()

const defaultOptions = {
  path: '/'
}

export const setCookie = (name: string, value: string, options = {}): void => {
  if (!name || value === undefined) return

  cookie.set(name, value, { ...defaultOptions, ...options })
}

export const getCookie = (name: string): string => {
  if (!name) return 'name not provided'
  return cookie.get(name)
}

export const removeCookie = (name: string): void => {
  if (!name) return
  return cookie.remove(name, defaultOptions)
}
