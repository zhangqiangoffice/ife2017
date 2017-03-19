
//事件绑定
function addEvent(elem, event, func){
  if(elem.addEventListener){
    elem.addEventListener(event, func, false);
  }else if(elem.attachEvent){
    elem.attachEvent('on' + event, func);
  }
}

//定义方块对象
function Block(target , time) {
  this.target = null,
  this.positionX = 5,
  this.positionY = 5,
  this.direction = 0,
  this.tds = target.getElementsByTagName('td'),
  this.aniNum = 0,
  this.time = time
}

//方块消失并归位
Block.prototype.disappear = function (){
  this.target.removeAttribute("class");
  this.target.style.top = '0px';
  this.target.style.left = '0px';
  this.target.style.transform = 'rotate(0deg)';
}

//初始渲染方块到页面
Block.prototype.init = function (){
  
  //动画全部结束才能渲染
  if (this.aniNum === 0) {
    var index = (this.positionY - 1) * 10 + this.positionX - 1;
    
    //如果存在方块，先隐掉
    if (this.target) {
      this.disappear()
    }
    this.target = this.tds[index];
    this.target.className = 'selected direction' + this.direction;
  }

}

//向右转
Block.prototype.turnRight = function (){
  this.direction = (this.direction + 1) % 4;
  this.rotate('right');
}

//向左转
Block.prototype.turnLeft = function (){
  this.direction = (this.direction + 3) % 4;
  this.rotate('left');
}

//向后转
Block.prototype.turnBack = function (){
  this.direction = (this.direction + 2) % 4;
  this.rotate('back');
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
  if (this.positionX === 1) {
    alert ('已经到棋盘左边界了！');
  } else {
    this.positionX--;
    this.animation('left');
  }
}

//向右移
Block.prototype.transRight = function (){
  if (this.positionX === 10) {
    alert ('已经到棋盘右边界了！');
  } else {
    this.positionX++;
    this.animation('right');
  }
}

//向上移
Block.prototype.transTop = function (){
  if (this.positionY === 1) {
    alert ('已经到棋盘上边界了！');
  } else {
    this.positionY--;
    this.animation('up');
  }
  
}

//向下移
Block.prototype.transBottom = function (){
  if (this.positionY === 10) {
    alert('已经到棋盘下边界了！');
  } else {
    this.positionY++;
    this.animation('down');
  }
}

//向左转向并移动
Block.prototype.moveLeft = function (){
  switch (this.direction) {
    case 0:
      this.rotate('left');
      break;
    case 1:
      this.rotate('back');
      break;
    case 2:
      this.rotate('right');
      break;
    default:
      break;
  }
  this.direction = 3;
  this.transLeft();
}

//向右转向并移动
Block.prototype.moveRight = function (){
  switch (this.direction) {
    case 0:
      this.rotate('right');
      break;
    case 2:
      this.rotate('left');
      break;
    case 3:
      this.rotate('back');
      break;
    default:
      break;
  }
  this.direction = 1;
  this.transRight();
}

//向上转向并移动
Block.prototype.moveTop = function (){
  switch (this.direction) {
    case 1:
      this.rotate('left');
      break;
    case 2:
      this.rotate('back');
      break;
    case 3:
      this.rotate('right');
      break;
    default:
      break;
  }
  this.direction = 0;
  this.transTop();
}

//向下转向并移动
Block.prototype.moveBottom = function (){
  switch (this.direction) {
    case 0:
      this.rotate('back');
      break;
    case 1:
      this.rotate('right');
      break;
    case 3:
      this.rotate('left');
      break;
    default:
      break;
  }
  this.direction = 2;
  this.transBottom();
}

//方块直线动画
Block.prototype.animation = function (orientation){
  var that = this;
  var increment = (40 * 20) / (this.time * 1000); 
  var j = 0;
  var dis = 0;
  var attr = '';
  switch (orientation) {
    case 'down' :
      dis = increment;
      attr = 'top';
      break;
    case 'up' :
      dis = -increment;
      attr = 'top';
      break;
    case 'left' :
      dis = -increment;
      attr = 'left';
      break;
    case 'right' :
      dis = increment;
      attr = 'left';
      break;
    default:
      break;

  }
  this.aniNum++;
  console.time('timerAnimation');
  var timer = setInterval(function(){
    j += dis;
    that.target.style[attr] = j + 'px';
    if (Math.abs(j) >= 40) {
      clearInterval(timer);
      console.timeEnd('timerAnimation');
      that.aniNum--;
      that.init();
    }
  }, 20);
}

//方块旋转动画
Block.prototype.rotate = function(orientation) {
  var that = this;
  var j = 0;
  var deg = 0;
  var final = 90;
  switch (orientation) {
    case 'right' :
      deg = (90 * 20) / (this.time * 1000);
      final = 90;
      break;
    case 'left' :
      deg = -(90 * 20) / (this.time * 1000);
      final = 90;
      break;
    case 'back' :
      deg = (180 * 20) / (this.time * 1000);
      final = 180;
      break;
    default:
      break;
  }
  this.aniNum++;
  console.time('timerRotate');
  var timer = setInterval(function(){
    j += deg;
    that.target.style.transform = 'rotate(' + j + 'deg)';
    if (Math.abs(j) >= final) {
      clearInterval(timer);
      console.timeEnd('timerRotate');
      that.aniNum--;
      that.init();
    }
  }, 20);
}


window.onload = function() {
  var order = document.getElementById('order');
  var doBtn = document.getElementById('do');
  var tbody = document.getElementById('tbody');
  var block = new Block(tbody, 0.5);
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
      case 'A' :
        block.rotate()
        break;
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