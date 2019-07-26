//蛇对象的属性
function Snake(options) {
  options = options || {};
  //蛇节大小
  this.width = 20;
  this.height = 20;
  //初始蛇数据
  this.body = [
  { x : 3,y : 2, color : 'red'},
  { x : 2,y : 2, color : 'blue'},
  { x : 1,y : 2, color : 'blue'}
  ];
  this.direction = 'right';
}
//蛇对象的方法
//渲染render
Snake.prototype.render = function(map) {
  // 此处有一个function 新开了一个作用域，此处的this 是window
  //防止foEach遍历时找不到snake对象
  var that = this;
  this.body.forEach(function(item) {
    var box = document.createElement('div');
    //记录box的地址，为后面move做准备
    item.address = box;
    map.appendChild(box);
    box.style.position = 'absolute';
    box.style.left = item.x * that.width + 'px';
    box.style.top = item.y * that.height + 'px';
    box.style.width = that.width + 'px';
    box.style.height = that.height + 'px';
    box.style.backgroundColor = item.color;
  });
}
//移动蛇
Snake.prototype.move = function(map) {
  //蛇身移动(后一个移动到前一个的位置)
  
  for(var i= this.body.length - 1; i > 0; i--) {
    this.body[i].x = this.body[i-1].x;
    this.body[i].y = this.body[i-1].y;
    this.body[i].address.style.left = this.body[i-1].address.style.left;
    this.body[i].address.style.top = this.body[i-1].address.style.top;
    }
  switch(this.direction){
    case 'right':
      this.body[0].x += 1;
      if(this.body[0].x >= map.offsetWidth/this.width) {
        break;
      }
      this.body[0].address.style.left = this.body[0].x * this.width + 'px';
      break;
    case 'left':
      this.body[0].x -= 1;
      //超出范围则停止渲染
      if(this.body[0].x < 0) {
        break;
      }
      this.body[0].address.style.left = this.body[0].x * this.width + 'px';
      break;  
    case 'top':
      this.body[0].y -= 1;
      if(this.body[0].y < 0) {
        break;
      }
      this.body[0].address.style.top = this.body[0].y * this.width + 'px';
      break;
    case 'bottom':
      this.body[0].y += 1;
      if(this.body[0].y >= map.offsetHeight/this.height) {
        break;
      }
      this.body[0].address.style.top = this.body[0].y * this.width + 'px';
      break;
  }
}