setRem();
window.addEventListener("orientationchange", setRem);
// 监测横屏
window.addEventListener("resize", setRem);
function setRem() {
    var html = document.querySelector("html");
    var width = html.getBoundingClientRect().width;
    html.style.fontSize = width / 16 + "px";
}
// 把屏幕分为16份  根据不同设备改变大小