// 配置路由信息
import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import User from '../pages/User.vue'
import edit from '../pages/edit.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    // 配置路由规则
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/edit',
            name: 'edit',
            component: edit
        },
        {
            name: 'register',
            path: '/register',
            component: Register
        },
        {
            name: 'user',
            path: '/user',
            component: User
        },
    ]
})
router.beforeEach(function (to, from, next) {
    const token = localStorage.getItem('token')
    const authUrl = ['/user', '/edit']
    if (authUrl.includes(to.path)) {
        if (token) {
            next()
        } else {
            next('/login')
        }
    } else {
        next()
    }
})

export default router