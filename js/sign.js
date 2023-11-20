const flag = "xiaomaomi-xj";
const sourceCodeAddressGitee = "https://gitee.com/xiaomaomi-xj/scrolling-subtitles";
const sourceCodeAddressGithub = "https://github.com/xiaomaomi-xj/scrolling-subtitles";
const templatePrefix = `【源码地址：\n\rgitee：${sourceCodeAddressGitee}\n\rgithub：${sourceCodeAddressGithub}\n\r作者：${flag}】\n\r-----BEGIN XIAOMAOMI CERTIFICATE-----\n\r`;
const templateSuffix = '\n\r-----END XIAOMAOMI CERTIFICATE-----';
function xiaomaomiSign(obj) {
    let s = '';
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            let v = obj[key];
            v += typeof v;
            s += v + flag + key;
        }
    }
    return btoa(encodeURI(this(y(s) + q(flag))));
}
function xiaomaomiEncode(obj) {
    return templatePrefix + btoa(encodeURI(JSON.stringify(obj))) + templateSuffix;
}
function checkSign(objStr="") {
    objStr = objStr.replace(templatePrefix,"");
    objStr = objStr.replace(templateSuffix,"");
    let obj = null;
    try {
        obj = JSON.parse(decodeURI(atob(objStr)));
    } catch (err) {
        obj = null;
    }
    if (obj === null) {
        return { value: null, status: false };
    }
    if (obj.sign === undefined || obj.sign === '' || obj.sign === null) {
        return { value: null, status: false };
    }
    const signText = obj.sign;
    delete obj.sign;
    if (signText !== xiaomaomiSign.call(l, obj)) {
        return { value: null, status: false };
    }
    return { value: obj, status: true };
}