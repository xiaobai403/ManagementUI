import axios from "axios";

const mock = axios.create({
    baseURL: '/mock',
    timeout: 3000
})

mock.interceptors.request.use(config => {
    const jwt = localStorage.getItem('jwt')

    // jwt存在，则在头部添加上jwt
    if (jwt !== "" && jwt !== null && jwt !== undefined) {
        config.headers["authentication"] = jwt
    }

    return config
})

mock.interceptors.response.use(response => {
    if (response.status === 200) {
        return response.data
    } else {
        // TODO 抛出异常。与服务器连接失败。
    }

}, error => Promise.reject(error))

export default mock
