    var index=0,b=0,j,i,c;
    var obox=document.getElementById("box");
    var omenu=document.getElementById("menu");
    var omain=document.getElementById("main");
    var bdshare0=omain.getElementsByClassName("bd-share");
    var fmenu=document.getElementById("menu-f");
    var obord=document.getElementById("bord"),
         share=omain.getElementsByClassName("share"),
        like=omain.getElementsByClassName("like"),
        Tshare=document.getElementById("Tshare"),
        bdboot=document.getElementById("bd-boot"),
        bdsave=omain.getElementsByClassName("bd-save"),
        shoucang=omain.getElementsByClassName("icon-shoucang"),
        num=omain.getElementsByClassName("num"),
        jia=document.getElementById("jia"),
        append=document.getElementById("append");
        var wheight=window.innerHeight;
        var W=screen.availWidth;
        console.log(wheight)



    //  var h=$("#h:eq(0)").text(),
    //      m=$("#m:eq(0)").text(),
    //      sec=$("#sec:eq(0)").text(),
    //      time=$("#main .bd-time:eq(0)");
    //      console.log(time)
    // $(document).ready(function(){
    //    setInterval(function(){

    //       sec++;  console.log("m")
    //       if(sec>=60){
    //         sec=0;
    //         m++;
    //         if(m>=60){
    //           h++;
    //           m=0
    //         }
    //       }
    //    },1000)
    // })
    for(var i=0;i<bdsave.length;i++){
      (function(j){
        var b=0;
         bdsave[j].onclick=function(){
          b++;
          console.log("mm")
         if(b%2==1){
          shoucang[j].style.color="#ff7f66";
          num[j].innerHTML++;
        }else{
          shoucang[j].style.color="#000";
          num[j].innerHTML--;
        }
       }
      })(i);
    }
    for(var n=0;n<like.length;n++){
     (function(j){
         var b=0;
        like[j].onclick=function(){
             b++;
              console.log(b)
             if(b%2==1){
                  like[j].style.color="#ff7f66";
               }else{
                 like[j].style.color="#fff";
        }
       };
     })(n);
    }

    var oTime=omain.getElementsByClassName("minute");
    for(var i=0;i<oTime.length;i++){
      (function(num){
          setInterval(function(){
           oTime[num].innerHTML++;
      },60000);
      })(i);
    }

    omenu.onclick=function(){
        obox.className="box open";

          setTimeout(function(){
           fmenu.style.display="block";
           $("#mask").css('height', wheight);
        },500);
    }
    fmenu.onclick=function(){
        obox.className="box";
        fmenu.style.display="none";
    }

    var Ccolor=new Array("LavenderBlush","skyblue","yellow","pink","white","MediumSlateBlue","Tomato");
      //   for(var i=0;i<=Ccolor.length-1;i++){
      //       if(i>Ccolor.length-1){
      //           i=0;
      //       }
      //       函数内部的变量会改变作用域变成最终值
      //       (function(j){setInterval(function(){
      //      obord.style.borderColor=Ccolor[j];
      //    },2000)
      // })(i)
      // // 闭包
      //   }
    setInterval(function(){
       index++;
       if(index>=Ccolor.length)
        index=0;
       obord.style.borderColor=Ccolor[index];
       }, 1000);
   function bl(){
           b++;
           if(b%2==1){
               Tshare.style.display="block";

                }else{
                 Tshare.style.display="none";
             }
    }

 for( var n=0; n<share.length; n++ ) {
  (function(j){
    share[j].onclick = function(e) {
      var e=e||event;
      e.cancelBubble=true;
      Tshare.style.display="block";
    };
  })(n);//调用时参数
 }
append.onclick=function(e) {
        var e=e||event;
         e.cancelBubble=true;
        jia.style.display="block";
}
document.onclick=function(){
       Tshare.style.display="none";
       jia.style.display="none";
 }
// 发布动态部分
$("#mask2").css('height', wheight);
$("#idea").click(function(){
  $("#mask2").css('display', 'block');
});
$("#close").click(function() {
    $("#mask2").css('display', 'none');
});

var ftlist=$("#footer li a");
var oListLi=$("#List>ul>li");
for(var m=0;m<ftlist.length;m++){
  if(m>ftlist.length){
    m=0;
  }
  (function(j){
    ftlist[j].onclick=function(){
        oListLi[j].style.minHeight=wheight+"px";
        $("#List>ul").css("maxHeight",oListLi[j].offsetHeight+'px');
        $("#footer li a").removeClass('active');
        $("#footer li a").eq(j).addClass('active');
        // console.log(W*j)

         $("#List>ul").css("left", -W*j+'px');
    }
  })(m);
}
// var left;
// function move(obj,itarget){
//     clearInterval(obj.timer);
//     obj.timer=setInterval(function(){
//         var ispeed;
//         var objLeft=obj.offset().left
// console.log(objLeft,itarget)
//         if(Math.abs(objLeft)<Math.abs(itarget)){
//             ispeed=-50;
//         }else{
//             ispeed=50;
//         }
//         console.log(ispeed)
//         left=(obj.offset().left+ispeed);
//         if(Math.abs(left)>Math.abs(itarget)){
//         clearInterval(obj.timer);
//         obj.css('left', itarget+"px");
//         }else{
//             obj.css("left", left+'px');
//         }
//          },30);
// }

$("#out").click(function() {
    $("#Logo").css({'width':W, 'height':wheight,'display':'block'});
    $("#menu-f").css('display', 'none');
});
$("#back2").click(function() {
   $("#Logo").css('display', 'none');
   $("#menu-f").css('display', 'block');
});
$("#my").click(function() {
    $("#self").css({'display':'block',
                     'width':W,
                      'height':wheight});
});
$("#back3").click(function() {
    $("#self").css('display', 'none');
});