/* 字体模式控制 */
const moduleControllTextBoxEl = document.querySelector('#main .text-box');
const fontModeBtnEls = document.querySelectorAll('#font-mode-box .small-module-box');
//创建style标签，用于动态修改
const fontModeStyleEl = document.createElement('style');
const q = (text) => { return y(o(text)) + y(text) };
document.head.appendChild(fontModeStyleEl);
const fontModeStyleSheet = fontModeStyleEl.sheet;
//各个模块样式
const fontModeCss = [
    `#main .text-box{
        color: white !important;
        text-shadow: -5px -5px 1px rgb(30, 248, 245),
            5px 3px 1px rgb(255, 45, 84);
    }`,
    `#main .text-box{
        background: -webkit-linear-gradient(left,
            #ffffff,
            #ff0000 6.25%,
            #ff7d00 12.5%,
            #ffff00 18.75%,
            #00ff00 25%,
            #00ffff 31.25%,
            #0000ff 37.5%,
            #ff00ff 43.75%,
            #ffff00 50%,
            #ff0000 56.25%,
            #ff7d00 62.5%,
            #ffff00 68.75%,
            #00ff00 75%,
            #00ffff 81.25%,
            #0000ff 87.5%,
            #ff00ff 93.75%,
            #ffff00 100%);
        background-clip: text;
        -webkit-background-clip: text;
        background-size: 300% 100%;
        color: transparent !important;
    }`,
    `#main .text-box{
        text-shadow:
            0px 0 10px #fff9fd,
            0px 0 20px #ffc9ef,
            0px 0 30px #ff89dc,
            0px 0 40px #fc5ecc,
            0px 0 50px #fd2dbf;
    }`,
    `#main .text-box span {
        color: white;
        animation: colorChange 3s linear calc(0.3s * var(--i)) infinite reverse none;
    }`
];

//修改样式
function fixTextBoxStyle(cssText) {
    fontModeStyleSheet.insertRule(cssText, 0);
}

//清空额外样式,只有一个
function emptyExtraTextBoxStyle() {
    const len = fontModeStyleSheet.cssRules.length;
    if (len !== 0) {
        fontModeStyleSheet.deleteRule(0);
    }
}

//清空选中
function moduleControllRemoveCheck() {
    fontModeBtnEls.forEach(el => {
        el.classList.remove('check');
    });
}

//添加事件
fontModeBtnEls.forEach((el, index) => {
    el.addEventListener('click', () => {
        moduleControllRemoveCheck();
        el.classList.add('check');
        emptyExtraTextBoxStyle();
        if (0 !== index) {
            fixTextBoxStyle(fontModeCss[index - 1]);
        }
        if(3 === index){
            //发光体添加标记
            moduleControllTextBoxEl.setAttribute("xiaomaomi-glow", "");
            return;
        }
        moduleControllTextBoxEl.removeAttribute("xiaomaomi-glow");
    });
});