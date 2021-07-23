
export function createRoute(record, location) {
    let res = []
    // /about/a 需要找到 about 和 about/a 两条记录 不停的向上查找
    // 渲染子路由 要先渲染父路径对应的组件
    if (record) {
        while (record) {
            res.unshift(record) // 向前添加 先渲染父组件
            record = record.parent
        }
    }
    return {
        ...location,
        matched: res
    }
}

function runQuene(queue, interator, cb) {
    function next(index) {
        if (index >= queue.length) {
            return cb() // 一个钩子都没有 或者 所有的钩子都执行完毕 直接调用cb渲染
        } else {
            let hook = queue[index]
            interator(hook, () => {
                next(index + 1)
            })
        }
    }
    next(0)
}

export default class History {
    constructor(router) {
        this.router = router
        this.cb = null
        // 需要将current属性变成响应式的 后续current变化会更新视图
        // this.current = {path:'/',matched:[]}
        this.current = createRoute(null, {
            path: '/'
        })
    }
    // 根据路径进行组件渲染 数据变化 更新视图
    transitionTo(location, onComplete) { // 默认会先执行一次
        // 根据跳转路劲 获取匹配记录
        // route = {path:'/about,matched:[{about的记录},{about的子路由记录}]}
        let route = this.router.match(location)
        let queue = [].concat(this.router.beforeEachHooks)
        const interator = (hook, cb) => {
            hook(route, this.current, cb)
        }
        runQuene(queue, interator, () => {
            this.current = route
            this.cb && this.cb(route) // 这里渲染
            onComplete && onComplete() // cb调用后 hash值变化了 会再次调用transitionTo
        })
    }
    listen(cb) { // 路径变化重新赋值 将this.current变成响应式的数据
        this.cb = cb
    }
}