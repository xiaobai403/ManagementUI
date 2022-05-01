// 请求处理
import {ok, promiseError, responseError} from "@/hook/message/handleMessage";

export const handleRequestRef = (response, loading, successCode = 200) => {
    loading.value = false
    if (response.code === successCode) {
        ok()
    } else {
        responseError(response)
    }
}

export const handleErrorRef = (error, loading) => {
    loading.value = false
    promiseError(error)
}

export const handleRequestRefSwitch = (response, loading, resolve, reject, successCode = 200) => {
    loading.value = false
    if (response.code === successCode) {
        ok()
        return resolve()
    } else {
        responseError(response)
        return reject(response.msg)
    }
}

export const handleErrorRefSwitch = (error, loading, reject) => {
    loading.value = false
    promiseError(error)
    return reject(error)
}

export const handleRequestReactive = (response, loading, loadingAttribute, saveButtonStatus, statusAttribute, successCode = 200) => {
    loading[loadingAttribute] = false
    if (response.code === successCode) {
        saveButtonStatus[statusAttribute] = true
        ok()
    } else {
        responseError(response)
    }
}

export const handleErrorReactive = (error, loading, attribute) => {
    loading[attribute] = false
    promiseError(error)
}

export const handleRequestReactiveSwitch = (response, loading, attribute, resolve, reject, successCode = 200) => {
    loading[attribute] = false
    if (response.code === successCode) {
        ok()
        return resolve()
    } else {
        responseError(response)
        return reject(response.msg)
    }
}

export const handleErrorReactiveSwitch = (error, loading, attribute, reject) => {
    loading[attribute] = false
    promiseError(error)
    return reject(error)
}


