let wxKeys = ["request", "login", "uploadFile", "chooseImage", "checkSession", "getSetting", "openSetting", "showModal", "getUserInfo", "scanCode"]

Promise.prototype.finally = function (callback) {
  let P = this.constructor
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => {
      throw reason
    })
  )
}

wxKeys.forEach(key => {
  const wxKeyFn = wx[key]
  if (wxKeyFn && typeof wxKeyFn === "function") {
    Object.defineProperty(wx, key, {
      get() {
        return (option = {}) => {
          return new Promise((resolve, reject) => {
            option.success = res => {
              resolve(res)
            }
            option.fail = res => {
              reject(res)
            }
            wxKeyFn(option)
          })
        }
      }
    })
  }
})