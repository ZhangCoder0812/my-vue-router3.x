import createRouteMap from './create-route-map'
import { createRoute } from './history/base'
export default function createMatcher(routes) {

    // 根据用户配置创建一个映射表
    // pathMap结构{/:home记录,/about:about记录} 记录：一条路由信息
    let { pathMap } = createRouteMap(routes)

    // console.log(pathMap)

    function addRoutes(routes) { // 动态添加路由权限
        createRouteMap(routes, pathMap) // 将routes添加到pathMap中
    }

    function match(path) { // 给我个路径 可以匹配路由
        let record = pathMap[path]
        return createRoute(record, {
            path
        })
    }

    return {
        addRoutes,
        match
    }

}