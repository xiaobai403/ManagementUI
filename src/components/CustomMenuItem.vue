<template>
    <el-menu-item :index="item.url" v-if="item.category === 1">
        <div class="iconfont" :class="item.icon"/>
        <span>{{ item.label }}</span>
    </el-menu-item>

    <el-sub-menu :index="item.name" v-if="item.category === 0">
        <template #title>
            <div class="iconfont" :class="item.icon"/>
            <span>{{ item.label }}</span>
        </template>
        <el-menu-item v-for="i in item.children" :index="i.name" :key="i.url">
            <div class="iconfont" :class="i.icon"/>
            <span>{{ i.label }}</span>
        </el-menu-item>
    </el-sub-menu>
</template>

<script setup>
import {reactive} from "vue";

// eslint-disable-next-line no-undef
const props = defineProps({
    item: Object
})

const item = reactive(props.item)

</script>

<style scoped>
.iconfont {
    font-size: 1.2em;
    margin-right: 0.5em;
    margin-left: 15px;
}
</style>
