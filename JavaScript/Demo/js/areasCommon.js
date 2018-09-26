//禁掉全局ajax
$(document).bind("mobileinit", function() {
    //disable ajax nav
    $.mobile.ajaxEnabled=false
});
//显示加载器
function showLoader(t,c) {/*t:文字  c:内容*/
    //显示加载器.for jQuery Mobile 1.2.0
    $.mobile.loading('show', {
        text: "", //加载器中显示的文字
        textVisible: true, //是否显示文字
        theme: 'b',        //加载器主题样式a-e
        textonly: true,   //是否只显示文字
        html: "<h1>"+t+"</h1><h1>"+c+"</h1>"   //要显示的html内容，如图片等
    });
}
//隐藏加载器.for jQuery Mobile 1.2.0
function hideLoader()
{
    $.mobile.loading('hide');
}