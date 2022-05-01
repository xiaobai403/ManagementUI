<template>
    <el-form
        ref="resetFormRef"
        :model="password"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
    >
        <el-form-item label="用户名">
            <el-input v-model="password.username" disabled/>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
            <el-input v-model="password.password" />
        </el-form-item>
        <el-form-item label="重复密码" prop="confirm">
            <el-input v-model="password.confirm" />
        </el-form-item>

        <el-form-item>
            <el-button :loading="resetPasswordLoading"
                       type="primary"
                       @click="resetPassword(resetFormRef, password)">
                确认
            </el-button>
            <el-button @click="closeForm()">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>

import PubSub from "pubsub-js";
import {onMounted, reactive, ref} from "vue";
import {CLOSE_RESET_PASSWORD} from "@/pattern/eventTypes";
import {rules} from "@/hook/Rules/rules";
import {reqResetPassword} from "@/api";
import {handleErrorRef, handleRequestRef} from "@/hook/message/handleResponseMessage";

// eslint-disable-next-line no-undef
const props = defineProps({
    username: String
})

const resetFormRef = ref(null)

// 修改密码提交操作
const password = reactive({
    username: "",
    password: "",
    confirm: ""
})
const resetPasswordLoading = ref(false)

function resetPassword(formRef, password) {
    formRef.validate((valid) => {
        if (valid) {
            resetPasswordLoading.value = true
            reqResetPassword(password.username, password.password)
                .then(response => handleRequestRef(response, resetPasswordLoading),
                    error => handleErrorRef(error, resetPasswordLoading))
        } else {
            return false
        }
    })
}


// 重置密码取消
function closeForm() {
    PubSub.publish(CLOSE_RESET_PASSWORD)
}


onMounted(() => {
    password.username = props.username
})
</script>

<style scoped lang="less">

</style>
