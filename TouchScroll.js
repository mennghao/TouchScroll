/**
 * [description]
 * @param  {[type]} window [description]
 * @return {[type]}        [description]
 */
(function (window) {
    "use strict";
    
    var TouchScroll = function () {
        this.opts = null;
        this.len = 0;
        this.cache = { //缓存上一次位置信息
            x : 0
        };
    };
    
    //更改轮播图位置
    var _setPosition = function(obj, x){
        obj.style["-webkit-transform"] = "translate3d(" + x + "px, 0, 0)";
        obj.style["transform"] = "translate3d(" + x + "px, 0, 0)";
    };
    //设置轮播图ICON焦点
    var _setFocusIcon = function(obj, x) {
        obj.dataset.focus = x;
    };
    
    TouchScroll.prototype = {
        
        init : function (opts) {
            
            this.setDefaultOptions(opts);
            this.len = this.opts.Touch.querySelectorAll("li").length;
            
            this.start()
                .handleTouch();
        },
        /*
         *设置默认配置信息
         */
        setDefaultOptions : function (opts) {
            var That = this,
                defaultOptions = {
                    Touch : document.getElementById("box"),
                    TouchIco : document.getElementById("icon"),
                    Width : "300",
                    IsAuto : true,
                    Timer : null,
                    Current : 0,
                    Offset : 3000,
                    Num : 0
                },
                name;

            for (name in opts) {
                if (opts.hasOwnProperty(name)) {
                    defaultOptions[name] = opts[name];
                }
            }

            this.opts = defaultOptions;
        },
        start : function () {
            var That = this,
                $wrap = That.opts.Touch;
            
            _setPosition($wrap, 0);
            
            $wrap.style.width = That.len * 16 + "rem";
            
            That.isAutoPlay();
            
            return That;
        },
        
        isAutoPlay : function () {
            var That = this;
            
            if (typeof That.opts.IsAuto === "undefined" || That.opts.IsAuto === false) {
                return false;
            }
            
            if (!That.opts.Timer) {
                That.opts.Timer = setTimeout(function () {
                    That.autoPlay.call(That);
                }, That.opts.Offset);
            }
        },
        autoPlay : function () {
            var That = this,
                moveX;
            
            That.opts.Num += 1;
            
            _setFocusIcon(That.opts.TouchIco, That.opts.Num);
            
            //当到达最后一张图时重新开始
            if (That.opts.Num == That.len) {
                That.opts.Num = 0;
            }

            moveX = That.opts.Num * That.opts.Width;

            
            _setPosition(That.opts.Touch, -moveX);
            
            
            That.cache.x = -moveX;
            
            clearTimeout(That.opts.Timer);
            
            That.timer = setTimeout(function () {
                That.autoPlay.call(That);
            }, That.opts.Offset);
        },
        handleTouch : function () {
            var That = this,
                $wrap = That.opts.Touch,
                touchStart,
                touchMove,
                touchEnd,
                xy = {
                    x : 0,
                    y : 0
                },
                zz = {
                    x : 0,
                    y : 0
                };
            
            touchStart = function (e) {
                xy.x = e.touches[0].clientX;
                xy.y = e.touches[0].clientY;
                
                if (That.opts.Timer) {
                    clearTimeout(That.opts.Timer);
                }
            };
            
            touchMove = function (e) {
                zz.x = e.touches[0].clientX - xy.x;
                zz.y = e.touches[0].clientY - xy.y;
                console.log(zz.x)
                if (Math.abs(zz.y) < Math.abs(zz.x)) {
                    e.preventDefault();
                    
                    _setPosition($wrap, (That.cache.x + zz.x));

                }

            };
            
            touchEnd = function (e) {
                
                zz.x = e.changedTouches[0].clientX - xy.x;
                zz.y = e.changedTouches[0].clientY - xy.y;
                
                var moveX;
                
                if (Math.abs(zz.y) < Math.abs(zz.x)) { //保证左右滑动
                    e.preventDefault();
                    if (zz.x > 0) { //right
                        
                        if (That.opts.Num > 0) {
                            That.opts.Num -= 1;
                        }
                    } else { //left
                        
                        if (That.opts.Num >= 0 && That.opts.Num < That.len-1) {
                            That.opts.Num += 1;
                        }  
                    }
                    
                    moveX = That.opts.Num * That.opts.Width;
                    
                    _setPosition($wrap, -moveX);
                    _setFocusIcon(That.opts.TouchIco, That.opts.Num);
                    
                    That.cache.x = -moveX;
                }
                
                That.isAutoPlay.call(That);
                
            };
            
            $wrap.addEventListener("touchstart", touchStart, false);
            $wrap.addEventListener("touchmove", touchMove, false);
            $wrap.addEventListener("touchend", touchEnd, false);
        }
    };
    
    window.TouchScroll = TouchScroll;
}(window));