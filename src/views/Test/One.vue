<template>
    <div class="container">
        <video autoplay  class="video" ref="videoRef"></video>
        <canvas hidden ref="canvasRef" width="640" height="480"></canvas>

        <button @click="openCamera">打开摄像头</button>
        <button @click="closeCamera">关闭摄像头</button>
        <button @click="photograph">拍摄</button>

        <img v-for="i in pics" :key="i.name" :src="i.src">

    </div>

</template>

<script setup>

import {ref} from "vue";
import { nanoid } from 'nanoid'


const videoRef = ref(null)
const canvasRef = ref(null)

const pics = ref([])

const config = {
    video: {
        width: {
            min: 1280,
            ideal: 1920,
            max: 2560,
        },
        height: {
            min: 720,
            ideal: 1080,
            max: 1440,
        },
    },
}

const openCamera = () => {
    // H5调用电脑摄像头API
    navigator.mediaDevices.getUserMedia(config)
        .then(success => {
            // 摄像头开启成功
            videoRef.value.srcObject = success
            // 实时拍照效果
            videoRef.value.play()
        })
        .catch(error => {
            alert("摄像头不可用，请检查摄像头状态以及系统权限")
            console.log(error)
        })
}

const closeCamera = () => {
    if (!videoRef.value.srcObject) {
        // this.dialogCamera = false
        return
    }
    const stream = videoRef.value.srcObject
    const tracks = stream.getTracks()
    tracks.forEach(track => {
        track.stop()
    })
    videoRef.value.srcObject = null
}

// 拍照
const photograph = () => {
    const ctx = canvasRef.value.getContext('2d')
    // 把当前视频帧内容渲染到canvas上
    ctx.drawImage(videoRef.value, 0, 0, 640, 480)
    // 转base64格式、图片格式转换、图片质量压缩
    const imgBase64 = canvasRef.value.toDataURL('image/jpeg', 0.7)

    pics.value.push({
        name: nanoid(),
        src: imgBase64
    })

    // 由字节转换为KB 判断大小
    const str = imgBase64.replace('data:image/jpeg;base64,', '')
    const strLength = str.length
    const fileLength = parseInt(strLength - (strLength / 8) * 2)
    // 图片尺寸  用于判断
    const size = (fileLength / 1024).toFixed(2)
    console.log(size)

    // 上传拍照信息  调用接口上传图片 .........

    // 保存到本地
    // this.dialogCamera = false
    // let ADOM = document.createElement('a')
    // ADOM.href = this.headImgSrc
    // ADOM.download = new Date().getTime() + '.jpeg'
    // ADOM.click()
}



</script>

<style scoped lang="less">
.container {
    .video {
        height: 500px;
        width: 500px;

    }
}



</style>
