var map = document.getElementById('map');
//游戏对象
function Game() {
  this.food = new Food();
  this.snake = new Snake();
}
//对象方法：开始游戏
Game.prototype.start = function() {
  //渲染到页面
  this.food.render(map);
  this.snake.render(map);
  //添加键盘操控方向
  changeDir(game);
  //使蛇动起来
  runSnake(game);
}
var game = new Game();
game.start();
//蛇运动函数
function runSnake(game) {
   var timerId = setInterval(function() {
     var newBox = {
       x: game.snake.body[game.snake.body.length-1].x,
       y: game.snake.body[game.snake.body.length-1].y,
     }
    game.snake.move(map);
    var result = eat(game);
    if(result) {
      game.snake.body.push(newBox);
      var box = document.createElement('div');
      newBox.address = box;
      map.appendChild(box);
      box.style.position = 'absolute';
      box.style.left = newBox.x * game.snake.width + 'px';
      box.style.top = newBox.y * game.snake.height + 'px';
      box.style.width = '20px';
      box.style.height = '20px';  
      box.style.backgroundColor = 'blue';
      console.log('123')
    }
    //到达边界时停止进行
    if(game.snake.body[0].x<0 ||
       game.snake.body[0].y< 0 ||
       game.snake.body[0].y>= map.offsetHeight/game.snake.height ||
       game.snake.body[0].x >= map.offsetWidth/game.snake.width) {
      clearInterval(timerId);
      alert('game over');
      location.reload();
    }  
  },200);
}
//蛇改变方向函数
function changeDir(game) {
  document.onkeydown = function(e) {
    e = e || event;
    switch(e.keyCode) {
      case 37:
        //防止一键改变到相反方向运动（有个小bug：可以快速的按两个方向键来达到一键改变到相反方向运动，
        //即当按第一个键时改变了方向，但是蛇还未来得及走就改变到了相反的方向）
        if(game.snake.direction === 'right') return;
        game.snake.direction = 'left';
        break;
      case 38:
        if(game.snake.direction === 'bottom') return;
        game.snake.direction = 'top';
        break;
      case 39:
        if(game.snake.direction === 'left') return;
        game.snake.direction = 'right';
        break;
      case 40:
        if(game.snake.direction === 'top') return;
        game.snake.direction = 'bottom';
        break;        
    }
  }
}
//蛇吃食物函数
//food的大小要和蛇节的大小一致
function eat(game) {
  if(game.snake.body[0].x === game.food.x/game.snake.width &&
     game.snake.body[0].y === game.food.y/game.snake.height) {
      game.food.random(map);
      return true;
  }
  return false;
}