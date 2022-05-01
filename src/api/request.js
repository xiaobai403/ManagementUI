import axios from "axios";
import {promiseError} from "@/hook/message/handleMessage";

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
        return response.data
    } else {
        // TODO 抛出异常。与服务器连接失败。
    }

}, error => promiseError(error))

export default request
