//将数据存储到本地，刷新页面不会丢失数据
//任何操作都是先获取本地的数据，再进行更改，存到本地，然后通过本地数据渲染页面
$(function() {
  $("#title").keydown(function(e) {
    //1.将输入的数据存储到本地（localStorage）

    //敲回车时判断输入内容是否合理
    if(e.keyCode === 13) {
      if($(this).val() === '') {
        alert("请输入要完成的内容");
      } else {
        //数据以对象的方式存入数组
        var data = {};
        data.content = $(this).val();
        //done用来判断是done还是todo
        data.done = false;
        var todolist = getData();
        todolist.push(data);
        saveData(todolist);
      //渲染存储的数据
        load();
        //输入内容敲回车后清空输入框内的内容
        $(this).val('');  
      }
    }
  });
  load();
  //改变完成情况
  $("ol,ul").on("click", "input", function() {
    var data = getData();
    //通过兄弟元素a的id属性来与数据匹配
    var index = $(this).siblings('a').attr("id");
    //!important 此处不使用$(this).prop("checked"); 原因见印象笔记
    data[index].done = this.checked;
    saveData(data);
    load();
  });

  //删除事件
  $("ol,ul").on("click", "a", function() {
    var data = getData();
    //通过a的id属性来与数据匹配（考虑此处为什么不适用index()方法）
    //获取自定义属性的值要使用attr()
    data.splice($(this).attr("id"),1);
    saveData(data);
    load();
});

  //函数部分
  //获取数据库函数
  function getData() {
    var data = localStorage.getItem("todolist");
    if(data) {
      // 因为从本地取出的data是字符串，所以需要先转换回数组
      return JSON.parse(data);
    } else {
      return [];
    }
  }
  //添加数据库函数
  function saveData(data) {
    //注意localStorage中存储的内容都是键值对，并且是以字符串的形式存储的
    //所以此处需要将数组data变为字符串
    localStorage.setItem("todolist",JSON.stringify(data));
  }

  //渲染页面函数
function load() {
  //计数器
  var todoCount = 0;
  var doneCount = 0;
  var data = getData();
  //渲染前要先清除页面已经渲染的list
  $('ol,ul').empty();
  $.each(data , function (i, c) {
    if(c.done === false) {
      $("#todolist").prepend("<li><input type= 'checkbox' ></input><p>"+ c.content +"</p><a href='javascript:;' id=" + i + " ></a></li>");
      todoCount++;
    } else {
      $("#donelist").prepend("<li><input type= 'checkbox' checked = 'checked'></input><p>"+ c.content +"</p><a href='javascript:;' id=" + i + " ></a></li>");
      doneCount++;
    }
  });
  $("#todocount").text(todoCount);
  $("#donecount").text(doneCount);

}
})