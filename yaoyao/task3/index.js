
//事件绑定
function addEvent(elem, event, func){
  if(elem.addEventListener){
    elem.addEventListener(event, func, false);
  }else if(elem.attachEvent){
    elem.attachEvent('on' + event, func);
  }
}

//切换学校
function changeSchools(list) {
  var len = list.length;
  var htmlArr = [];
  for (var i = 0; i <len; i++) {
    htmlArr.push('<option>' + list[i] + '</option>');
  }
  document.getElementById('schools').innerHTML = htmlArr.join('');
}

window.onload = function() {
  
  var company = document.getElementById('company');
  var school = document.getElementById('school');
  var radios = document.querySelectorAll('input.radio');
  var schools = [
    ["北京大学", "清华大学", "中央财经大学"],
    ["上海大学", "华东政法大学", "复旦大学", "同济大学"],
    ["南京大学", "金陵大学", "中央大学"]
  ];
  
  // 绑定 radio输入框 获得焦点 事件
  Array.prototype.forEach.call(radios, function(item, index){
    addEvent(item, 'click', function(){
      if ((this.value === "0" && this.checked) || (this.value === "1" && !this.checked) ) {
        company.className = 'hide';
        school.className = '';
      } else {
        company.className = '';
        school.className = 'hide';
      }
    })
  });

  var city = document.getElementById('city');
  addEvent(city, 'change', function(){
    var index = this.selectedIndex;
    changeSchools(schools[index]);
  })

}