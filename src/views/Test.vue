<template>
    <div>
        Test
    </div>

</template>

<script setup>
import {useRouter} from "vue-router";
import {onMounted} from "vue";

const router = useRouter()

onMounted(() => {
    console.log(router.getRoutes())
})
</script>

<style scoped>

</style>
