
const TOKENNAME = '__system_auth__'
import util from './index'
const cookie = util.cookie;

export function getAuth() {
    return cookie.get(TOKENNAME)
}
export function setAuth(value, expires) {
    //name, value, domain, path, expires, is
    let day30; if (expires) day30 = 30;
    cookie.set(TOKENNAME, value, document.domain, "/", day30)
}
export function clearAuth() {
    // name path domain
    cookie.clear(TOKENNAME, "/", document.domain)
}