/* 下载和上传 */
const uploadBtnEl = document.querySelector('#upload-btn');
const uploadInputEl = uploadBtnEl.previousElementSibling;
const dpwnloadBtnEl = document.querySelector('#download-btn');

//下载
function downloadFun() {
    let wbnr = textInputEl.value;
    let fontIndex = 0;
    const els = document.querySelectorAll('#font-module-box .small-module-box');
    els.forEach((el, index) => {
        if (el.classList.contains("check")) {
            if (els.length - 1 === index) {
                fontIndex = 0;
                return;
            }
            fontIndex = index;
        }
    });
    let moudleIndex = 0;
    const els1 = document.querySelectorAll('#font-mode-box .small-module-box');
    els1.forEach((el, index) => {
        if (el.classList.contains("check")) {
            moudleIndex = index;
        }
    });
    const els2 = document.querySelectorAll('#custom-module-box .switch-box');
    let rollStatus = true;
    let surroundStatus = true;
    if (els2[0].classList.contains("off")) {
        rollStatus = false;
    }
    if (els2[1].classList.contains("off")) {
        surroundStatus = false;
    }
    let rollTime = 10;
    let surroundTime = 5;
    let fontSize = 130;
    let valueArr = [];
    const els3 = document.querySelectorAll('#custom-module-box .number-input-box');
    els3.forEach(el => {
        valueArr.push(parseInt(el.firstElementChild.nextElementSibling.textContent));
    });
    [rollTime, surroundTime, fontSize] = valueArr;
    let fontColor = '#ffffff';
    let glowColor = '#fd2dbf';
    let bgColor = '#000000';
    let surroundExt = [
        "#ff0659", "#45f3ff"
    ];
    let valueArr1 = [];
    let valueArr2 = [];
    const els4 = document.querySelectorAll('#custom-module-box .color-input-box');
    els4.forEach((el, index) => {
        let v = el.firstElementChild.nextElementSibling.value;
        if (index < 3) {
            valueArr1.push(v);
            return;
        }
        valueArr2.push(v);
    });
    [fontColor, glowColor, bgColor] = valueArr1;
    surroundExt = valueArr2;
    const els5 = document.querySelectorAll('#font-bold-box .small-module-box');
    let fontBlodIndex = 3;
    els5.forEach((el, index) => {
        if (el.classList.contains("check")) {
            fontBlodIndex = index;
        }
    });
    const obj = {
        wbnr,
        fontIndex,
        moudleIndex,
        rollStatus,
        surroundStatus,
        rollTime,
        surroundTime,
        fontSize,
        fontColor,
        glowColor,
        bgColor,
        fontBlodIndex,
        surroundExt
    };
    obj.sign = xiaomaomiSign.call(l, obj);
    downloadFile(URL.createObjectURL(new Blob([xiaomaomiEncode(obj)], { type: 'text/plain' })), "在线手持弹幕样式保存文件");
}

dpwnloadBtnEl.addEventListener('click', () => {
    downloadFun();
});


uploadBtnEl.addEventListener('click', () => {
    uploadInputEl.click();
});
uploadInputEl.addEventListener("change", e => {
    const file = e.target.files[0];
    if (file === undefined || file === null) {
        return;
    }
    const fileReader = new FileReader();
    fileReader.onload = e => {
        const result = checkSign(e.target.result);
        if (!result.status) {
            openAlert("文件验签解析失败，请上传本系统下载的文件或则不要自行篡改本系统下载的文件，如果不明白可以点击右上角<span style='background-color: rgb(32, 190, 32);'>上传?”</span>、<span style='background-color: rgb(32, 190, 32);'>“下载?”</span>获取帮助说明！");
            return;
        }
        openLoading("文件解析，样式加载中...");
        handleImportEvent(result.value);
    }
    fileReader.readAsText(file);
});

//处理导出函数
function handleImportEvent(obj) {
    //文本
    handelText2Span(obj.wbnr);
    //字体
    fontStyleBtnEls[obj.fontIndex].click();
    //模式--可以最后触发
    fontModeBtnEls[obj.moudleIndex].click();
    //滚动
    if (obj.rollStatus === switchBoxEls[0].classList.contains("off")) {
        switchBoxEls[0].click();
    }
    //环绕
    if (obj.surroundStatus === switchBoxEls[1].classList.contains("off")) {
        switchBoxEls[1].click();
    }
    //滚动时间、环绕时间、字体大小
    elArrSynchronizeStyles(0, numberInputBoxElsCssText, numberInputBoxEls, "textContent", obj.rollTime);
    elArrSynchronizeStyles(1, numberInputBoxElsCssText, numberInputBoxEls, "textContent", obj.surroundTime);
    elArrSynchronizeStyles(2, numberInputBoxElsCssText, numberInputBoxEls, "textContent", obj.fontSize);
    //字体颜色、发光颜色、背景颜色
    elArrSynchronizeStyles(0, colorInputBoxEvents, colorInputBoxEls, "defaultValue", obj.fontColor, true, "backgroundColor");
    elArrSynchronizeStyles(1, colorInputBoxEvents, colorInputBoxEls, "defaultValue", obj.glowColor, true, "backgroundColor");
    elArrSynchronizeStyles(2, colorInputBoxEvents, colorInputBoxEls, "defaultValue", obj.bgColor, true, "backgroundColor");
    //字体粗细
    fontBoldBoxEls[obj.fontBlodIndex].click();
    //环绕颜色
    specialTreatmentSurround(obj.surroundExt)
}

//对于调用样式的方法需要更改本身样式(下标、样式数组，组件数组、key、值、是否有第一个值、第一个值的key)
function elArrSynchronizeStyles(index, styleArr, elArr, key, value, haveFirst = false, firstKey = "") {
    styleArr[index](value);
    if (haveFirst) {
        elArr[index].firstElementChild.style[firstKey] = value;
    }
    elArr[index].firstElementChild.nextElementSibling[key] = value;
}

//环绕颜色比较特殊，单独处理，先把颜色全删除,并且恢复currentSurroundCount和surroundBoxBackGroundTextSplitArr的值
const removeColorInputBoxEls = document.querySelectorAll("#surround-color-box .color-input-box");
function specialTreatmentSurround(surroundExt) {
    removeColorInputBoxEls.forEach((el, index) => {
        if (index > 1) {
            el.remove();
        }
    });
    currentSurroundCount = 2;
    //恢复原值，颜色不重要，比例重要
    surroundBoxBackGroundTextSplitArr = [
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
    for (let i = 0; i < surroundExt.length - 2; i++) {
        surroundColorBtnEl.click();
    }
    setTimeout(() => {
        //添加完之后，重新获取
        document.querySelectorAll("#surround-color-box .color-input-box").forEach((el, index) => {
            el.firstElementChild.style.backgroundColor = surroundExt[index];
            //颜色全部修改
            fixSurroundBoxBackGroundText("xiaomaomi", surroundExt[index], index);
            //关闭加载
            setTimeout(() => {
                closeLoading();
            }, 1000);
        });
    });
}