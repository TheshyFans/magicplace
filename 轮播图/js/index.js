//获取元素
var box = document.getElementById('box');
var ul = document.querySelector('ul');
var ol = document.querySelector('ol');
var arrAll = box.children[1];
var screen = document.querySelector('.screen');
var left = arrAll.firstElementChild;
var right = arrAll.lastElementChild;
var interval = 4000;

//1.添加跳转按钮
var len = ul.children.length,i = 0;
for(; i < len; i++) {
  var li = document.createElement('li');
  li.index = i;
  ol.appendChild(li);
  li.innerText = i+1;
  ol.firstElementChild.className = 'current';
  li.onclick = liClick;
}
//1.1让被点击的按钮高亮显示
function liClick() {
  i = 0;
  for(; i < len ;i++) {
    if(ol.children[i].className === 'current') {
      ol.children[i].className = 'none';
    }
  }
  this.className = 'current';
  animate( ul, - this.index * screen.offsetWidth);
  index = this.index;   //此处index千万不能加var 原因仔细思考 很有帮助！！！
}

//2.鼠标经过显示左右箭头
box.onmouseover = function() {
  arrAll.style.display = "block";
  clearInterval(timerId);
}
box.onmouseleave = function() {
  arrAll.style.display = 'none';
  timerId = setInterval(function() {
    right.click();
  },interval);
}

//3.鼠标点击箭头切换图片
var index = 0;
var cloneLi = ul.firstElementChild.cloneNode(true);
ul.appendChild(cloneLi);
right.onclick = function() {
  //这一步很妙 每当到达len+1时进行重启index
  if(index === len) {
    index = 0;
    ul.style.left = '0px';  
  }
  index++;
  if(index < len) {
    ol.children[index].click();
  }
  if(index === len) {   //此处不能是= 而是===
    //4.开头和末尾的魔术
    ol.children[len-1].className = 'none';
    ol.firstElementChild.className = 'current';
    animate( ul, - len * screen.offsetWidth);
    }

}
left.onclick = function() {
  index--;
  if(index >= 0) {
    ol.children[index].click();
  }
  if(index === -1) {   //此处不能是= 而是===
    //4.开头和末尾的魔术
    // ol.children[len-1].className = 'none';
    // ol.firstElementChild.className = 'current';
    ul.style.left = - len * screen.offsetWidth + 'px';
    animate( ul, - (len-1) * screen.offsetWidth);
    index = len -1;
    ol.children[len-1].className = 'current';
    ol.firstElementChild.className = 'none';
    }
}
//设置自动播放
var timerId = setInterval(function() {
  right.click();
},interval);
