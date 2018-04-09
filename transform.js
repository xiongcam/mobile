setRem();
window.addEventListener("orientationchange", setRem);
// 监测横屏
window.addEventListener("resize", setRem);
function setRem() {
    var html = document.querySelector("html");
    var width = html.getBoundingClientRect().width;
    html.style.fontSize = width / 16 + "px";
    // 把屏幕分为16份  根据不同设备改变大小
}
function transform(obj,attr,val){
    if(!obj.transform){
        obj.transform={};
    }
    if(arguments.length>2){
        // 设置值
        obj.transform[attr]=val;
        var sval="";
        for(var s in obj.transform){
            switch(s){
                case "translateX":
                case "translateY":
                case "translateZ":
                    sval+=s+"("+obj.transform[s]+"px)";
                    // sval=translateY(60px);
                    break;
                case "rotate":
                case "skewY":
                case "skewX":
                    sval+=s+"("+obj.transform[s]+"deg)";
                    break;
                case "scale":
                case "scaleX":
                case "scaleY":
                    sval+=s+"("+obj.transform[s]+")";
                    break;
            }
        }
        obj.style.transform=obj.style.WebkitTransform=sval;
    }else{
        // 获取值
        val=obj.transform[attr];
        if(typeof val=="undefined"){
            if(attr=="scale"||attr=="scaleX"||attr=="scaleY"){
                val=1;
            }else{
                val=0;
            }
        }
        return val;
    }
}
function ScrollMove(wrap,scroll,scrollBarB){
    var minY=wrap.clientHeight-scroll.offsetHeight;
    var startPoint=0;
    var startY=0;
    var nowTime=0;
    var lastTime=0;
    var disTime=0;
    var lastPoint=0;
    var dis=0;
    var force=1;
    var isMove=true;
    var isFirst=true;
    // 帧动画
    var Tween = {
        easeOut: function(t, b, c, d){
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        backOut: function(t, b, c, d, s){
            if (typeof s == 'undefined') {
                s = 1.70158;
            }
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        }
    }

    wrap.addEventListener("touchstart",function(e){
        // scroll.style.transition="none";
        // 点击时会直接跳到目标点
        minY=wrap.clientHeight-scroll.offsetHeight;
        // 增加内容重新计算高度
        clearInterval(scroll.Move);
        startPoint={pageX:e.changedTouches[0].pageX,pageY:e.changedTouches[0].pageY};
        // 取值，直接写e.changedTouches[0]为取址，部分设备会出错
        lastTime=new Date().getTime();
        // 获取时间戳
        nowTime=0;
        disTime=0;
        dis=0;
        lastPoint=startPoint.pageY;
        isMove=true;
        isFirst=true;
        startY=transform(scroll,"translateY");
        if(scrollBarB&&scrollBarB.start){
            scrollBarB.start();
        }
    });
    wrap.addEventListener("touchmove",function(e){
        var nowPoint=e.changedTouches[0];
        var disY=nowPoint.pageY-startPoint.pageY;
        var disX=nowPoint.pageX-startPoint.pageX;
        var top=startY+disY;
        // 防止转变方向带来的移动
        if(!isMove){
            return;
            // 直接返回，不再执行下面
        }
        if(isFirst){
            isFirst=false;
            if(Math.abs(disY)<Math.abs(disX)){
                isMove=false;
                return;
            }
        }
        scroll.style.transition="none";//console.log(minY)
        // 超出制造摩擦拉力
        if(top>0){
            force=1-top/wrap.clientHeight;
            top=parseInt(top*force);
        }
        if(top<minY){//console.log(top)
            var over=minY-top;

            force=1-over/wrap.clientHeight;
            top=minY-parseInt(over*force);
        }
        nowTime=new Date().getTime();
        disTime=nowTime-lastTime;
        dis=nowPoint.pageY-startPoint.pageY;
        lastTime=nowTime;
        lastPoint=nowPoint.pageY;
        transform(scroll,"translateY",top);
        if(scrollBarB&&scrollBarB.move){
            scrollBarB.move();
        }

    });
    wrap.addEventListener("touchend",function(e){
        var speed=(dis/disTime)*30;
        // 根据滑动的时间计算缓冲距离
        speed=isNaN(speed)?0:speed;
        // 任何数除以0都为NaN，没有滑动disTime为0
        var top=transform(scroll,"translateY");
        // var type = "cubic-bezier(.34,.92,.58,.9)";
        // 贝塞尔曲线
        var type="easeOut";
        var target=top+speed;
        // 限制出界回弹
        if(target>0){
            target=0;
            type="backOut";
            // type ="cubic-bezier(.08,1.44,.6,1.46)";
        }
        if(target<minY){
            target=minY;
            type="backOut";
            // type ="cubic-bezier(.08,1.44,.6,1.46)";
        }
        console.log(speed)
        // scroll.style.transition=".5s "+type;
        // transform(scroll,"translateY",target);
        Move(target,type);
        if(scrollBarB&&scrollBarB.over){
            scrollBarB.over();
        }
    });
    function Move(target,type){
        var t=0;
        var b=transform(scroll,"translateY");
        var c=target-b;
        var d=500/20;
        clearInterval(scroll.Move);
        scroll.Move=setInterval(function(){
            t++;
            if(t>d){
                clearInterval(scroll.Move);
                if(scrollBarB&&scrollBarB.end){
                    scrollBarB.end();
                }
            }else{
                var top=Tween[type](t,b,c,d);
                transform(scroll,"translateY",top);
                if(scrollBarB&&scrollBarB.move){
                    scrollBarB.move();
                }
            }
        },20);
    }

}
