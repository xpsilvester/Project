window.onload=function(){
	var $ul=document.getElementsByTagName("ul")[0];
	console.log($ul);

	var firstChild=$ul.childNodes[0];
	console.log($ul.childNodes);//NodeList(11) [text, li, text, li, text, li, text, li, text, li, text]
	console.log(firstChild);//#text

	var secondChild=$ul.childNodes.item(1);
	console.log(secondChild);

	var liCount=$ul.childNodes.length;
	console.log(liCount);

	//向childNodes列表的末尾添加一个节点
	var $li=document.createElement("li");
	$li.innerHTML="itemCreat"
	var returnedNode=$ul.appendChild($li);

	//把节点移到指定位置insertBefore
	//把节点移到最后一个子节点
	$ul.insertBefore($li,null);

	//把节点移到第一个子节点
	$ul.insertBefore($li,$ul.firstChild);

	//获取元素左偏移量
	function getElementLeft(element){
		var actualLeft=element.offsetLeft;
		var current=element.offsetParent;

		while(current !== null){
			actualLeft += current.offsetLeft;
			current = current.offsetParent;
		}
		return actualLeft;
	}

	//确定元素大小
	function getBoundingClientRect(element){
		if(typeof arguments.callee.offset != "number"){
			var scrollTop=document.documentElement.scrollTop;
			var temp=document.createElement("div");
			temp.style.cssText="position:absolute;left:0;top:0;";
			document.body.appendChild(temp);
			arguments.callee.offset=-temp.getBoundingClientRect().top - scrollTop;
			document.body.removeChild(temp);
			temp=null;
		}

		var rect=element.getBoundingClientRect();
		var offset=arguments.callee.offset;

		return {
			left:rect.left + offset,
			right:rect.right + offset,
			top:rect.top + offset,
			bottom:rect.bottom + offset
		};
	}
}


