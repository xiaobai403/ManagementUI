<template>
    <el-container class="container">
        <el-aside width="auto" class="aside" style="height: 100%">
            <Aside/>
        </el-aside>
        <el-container>
            <el-header class="header">
                <Header/>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import Aside from "@/components/Aside";
import Header from "@/components/Header";

</script>

<style scoped lang="less">
.container {
    height: 100vh;

    .aside {
        height: 100%;
    }

    .header {
        //background-color: #575c63;
        background-color: black;
    }

}


</style>
