//柴智同学的代码非常不错，我受益匪浅，故按照他的作业，又写了一遍。
//这是他的代码出处：https://github.com/dtcz/ifetask/blob/gh-pages/stage02/task22/index.js

function BinaryTree(root){
  this.root = root;
  this.isAnimating = false;
  this.animQueue = [];
  this.word = '';
  this.selected = false;
}

//检查是否可操作
BinaryTree.prototype.isReady = function (){
  if(this.isAnimating) {
    alert('动画正在进行中，请稍候');
    return false;
  } else {
    return true;
  }
}

//退色，都转为白色
BinaryTree.prototype.white = function() {
  this.selected = false;
  this.root.style.backgroundColor = '#fff';
  var divs = this.root.getElementsByTagName('div');
  Array.prototype.forEach.call(divs, function(item, index){
    item.style.backgroundColor = '#fff';
  });
}

//初始化，绑定单击选择事件
BinaryTree.prototype.init = function(){
  var that = this;
  addEvent(this.root, 'click', function(event) {
    var target = event.target;
    that.white();
    target.style.backgroundColor = 'green';
    that.selected = target;
  })
}

//删除节点
BinaryTree.prototype.remove = function(){
  if (this.selected) {
    var child = this.selected;
    child.parentNode.removeChild(child);
    this.selected = false;
  } else {
    alert('您尚未选择节点！')
  }
}

//插入节点
BinaryTree.prototype.append = function(note) {
  if (this.selected) {
    var div = document.createElement('div');
    var word = document.createTextNode(note);
    div.appendChild(word);
    this.selected.appendChild(div);
  } else {
    alert('您尚未选择节点！')
  }
}

//前序遍历算法
BinaryTree.prototype.preOrder = function (node){
  if(node){
    this.animQueue.push(node);
    var nodes = node.children;
    var len = nodes.length;
    for(var i = 0; i < len; i++){
      this.preOrder(nodes[i])
    }
  }
}

//查询遍历
BinaryTree.prototype.search = function (word){
  this.preOrder(this.root);
  this.word = word;
  this.showResult();
}

//展现查询结果
BinaryTree.prototype.showResult = function(){
  this.white();
  this.isAnimating = true;
  var arr = this.animQueue,
      len = arr.length,
      time = parseInt(document.getElementById('time').value, 10) || 500,
      that = this,
      count = 0;

    time = setInterval(function(){
      arr[Math.max(count - 1, 0)].style.backgroundColor = '#fff';
      arr[Math.min(count++, len - 1)].style.backgroundColor = 'blue';
      if(count > len ){
        clearInterval(time);
        that.animQueue = [];
        arr[len - 1].style.backgroundColor = '#fff';
        that.isAnimating = false;
        alert('没有找到要查询的内容！')
      } else if(arr[count - 1].firstChild.nodeType === 3 && arr[count - 1].firstChild.nodeValue.indexOf(that.word) >= 0){
        clearInterval(time);
        arr[count - 1].style.backgroundColor = 'red';
        that.animQueue = [];
        that.isAnimating = false;
      }
    }, time);
}

//后序遍历算法
BinaryTree.prototype.postOrder = function (node){
  if(node){
    var nodes = node.children;
    var len = nodes.length;
    for(var i = 0; i < len; i++){
      this.postOrder(nodes[i])
    }
    this.animQueue.push(node);
  }
}

//遍历动画效果
BinaryTree.prototype.animate = function() {
  this.white();
  this.isAnimating = true;
  var arr = this.animQueue,
      len = arr.length,
      time = parseInt(document.getElementById('time').value, 10) || 500,
      that = this,
      count = 0;
    time = setInterval(function(){
      arr[Math.max(count - 1, 0)].style.backgroundColor = '#fff';
      arr[Math.min(count++, len - 1)].style.backgroundColor = 'blue';
      if(count > len){
        clearInterval(time);
        that.animQueue = [];
        arr[len - 1].style.backgroundColor = '#fff';
        that.isAnimating = false;
      }
    }, time);
}

function addEvent(elem, event, func){
  if(elem.addEventListener){
    elem.addEventListener(event, func, false);
  }else if(elem.attachEvent){
    elem.attachEvent('on' + event, func);
  }
}

window.onload = function() {
  var root = document.getElementById('root');
  var tree = new BinaryTree(root);
  tree.init();
  var start = document.getElementById('start');
  var btns = start.getElementsByTagName('button');
  
  //绑定排序按钮点击事件
  Array.prototype.forEach.call(btns, function(item, index){
    addEvent(item, 'click', function(){
      if(tree.isReady()){
        var method = item.getAttribute('data-method')
        tree[method](root);
        tree.animate();
      }
    })
  });

  //绑定搜索按钮的点击事件
  var search = document.getElementById('search');
  addEvent(search, 'click', function(){
    if(tree.isReady()){
      var word = document.getElementById('word').value;
      tree.search(word);
    }
  })

  //绑定删除按钮
  var deleteBtn = document.getElementById('delete');
  addEvent(deleteBtn, 'click', function(){
    tree.remove()
  })

  //绑定添加按钮
  var addBtn = document.getElementById('add');
  addEvent(addBtn, 'click', function(){
    var note = document.getElementById('note').value;
    tree.append(note)
  })
}