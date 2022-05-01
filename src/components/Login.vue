<template>
    <div class="login-container">
        <div class="login">
            <div class="login-title">
                <h3 class="header-one">欢迎使用，</h3>
                <h3 class="header-two">群英荟萃后台管理系统!</h3>
            </div>
            <el-form
                ref="loginForm"
                :model="account"
                :rules="rules"
                label-width="120px"
                class="login-form"
                hide-required-asterisk
                status-icon
            >
                <el-form-item label="用户名: "
                              label-width="100px"
                              prop="username">
                    <el-input v-model="account.username"
                              type="text"
                              maxlength=32
                              placeholder="请输入用户名"/>
                </el-form-item>
                <el-form-item label="密码: "
                              label-width="100px"
                              prop="password">
                    <el-input v-model="account.password"
                              maxlength=32
                              type="password"
                              autocomplete="off"
                              placeholder="请输入密码"
                              show-password/>
                </el-form-item>

                <el-button class="login-button"
                           type="primary"
                           :loading="loginLoading"
                           round
                           @click="login(loginForm)">登陆
                </el-button>

            </el-form>

        </div>
    </div>

</template>

<script setup>
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import {handleErrorRef} from "@/hook/message/handleResponseMessage";
import {responseError} from "@/hook/message/handleMessage";
import {reqLogin} from "@/api";

const loginForm = ref(null)
const router = useRouter()

const account = reactive({
    username: "",
    password: ""
})

const rules = reactive({
    username: [
        {required: true, message: "请输入邮箱", trigger: 'blur'}
    ],
    password: [
        {required: true, message: "请输入密码", trigger: 'blur'}
    ]
})

// 登陆部分
const loginLoading = ref(false)
const path = '/home.html'

function login(loginForm) {
    loginForm.validate((valid) => {
        if (valid) {
            // 校验成功
            loginLoading.value = true
            // 清楚本地缓存
            localStorage.removeItem('jwt')

            reqLogin(account.username, account.password).then(response => {
                loginLoading.value = false
                handleLoginResponse(response, path)
            }, error => handleErrorRef(error, loginLoading))

        } else {
            return false
        }
    })
}

function handleLoginResponse(response, path) {
    console.log(response)
    switch (response.code) {
        case 230:
            // 登陆成功
            localStorage.setItem('jwt', response.data)
            router.replace({ path })
            break;
        case 430:
            // 用户名密码错误
            ElMessage.error('登陆失败，请检查用户名和密码')
            break;
        default:
            // 其他错误
            responseError(response)
    }
}



</script>

<style scoped lang="less">

.login-container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    .login {
        width: 400px;
        height: 300px;
        box-shadow: 4px 4px 10px grey;
        border-radius: 8px;
        position: relative;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 2em;

        h3 {
            font-size: 24px;
            margin: 1em;
        }

        .header-one {
            font-size: 24px;
        }

        .header-two {
            font-size: 24px;
        }

        .el-form-item {
            margin-bottom: 20px;
        }

        .el-input {
            width: 250px;
        }

        .login-button {
            height: 2.5em;
            font-size: 1rem;
            margin-top: 0.8em;
            width: 300px;
            margin-left: 50px;
        }


    }
}

</style>
