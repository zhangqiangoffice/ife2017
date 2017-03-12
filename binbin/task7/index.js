//柴智同学的代码非常不错，我受益匪浅，故按照他的作业，又写了一遍。
//这是他的代码出处：https://github.com/dtcz/ifetask/blob/gh-pages/stage02/task22/index.js

function BinaryTree(root){
  this.root = root;
  this.isAnimating = false;
  this.animQueue = [];
}

//前序遍历算法
BinaryTree.prototype.preOrder = function (node){
  if(node){
    this.animQueue.push(node);
    this.preOrder(node.firstElementChild);
    this.preOrder(node.lastElementChild);
  }
}

//中序遍历算法
BinaryTree.prototype.inOrder = function (node){
  if(node){
    this.inOrder(node.firstElementChild);
    this.animQueue.push(node);
    this.inOrder(node.lastElementChild);
  }
}

//后序遍历算法
BinaryTree.prototype.postOrder = function (node){
  if(node){
    this.postOrder(node.firstElementChild);
    this.postOrder(node.lastElementChild);
    this.animQueue.push(node);
  }
}

//遍历动画效果
BinaryTree.prototype.animate = function() {
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
  var btns = document.getElementsByTagName('button');
  Array.prototype.forEach.call(btns, function(item, index){
    addEvent(item, 'click', function(){
      if(tree.isAnimating){
        alert('动画正在进行中，请稍候');
      } else {
        var method = item.getAttribute('data-method')
        tree[method](root);
        tree.animate();
      }
    })
  })
}