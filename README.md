# TouchScroll
一个移动端的轮播图组件TouchScroll.js
##简介
因为是在移动端使用，所以大胆的将过渡效果用CSS3来实现了，所以整个js文件都精简了不少。

一定要使用rem布局~
#如何使用
##HTML
```HTML
<div id="wrap">
    <ul id="box">
        <li class="item">
            <a href="javascript:;">
                <img src="">
            </a>
        </li>
        <li class="item">
            <a href="javascript:;">
                <img src="">
            </a>
        </li>
        <li class="item">
            <a href="javascript:;">
                <img src="">
            </a>
        </li>
        <li class="item">
            <a href="javascript:;">
                <img src="">
            </a>
        </li>
    </ul>
    <ul id="icon" data-focus="0">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
</div>
```
##CSS
```CSS
#wrap{
    width: 16rem;
    height: 150px;
    overflow: hidden;
    position: relative;
}
#box{
    position: absolute;
    width: 100%;
    height: 150px;
    overflow: hidden;
    -webkit-transition: all .2s linear;
    -moz-transition: all .2s linear;
    -ms-transition: all .2s linear;
    -o-transition: all .2s linear;
    transition: all .2s linear;
}
.item{
    float: left;
    width: 16rem;
    height: 150px;
}
.item img{
    width: 100%;
    
}
#icon {
    height: 16px;
    bottom: 10%;
    left: 50%;
    margin-left: -75px;
    width: 150px;
    position: absolute;
    text-align: center;
}
#icon li{
    cursor: pointer;
    height: 6px;
    width: 6px;
    margin-right: 2px;
    display: inline-block;
    background-color: #fff;
    border-radius: 50%;
}
#icon[data-focus="0"] li:first-child{
    background-color: #4ab56a;
}
#icon[data-focus="1"] li:nth-child(2){
    background-color: #4ab56a;
}
#icon[data-focus="2"] li:nth-child(3){
    background-color: #4ab56a;
}
#icon[data-focus="3"] li:nth-child(4){
    background-color: #4ab56a;
}
#icon[data-focus="4"] li:nth-child(5){
    background-color: #4ab56a;
}
#icon[data-focus="5"] li:nth-child(6){
    background-color: #4ab56a;
}
#icon[data-focus="6"] li:nth-child(7){
    background-color: #4ab56a;
}
```
##JavaScript调用方法
```JavaScript
var touchScroll = new TouchScroll();
    
    touchScroll.init({
        Touch : document.getElementById("box"),
        Width : window.screen.width,
        //还有更多的配置可选
    });
```