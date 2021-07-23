import { install, _Vue } from './install'

console.log(_Vue)
// import 语法是动态的 导入的变量会动态改变 
// import 有声明效果 导入的变量不能修改
// 拿到的是变量 不是地址  或者称为接口 通过接口获取值 

export default class VueRouter {
    constructor(optiopns) {

    }
}


VueRouter.install = install