// 处理firstElementChild的兼容性问题
function getFirstElementChild(parent) {
  // 如果当前浏览器 支持firstElementChild
  if (parent.firstElementChild) {
    return parent.firstElementChild;
  }

  var node, nodes = parent.childNodes, i = 0;
  while (node = nodes[i++]) {
      if (node.nodeType === 1) {
          return node;
      }
  }
  return null;
}

// 处理nextElementSibling的兼容性问题
function getNextElementSibling(sibling) {
  if(sibling.nextElementSibling)
    return sibling.nextElementSibling;
  var e = sibling.nextSibling;
  while(e && e.nodeType !== 1)
    e = e.nextSibling;
  return e;
}

//随机数函数
//得到一个两数之间的随机整数
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}

//注册事件，处理兼容性问题
function addEventListener(element, eventName, callback) {
  if(element.addEventListener)
  element.addEventListener(eventName, callback, false);
  //(IE9以前不支持addEventListener)
  else if (element.attachEvent)
  element.attachEvent('on' + eventName, callback);
  //有的古老的版本以上两种都不支持
  else {
    element[ 'on' + eventName] = callback;
  }
}

//获取页面滚动出去的距离，处理兼容性问题
//chrome和IE11存在兼容性问题
function getScroll() {
  return {
    scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
    scrollLeft: document.documentElement.scrollLeft || document.body.scrollLeft
  }
}
//获取鼠标在页面中的坐标，处理兼容性问题
function getPage(e) {
  return {
    pageX: e.clientX + getScroll().scrollLeft ,
    pageY: e.clientY + getScroll().scrollTop 
  }
}