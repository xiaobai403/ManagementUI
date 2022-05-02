<template>
    <router-view v-slot="{ Component }">
        <keep-alive include="Books">
            <component :is="Component"/>
        </keep-alive>
    </router-view>
</template>

<script>
export default {
    name: "Container"
}
</script>

<style scoped>

</style>
