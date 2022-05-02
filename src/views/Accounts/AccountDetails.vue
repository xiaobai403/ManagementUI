<template>
    <el-page-header content="用户信息" @back="goBack"/>
    <div class="userInfoContainer">
        <el-form
            ref="formRef"
            :model="userInfo"
            :rules="rules"
            label-width="80px"
            class="userInfoForm"
        >
            <el-form-item label="头像">
                <el-avatar :src="userInfo.avatar"/>
                <el-button size="small" plain class="upload-avatar">上传头像</el-button>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="userInfo.nickname"/>
                <el-button
                    :disabled="disableSaveButton.nickname"
                    type="text"
                    :loading="loading.nickname"
                    @click="saveNickname(userInfo.id, userInfo.nickname)">保存
                </el-button>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="userInfo.email"/>
                <el-button
                    :disabled="disableSaveButton.email"
                    type="text"
                    :loading="loading.email"
                    @click="saveEmail(userInfo.id, userInfo.email)">保存
                </el-button>
            </el-form-item>
            <el-form-item label="唯一标识" prop="region">
                <el-input v-model="userInfo.id" disabled/>
            </el-form-item>
            <el-form-item label="用户状态">
                <el-switch
                    v-if="enableStatusSwitch"
                    v-model="userInfo.status"
                    :loading="statusLoading"
                    :before-change="changeAccountStatus"
                    active-color="#13ce66"
                    inactive-color="#E6A23C"
                    :active-value="0"
                    :inactive-value="1"
                />
                <span :style="`color: ${accountStatusColor}`" class="statusInfo">
                         {{ accountStatusString }}
                    </span>
            </el-form-item>
            <el-form-item label="用户权限">
                <el-input v-model="userInfo.role" disabled/>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-select v-model="userInfo.sex" class="m-2" placeholder="Select">
                    <el-option value="男"/>
                    <el-option value="女"/>
                </el-select>
                <el-button
                    :disabled="disableSaveButton.sex"
                    type="text"
                    :loading="loading.sex"
                    @click="saveSex(userInfo.id, userInfo.sex)">保存
                </el-button>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input v-model.number="userInfo.age"/>
                <el-button
                    :disabled="disableSaveButton.age"
                    type="text"
                    :loading="loading.age"
                    @click="saveAge(userInfo.id, userInfo.age)">保存
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {computed, reactive, ref, watch} from "vue";
import {useAccount} from "@/store/useAccount";
import {error, ok, responseError} from "@/hook/message/handleMessage";
import {handleErrorReactive, handleErrorRef, handleRequestReactive} from "@/hook/message/handleResponseMessage";
import {reqChangeAccountStatus, reqChangeAge, reqChangeEmail, reqChangeNickname, reqChangeSex} from "@/api";
import {rules} from "@/hook/Rules/rules";

const store = useAccount()
const userInfo = reactive(store.userInfo)

// 用户账户状态
const statusLoading = ref(false)

// 是否启用用户状态滑动开关
const enableStatusSwitch = computed(() => {
    const status = userInfo.status
    return (status === 0 || status === 1);
})

// 用户账户状态字符串
const accountStatusString = computed(() => {
    let statusString = ""

    if (userInfo.status === 0) {
        statusString = "正常"
    } else if (userInfo.status === 1) {
        statusString = "暂停"
    } else if (userInfo.status === 2) {
        statusString = "封禁"
    } else {
        statusString = "异常"
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
    } else if (userInfo.status === 2) {
        statusColor = "#F56C6C"
    } else {
        statusColor = "#909399"
    }

    return statusColor

})

function changeAccountStatus() {
    let status = 0
    statusLoading.value = true

    if (userInfo.status === 0) {
        status = 1
    } else if (userInfo.status === 1) {
        status = 0
    } else {
        statusLoading.value = false
        error("非法操作")
        return
    }

    return new Promise((resolve, reject) => {
        reqChangeAccountStatus(userInfo.id, status).then(response => {
            console.log(response)
            statusLoading.value = false
            if (response.code === 200) {
                ok()
                // 修改状态
                userInfo.status = response.data.status
                resolve()
            } else {
                responseError(response)
                reject()
            }
        }, error => {
            handleErrorRef(error, statusLoading)
            reject()
        })

    })

}


// 可编辑选项保存

/**
 * 是否启用保存按钮
 */
const disableSaveButton = reactive({
    nickname: true,
    email: true,
    sex: true,
    age: true
})

const loading = reactive({
    nickname: false,
    email: false,
    sex: false,
    age: false
})

watch(() => userInfo.nickname, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        disableSaveButton.nickname = false
    }
})

watch(() => userInfo.email, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        disableSaveButton.email = false
    }
})

watch(() => userInfo.sex, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        disableSaveButton.sex = false
    }
})

watch(() => userInfo.age, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        disableSaveButton.age = false
    }
})

const saveNickname = (id, nickname) => {
    loading.nickname = true
    reqChangeNickname(id, nickname)
        .then(response => handleRequestReactive(response, loading, "nickname", disableSaveButton, "nickname"),
            error => handleErrorReactive(error, loading, "nickname"))
}

const saveEmail = (id, email) => {
    loading.email = true
    reqChangeEmail(id, email)
        .then(response => handleRequestReactive(response, loading, "email", disableSaveButton, "email"),
            error => handleErrorReactive(error, loading, "email"))
}

const saveSex = (id, sex) => {
    loading.sex = true
    reqChangeSex(id, sex)
        .then(response => handleRequestReactive(response, loading, "sex", disableSaveButton, "sex"),
            error => handleErrorReactive(error, loading, "sex"))
}

const saveAge = (id, age) => {
    loading.age = true
    reqChangeAge(id, age)
        .then(response => handleRequestReactive(response, loading, "age", disableSaveButton, "age"),
            error => handleErrorReactive(error, loading, "age"))
}


// 返回上一级
const router = useRouter()

function goBack() {
    router.replace({name: "accounts"})
    store.$reset()
}

</script>

<style scoped lang="less">
.userInfoContainer {
    display: flex;
    justify-content: center;

    .userInfoForm {
        margin-top: 50px;
        padding: 0 150px 0 20px;
        width: 480px;

        .el-input {
            width: 300px;
        }

        .el-select {
            width: 300px;
        }

        .el-button {
            margin-left: 20px;
        }
    }
}


.el-form-item {
    gap: 20px;
}

.upload-avatar {
    margin-left: 1rem;
}

.statusInfo {
    margin-left: 16px;
}

</style>
