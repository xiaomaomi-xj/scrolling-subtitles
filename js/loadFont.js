const fontStyleBtnEls = document.querySelectorAll('#font-module-box .small-module-box');
const fontEl = document.querySelector('#main .text-box');
//FILE标签
let customFileEl = null;

//加载字体函数
function loadFont(name, url) {
    const fontFaceSet = document.fonts;
    const fontFace = new FontFace(name, url);
    fontFace.load().then(() => {
        fontFaceSet.add(fontFace);
    });
}

//自定字体函数
function loadCustomFont(url, callBackFun) {
    const fontFaceSet = document.fonts;
    const fontFace = new FontFace("xiaomaomi-custom-font", `url(${url})`);
    fontFace.load().then(() => {
        //add本身就有更新的功能
        fontFaceSet.add(fontFace);
        fontEl.style.fontFamily = 'xiaomaomi-custom-font';
        callBackFun();
    }).catch(() => {
        openAlert(`错误的字体文件！<br /> 点击右上角<span style='background-color: rgb(32, 190, 32);'>“自定义?”</span>，可获得帮助说明！`);
    });
}

//预加载所有字体
loadFont("xiaomaomi-font-1", "url(./font/1.ttf)");
loadFont("xiaomaomi-font-2", "url(./font/2.ttf)");
loadFont("xiaomaomi-font-3", "url(./font/3.ttf)");
loadFont("xiaomaomi-font-4", "url(./font/4.otf)");
loadFont("xiaomaomi-font-5", "url(./font/5.ttf)");
loadFont("xiaomaomi-font-6", "url(./font/6.ttf)");
loadFont("xiaomaomi-font-7", "url(./font/7.ttf)");
loadFont("xiaomaomi-font-8", "url(./font/8.ttf)");

//取消所有check
function cancelCheck() {
    fontStyleBtnEls.forEach(el => {
        el.classList.remove('check');
    });
}

//添加点击事件
fontStyleBtnEls.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        if (index === 0) {
            //跟随系统
            cancelCheck();
            btn.classList.add('check');
            fontEl.style.fontFamily = '';
            return;
        }
        if (index === fontStyleBtnEls.length - 1) {
            //自定义
            if (null === customFileEl) {
                customFileEl = btn.querySelector('input');
                customFileEl.addEventListener('change', e => {
                    const file = e.target.files[0];
                    if(file === undefined || file === null){
                        //没选择文件，直接返回
                        return;
                    }
                    loadCustomFont(URL.createObjectURL(e.target.files[0]), () => {
                        //成功回调，添加样式
                        cancelCheck();
                        btn.classList.add('check');
                    });
                });
            }
            customFileEl.click();
            return;
        }
        //正常处理
        cancelCheck();
        btn.classList.add('check');
        fontEl.style.fontFamily = 'xiaomaomi-font-' + index;
    });
});