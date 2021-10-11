import { CheckPassParam } from "../models/check-pass-param"

export function getWidth() {
  if (typeof window !== "undefined") {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  }
  return 0
}

export function ValidateEmail(e: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(e)
}

export function CheckPassword(pass: string) {
  const result: CheckPassParam = {
    status: false,
    msg: "Password is too weak.",
    strength: "Weak",
    letter: false,
    number: false,
    character: false,
  }
  if (!pass) {
    return result
  }
  if (pass.length < 8) {
    result.msg = "Password Should be 8 Characters at least."
    if (pass.match(/[A-Z]+/) || pass.match(/[a-z]+/)) {
      result.letter = true
    }
    // if (pass.match(/[$@#&!]+/)) {
    //   result.number = true
    // }
    if (pass.match(/[0-9]+/)) {
      result.number = true
    }
  } else {
    let strength = 0
    result.character = true
    if (pass.match(/[a-z]+/)) {
      strength += 1
      result.letter = true
    }
    if (pass.match(/[A-Z]+/)) {
      strength += 1
      result.letter = true
    }
    if (pass.match(/[0-9]+/)) {
      strength += 1
      result.number = true
    }
    if (pass.match(/[$@#&!]+/)) {
      strength += 1
      // result.letter = true
    }
    if (strength < 2) {
      result.msg = "Password is too weak."
    } else if (strength < 3) {
      result.status = true
      result.msg = "Password is fair."
      result.strength = "Fair"
    } else {
      result.status = true
      result.msg = "Password is strong."
      result.strength = "Strong"
    }
  }
  return result
}

export function CheckConfPass(confPass: string, pass: string) {
  if (pass === confPass) {
    return true
  } else {
    return false
  }
}

export function isExternal(url: string) {
  return (
    (url.indexOf(":") > -1 || url.indexOf("//") > -1) &&
    checkDomain(location.href) !== checkDomain(url)
  )
}

export function checkDomain(url: string) {
  if (url.indexOf("//") === 0) {
    url = location.protocol + url
  }
  return url
    .toLowerCase()
    .replace(/([a-z])?:\/\//, "$1")
    .split("/")[0]
}

export function getToken() {
  return localStorage.getItem("token")
}
