
//事件绑定
function addEvent(elem, event, func){
  if(elem.addEventListener){
    elem.addEventListener(event, func, false);
  }else if(elem.attachEvent){
    elem.attachEvent('on' + event, func);
  }
}

//定义方块对象
function Block() {
  this.target = null,
  this.positionX = 5,
  this.positionY = 5,
  this.direction = 0
}

//渲染页面
Block.prototype.render = function (){
  this.target.className = 'selected direction' + this.direction;
}

//初始渲染方块到页面
Block.prototype.init = function (){
  var tbody = document.getElementById('tbody');
  var tds = tbody.getElementsByTagName('td');
  var index = (this.positionY - 1) * 10 + this.positionX - 1;
  this.target = tds[index];
  this.render();
}

//向右转
Block.prototype.turnRight = function (){
  this.direction = (this.direction + 1) % 4;
  this.render();
}

//向左转
Block.prototype.turnLeft = function (){
  this.direction = (this.direction + 3) % 4;
  this.render();
}

//向后转
Block.prototype.turnBack = function (){
  this.direction = (this.direction + 2) % 4;
  this.render();
}

//向前进
Block.prototype.go = function (){
  switch (this.direction) {
    case 0:
      this.positionY = Math.max(this.positionY - 1, 1)
      break;
    case 1:
      this.positionX = Math.min(this.positionX + 1, 10)
      break;
    case 2:
      this.positionY = Math.min(this.positionY + 1, 10)
      break;
    case 3:
      this.positionX = Math.max(this.positionX - 1, 1)
      break;
    default:
      break;
  }
  this.target.removeAttribute("class");
  this.init();
}


window.onload = function() {
  var order = document.getElementById('order');
  var doBtn = document.getElementById('do');
  var block = new Block();
  block.init();
  

  //对输入框绑定事件
  addEvent(order, 'keyup', function(e){
    var val = this.value;
    
    //小写转大写
    this.value = val.toUpperCase();
    
    //回车触发按钮点击
    if (e.keyCode === 13) {
      doBtn.click();
    }
  })

  //绑定按钮点击事件
  addEvent(doBtn, 'click', function(){
    var val = order.value;
    switch (val) {
      case 'GO':
        block.go();
        break;
      case 'TUN LEF':
        block.turnLeft();
        break;
      case 'TUN RIG':
        block.turnRight();
        break;
      case 'TUN BAC':
        block.turnBack();
        break;
      default:
        order.value = '';
        break;
    }
  })

}