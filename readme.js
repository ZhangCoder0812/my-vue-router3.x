/*

  1. Vue.use(plugin,options){
        plugin.install(this,options)
     }

     Vue.use 使用插件 必须有个install方法
     install方法第一个参数是 this -> Vue 目的是保持Vue版本统一 兼容
                第二个参数是 其他配置项

  2. 前端路由实现方式 [spa应用 路径切换重新渲染组件 不刷新页面]
     hash模式：类似锚点 锚点后面没有 / 可以区分是锚点还是hash
            - 控制台 -> window.location.hash ='/a'
                     -> window.location.hash ='/b'
              发现路径变了 但页面并没有刷新 那么就可以监控hash的变化控制
              组件显示实现路由效果 winow.addEventListener('hashchange')
            - 特点：丑 有#号 ，但兼容性好
     history模式
            - 控制台 -> window.history.pushState({},null,'/a')
                    -> window.history.pushState({},null,'/b')
                    pushState(数据,标题,路径)
              路径变了 页面没刷新 可以监控的改变  pushState / popstate 监听浏览器历史记录变化
              监听前进/后退事件
            - 特点：这个路径是自己写的 服务器可能不存在 回车刷新出现404
                   这样会发送请求 所以需要服务端支持.
                    webpack解决了这个问题 history-fallback 插件

  3. import 语法是动态的 导入的变量会动态改变
     import 有声明效果 导入的变量不能修改
     拿到的是变量 不是地址  或者称为接口 通过接口获取值

    export let a = 1;
    setInterval(()=> a++ ,1000)
    这样外面 import { a } from './xx.js'
    拿到的a也是一直在变的 因为导出的不是一个引用地址 并且import是动态导入的
    而是一个接口 这就是为什么下面的写法不对
    错误写法 导出的并不是一个对象 是一个接口

    export  {
        a:1,
        b:2
    }
    正确写法：这样写并不是因为简写的原因
        let a = 1;
        let b = 2;
        export {
            a,
            b
        }
    或者
        export default {
            a:1,
            b:2
        }
*/