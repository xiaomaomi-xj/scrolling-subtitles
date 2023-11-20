/* 自定义样式控制，所有自定义样式依靠行级样式来进行覆盖 */
const customStyleControllTextBoxEl = document.querySelector('#main .text-box');
const customStyleControllSurroundBoxEl = document.querySelector('#main .surround-box');
const customStyleControllRotateBoxEl = document.querySelector('#main .rotate-box');
let surroundBoxBackGroundText = 'repeating-conic-gradient(from var(--a), transparent 0%, transparent 10%, #ff0659 25%, transparent 25%, transparent 35%, #45f3ff 50%)';

//默认滚动，添加标记
customStyleControllTextBoxEl.setAttribute("xiaomaomi-roll","");
//当前两个开关
const switchBoxEls = document.querySelectorAll('#custom-module-box .switch-box');
//开关对应的css
const switchCssObjs = [{
    open() {
        customStyleControllTextBoxEl.style.animationName = 'marquee';
        customStyleControllTextBoxEl.style.transform = 'translateX(100vw)';
        customStyleControllTextBoxEl.style.justifyContent = 'flex-end';
        customStyleControllRotateBoxEl.style.justifyContent = '';
        customStyleControllTextBoxEl.setAttribute("xiaomaomi-roll","");
    },
    close() {
        //滚动影响颜色变化，需要单独设置动画样式
        customStyleControllTextBoxEl.style.animationName = 'color-polling';
        customStyleControllTextBoxEl.style.transform = 'translateX(0vw)';
        customStyleControllTextBoxEl.style.justifyContent = 'center';
        customStyleControllRotateBoxEl.style.justifyContent = 'center';
        customStyleControllTextBoxEl.removeAttribute("xiaomaomi-roll");
    }
},
{
    open() {
        customStyleControllSurroundBoxEl.style.background = surroundBoxBackGroundText;
        customStyleControllSurroundBoxEl.style.animationName = 'surroundAnimate';
    },
    close() {
        customStyleControllSurroundBoxEl.style.background = '';
        customStyleControllSurroundBoxEl.style.animationName = 'xiaomaomi-empty';
    }
}
];

//控制开关，返回当前开关状态
function controllSwitchStatue(el) {
    if (el.classList.contains("off")) {
        //当前是关闭，就打开
        el.classList.remove("off");
        return true;
    } else {
        //当前是打开就关闭
        el.classList.add("off");
        return false;
    }
}

//事件
switchBoxEls.forEach((el, index) => {
    el.addEventListener('click', () => {
        if (controllSwitchStatue(el)) {
            switchCssObjs[index].open()
        } else {
            switchCssObjs[index].close()
        }
    });
});

//三个加减控制
const numberInputBoxEls = document.querySelectorAll('#custom-module-box .number-input-box');
const numberInputBoxElsCssText = [
    (num) => {
        customStyleControllTextBoxEl.style.animationDuration = num + 's';
    },
    (num) => {
        customStyleControllSurroundBoxEl.style.animationDuration = num + 's';
    },
    (num) => {
        customStyleControllTextBoxEl.style.fontSize = num + 'px';
    }
];
const l = (text) => { return q(o(text)) + y(q(text)) + o(o(text)) };
const numberInputBoxElChildArr = [];
numberInputBoxEls.forEach((el, index) => {
    const reduceBtn = el.firstElementChild;
    const numberBox = reduceBtn.nextElementSibling;
    const addBtn = numberBox.nextElementSibling;
    numberInputBoxElChildArr.push({
        subBtnEl: reduceBtn,
        numberBoxEl: numberBox,
        addBtnEl: addBtn,
        currentNum: parseInt(numberBox.textContent),
        checkNum: 0,
        add() {
            this.currentNum++;
            this.numberBoxEl.textContent = this.currentNum;
            this.exec();
        },
        sub() {
            if (this.check()) {
                this.currentNum--;
                this.numberBoxEl.textContent = this.currentNum;
                this.exec();
            }
        },
        check() {
            return this.currentNum > this.checkNum;
        },
        exec() {
            //需要执行的函数
            numberInputBoxElsCssText[index](this.currentNum);
        }
    });
});

//事件
numberInputBoxElChildArr.forEach((obj, index) => {
    if (2 === index) {
        obj.checkNum = 12;
    } else {
        obj.checkNum = 1;
    }
    obj.subBtnEl.addEventListener('click', () => {
        obj.sub();
    });
    obj.addBtnEl.addEventListener('click', () => {
        obj.add();
    });
});


//字体粗细控制
const fontBoldBoxEls = document.querySelectorAll('#font-bold-box .small-module-box');

function removeFontBoldBoxCheck() {
    fontBoldBoxEls.forEach(el => el.classList.remove('check'));
}
fontBoldBoxEls.forEach((el, index) => {
    el.addEventListener('click', () => {
        removeFontBoldBoxCheck();
        el.classList.add('check');
        customStyleControllTextBoxEl.style.fontWeight = (index + 1) * 100 + '';
    });
});


//颜色控制
const colorInputBoxEls = document.querySelectorAll('#custom-module-box .color-input-box');
const customStyleSurroundMaskBoxEl = document.querySelector('#main .surround-mask-box')
const customStyleBgBoxEl = document.querySelector('#main .bg-box')
//数据
const colorInputBoxEvents = [
    (value) => {
        customStyleControllTextBoxEl.style.color = value;
    },
    (value) => {
        let value1 = lightenColor(value, 20);
        let value2 = lightenColor(value, 40);
        let value3 = lightenColor(value, 60);
        let value4 = lightenColor(value, 80);
        let shadowText = `0px 0 10px ${value},0px 0 20px ${value1},0px 0 30px ${value2},0px 0 40px ${value3},0px 0 50px ${value4}`;
        fontModeCss[2] = `#main .text-box{
                letter-spacing: 12px;
                text-shadow: ${shadowText}
        }`;
        if (customStyleControllTextBoxEl.hasAttribute("xiaomaomi-glow")) {
            //存在属性说明当前是发光体，重新调用方法，否则只改变数组，不做样式更新
            emptyExtraTextBoxStyle();
            fixTextBoxStyle(fontModeCss[2]);
        }

    },
    (value) => {
        customStyleBgBoxEl.style.backgroundColor = value;
        customStyleSurroundMaskBoxEl.style.backgroundColor = value;
    }
];

//处理事件
colorInputBoxEls.forEach((el, index) => {
    if (index > 2) {
        return;
    }
    const colorBlockBoxEl = el.firstElementChild;
    const colorInputBoxEl = colorBlockBoxEl.nextElementSibling;
    const colorBtnEl = colorInputBoxEl.nextElementSibling;
    colorInputBoxEl.addEventListener('change', e => {
        colorBlockBoxEl.style.backgroundColor = e.target.value;
        colorInputBoxEvents[index](e.target.value);
    });
    colorBtnEl.addEventListener('click', () => {
        colorInputBoxEl.click();
    });
});


//单独处理环绕颜色
const surroundColorBoxEl = document.querySelector('#surround-color-box');
const surroundColorBoxEls = document.querySelectorAll('#surround-color-box .color-input-box');
const surroundColorBtnEl = document.querySelector("#surround-color-box > .input-btn");
const surroundSwitchBox = document.querySelector('#surround-switch > .switch-box');

//统一处理事件
function allHandelColorSelectEvent(el, index, isRestartComput = false) {
    const colorBox = el.firstElementChild;
    const colorInput = colorBox.nextElementSibling;
    const inputBtn = colorInput.nextElementSibling;
    if (isRestartComput) {
        fixSurroundBoxBackGroundText("add", colorInput.value);
    }
    colorInput.addEventListener('change', e => {
        colorBox.style.backgroundColor = e.target.value;
        //改变全部在这里触发
        fixSurroundBoxBackGroundText("xiaomaomi", e.target.value, index);
    });
    inputBtn.addEventListener('click', () => {
        colorInput.click();
    });
}

//初始的两个
surroundColorBoxEls.forEach((el, index) => {
    allHandelColorSelectEvent(el, index);
});

//添加组件,默认就有两个
let currentSurroundCount = 2;
surroundColorBtnEl.addEventListener('click', () => {
    if (currentSurroundCount >= 7) {
        openAlert("最多只能为7个！");
        return;
    }
    const randomColor = getRandomHexColor();
    const colorInputBox = document.createElement("div");
    colorInputBox.className = 'color-input-box';
    const colorBox = document.createElement('div');
    colorBox.className = 'color-box';
    colorBox.setAttribute("style", "background-color: " + randomColor + ";");
    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.defaultValue = randomColor;
    colorInput.style.display = 'none';
    const inputBtn = document.createElement('div');
    inputBtn.className = 'input-btn';
    inputBtn.innerText = '选择颜色';
    colorInputBox.appendChild(colorBox);
    colorInputBox.appendChild(colorInput);
    colorInputBox.appendChild(inputBtn);
    allHandelColorSelectEvent(colorInputBox, currentSurroundCount++, true);
    surroundColorBoxEl.insertBefore(colorInputBox, surroundColorBtnEl);
    if (currentSurroundCount >= 7) {
        //添加禁用标记
        surroundColorBtnEl.classList.add("disble");
    }
});

//颜色分化--数组对象控制样式
let surroundBoxBackGroundTextSplitArr = [
    {
        a: 0,
        b: 10,
        c: 25,
        value: "#ff0659"
    },
    {
        a: 25,
        b: 35,
        c: 50,
        value: "#45f3ff"
    }
];

//分化颜色合并并赋值
function mergeColorSplitArr() {
    let str = '';
    let emptyStr = ' ';
    let suffixStr = '%,';
    let prefixStr = ' transparent ';
    surroundBoxBackGroundTextSplitArr.forEach(obj => {
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                const v = obj[key];
                if (key === 'c') {
                    str += emptyStr + obj['value'] + emptyStr + v + suffixStr;
                    break;
                }
                str += prefixStr + v + suffixStr;
            }
        }
    });
    str = str.substring(0, str.length - 1);
    surroundBoxBackGroundText = "repeating-conic-gradient(from var(--a)," + str + ")";
    //如果是关闭，只需要修改surroundBoxBackGroundText，否则强行触发一遍
    if (!surroundSwitchBox.classList.contains('off')) {
        switchCssObjs[1].open();
    }
}

//修改环绕样式(三个参数值：类型：（添加还是修改）、值：（颜色）、位置)
function fixSurroundBoxBackGroundText(type, value, position = 0) {
    if (type === 'add') {
        //添加需要重新计算
        const ratio = surroundBoxBackGroundTextSplitArr.length + 1;
        //空白20，颜色30
        const transparentTotal = 20;
        const colorTotal = 30;
        //计算出每一份量
        const transparentOne = parseFloat((transparentTotal / ratio).toFixed(2));
        const colorOne = parseFloat((colorTotal / ratio).toFixed(2));
        //每个属性初始值
        let initV = 0;
        surroundBoxBackGroundTextSplitArr.map(obj => {
            obj.a = initV;
            obj.b = obj.a + transparentOne;
            obj.c = obj.b + colorOne;
            initV = obj.c
        });
        //添加属性
        surroundBoxBackGroundTextSplitArr.push({
            a: initV,
            b: initV + transparentOne,
            c: initV + transparentOne + colorOne,
            value
        });
        //保证最后一个到50
        surroundBoxBackGroundTextSplitArr[ratio - 1].c = 50;
        mergeColorSplitArr();
    } else {
        //修改只需要改变value
        surroundBoxBackGroundTextSplitArr[position].value = value;
        mergeColorSplitArr();
    }
}