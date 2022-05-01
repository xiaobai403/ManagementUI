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
import {useMenu} from "@/store/useMenu";
import CustomMenuItem from "@/components/CustomMenuItem";
import {useRouter} from "vue-router";


// 添加菜单
const menu = ref([])
const store = useMenu()

/**
 * menu处理函数
 * 注意: 请参考服务器返回的menu.json进行阅读。
 *
 * 我们向菜单分为4类。编号信息存放在 category: xx 中。
 * 例如:
 *            "category": 2,
 *
 * 分类:
 *  0. 菜单组信息（在菜单显示中需要保留）
 *  1. 菜单信息（在菜单显示中需要保留）
 *  2. 架构信息（在菜单显示中不需要保留。该组件中主要保留 router-view 以供子组件填充。具体请见服务器返回的menu.json）
 *  3. 其他组件信息（在菜单显示中不需要保留。该组件有其他组件调用显示，不需要在菜单中显示）
 *
 * @param menuArray
 * @returns {*[]}
 */
const handleMenu = (menuArray) => {
    // 菜单数组，包含最后显示菜单的选项
    const arrayOfMenu = []
    menuArray.forEach(element => {
        switch (element.category) {
            case 1:
                // 普通菜单
                arrayOfMenu.push(element)
                break;
            case 0:
                // 嵌套菜单
                element.children = handleMenu(element.children)
                arrayOfMenu.push(element)
                break;
            case 2:
                // 框架嵌套
                arrayOfMenu.push(...handleMenu(element.children))
                break;
        }
    })

    return arrayOfMenu
}

/**
 * 菜单点击函数
 * @type {Ref<UnwrapRef<boolean>>}
 */
const router = useRouter()

function handleSelect(index) {
    router.push(index)
}

// 声明周期钩子函数

// 侧边栏是否折叠
const isCollapse = ref(false)
const changeCollapse = () => isCollapse.value = !isCollapse.value

onMounted(() => {
    menu.value = handleMenu(store.$menu)

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
