;(function(window){
var isDragging = false;
var isThresholdReached = false;
var popStart = 0;
var threshold = 20;
var isend = true;
var isTop = true;
function getheight(event) {
    if (event.pageY === undefined && event.touches !== undefined) {
      if (event.touches.length <= 0) {
        return false;
      }
      event.pageY = event.touches[event.touches.length - 1].pageY;
    }
    return event.pageY;
};
function movestart(event){
  var top = document.body.scrollTop;
  if(top === 0){
    isTop = true;
    document.addEventListener('mousemove',moving)
    document.addEventListener('touchmove',moving,{passive:false})
    document.addEventListener('mouseup',moveend)
    document.addEventListener('touchend',moveend)
  }else {
    isTop = false;
    document.removeEventListener('mousemove',moving)
    document.removeEventListener('touchmove',moving,{passive:false})
    document.removeEventListener('mouseup',moveend)
    document.removeEventListener('touchend',moveend)
    return ;
  }
  if(!isend){
    return ;
  }
  isDragging = true;
  isThresholdReached = false;
  popStart = getheight(event);
}
function moving(event){
  if(isend && isTop && isDragging){
  event.stopImmediatePropagation();
  var offset = Math.floor(getheight(event) - popStart);
  if(offset>=0){
    event.preventDefault();
    if(offset>threshold){
      isThresholdReached = true;
      ptr.innerHTML = 'loading...';
    }else {
      isThresholdReached = false;
      ptr.innerHTML = '...';
    }
    var height = 41-offset;
    ptr.style.marginTop = '-' + (height>0?height:0) + 'px';
  }
  }
}
function moveend(){
  if(!isend || !isTop){
    return ;
  }
  if(isThresholdReached){
    isend = false;
    ptr.style.marginTop = '0px';
    try{
      callback().then(function(data){
        console.log(data);
        isend = true;
        ptr.style.marginTop = '-41px';
        ptr.innerHTML = '...';
      });
    }catch(e){
      setTimeout(function(){
        isend = true;
        ptr.style.marginTop = '-41px';
        ptr.innerHTML = '...';
      },1000);
    }
  }else {
    ptr.style.marginTop = '-41px';
  }
  isDragging = false;
  isThresholdReached = false;
}
var callback;
window.pullReload = function(options){
  try{
  this.content = document.getElementById(options.content);
  var ptr = options.ptr || 'ptr';
  this.ptr = document.getElementById(ptr);
  var ptr_style = {
    padding:'0px',
    margin:'0px',
    display:'block',
    height:'40px',
    border:'1px solid #000',
    borderTop:'0px',
    borderLeft:'0px',
    borderRight:'0px',
    textAlign:'center',
    lineHeight:'40px',
    fontSize:'30px',
    marginTop:'-41px'
  }
  for(var key in ptr_style){
    this.ptr.style[key] = ptr_style[key];
  }
  callback = options.callback || function(){
    console.log('hello!');
  }
  };
  this.start = function(){
    this.content.addEventListener('mousedown',movestart);
    this.content.addEventListener('touchstart',movestart)
  }
  this.remove = function(){
    this.content.removeEventListener('mousedown',movestart);
    this.content.removeEventListener('touchstart',movestart)
  }
  return this;
}catch(e){
  console.log(e);
  console.log('请在浏览器环境下运行');
}
}
})(window);
