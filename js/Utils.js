//向白渐变
function lightenColor(hex, percent) {
    // 解析十六进制颜色
    hex = hex.replace(/^#/, '');
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);

    // 计算新的颜色值
    r = Math.round(r + (255 - r) * (percent / 100));
    g = Math.round(g + (255 - g) * (percent / 100));
    b = Math.round(b + (255 - b) * (percent / 100));

    // 转换为十六进制表示
    r = r.toString(16).padStart(2, '0');
    g = g.toString(16).padStart(2, '0');
    b = b.toString(16).padStart(2, '0');

    // 合并成新的十六进制颜色
    return `#${r}${g}${b}`;
}

//生成随机颜色
function getRandomHexColor() {
    // 生成随机的 R, G, B 分量
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    // 转换为十六进制表示
    var hexColor = '#' + r.toString(16).padStart(2, '0') +
        g.toString(16).padStart(2, '0') +
        b.toString(16).padStart(2, '0');

    return hexColor;
}

//下载文件
function downloadFile(url, name = "下载") {
    console.log('====================================');
    console.log(url);
    console.log('====================================');
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => document.body.removeChild(a));
}