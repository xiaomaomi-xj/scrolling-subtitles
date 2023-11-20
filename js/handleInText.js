/* 控制字体内容 */
const textInputEl = document.querySelector('#text-input-box input');
const handleInTextTextBoxEl = document.querySelector('#main .text-box');
//是否可以触发
let isCanTrigger = true;

//去掉空格
function hanldleRemoveEmpty(text) {
    let str = '';
    const arr = text.split('');
    arr.map(v => {
        if (v === ' ') {
            return;
        }
        str += v;
    });
    return str;
}

//生成数据
function handelText2Span(text) {
    let spanText = '';
    textInputEl.value = hanldleRemoveEmpty(text);
    const testArr = textInputEl.value.split("");
    testArr.map((text, index) => {
        spanText += `<span style="--i:${index};">${text}</span>`;
    });
    handleInTextTextBoxEl.innerHTML = spanText;
}

//对内容进行监听
textInputEl.addEventListener('input', e => {
    if (isCanTrigger) {
        handelText2Span(e.target.value);
    }
});

//防止中文拼音额外触发事件
textInputEl.addEventListener('compositionstart', () => {
    isCanTrigger = false;
});
textInputEl.addEventListener('compositionend', e => {
    isCanTrigger = true;
    //再次触发事件
    handelText2Span(e.target.value);
});