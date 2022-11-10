import Cookies from "js-cookie";

export function setCookie(key: string, value: string) {
  Cookies.set(key, value);
}

export function getCookie(key: string) {
  return Cookies.get(key);
}

export function removeCookie(key: string) {
  return Cookies.remove(key);
}
