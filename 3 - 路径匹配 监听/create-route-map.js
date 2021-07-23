/* 
       一个参数时是初始化 2个参数时是动态添加路由
       oldPathMap 动态添加路由时用到
    */

export default function createRouteMap(routes, oldPathMap) {
    let pathMap = oldPathMap || {}

    routes.forEach(route => {
        addRouteRecord(route, pathMap, null) // null 没有父路径
    });

    return {
        pathMap
    }
}

function addRouteRecord(route, pathMap, parent) { // pathMap ={路径:记录}
    //要判断 儿子路径不能以 / 开头 ，否则不拼接 当做一级路由
    let path = parent ? `${parent.path}/${route.path}` : route.path
    let record = { // 有很多属性 这里核心属性是 path component
        path,
        parent,// 父记录
        component: route.component,
        name: route.name,
        props: route.props,
        meta: route.meta
    }
    if (!pathMap[path]) {
        pathMap[path] = record
    }
    if (route.children) { // 有children 递归遍历
        route.children.forEach(childRoute => {
            addRouteRecord(childRoute, pathMap, record)
        });
    }
}