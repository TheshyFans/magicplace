//创建Box对象
function Box(options) {
  //创建box对象的属性
    //防止因为传入参数而报错
  options = options || {};
  this.backgroundColor = options.backgroundColor || 'blue';
  this.width = options.width || '20'
  this.height = options.height || '20';
  this.x = options.x || 0;
  this.y = options.y || 0;
}
//创建box对象的方法
  //渲染render
  Box.prototype.render = function(map) {
    var div = document.createElement('div');
    map.appendChild(div);
    this.box = div;
    div.style.backgroundColor = this.backgroundColor;
    div.style.width = this.width + 'px';
    div.style.height = this.height + 'px';
    div.style.position = 'absolute';
    div.style.left = this.x + 'px';
    div.style.top = this.y + 'px';
  }
  //随机产生位置random
  Box.prototype.random = function(map) {
    //随机位置
    this.x = Tool.getRandom(0, map.offsetWidth - this.width);
    this.y = Tool.getRandom(0, map.offsetHeight - this.height);
    this.box.style.left = this.x + 'px';
    this.box.style.top = this.y + 'px';
    //随机颜色
    var r = Tool.getRandom(0, 255);
    var g = Tool.getRandom(0, 255);
    var b = Tool.getRandom(0, 255);  
    this.box.style.backgroundColor = 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }