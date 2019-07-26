function Food() {
  //food属性
  this.color = 'green';
  this.width = '20';
  this.height = '20';
  this.x = '100';
  this.y = '100';
}
var _food = null;
//food方法
//render渲染food
Food.prototype.render = function(map) {
  _food = document.createElement('div');
  map.appendChild(_food);
  _food.style.backgroundColor = this.color;
  _food.style.width = this.width + 'px';
  _food.style.height = this.height + 'px';
  _food.style.position = 'absolute';
  _food.style.left = this.x + 'px';
  _food.style.top = this.y + 'px';
}
Food.prototype.random = function(map) {
  this.x = Tool.getRandom(0, (map.offsetWidth/this.width-1)) * this.width;
  this.y = Tool.getRandom(0, (map.offsetHeight/this.height-1)) * this.height;
  _food.style.left = this.x + 'px';
  _food.style.top =  this.y+ 'px';
}
