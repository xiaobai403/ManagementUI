<template>
    <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="aside-menu"
        :default-active="activeMenu"
        text-color="#fff"
        :collapse="isCollapse"
        @select="handleSelect"
    >
        <h2>{{ isCollapse ? "系统" : "管理系统" }}</h2>

        <CustomMenuItem v-for="item in menu" :key="item.path" :item="item"/>

    </el-menu>

</template>

<script setup>

import {onMounted, onBeforeUnmount, ref} from "vue";
import {CHANGE_COLLAPSE} from "@/pattern/eventTypes";
import PubSub from 'pubsub-js'


// 声明周期钩子函数

// 侧边栏是否折叠
const isCollapse = ref(false)
const changeCollapse = () => isCollapse.value = !isCollapse.value

onMounted(() => {
    PubSub.subscribe(CHANGE_COLLAPSE, changeCollapse)
})

onBeforeUnmount(() => {
    // 解除订阅绑定
    PubSub.unsubscribe(changeCollapse);
})

</script>

<style scoped lang="less">
.aside-menu:not(.el-menu--collapse) {
    width: 200px;
}

.aside-menu {
    height: 100%;
    border: none;

    h2 {
        padding: 1em 0;
        color: white;
        font-size: 24px;
        text-align: center;

    }

    .iconfont {
        font-size: 1.2em;
        margin-right: 0.5em;
        margin-left: 15px;
    }
}
</style>
