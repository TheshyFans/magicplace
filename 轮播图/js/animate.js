function animate(element,target, callback) {
  //设置新选择器前先判断之前是否有正在进行的选择器,如果有则清空
  if(element.timerId) {
    clearInterval(element.timerId);
  }
  //设置计时器
  element.timerId = setInterval(function() {
  var current = element.offsetLeft;
  if(current < target)
  current += 10;
  if(current > target)
  current += -10;
  if(Math.abs(current - target) <= 10) {        //这一步的思想很关键 详细内容见https://www.bilibili.com/video/av17443414/?p=99
      current = target;
      element.style.left = current + 'px';
      clearInterval(element.timerId);
      if(callback) {
        callback();
      }
      return;
  }
   element.style.left = current + 'px';
  },20);
}