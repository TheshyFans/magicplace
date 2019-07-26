var map1 = document.querySelector('.map');
var arr = [];
for(var i=0; i< 10; i++) {
  var box = new Box();
  box.render(map1);
  arr.push(box);
}
setInterval(random, 1000);   //一个小坑，不是random(),若是random(),则random()在setInterval之前执行，之后每秒执行的时random()的返回值。
random();
function random() {
  arr.forEach(function(item) {
    item.random(map1);
  })
}