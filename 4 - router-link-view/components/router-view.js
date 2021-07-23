export default {
    functional: true,// 函数式组件 节省性能 缺陷就是没有实例
    name: 'router-view',
    render(h, { data, parent }) {
        // 函数式组件 这里面没有this
        let route = parent.$route;
        let depth = 0
        let records = route.matched
        data.routerView = true // 渲染 router-view 时标记他是一个 routerView
        // 看之前渲染过几个 router-view 先父后子 
        // $vnode 组件的虚拟节点 $_vnode组件渲染后的结果
        while (parent) {
            if (parent.$vnode && parent.$vnode.data.routerView) {
                depth++
            }
            parent = parent.$parent
        }
        let record = records[depth]
        if (!record) {
            return h()
        }
        return h(records[depth].component, data)
    }
}