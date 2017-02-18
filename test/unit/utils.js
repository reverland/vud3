// adapt from https://github.com/ElemeFE/element/blob/dev/test/unit/util.js
import Vue from 'vue'

let id = 0

const createElm = function () {
  const elm = document.createElement('div')

  elm.id = 'app' + ++id
  document.body.appendChild(elm)

  return elm
}

export const destroyVM = function (vm) {
  vm.$el &&
  vm.$el.parentNode &&
  vm.$el.parentNode.removeChild(vm.$el);
};

export const triggerEvent = function (elm, name, ...opts) {
  let eventName

  if (/^mouse|click/.test(name)) {
    eventName = 'MouseEvents'
  } else if (/^key/.test(name)) {
    eventName = 'KeyboardEvent'
  } else {
    eventName = 'HTMLEvents'
  }
  const evt = document.createEvent(eventName)

  evt.initEvent(name, ...opts)
  elm.dispatchEvent
    ? elm.dispatchEvent(evt)
    : elm.fireEvent('on' + name, evt)

  return elm
}

export const createVue = function (Compo, mounted = true) {
  const elm = createElm()

  return new Vue(Compo).$mount(mounted === false ? null : elm)
}
