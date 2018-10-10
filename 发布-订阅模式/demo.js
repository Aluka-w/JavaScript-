// 发布者
var Event = {
  // 缓存列表
  clientList: {},
  // 订阅者
  listen: function (key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = []
    }
    this.clientList[key].push(fn)
  },
  // 监听者
  trigger: function () {
    let key  = Array.prototype.shift.call(arguments)
    let fns = this.clientList[key]
    if (!fns || fns.length === 0) {
      return false;
    }
    fns.forEach(item => {
      item.apply(this, arguments)
    })
  }
}

// 取消订阅事件
Event.remove = function (key, fn) {
  var fns = this.clientList[key]
  // 没人订阅这个消息
  if (!fns) {
    return false
  }
  // 没有传入具体fn, 那就是取消所有订阅
  if (!fn) {
    fns && (fns.length = 0)
  } else {
    let index = fns.findIndex(item => item === fn)
    fns.splice(index, 1)
  }
}
const installEvent = function (obj) {
  for (const i in Event) {
    obj[i] = Event[i]
  }
} 
let salesOffices = {}
installEvent(salesOffices)

// 订阅消息
// salesOffices.listen('88', fn1 = function (price) {
//   console.log('价格是', price)
// })
// salesOffices.listen('88', fn2 = function (price) {
//   console.log('价格是123', price)
// })
// // 发布
// salesOffices.remove('88', fn1)
// salesOffices.trigger('88', 3000)
