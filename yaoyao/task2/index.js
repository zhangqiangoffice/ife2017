
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

window.onload = function() {
  var inputs = document.getElementsByTagName('input');
  
  //绑定 输入框 获得焦点 事件
  Array.prototype.forEach.call(inputs, function(item, index){
    addEvent(item, 'focus', function(){
      var item = this.getAttribute('data-item');
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
      }
      showTip(this, '', tip);
    })
  });

  //绑定 输入框 失去焦点 事件
  Array.prototype.forEach.call(inputs, function(item, index){
    addEvent(item, 'blur', function(){
      var item = this.getAttribute('data-item');
      var tip = '';
      var val = this.value; 

      //去除空格
      val = val.replace(/\s/g, '');
      this.value = val;

      //判断长度
      var len = getByteLen(val);

      if (len === 0) {
        tip = item + '不能为空';
        showTip(this, 'danger', tip)
      } else {
        var check = true;
        switch (item) {
          case '名称' :
            if (len < 4 || len > 16) {
              check = false
            }
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
          showTip(this, 'success', item + '可用')
        } else {
          showTip(this, 'danger', item + '格式错误')
        }

      }
    })
  });

  var btn = document.getElementById('btn');
  addEvent(btn, 'click', function(){
    console.log(123);
  })
}