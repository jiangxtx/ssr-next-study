const baseUrl = window.baseUrl || ''

/**
 * 自行封装一个 fetch 函数。
 *    摘自 vue2-elm 项目中，目测考虑的还不是全面。
 * @param url
 * @param type
 * @param data
 * @returns {Promise<void>}
 */
export default async (url='', type='GET', data={}) => {
  type = type.toUpperCase()
  url = baseUrl + url

  if (type === 'GET') {
    let dataStr = ''
    Object.keys(data).forEach(key => dataStr += `${key}=${data[key]}&`)

    if (dataStr.length) {
      url += '?' + dataStr.substr(0, dataStr.lastIndexOf('&'))
    }
  }

  if (window.fetch) {
    const config = {
      credentials: 'include',
      method: type,
      headers: {
        'Accept': 'application/json',
        "Content-Type": 'application/json',
      },
      mode: 'cors',
      cache: 'force-cache',
    }

    if (type !== 'GET' /*type === 'POST'*/) {
      Object.defineProperty(config, 'body', {
        value: JSON.stringify(data)
      })
    }

    try {
      const response = await fetch(url, config)
      const res2Json = await response.toJSON()
      return res2Json
    } catch (e) {
      throw new Error(e)
    }
  } else {
    return new Promise((resolve, reject) => {
      const requestObj = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject()
      const sendData = type !== 'GET' ? JSON.stringify(data) : ''

      requestObj.open(type, url, true)
      requestObj.sendRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      requestObj.send(sendData)

      requestObj.onreadystatechange = () => {
        if (requestObj.readyState !== 4) {
          return
        }

        if (requestObj.status == 200) {
          let obj = requestObj.response
          if ((typeof obj !== 'object')) {
            obj = JSON.parse(obj)
          }

          resolve(obj)
        } else {
          reject(requestObj)
        }
      }
    })
  }
}
