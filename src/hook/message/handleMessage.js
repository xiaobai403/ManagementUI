import {ElMessage} from "element-plus";

export const promiseError = (error) => {
    ElMessage({
        showClose: true,
        message: `${error}`,
        type: 'error',
    })
}

export const responseError = (response) => {
    ElMessage({
        showClose: true,
        message: `请求错误: ErrorCode: ${response.code}, ErrorMsg: ${response.msg}`,
        type: 'error',
    })
}

export const ok = (info="请求成功") => {
    ElMessage({
        showClose: true,
        message: `${info}`,
        type: 'success',
    })
}
