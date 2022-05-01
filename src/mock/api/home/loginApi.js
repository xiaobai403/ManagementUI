import qs from "qs";

export function login (request) {
    const body = qs.parse(request.body)

    if (body.username === 'admin@xiaobai.icu' && body.password === '123') {
        return {
            code: 230,
            msg: "登陆成功",
            data: '123'
        }
    } else {
        return {
            code: 430,
            msg: "用户名或密码错误",
            data: null
        }
    }
}
