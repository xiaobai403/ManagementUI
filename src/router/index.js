import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/login.html',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '@/components/Login')
    },
    {
        path: '/main',
        name: 'main',
        component: () => import(/* webpackChunkName: "Main" */ '@/components/Main'),
        children: [
            {
                path: '/test.html',
                name: 'test',
                component: () => import(/* webpackChunkName: "test" */ '@/views/Test')
            },
            {
                path: '/test/one.html',
                name: 'testOne',
                component: () => import(/* webpackChunkName: "test" */ '@/views/Test/One')
            },

        ]
    }


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
