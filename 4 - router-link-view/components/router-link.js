export default {
    name: 'router-link',
    props: {
        to: {
            type: String,
            required: true
        },
        tag: {
            type: String,
            default: 'a',
        }
    },
    render(h) { // h 即 createElement 即 _c
        // return h(this.tag, {}, this.$slots.default)
        let tag = this.tag // 渲染成什么标签
        let to = this.to  // 跳转到哪里
        return ( /* vue中jsx标签可以是变量 */
            <tag onClick={
                () => this.$router.push(to)
            }>
                {this.$slots.default} {/* 显示的内容 */}
            </tag>
        )
    }
}