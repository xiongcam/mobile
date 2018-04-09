var omain=document.getElementById("main"),
    omask=document.getElementById("mask"),
    oimg=omain.getElementsByTagName("div"),
    mimg=omask.getElementsByTagName("img"),
    d=0;
    var wheight=window.innerHeight;
  for(var n=0;n<oimg.length;n++){
     (function(j){
         var b=0;
        oimg[j].onclick=function(){
            $("#mask").css('height', wheight);
         omask.style.display="block";
         mimg[j].style.display="block";
         omask.onclick=function(){
            omask.style.display="none";
            mimg[j].style.display="none";
         }
       };
     })(n);
    }
    var timg=$("#img")
    timg.click(function() {
         d++;
        if(d%2==1){
        timg.css({'margin-top':'5rem', 'margin-bottom':'5rem'});
        $("#img i").css({'opacity':'1',});
         }else{
            timg.css({'margin-top':'2.5rem', 'margin-bottom':'2.5rem'});
            $("#img i").css({'opacity':'0',});
        }


    });
    // var pic=document.getElementsByClassName("info")[0].getElementsByClassName("icon-xiangce")[0];
    // pic.addEventListener("touchstart",function(e){

    // });