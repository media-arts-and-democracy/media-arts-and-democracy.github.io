// JavaScript Document

$(document).ready(function() {

	$(window).scroll(function() {

    	var windowTop = Math.max($('body').scrollTop(), $('html').scrollTop());

    	$('.pageSection').each(function (index) {
       	 	if (windowTop > ($(this).position().top - 100))
        	{
        	    console.log('The scroll is at ' + $(this).attr('id'));
        	    $('#navigation a.current').removeClass('current');
        	    $('#navigation a:eq(' + index + ')').addClass('current');
       		 }
    	});

	})

});