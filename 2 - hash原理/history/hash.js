import History from './base'

function ensureSlash() {
    if (window.location.hash) { // 有兼容问题
        return;
    }
    window.location.hash = '/'
}

// 获取hash值要去除# 因为要做路由跳转 不能带#号
function getHash() {
    return window.location.hash.slice(1)
}

export default class HashHistory extends History {
    constructor(router) {
        super(router)
        // 默认hash模式需要加 #/ 刚开始一加载就需要有#/
        ensureSlash()
    }
    // hash模式的核心功能：监听hash值得变化 
    setupListener() { // 启动监听的方法
        // hash 值就是监控hash的变化
        // 初始化后 先根据路径做一次匹配 后续hash值变化再次匹配
        // 高版本浏览器可以使用 popstate 代替hashchange 
        window.addEventListener('hashchange', () => {
            // 根据当前hash值去匹配对应组件
            this.transitionTo(getHash())
        })
    }
    // 获取当前hash值
    getCurrentLocation() {
        return getHash()
    }
}