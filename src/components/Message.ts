import { createVNode, render } from 'vue'
import xtsMessage from './Message.vue'

const div = document.createElement('div')
// div.setAttribute('class', 'w-100px h-100px bg-hex-b2a8bb')

document.body.appendChild(div)

let time: any = null
export const Message = ({ text = '', type = 'warn' }) => {
  // 3. 创建虚拟dom          (组件对象， props)
  const vnode = createVNode(xtsMessage, { text, type })
  // 4. 把虚拟dom渲染到div
  render(vnode, div)

  // 5. 设置定时器清空
  clearTimeout(time)
  time = setTimeout(() => {
    render(null, div)
  }, 2000)
}

export default Message
