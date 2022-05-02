<template>
    <div class="dialog-container">
        <el-dialog
            v-model="showResetPasswordDialog"
            title="重置密码"
            destroy-on-close
            width="400px"
        >
            <ResetUserPasswordForm :username="resetUsername"/>
        </el-dialog>
        <el-dialog
            v-model="showAddUserDialog"
            title="添加用户"
            destroy-on-close
            width="400px"
        >
            <AddUserForm/>
        </el-dialog>
    </div>
    <div class="account-container">
        <div class="account-header">
            <el-button type="primary" size="large" class="add-account-button" @click="showAddUserDialogFun">
                <span class="iconfont icon-add"/>
                添加用户
            </el-button>

            <div class="search">
                <el-input
                    v-model="search.searchInfo"
                    placeholder="请输入查询条件"
                    class="input-with-select"
                    size="large"
                    style="width: 500px"
                >
                    <template #prepend>
                        <el-select v-model="search.condition" style="width: 110px">
                            <el-option label="用户名" value="username"/>
                            <el-option label="昵称" value="nickname"/>
                            <el-option label="邮箱" value="email"/>
                        </el-select>
                    </template>
                    <template #append>
                        <el-button size="large" @click="searchUser">
                            <span class="iconfont icon-search"/>
                        </el-button>
                    </template>

                </el-input>

            </div>


        </div>
        <div class="account-table">
            <el-table :data="userInfo"
                      :v-loading="searchLoading"
                      stripe
                      border
                      style="width: 100%">
                <el-table-column type="expand">
                    <template #default="props">
                        <div class="details-container">
                            <el-avatar :size="50" :src="props.row.avatar"/>
                            <div class="details-info">
                                <div>
                                    <span>昵称: </span>
                                    <span>{{ props.row.nickname }}</span>
                                </div>
                                <div>
                                    <span>唯一标识: </span>
                                    <span>{{ props.row.id }}</span>
                                </div>
                                <div>
                                    <span>邮箱: </span>
                                    <span>{{ props.row.email }}</span>
                                </div>
                                <div>
                                    <span>账户状态: </span>
                                    <span>{{ props.row.status }}</span>
                                </div>
                                <div>
                                    <span>性别: </span>
                                    <span>{{ props.row.sex }}</span>
                                </div>
                                <div>
                                    <span>权限: </span>
                                    <span>{{ props.row.role }}</span>
                                </div>
                                <div>
                                    <span>年龄: </span>
                                    <span>{{ props.row.age }}</span>
                                </div>
                            </div>
                        </div>

                    </template>
                </el-table-column>
                <el-table-column label="昵称" prop="nickname"/>
                <el-table-column label="邮箱" prop="email"/>
                <el-table-column label="权限" prop="role"/>
                <el-table-column label="状态" prop="status"/>
                <el-table-column fixed="right" label="操作" prop="status">
                    <template #default="scope">
                        <el-button type="text" size="small" @click="handleEdit(scope.row)">
                            编辑
                        </el-button>
                        <el-button type="text" size="small" @click="resetPassword(scope.row)">
                            重置密码
                        </el-button>
                        <el-button
                            type="text"
                            size="small"
                            :loading="scope.row.deleteLoading"
                            style="color: #F56C6C"
                            @click="deleteUser(scope.row.id, scope.row)">
                            删除用户
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>

    </div>

</template>

<script setup>

import {onBeforeUnmount, onMounted, reactive, ref, toRaw} from "vue";
import {
    handleErrorReactive,
    handleErrorRef,
    handleRequestOneAttributeFun,
    handleRequestRefFun
} from "@/hook/message/handleResponseMessage";
import {reqDeleteUser, reqGetUserByNickname, reqGetUserByUsername} from "@/api";
import PubSub from "pubsub-js";
import {CLOSE_ADD_USER, CLOSE_RESET_PASSWORD, REFRESH_INFO} from "@/pattern/eventTypes";
import AddUserForm from "@/views/Accounts/AddUserForm";
import ResetUserPasswordForm from "@/views/Accounts/ResetUserPasswordForm";
import {useAccount} from "@/store/useAccount";
import {useRouter} from "vue-router";

// 表格数据
const userInfo = ref([])


// 用户删除
const removeUser = (userInfo, id) => {
    userInfo.value = toRaw(userInfo.value).filter(i => i.id !== id)
}


function deleteUser(id, currentUser) {
    currentUser.deleteLoading = true
    reqDeleteUser(id).then(response => {
        handleRequestOneAttributeFun(response, currentUser, "deleteLoading", removeUser, [userInfo, id])
    }, error => handleErrorReactive(error, currentUser, "deleteLoading"))
}


// 用户编辑
const store = useAccount()
const router = useRouter()

function handleEdit(row) {
    Object.assign(store.userInfo, row)
    router.push({
        name: 'accountDetails',
        params: {
            username: row.email
        }
    })
}


// 用户搜索部分
const search = reactive({
    condition: "username",
    searchInfo: ""
})
const searchLoading = ref(false)

const handleSearchResponse = (records, response) => {
    const data = response.data.map(i => {
        i['deleteLoading'] = false
        return i
    })

    userInfo.value = data
}

function searchUser() {
    searchLoading.value = true
    if (search.condition === 'username' || search.condition === 'email') {
        reqGetUserByUsername(search.searchInfo)
            .then(response => handleRequestRefFun(response, searchLoading, handleSearchResponse, [userInfo, response]),
                error => handleErrorRef(error, searchLoading))
    } else if (search.condition === 'nickname') {
        reqGetUserByNickname(search.searchInfo)
            .then(response => handleRequestRefFun(response, searchLoading, handleSearchResponse, [userInfo, response]),
                error => handleErrorRef(error, searchLoading))
    }
}



// 用户添加部分
const showAddUserDialog = ref(false)
function showAddUserDialogFun() {
    showAddUserDialog.value = true
}



// 密码重置部分
let resetUsername = ref("")
let showResetPasswordDialog = ref(false)
function resetPassword(row) {
    resetUsername.value = row.email
    showResetPasswordDialog.value = true
}



// 消息订阅与发布
let passwordDialogToken = ''
let refreshInfoToken = ''
let addUserDialogToken = ''

onMounted(() => {
    passwordDialogToken = PubSub.subscribe(CLOSE_RESET_PASSWORD, () => showResetPasswordDialog.value = false)
    refreshInfoToken = PubSub.subscribe(REFRESH_INFO, searchUser)
    addUserDialogToken = PubSub.subscribe(CLOSE_ADD_USER, () => showAddUserDialog.value = false)
})

onBeforeUnmount(() => {
    PubSub.unsubscribe(passwordDialogToken)
    PubSub.unsubscribe(refreshInfoToken)
    PubSub.unsubscribe(addUserDialogToken)
})








</script>

<style scoped lang="less">
.account-container {
    .account-header {
        display: flex;

        .add-account-button {
            font-size: 16px;

            span {
                font-size: 20px;
                margin-right: 0.4em;
                padding: 0.6em 0;
            }
        }

        .search {
            margin-left: auto;

            .icon-search {
                font-size: 20px;
            }

        }

    }

    .account-table {
        margin-top: 30px;

        .details-container {
            padding: 20px 0;
            margin-left: 60px;

            .details-info {
                display: grid;
                grid-template-columns: 260px 260px;
                grid-template-rows: repeat(20px 4);
                row-gap: 10px;
                margin-top: 20px;
                margin-left: 10px;

                div {
                    display: flex;
                    gap: 20px;

                    span {
                        color: rgb(0, 0, 0);
                        font-family: Noto Sans SC;
                        font-size: 14px;
                        font-weight: 400;
                        line-height: 21px;
                        letter-spacing: 0;
                        text-align: left;
                    }
                }
            }
        }
    }
}


</style>
