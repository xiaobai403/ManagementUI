<template>
    <router-view v-slot="{ Component }">
        <keep-alive include="Account">
            <component :is="Component"/>
        </keep-alive>
    </router-view>
</template>

<script setup>

</script>

<style scoped>

</style>
