import RouterLink from './components/router-link'
import RouterView from './components/router-view'

// 需要将install方法单独的进行拆分

export let _Vue; // 共享Vue 让index.js能拿到

export function install(Vue, optiopns) {
    _Vue = Vue
    /* 
      。所有组件在初始化的时候 都会调用 Vue.extend 方法 会将根组件上的
        options(mian.js 中的new Vue里面的)混合在一起
      。install 的作用就是将routers实例共享给每个组件
        把所有的方法都和组件初始化的时候混合
      。需要将根实例提供的router属性共享给所有子组件
          1.挂原型上 Vue.prototype.router = router 不合理 
             导致平级组件上也会有router属性
          2. 使用mixin 所有子组件初始化的时候都会去调用Vue.extend
    */
    Vue.mixin({
        beforeCreate() { // 每个组件都会重新执行beforeCreate 
            // console.log(this.$options.name)
            // 区分父子关系 先找到父亲 儿子找父亲的属性 孙子找父亲的
            // 获取到每个人的实例 给实例添加属性
            if (this.$options.router) { // 判断是不是在根上
                this._routerRoot = this // 把根实例挂载到_routerRoot上
                this._router = this.$options.router // mian.js 中的router实例
                this._router.init(this) //  只会执行一次router初始化 this -> 根实例
                Vue.util.defineReactive(this, '_route', this._router.history.current) // 变成响应式数据
            } else { // 儿子组件
                // 将根属性全部增加到每个组件上的_routerRoot上
                // 所有组件都可以获取_routerRoot._router获取路由实例
                this._routerRoot = this.$parent && this.$parent._routerRoot
                // 子组件获取router实例 this._routerRoot._router
            }
        }
    })

    Object.defineProperty(Vue.prototype, '$route', {
        get() {
            return this._routerRoot._route // 所有的属性
        }
    })

    Object.defineProperty(Vue.prototype, '$router', {
        get() {
            return this._routerRoot._router // 所有的方法
        }
    })

    Vue.component('router-link', RouterLink)

    Vue.component('router-view', RouterView)
}


