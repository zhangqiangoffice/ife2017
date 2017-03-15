
//事件绑定
function addEvent(elem, event, func){
  if(elem.addEventListener){
    elem.addEventListener(event, func, false);
  }else if(elem.attachEvent){
    elem.attachEvent('on' + event, func);
  }
}

//取字符串长度
function getByteLen(val) {
  var len = 0;
  for (var i = 0; i < val.length; i++) {
    var a = val.charAt(i);
    if (a.match(/[^\x00-\xff]/ig) != null) {
      len += 2;
    } else {
      len += 1;
    }
  }
  return len;
}

window.onload = function() {
  var btn = document.getElementById('check');
  addEvent(btn, 'click', function(){
    var username = document.getElementById('username');
    var tip = document.getElementById('tip');
    var val = username.value; 
    var className = '';
    var tipStr = '';
    var len = getByteLen(val);
    if (len === 0 ) {
      className = 'danger';
      tipStr = '姓名不得为空'
    } else if (len < 4 || len > 16) {
      className = 'danger';
      tipStr = '姓名需为4~16个字符';
    } else {
      className = 'success';
      tipStr = '名称格式正确';
    }
    tip.innerHTML = tipStr;
    tip.className = className;
    username.className = className;
  })
}