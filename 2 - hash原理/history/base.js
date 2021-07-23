export default class History {
    constructor(router) {
        this.router = router
    }
    transitionTo(location, cb) { // 默认会先执行一次
        console.log(location)
        cb && cb() // cb调用后 hash值变化了 会再次调用transitionTo
    }
}