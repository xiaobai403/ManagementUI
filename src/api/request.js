import axios from "axios";
import router from '@/router'

const request = axios.create({
    baseURL: '/api',
    timeout: 3000
})

request.interceptors.request.use(config => {
    const jwt = localStorage.getItem('jwt')

    // jwt存在，则在头部添加上jwt
    if (jwt !== "" && jwt !== null && jwt !== undefined) {
        config.headers["authentication"] = jwt
    }

    return config
})

request.interceptors.response.use(response => {
    if (response.status === 200) {
        if (response.data.code === 401) {
            router.replace({name: "login"})
        }
        return response.data
    } else {
        // TODO 抛出异常。与服务器连接失败。
    }

}, error => Promise.reject(error))

export default request
