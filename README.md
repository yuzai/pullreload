### pullReload
实现的功能主要是上拉加载，[demo](http://blog.xiaoboma.com/pullreload/),相关原理的简单介绍见[这里](http://www.jianshu.com/p/f44170ba0747);

### 如何使用
#### 方法一
最简单的方法，就是直接从项目中下载src/pullreload.min.js或者src/pullreload.js。
在页面中引入，源代码见index.html

```html
<div id='ptr'></div>
<div id="content">a long list that need to be refresh when pull down</div>
<script src="src/pullreload.min.js"></script>
<script>
  var pull = new pullReload({
    content:'content',//元素id,必须，表示拖动哪个元素进行下拉刷新
    ptr:'ptr',//元素id，必须，指定
    callback:function(){//回调，非必须，默认输出异步的话返回promise，同步无所谓
      //如浏览器不支持promise,则无法执行异步回调，建议配合webpack进行bundle
      console.log('123');
    }
  });
  pull.start();
</script>
```

#### 方法二
配合webpack使用，webpack的参考依赖可以看本仓库中的webpack.config.js，主要是babel-loader和css-loader以及style-loader。
1. npm insall --save pullreload
2. 在文件中这样使用即可
```js
import pullreload from 'pullreload';

var pull = new pullreload({
  content:'content',
  ptr:'ptr',
  callback:function(){
    console.log('123');
  }
});

pull.start();
```

### issues
本人小菜鸟一枚，用原生写了一个简单的上拉加载，也算体验了一把npm,原生js组件的玩法，还有很多不足，欢迎issues
