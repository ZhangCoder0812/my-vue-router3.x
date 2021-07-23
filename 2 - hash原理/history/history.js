import History from './base'
export default class BrowerHistory extends History {
    constructor(router) {
        super(router)
    }
    // 获取当前路路径
    getCurrentLocation() {
        return window.location.pathname
    }
}