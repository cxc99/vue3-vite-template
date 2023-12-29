//router
// import router from '../router/index.js' //引入路由对象

// axios
interface Request {
  code: string | number
  data: any
  msg: string
}
import axios from 'axios'
// import qs from 'qs'

const baseURL =
  process.env.NODE_ENV === 'development'
    ? `${window.location.origin}/api/`
    : 'http://47.97.154.67/api/' // 正式地址

const instance = axios.create({
  baseURL,
  timeout: 6 * 1000, //超时毫秒 60s
  withCredentials: true,
})

instance.defaults.timeout = 6 * 1000 //超时毫秒 60s
instance.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded; charset=UTF-8'
instance.defaults.withCredentials = true
// multipart/form-data
// axios请求拦截
instance.interceptors.request.use(
  (config: any) => {
    // 在发送请求之前做些什么:
    // 如果需要在header头中传token，使用下边这段代码
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = token
      config.headers['token'] = token
    }

    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// axios响应拦截器
instance.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        // 404请求不存在
        case 404:
          console.log('网络请求不存在')
          break
        case 500:
          console.log('内部服务器错误')
          break
        // 其他错误，直接抛出错误提示
        default:
          console.log(error.response.data.msg)
      }
      return Promise.reject(error.response)
    }
  },
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url: string, params = {}) {
  // 如果需要在请求的参数中传token，使用下边这段代码
  // let token = localStorage.getItem('token') || '';
  // if (params.__proto__.constructor.name == "Object") {
  // 	token && (params.token = token);
  // 	params = qs.stringify(params);
  // } else if (params.__proto__.constructor.name == "FormData") {
  // 	token && (params.append("token", token));
  // }

  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params: params,
      })
      .then((res: Record<string, any>) => {
        if (res.data.code == -2000) {
          // localStorage.clear()
          const router = useRouter()
          setTimeout(() => {
            router.replace({
              path: '/login',
            })
          }, 1000)
          return
        } else if (res.data.code !== 200) {
          console.log(res.msg)
        }
        resolve(res.data)
      })
      .catch(err => {
        console.log('网络请求错误')
        reject(err.data)
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url: string, params: Record<string, any> = {}) {
  // 如果需要在请求的参数中传token，使用下边这段代码
  // let token = localStorage.getItem('token') || ''

  // if (params.__proto__.constructor.name == 'Object') {
  //   token && (params.token = token)
  // params = qs.stringify(params)
  // console.log(params)
  // } else if (params.__proto__.constructor.name == 'FormData') {
  //   token && params.append('token', token)
  // }

  return new Promise<Promise<Request>>((resolve, reject) => {
    instance
      .post(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(error => {
        console.log('网络请求错误')
        reject(error)
      })
  })
}

export const callApi = {
  get,
  post,
}
export default callApi
