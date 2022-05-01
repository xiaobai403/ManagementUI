<template>
    <div class="header-container">
        <el-button class="aside-button" @click="changeAsideCollapse">
            <div class="iconfont icon-gird" />
        </el-button>
        <el-dropdown class="avatar-dropdown">
            <span class="el-dropdown-link">
                <el-avatar :size="40" src="none"/>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="a">个人中心</el-dropdown-item>
                    <el-dropdown-item @click.prevent="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup>
import PubSub from "pubsub-js";
import {CHANGE_COLLAPSE} from "@/pattern/eventTypes";
import {useRouter} from "vue-router";

const router = useRouter()

function changeAsideCollapse() {
    PubSub.publish(CHANGE_COLLAPSE);
}

const logout = () => {
    localStorage.removeItem('jwt')
    router.replace({ name: "login" })
}

</script>

<style scoped lang="less">
.header-container {
    display: flex;

    .aside-button {
        width: 40px;
        height: 25px;
        margin-top: 15px;
    }

    .avatar-dropdown {
        margin-left: auto;
        align-self: stretch;
        padding: 10px;
    }

    .el-dropdown-link {

    }
}
</style>
