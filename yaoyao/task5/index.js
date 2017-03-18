
//事件绑定
function addEvent(elem, event, func){
  if(elem.addEventListener){
    elem.addEventListener(event, func, false);
  }else if(elem.attachEvent){
    elem.attachEvent('on' + event, func);
  }
}

//定义方块对象
function Block(target) {
  this.target = null,
  this.positionX = 5,
  this.positionY = 5,
  this.direction = 0,
  this.tds = target.getElementsByTagName('td')
}

//方块消失
Block.prototype.disappear = function (){
  this.target.removeAttribute("class");
}

//渲染页面
Block.prototype.render = function (){
  this.target.className = 'selected direction' + this.direction;
}

//初始渲染方块到页面
Block.prototype.init = function (){
  var index = (this.positionY - 1) * 10 + this.positionX - 1;
  
  //如果存在方块，先隐掉
  if (this.target) {
    this.disappear()
  }
  this.target = this.tds[index];
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
      this.transTop();
      break;
    case 1:
      this.transRight();
      break;
    case 2:
      this.transBottom();
      break;
    case 3:
      this.transLeft();
      break;
    default:
      break;
  }
}

//向左移
Block.prototype.transLeft = function (){
  this.positionX = Math.max(this.positionX - 1, 1)
  this.init();
}

//向右移
Block.prototype.transRight = function (){
  this.positionX = Math.min(this.positionX + 1, 10)
  this.init();
}

//向上移
Block.prototype.transTop = function (){
  this.positionY = Math.max(this.positionY - 1, 1)
  this.init();
}

//向下移
Block.prototype.transBottom = function (){
  this.positionY = Math.min(this.positionY + 1, 10)
  this.init();
}

//向左转向并移动
Block.prototype.moveLeft = function (){
  this.direction = 3;
  this.transLeft();
}

//向右转向并移动
Block.prototype.moveRight = function (){
  this.direction = 1;
  this.transRight();
}

//向上转向并移动
Block.prototype.moveTop = function (){
  this.direction = 0;
  this.transTop();
}

//向下转向并移动
Block.prototype.moveBottom = function (){
  this.direction = 2;
  this.transBottom();
}


window.onload = function() {
  var order = document.getElementById('order');
  var doBtn = document.getElementById('do');
  var tbody = document.getElementById('tbody');
  var block = new Block(tbody);
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
      case 'TRA LEF':
        block.transLeft();
        break;
      case 'TRA TOP':
        block.transTop();
        break;
      case 'TRA RIG':
        block.transRight();
        break;
      case 'TRA BOT':
        block.transBottom();
        break;
      case 'MOV LEF':
        block.moveLeft();
        break;
      case 'MOV TOP':
        block.moveTop();
        break;
      case 'MOV RIG':
        block.moveRight();
        break;
      case 'MOV BOT':
        block.moveBottom();
        break;
      default:
        order.value = '';
        break;
    }
  })

}