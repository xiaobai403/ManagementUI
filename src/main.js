import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/mock/index'
import {reqMenu} from "@/api";
import {useMenu} from "@/store/useMenu";
import {promiseError, responseError} from "@/hook/message/handleMessage";
import {createPinia} from "pinia/dist/pinia";
import {addRoute} from "@/hook/route/addRoutes";


createApp(App).use(router).use(createPinia()).use(ElementPlus).mount('#app')

router.beforeEach(async (to, from, next) => {
    const jwt = localStorage.getItem('jwt')
    const store = useMenu()

    if (to.name === 'login') {
        next()
        return
    }

    /**
     * 判断路由是否存在。
     *  1. 存在。则什么都不做
     *  2. 不存在。
     *      1) 从缓存中读取路由信息，并且添加路由
     *      2) 缓存中没有路由信息，则直接跳转到登陆页面，重新申请缓存
     */
    if (!router.hasRoute("home")) {

        if (jwt === undefined || jwt === null) {
            next({name: "login"})
            return
        }

        try {
            const response = await reqMenu()

            if (response.code === 200) {
                // 设置menu信息
                store.$menu = response.data
                // 动态路由添加
                addRoute(response.data, router)
                next(to.path)
            } else {
                responseError(response)
                next({ name: "home" })
            }

        } catch (e) {
            promiseError(e)
            next({ name: "home" })
        }

    } else {
        // 用户身份已经验证过
        if (to.name === 'login') {
            next({ name: "home" })
        } else {
            next()
        }
    }





})


