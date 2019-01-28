//首页图片随机变化
var getRandomPic = function(picArr, linkArr, $img, $a) {
    this.picArr = picArr;
    this.linkArr = linkArr;
    this.index_pic = this.getCookie('index_pic');
    this.picCount = picArr.length == 0 ? 1 : picArr.length;
    this.randomNum = this.getRandomNum();
    this.$img = $img;
    this.$a = $a;
    this.init();
}

getRandomPic.prototype = {
    //初始化
    init: function () {
        var $this = this,
            index_pic = this.index_pic;
        if (index_pic == null) {
            $this.setPic($this.randomNum);
        } else if (index_pic.length >= $this.picCount) {
            index_pic = index_pic.substring(index_pic.length - 1, index_pic.length);
            $this.chooseIndex();
        } else {
            $this.chooseIndex();
        }
    },
    //设置图片及跳转链接
    setPic: function(index_pic){
        var $this = this;
        $this.setCookie('index_pic', index_pic);
        $this.$img.attr('src', $this.picArr[$this.randomNum]);
        $this.$a.attr('href', $this.linkArr[$this.randomNum]);
    },
    setCookie: function (name, value) {
        var Days = 1;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    getCookie: function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },
    getRandomNum: function () {
        var $this = this;
        return Math.floor((Math.random() * 100 % $this.picCount));
    },
    chooseIndex: function (num) {
        var $this = this;
        if ($this.index_pic.indexOf($this.randomNum.toString()) > -1) {
            $this.randomNum = $this.getRandomNum();
            $this.chooseIndex();
        } else {
            $this.setPic($this.index_pic + $this.randomNum);
        }
    }
}

//var randomPic =new getRandomPic(picArr, linkArr, $('.gallery-item-picture'), $('.gallery1 a'));