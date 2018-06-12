$(function(){
	$('.originSearch input').on('focus',function(){
		$('.searchAdd').css('display','block');
	})
	$('.searchAdd .back').on('click',function(){
		$('.searchAdd').css('display','none');
	})
})