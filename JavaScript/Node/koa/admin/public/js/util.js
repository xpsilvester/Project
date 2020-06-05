/*
封装好的工具方法
*/

//判断元素是否有相应class
function hasClass( elements,cName ){
    return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断
};

//向元素添加class
function addClass( elements,cName ){
    if( !hasClass( elements,cName ) ){
        elements.className += " " + cName;
    };
};

//移除某元素的class
function removeClass( elements,cName ){
    if( hasClass( elements,cName ) ){
        elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" ),"" ); // replace方法是替换
    };
};

//发送请求
function send(type,data,url,callback){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == XMLHttpRequest.DONE){
            if(xmlhttp.status == 200){
                if(callback){
                    callback(xmlhttp.response);
                }
            } else {
                console.log("Oops!Something wrong happened~");
            }
        }
    };
    xmlhttp.open(type,url,true);
    xmlhttp.setRequestHeader("Content-type","application/json");
    xmlhttp.send(JSON.stringify(data));
};

//计数器
function count(num, callback){
    let _time = 0;
    let count = setInterval(function(){
        _time++;
        if(_time > num){
            callback();
            clearInterval(count);
        }
    },1000);
}

