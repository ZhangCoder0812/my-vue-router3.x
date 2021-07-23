import History from './base'
export default class BrowerHistory extends History {
    constructor(router) {
        super(router)
    }
    // 获取当前路路径
    getCurrentLocation() {
        return window.location.pathname
    }
    setupListener() {
        // popState 监控浏览器路径变化 (只有 前进 后退才能被监控)
        window.addEventListener('popstate', () => {
            this.transitionTo(this.getCurrentLocation())
        })
    }
    push(location) {
        // 这里的切换不会被监控到 点击router-link不会
        // 所以手动调用 transitionTo        
        this.transitionTo(location, () => {
            window.history.pushState({}, null, location)
        })
    }
}