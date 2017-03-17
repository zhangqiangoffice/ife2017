
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

//显示提示信息
function showTip(elem, type, tip) {
  var parent = elem.parentNode;
  parent.className = type;
  parent.getElementsByTagName('p')[0].innerHTML = tip;
}

//检查数据格式
function checkData(elem) {
  var item = elem.getAttribute('data-item');
  var val = elem.value; 
  var check, className, tip;
  switch (item) {
    case '名称' :
      var len = getByteLen(val);
      check = (len >=4 && len <= 16)
      break
    case '密码' :
      var reg = /^[0-9a-zA-Z]{6,12}$/;
      check = reg.test(val);
      break
    case '密码确认' :
      var p = document.getElementById('password').value;
      check = (val === p);
      break
    case '邮箱' :
      var reg = /^[a-z_0-9.-]{1,64}@([a-z0-9-]{1,200}.){1,5}[a-z]{1,6}$/i;
      check = reg.test(val);
      break
    case '手机' :
      var reg = /^1(3[4-9]|4[7]|5[0-27-9]|7[08]|8[2-478])\\d{8}$/;
      check = reg.test(val);
      break
  }

  if (check) {
    className = 'success';
    tip = (item === '密码确认') ?  '与密码输入一致' : item + '可用';
  } else {
    className = 'danger';
    tip = (item === '密码确认') ?  '与密码输入不一致' : item + '格式错误';
  }
  return [className, tip];

}

//去除空格
function trimSpaces(elem) {
  var val = elem.value;
  elem.value = val.replace(/\s/g, '');
}

//检查是否为空
function isEmpty(elem) {
  var val = elem.value;
  return val === '';
}

//获取字段格式要求
function getRequirement(elem) {
  var item = elem.getAttribute('data-item');
  var tip = '';
  switch (item) {
    case '名称' :
      tip = '必填，长度为4~16个字节' 
      break
    case '密码' :
      tip = '必填，须为6~12个数字或字母' 
      break
    case '密码确认' :
      tip = '必填，必须与密码输入一致' 
      break
    case '邮箱' :
      tip = '必填，正确的邮箱地址' 
      break
    case '手机' :
      tip = '必填，真实的手机号码' 
      break
    default:
      break
  }
  return tip
}

window.onload = function() {
  var inputs = document.getElementsByTagName('input');
  
  //绑定 输入框 获得焦点 事件
  Array.prototype.forEach.call(inputs, function(item, index){
    addEvent(item, 'focus', function(){
      showTip(this, '', getRequirement(this));
    })
  });

  //绑定 输入框 失去焦点 事件
  Array.prototype.forEach.call(inputs, function(element, index){
    addEvent(element, 'blur', function(){
      
      //去除空格
      trimSpaces(this);

      if (isEmpty(this)) {
        var item = this.getAttribute('data-item');
        showTip(this, 'danger', item + '不能为空')
      } else {
        var result = checkData(this);
        showTip(this, result[0], result[1])
      }
    })
  });

  //点击提交按钮
  var btn = document.getElementById('btn');
  addEvent(btn, 'click', function(){
    Array.prototype.forEach.call(inputs, function(element, index){
      element.focus();
      element.blur();
    });

    //如果有6个class='success'说明输入都正确，否则输入有误
    var s = document.querySelectorAll('.success');
    if (s.length < 6 ) {
      alert('输入有误');
    }
  })
}