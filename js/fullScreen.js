const cts = new CSSStyleSheet();
document.adoptedStyleSheets = [cts];
const element = document.querySelector('.box');
const runBtn = document.querySelector('.run-btn');
const textBoxEl = document.querySelector('.text-box');
const rotateBoxEl = document.querySelector('.rotate-box');
const bgBoxEl = document.querySelector('.bg-box')
const surroundBoxEl = document.querySelector('.surround-box');
//不能提前获取计算，全屏后，offset的值是会变得
const ratio = (document.documentElement.clientWidth / element.clientHeight) > 5 ? (document.documentElement.clientWidth / element.clientHeight) - 2.8 : (document.documentElement.clientWidth / element.clientHeight);

//改变动画样式--只有在全屏需要改变方向的时候调用
function modifyAnimation() {
    cts.deleteRule(cts.cssRules.length - 1);
    //计算帮助：help.png
    const differenceValue1 = document.documentElement.offsetWidth + Math.ceil((document.documentElement.offsetHeight - document.documentElement.offsetWidth) / 2) + 10;
    const differenceValue2 = -(textBoxEl.offsetWidth) - Math.ceil((document.documentElement.offsetHeight - document.documentElement.offsetWidth) / 2) - 10;
    cts.insertRule(`@keyframes marquee {0% {translateX(${differenceValue1}px);background-position: 0 0;}100% {transform: translateX(${differenceValue2}px);background-position: -200%, 0;}}`, cts.cssRules.length);
}

//恢复样式
function resetAnimation() {
    //如果是初始化执行就不需要删除
    if (cts.cssRules.length !== 0) {
        cts.deleteRule(cts.cssRules.length - 1);
    }
    cts.insertRule('@keyframes marquee {0% {transform: translateX(100vw);background-position: 0 0;}100% {transform: translateX(-100%);background-position: -200%, 0;}}', cts.cssRules.length);
}

//触发
runBtn.addEventListener('click', async () => {
    //判断是否可以打开全屏
    if (!document.fullscreenEnabled) {
        document.body.innerHTML = '<h1 style="color：red;">你的浏览器无法使用全屏功能，不能使用本产品。</h1>';
        return;
    }
    element.style.height = '100%';
    //全屏后放大字体
    textBoxEl.style.fontSize = Math.floor(parseInt(textBoxEl.style.fontSize) * ratio) + 'px';
    // 进入全屏
    if (element.requestFullscreen) {
        await element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
        await element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        await element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // Internet Explorer
        await element.msRequestFullscreen();
    }
    checkOrientation();
});

//监听全屏错误事件
element.addEventListener('fullscreenerror', () => {
    document.body.innerHTML = '<h1 style="color：red;">打开全屏失败，无法使用本产品。</h1>';
});

//检查当前屏幕方向
function checkOrientation() {
    const orientatrionInfo = window.screen.orientation;
    console.log(textBoxEl.style.transform);
    if (orientatrionInfo.angle === 0 && document.documentElement.clientWidth < document.documentElement.clientHeight) {
        //竖屏--宽度小--调整(使用这个属性不包含滚动)
        if (textBoxEl.hasAttribute("xiaomaomi-roll")) {
            //滚动中，需要调整位置，js换算计算，使用offse
            const differenceValue = document.documentElement.offsetWidth + Math.ceil((document.documentElement.offsetHeight - document.documentElement.offsetWidth) / 2) + 10;
            textBoxEl.style.transform = `translateX(${differenceValue}px)`;
        }
        rotateBoxEl.style.transform = 'rotateZ(90deg)';
        modifyAnimation();
    }
}

//触发关闭全屏
element.addEventListener('dblclick', () => {
    exitFullscreen();
})

// 退出全屏模式
function exitFullscreen() {
    //不需要调用恢复，只让监听事件恢复就行
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // Internet Explorer
        document.msExitFullscreen();
    }
}

//监听退出全屏
document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement === null) {
        //退出调回
        resetFun();
    }
});

//恢复函数
function resetFun() {
    rotateBoxEl.style.transform = '';
    element.style.height = '';
    if (textBoxEl.hasAttribute("xiaomaomi-roll")) {
        //滚动可以直接清除
        textBoxEl.style.transform = 'translateX(100vw)';
    } else {
        //样式表含有100vw，居中就要覆盖
        textBoxEl.style.transform = 'translateX(0vw)';
    }
    resetAnimation();
    //恢复字体大小
    textBoxEl.style.fontSize = Math.floor(parseInt(textBoxEl.style.fontSize) / ratio) + 'px';
}

(function () {
    //第一次运行添加初始动画
    resetAnimation();
    //默认字体大小
    textBoxEl.style.fontSize = '130px';
})()