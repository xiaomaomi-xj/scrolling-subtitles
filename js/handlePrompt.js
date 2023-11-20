/* 处理所有说明信息和帮助信息 */
const promptEls = document.querySelectorAll('.tool-box .module-box-mark');
const promptTests = [
    `自定义按钮点击后允许你上传自己的字体文件，字体文件正确的情况下，上传后字体就会根据你上传的文件进行改变。
    <br/>如果自己没有字体文件，可以前往网站
    <a href="https://www.fonts.net.cn/fonts-zh/tag-zixinfang-1.html" target="_blank">https://www.fonts.net.cn/fonts-zh/tag-zixinfang-1.html</a>
    进行获取。(有很多免费的，下载后解压找到字体文件上传即可)<br>
    <p style="color: red;">特别注意：自定义字体文件，并不会保存到下载文件中！</p>
    `,
    `<ol>
        <li>字体颜色只会影响到“普通”和“发光体”，其他模式，并不会根据自定义字体颜色改变发生改变</li>
        <li>发光颜色是“发光体”专属的，发光颜色改变只会影响“发光体”</li>
        <li>“霓虹灯”作为绚丽的效果，当内容不多时可以不滚动，所有模式在不滚动的时候字体为居中。</li>
    </ol>`,
    `<ol>
        <li>当特效过多的时候就会影响性能，请根据自己的设备效率选择合适的效果。</li>
        <li>对于下载，微信处于安全考虑，可能不允许下载，你可以先在浏览器中下载，然后在微信中上传使用。</li>
    </ol>`,
    `所需时间是指：在一件事情开始到结束一个周期所需要的总时间，此项代表了速度，时间越多，速度越慢，时间越少，速度越快。(单位:秒)`,
    `字体大小根据自己需求调整，但是最小不得小于12。`,
    `环绕颜色可以根据自己的需要进行添加和修改，添加后不能减少，关闭环绕只是将颜色隐藏，开启环绕无需重新添加。(最多允许七个，正好可以配置出彩虹七色：
        (<span style="color: #FF0000;">红色</span>、
        <span style="color: #FFA500;">橙色</span>、
        <span style="color: #FFFF00;">黄色</span>、
        <span style="color: #008000;">绿色</span>、
        <span style="color: #00FFFF;">青色</span>、
        <span style="color: #0000FF;">蓝色</span>、
        <span style="color: #800080;">紫色</span>)，太多了其实也不好看，根据自己的审美去配置。`,
    `下载的文件就可以上传，上传后将立即获得之前已经配置的效果，还可以把配置好的文件发送给别人，让别人上传，作用：（节省时间、甚至于你用于表白也没意见）。`,
    `在全屏后，双击屏幕就可以退出全屏模式。`,
    `根据你的需求配置完成后，可以点击下载，会把所有效果保存到文件里面，下次要使用相同的效果，直接上传文件即可。`
];

//添加点击事件
promptEls.forEach((el, index) => {
    el.addEventListener('click', () => {
        openAlert(promptTests[index]);
    });
});