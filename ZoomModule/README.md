
简单演示！
####
注：图中文本部分可放置需要显示的内容。

![image](https://github.com/htengweb/MyComponents/blob/master/ZoomModule/2017-12-27.gif)

####
```javascript
import React from 'react';
import ZoomModule from './ZoomModule';

class Demo extends React.Component{
  constructor(props){
    super();
  }
  render(){
    const ZoomModuleProps={
      loading:false,//暂时未实现
      aligncenter：false,//内容是否居中
      top:0,//默认居顶部距离
      left:0,//默认居左距离
      width:300,//默认宽度
      height:300,//默认高度
    }
    return(
    <div>
      <ZoomModule {...ZoomModuleProps}>
        <div>
          这里放置内容
        </div>
      </ZoomModule>
    </div>
   );
  }
}
export default Demo;
```
###
-----------------------------------
后续更新中...

