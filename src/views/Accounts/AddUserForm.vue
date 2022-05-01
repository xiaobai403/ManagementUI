<template>
    <el-form
        ref="addFormRef"
        :model="userInfo"
        :rules="rules"
        label-width="auto"
        class="userAddForm"
    >

        <el-form-item label="昵称" prop="nickname">
            <el-input v-model="userInfo.nickname"/>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
            <el-input v-model="userInfo.email"/>
        </el-form-item>

        <el-form-item label="密码" prop="password">
            <el-input v-model="userInfo.password" />
        </el-form-item>

        <el-form-item label="确认密码" prop="confirm">
            <el-input v-model="userInfo.confirm" />
        </el-form-item>

        <el-form-item label="用户状态">
            <el-switch
                v-model="userInfo.status"
                active-color="#13ce66"
                inactive-color="#E6A23C"
                :active-value="0"
                :inactive-value="1"
            />
            <span :style="`color: ${accountStatusColor}`" class="statusInfo">
                         {{ accountStatusString }}
            </span>
        </el-form-item>


        <el-form-item label="性别" prop="sex">
            <el-select v-model="userInfo.sex" class="m-2" placeholder="Select">
                <el-option value="男"/>
                <el-option value="女"/>
            </el-select>
        </el-form-item>

        <el-form-item label="年龄" prop="age">
            <el-input v-model.number="userInfo.age"/>
        </el-form-item>

        <el-form-item>
            <el-button type="primary"
                       :loading="addUserLoading"
                       @click="addUser(addFormRef, userInfo)">
                添加
            </el-button>
            <el-button @click="cancel">取消</el-button>
        </el-form-item>

    </el-form>
</template>

<script setup>

import {computed, reactive, ref} from "vue";
import PubSub from "pubsub-js";
import {ok, responseError} from "@/hook/message/handleMessage";
import {CLOSE_ADD_USER} from "@/pattern/eventTypes";
import {reqAddUser} from "@/api";
import {handleErrorRef} from "@/hook/message/handleResponseMessage";
import {rules} from "@/hook/Rules/rules";

const addFormRef = ref(null)
const userInfo = reactive({
    email: "",
    nickname: "",
    sex: "",
    age: "",
    status: 0,
    role: "",
    avatar: "",
    password: "",
    confirm: ""
})



// 用户账户状态字符串
const accountStatusString = computed(() => {
    let statusString = ""

    if (userInfo.status === 0) {
        statusString = "正常"
    } else if (userInfo.status === 1) {
        statusString = "暂停"
    }

    return statusString
})

// 用户状态文字颜色
const accountStatusColor = computed(() => {
    let statusColor = "#E6A23C"

    if (userInfo.status === 0) {
        statusColor = "#67C23A"
    } else if (userInfo.status === 1) {
        statusColor = "#E6A23C"
    }

    return statusColor

})


// dialog 关闭
function cancel() {
    PubSub.publish(CLOSE_ADD_USER)
}

// 表单提交部分
const addUserLoading = ref(false)

function addUser(formRef, userInfo) {
    formRef.validate((valid) => {
        if (valid) {
            addUserLoading.value = true
            reqAddUser(userInfo).then(response => {
                addUserLoading.value = false
                if (response.code === 200) {
                    ok()
                    PubSub.publish(CLOSE_ADD_USER)
                } else {
                    responseError(response)
                }
            }, error => handleErrorRef(error, addUserLoading))
        } else {
            return false
        }
    })
}



</script>

<style scoped lang="less">
.el-form {
    padding: 0 5%;
}

.userAddForm {
    span {
        margin-left: 0.5em;
    }

    .el-input {
        width: 300px;
    }

    .el-select {
        width: 300px;
    }
}
</style>
