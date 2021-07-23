import { install, _Vue } from './install'
import createMatcher from './create-matcher'
import HashHistory from './history/hash'
import BrowerHistory from './history/history'


/// 路由核心原理就是根据路径 返回对应组件

export default class VueRouter {
    constructor(options) {
        // 根据用户的配置生成一个映射表 稍后跳转时 根据路径找到对应组件来进行渲染
        // 创建一个匹配器(核心：1.路由匹配组件 match  2.动态添加 addRoutes)
        this.matcher = createMatcher(options.routes || [])
        this.beforeEachHooks = [] // 钩子函数
        switch (options.mode) {
            case 'hash':
                this.history = new HashHistory(this)
                break;
            case 'history':
                this.history = new BrowerHistory(this);
                break;
        }
    }
    match(location) {
        return this.matcher.match(location)
    }
    push(location) {
        this.history.push(location)
    }
    beforeEach(fn) {
        this.beforeEachHooks.push(fn)
    }
    // 路由初始化
    init(app) { // app根实例 
        // 初始化后 需先根据路径做一次匹配 后续再根据hash值得变化做匹配
        const history = this.history // history的实例 hash/history
        const setupHashListener = () => {
            history.setupListener() // 监听hash值变化
        }
        // 跳转到哪里 路径跳转完毕后监听hash值的变化
        history.transitionTo(history.getCurrentLocation(), setupHashListener)
        history.listen((route) => { //改变了响应式数据 this.current
            app._route = route
        })
    }
}

VueRouter.install = install