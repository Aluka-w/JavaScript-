// 类的方式, 便于拓展
// 生成一个发布者
class Emitter {
  constructor () {
    // 缓存列表, 记录订阅者的信息, 名字和回调
    this.list = {}
  }
  // 增加订阅者
  subscribe (event, fn) {
    if (typeof fn !== "function") {
      console.log('你的回调并不是函数')
      return false
    }
    if (!this.list[event]) {
      this.list[event] = []
    }
    this.list[event].push(fn)
  }
  // 发布消息的方法
  emit (event, ...arg) {
    if (event in this.list) {
      this.list[event].forEach(item => {
        item(...arg)
      });
    } else {
      console.log('你并未注册此事件')
      return
    }
  }
  // 取消订阅的方法
  release (event, fn) {
    if (event in this.list) {
      if (fn) {
        let index = this.list[event].findIndex(item => item === fn)
        this.list[event].splice(index, 1)
      } else {
        delete this.list[event]
      }
    }
  }
}
const emitter = new Emitter()

const sub1 = emitter.subscribe('click', (...args) => console.log(args)) // 都在订阅click事件 
const sub2 = emitter.subscribe('click', (...args) => console.log(args))
emitter.emit('click', '1', '2') // 消息一发布, 订阅了的对象直接就可以收到
// sub1.release()