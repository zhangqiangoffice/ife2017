
//事件绑定
function addEvent(elem, event, func){
  if(elem.addEventListener){
    elem.addEventListener(event, func, false);
  }else if(elem.attachEvent){
    elem.attachEvent('on' + event, func);
  }
}

//定义Block对象
function Block() {
  this.positionX = 5,
  this.positionY = 5,
  this.direction = 0,
}

window.onload = function() {
  var order = document.getElementById('order');
  var doBtn = document.getElementById('do');

  addEvent(order, 'keyup', function(e){
    var val = this.value;
    this.value = val.toUpperCase();
    if (e.keyCode === 13) {
      doBtn.click();
    }
  })

  addEvent(doBtn, 'click', function(){
    var val = order.value;
  })

}