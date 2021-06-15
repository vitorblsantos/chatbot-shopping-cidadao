'use strict'

const Get = key => localStorage.getItem(key || '')
const Set = (key, value) => localStorage.setItem(key, value)

export default {
  Get,
  Set
}
