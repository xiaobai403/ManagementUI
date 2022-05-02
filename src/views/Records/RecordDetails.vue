<template>
    <el-page-header content="用户信息" @back="goBack"/>
    <el-row :gutter="20" align="middle" justify="center">
        <el-col :span="6"></el-col>
        <el-col :span="12" class="userInfoContainer">
            <el-form
                ref="formRef"
                :model="record"
                label-width="120px"
                class="userInfoForm"
            >
                <el-form-item label="借阅ID">
                    <el-input disabled v-model="record.borrowId"/>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input disabled v-model="record.username"/>
                </el-form-item>
                <el-form-item label="书名">
                    <el-input disabled v-model="record.bookName"/>
                </el-form-item>
                <el-form-item label="借阅日期">
                    <el-input disabled v-model="record.id"/>
                </el-form-item>
                <el-form-item label="续借次数">
                    <el-select v-model="record.renewNumbers" placeholder="Select">
                        <el-option value="1"/>
                        <el-option value="2"/>
                        <el-option value="3"/>
                        <el-option value="4"/>
                        <el-option value="5"/>
                    </el-select>
                    <el-button
                        :disabled="disableRenewNumber"
                        type="text"
                        :loading="changeRenewNumbersLoading"
                        @click="saveRenewNumbers(record.borrowId, record.renewNumbers)">保存</el-button>
                </el-form-item>
                <el-form-item label="是否归还">
                    <el-switch
                        v-model="record.isReturn"
                        :loading="changeReturnLoading"
                        inline-prompt
                        active-color="#13ce66"
                        inactive-color="#E6A23C"
                        active-text="是"
                        inactive-text="否"
                        :beforeChange="changeReturnStatus"
                    />
                </el-form-item>
                <el-form-item label="是否违约">
                    <el-switch
                        v-model="record.isBreachOfContract"
                        inline-prompt
                        :loading="changeBreachOfContractLoading"
                        active-color="#F56C6C"
                        inactive-color="#13ce66"
                        active-text="是"
                        inactive-text="否"
                        :beforeChange="changeBreachOfContractStatus"
                    />
                </el-form-item>
            </el-form>

        </el-col>
        <el-col :span="6"></el-col>
    </el-row>
</template>

<script setup>
import {reactive, ref, watch} from "vue";
import {useRecord} from "@/store/useRecord";
import {reqChangeBreachOfContractStatus, reqChangeRenewNumbers, reqChangeReturnStatus} from "@/api";
import {
    handleErrorRef,
    handleErrorRefSwitch,
    handleRequestRef,
    handleRequestRefSwitch
} from "@/hook/message/handleResponseMessage";
import PubSub from "pubsub-js";
import {useRouter} from "vue-router";
import {REFRESH_RECORDS_INFO} from "@/pattern/eventTypes";

const store = useRecord()
const record = reactive(store.record)


// 续借次数
const disableRenewNumber = ref(true)

watch(() => record.renewNumbers, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        disableRenewNumber.value = false
    }
})

const changeRenewNumbersLoading = ref(false)
const saveRenewNumbers = (borrowId, number) => {
    changeRenewNumbersLoading.value = true
    reqChangeRenewNumbers(borrowId, number)
        .then(response => handleRequestRef(response, changeRenewNumbersLoading),
            error => handleErrorRef(error, changeRenewNumbersLoading))
}


// 归还与违约
const changeReturnLoading = ref(false)
const changeBreachOfContractLoading = ref(false)

const changeReturnStatus = () => {
    changeReturnLoading.value = true
    return new Promise((resolve, reject) => {
        reqChangeReturnStatus(record.borrowId, record.isReturn)
            .then(response => handleRequestRefSwitch(response, changeReturnLoading, resolve, reject),
                error => handleErrorRefSwitch(error, changeReturnLoading, reject))
    })
}

const changeBreachOfContractStatus = () => {
    changeBreachOfContractLoading.value = true
    return new Promise((resolve, reject) => {
        reqChangeBreachOfContractStatus(record.borrowId, record.isReturn)
            .then(response => handleRequestRefSwitch(response, changeReturnLoading, resolve, reject),
                error => handleErrorRefSwitch(error, changeBreachOfContractLoading, reject))
    })
}


// 返回函数
const router = useRouter()

const goBack = () => {
    router.replace({name: "records"})
    store.$reset()
    // 发送通知，刷新表格
    PubSub.publish(REFRESH_RECORDS_INFO)
}

</script>

<style scoped lang="less">
.userInfoContainer {

    .userInfoForm {
        margin-top: 10%;

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
</style>
