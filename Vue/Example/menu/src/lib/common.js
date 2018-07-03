import $ from 'jquery';
let common = {
    api: " https://cnodejs.org/api/v1",
    isPhone() {
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        return isAndroid || isiOS;
    },
    getType(value) {
        let result = value;
        switch (value) {
            case "job":
                result = "招聘";
                break;
            case "good":
                result = "精华";
                break;
            case "share":
                result = "分享";
                break;
            case "ask":
                result = "问答";
                break;
            default:
                result = "全部"
                break;
        }
        return result;
    },
    ajaxGet(url, data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                data: data || {},
                success: data => {
                    resolve(data);
                },
                error: data => {
                    reject();
                    console.error("数据请求失败");
                }
            })
        });
    }
}


export default common;