import pullreload from './pullreload';

var pull = new pullreload({
  content:'content',
  ptr:'ptr',
  callback:function(){
    console.log('123');
  }
});

pull.start();
