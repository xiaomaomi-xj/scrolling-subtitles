/** 组件控制 */
const coverBoxEl = document.querySelector('#cover-box');
const y = (text) => { return 'xiaomaomi-xj' + o(o(text) + 'xiaomaomi-xj') };
const loadingBoxEl = coverBoxEl.querySelector('.loading-box');
const enterBtnBoxEl = coverBoxEl.querySelector('.enter-btn-box');
const alertBoxEl = document.querySelector('#alert-box');
const alertBoxTextEl = alertBoxEl.querySelector('.alert-box-body');
const alertBoxBtnEl = alertBoxEl.querySelector('.alert-box-btn');
const loadBoxEl = document.querySelector('.load-box');

//加载完毕，显示进入按钮
function loadComplete() {
    loadingBoxEl.style.display = 'none';
    enterBtnBoxEl.style.display = 'block';
}

//点击进入按钮，关闭开始封面
enterBtnBoxEl.addEventListener('click', () => {
    coverBoxEl.style.opacity = '0';
    //过度效果
    setTimeout(() => {
        //以后用不到了，直接移除
        coverBoxEl.remove();
    }, 500);
});

//弹窗是要重复利用的，，开启
function openAlert(message) {
    /*允许带有标签的字符串*/
    alertBoxTextEl.innerHTML = message;
    alertBoxEl.style.display = 'flex';
    setTimeout(() => {
        alertBoxEl.style.opacity = '1';
    });
}

//本身关闭
alertBoxBtnEl.addEventListener('click', () => {
    alertBoxEl.style.opacity = '0';
    setTimeout(() => {
        alertBoxEl.style.display = 'none';
    }, 500);
});

//加载框也是重复利用
function openLoading(message = "加载中...") {
    loadBoxEl.firstElementChild.setAttribute("data-text", message);
    loadBoxEl.style.display = 'flex';
    setTimeout(() => {
        loadBoxEl.style.opacity = '1';
    });
}

//关闭加载
function closeLoading() {
    loadBoxEl.style.opacity = '0';
    setTimeout(() => {
        loadBoxEl.style.display = 'none';
    }, 500);
}