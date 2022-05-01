// 定义校验规则
import {REGEX_EMAIL, REGEX_PASSWORD} from "@/pattern/RegExp";
import {reqCheckEmail, reqCheckNickname} from "@/api";

export const rules = {
    nickname: [
        {required: true, message: '请输入昵称', trigger: 'blur'},
        {validator: checkNickname, trigger: 'blur'}
    ],
    email: [
        {required: true, message: '请输入邮箱', trigger: 'blur'},
        {pattern: REGEX_EMAIL, message: '邮箱格式错误', trigger: 'blur'},
        {validator: checkEmail, trigger: 'blur'}
    ],
    sex: [
        {required: true, message: "请您选择性别", trigger: 'blur'},
        {type: 'enum', enum: ['男', '女']}
    ],
    age: [
        {required: true, message: '请输入年龄', trigger: 'blur'},
        {type: "number", message: "年龄必须为数字", trigger: 'blur'}
    ],
    status: [
        {required: true, message: "请输入账户状态", trigger: 'blur'},
        {type: 'enum', enum: [0, 1]}
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 8, max: 20, pattern: REGEX_PASSWORD,
            message: ' 8 - 20 个字符, 包含数字、字母、特殊符号', trigger: 'blur' },
    ],
    confirm: [
        { required: true, message: '请在输入一次密码', trigger: 'blur' },
        { min: 8, max: 20, message: '密码长度在 8 ~ 20 之间', trigger: 'blur' },
        { validator: confirmPass, trigger: 'blur' }
    ]
}

// 检查函数
const confirmPass = (rule, value, callback) => {
    if (value !== this.user.password ) {
        callback(new Error("两次密码输入不一致"))
    } else {
        callback()
    }
}

// 校验函数
const checkNickname = (rule, value, callback) => {
    reqCheckNickname(value).then(response => {
        if (response.code === 200) {
            if (response.data) {
                callback()
            } else {
                callback("该昵称已经被注册")
            }
        } else {
            callback(new Error("服务器响应错误，请稍后再试"))
        }
    }).catch(error => callback(error))
}

const checkEmail = (rule, value, callback) => {
    reqCheckEmail(value).then(response => {
        if (response.code === 200) {
            if (JSON.parse(response.data).status) {
                callback()
            } else {
                callback("该邮箱已经被注册")
            }
        } else {
            callback(new Error("服务器响应错误，请稍后再试"))
        }
    }).catch(error => callback(error))
}
