import axios from 'axios'

// const baseURL = 'http://localhost:20228/'
const baseURL = 'http://blog-server.kevinlau.cn/'

axios.defaults.baseURL = baseURL
axios.defaults.headers.common['Accept'] = 'application/json'

const get = (url, config) => axios.get(url, config).then(res => res.data)

function parseQuery(str) {
  let params = {}
  if (query) {
    if (query.split('?').length === 0) {
      return params
    }
    let strArr = query.split('?')[1].split('&')
    strArr.forEach(child => {
      params[child.split('=')[0]] = child.split('=')[1]
    })
  }
  return params
}

function buildQuery(params) {
  let q = []
  for (let k in params) {
    // console.log(k, params[k])
    q.push(`${k}=${params[k]}`)
  }
  return encodeURI(q.join('&'))
}

export default {
  baseURL,
  parseQuery,
  buildQuery,
  get,
}
