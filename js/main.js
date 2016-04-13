// JavaScript Document

var whichMenu; //to hold which link is selected so that the mouseleave does not change the current label opacity
var whichLabel; //to hold page name

var whichProject; //to hold which link is selected
var whichTitle; //to hold project title

var bubble; //to hold full logo position

var dh, dw, wh, ww; //document height, document width, window height, window width

var btop, bleft, ltop, lleft; //bubble and logo positions

var clk; //boolean, false for welcome, true for everything else

var navOff //boolean, false for off, true for on

var mainNav // boolean to hold whether the click came from the main nav (vs the project nav)

$(document).ready(function() {

	//initialize click to false for the welcome screen to display
	clk=false;

	//initialize bubble
	bubble=document.getElementById("bubble");

	//check browser width and height
	getWidthHeight();

	//check bubble position using a custom function (and then use these values to place the logo)
	getOffsetRect(bubble);

	//load logo in relation to bubble
	positionLogo();	

	//make sure page is at the top with first project loaded
	$('html').scrollTop(0);

	//----------------------------------------------------WELCOME SCREEN CLICKS

	$('#ccmad').click(function(){
		if(!clk) {
			disappearWelcome();
		} else {
			if (!navOff){
				hideNav();
			} else {
				showNav();
			}
			navOff=!navOff;
		}
	});

	$('#welcome-screen').click(disappearWelcome);

	//----------------------------------------------------MAIN MENU HOVER 
	$('.scroll').hover(function(){
		$(this).next().css('opacity','1');
	}, function(){
		$(this).next().css('opacity','0');

		//changes the square to current color
		$(whichMenu).addClass("current");
		//turns on label
		$(whichLabel).css('opacity','1');
	})

	//---------------------------------------------------MAIN MENU CLICK
	$('.scroll').click(function(){

		mainNav=true;
		//console.log ('mainNav is '+ mainNav);

		whichMenu="#" + $(this).attr('id');
		//store current page to make sure it stays on in hover function
		whichLabel="#" + $(this).next().attr('id');

		//console.log("whichMenu: " + whichMenu + " whichLabel: " + whichLabel);
		
		loadPageIdentification();
	});
			
	//--------------------------------------------------PROJECT MENU HOVER
	$('.p-name').hover(function(){

		//console.log ('mainNav is ' + mainNav);
		//console.log(whichMenu);
		$(this).next().css('opacity','1');

		//make sure projects label is visible only if it isn't already
		if (whichMenu != "#menu-project"){
			$('#label-project').css('opacity','1');
		}
	}, function(){
		$(this).next().css('opacity', '0');

		if (whichMenu != "#menu-project"){
			$('#label-project').css('opacity','0');
		}	});

	//--------------------------------------------------PROJECT MENU CLICK
	$('.p-name').click(function(){

		mainNav=false;
		console.log ('mainNav is '+ mainNav);

		//console.log('p-name click');
		whichProject="#" + $(this).attr('id');
		whichTitle="#" + $(this).next().attr('id');
		
		//Make sure PROJECTS is viewable
		loadMenuProject();

		//Load this project as the submenu to PROJECTS //
		loadProjectIdentification();
	});	

	//--------------------------------------------------UP BUTTON
	$('#menu-top').click(function(){

		//at first whichMenu is #menu-top
		//console.log('#menu-top clicked and whichMenu is ' + whichMenu);

		//load first project
		loadMenuProject();

		//now whichMenu is #menu-projects
		//console.log('#menu-top clicked and whichMenu is ' + whichMenu);

		loadFirstProject();		
		loadPageIdentification();
	});

	//--------------------------------------------------CUSTOM FUNCTIONS
	function getWidthHeight(){
	    dh=$(document).height();
	    dw=$(document).width();
	    wh=$(window).height();
		ww=$(window).width();
			
	    //console.log("document height (dh) is " + dh);
	    //console.log("window height (wh) is " + wh);
	}

	function positionLogo() {
	    getWidthHeight();
		//update logo position values
		getOffsetRect(bubble);
		
		$('#ccmad').css({
			top:ltop,
			left:lleft
		});
	}

	function disappearWelcome() {
		clk=true;

		$('#welcome-message p').fadeOut(500);
		$('#welcome-message h1').fadeOut(500);
		$('#bubble').fadeOut(100);
		$('#ccmad').animate(
			{
			//scale down
			width:'237.51px',
			height:'138.33px',
			//move location
			top:'-30px',
			left:'0px'},
			2000,
			function() {
				$('#welcome-screen').fadeOut(500,
					function() {
						$('#project-menu').show();
					});//project menu show
				});//welcome screen fade out

		//load PROJECT
		loadMenuProject();
		//load first project
		loadFirstProject();
	}

	function loadMenuProject(){
		//load project as current

		console.log('loadMenuProject');
		whichMenu="#menu-project";
		whichLabel="#label-project";
		loadPageIdentification();
	}

	function loadFirstProject(){
		//initialize first project

		whichProject="#" + $('#project-menu a:first-child').attr('id');
		console.log(whichProject);
		whichTitle="#" + $('#project-menu a:first-child').next().attr('id');

		loadProjectIdentification();
	}

	function loadPageIdentification(){
		//console.log("load page identification");

		//resets current class and labels
		$(".current").removeClass("current");
		$(".label").css('opacity','0');

		//changes the square to current color
		$(whichMenu).addClass("current");
		//turns on label
		$(whichLabel).css('opacity','1');

		/* if user clicks off PROJECTS, need to reset it to first project, SOS,
		   because that is what will load when PROJECTS is chosen */
		if (whichMenu != "menu-project"){
			$('#label-project').text('PROJECTS');
		}

	}

	//check how many times loadProjectIdentification is called because it seems like a lot
	function loadProjectIdentification(){

		var projName=$(whichTitle).text();

		console.log('loading project id: ' + projName)

		$('#label-project').text('PROJECTS // ' + projName);

	}

	//hideNav
	function hideNav(){
		alert('hiding nav')
	}

	function showNav(){
		alert('showing nav')
	}

	//place the bubble
	function getOffsetRect(elem) {
		    /* getBoundingClientRect() returns a TextRectangle object
		       that specifies the bounding rectangle of the current element or 
		       TextRange object, in pixels, relative to the upper-left corner
		       of the browser's client are, so it returns top and left */
		    var box = elem.getBoundingClientRect()
		     
		    var body = document.body

		    /* The documentElement property returns the documentElement of a document,
		       as an Element object. For HTML documents the returned object is the HTML element. 
		       It's part the HTML DOM */
		    var docElem = document.documentElement
		     
		    /* Get the initial coordinates of where the page currently is 
		       I don't understand the OR logic in this part */
		    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
		    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft
		    //console.log('scrollTop is ' + scrollTop)
		     
		    // clientTop gets the height of an element's top border 
		    var clientTop = docElem.clientTop || body.clientTop || 0
		    var clientLeft = docElem.clientLeft || body.clientLeft || 0
		     
		    /* The top of the bubble should be the top offset plus the top of the document
		       minus the view currently shown...or something like that...CHECK THIS EXPLANATION */
		     btop  = box.top +  scrollTop - clientTop
		     bleft = box.left + scrollLeft - clientLeft

			//console.log("bubble top is " + btop + " bubble left is " + bleft)
	     
		    // return { top: Math.round(btop), left: Math.round(bleft) }
		
			// the logo is placed at the same offset as the bubble
			 ltop = btop
			 lleft = bleft			
		}

	//--------------------------------------------------MANUAL SCROLL

	
	//event to update current link if user has scrolled 
	$(window).scroll(function() {

		console.log('scrolling');

    	var windowTop = Math.max($('body').scrollTop(), $('html').scrollTop());

    	/* This is not yet working, have to do a little more research and trial...
    	//assign this function to each element with the scroll class, by index
    	$('section.slide').each(function (index) {
       	 	if (windowTop > ($(this).position().top))
        	{
        	    console.log('The scroll is at ' + $(this).attr('id'));
        	    //$('#main a.current').removeClass('current');
        	    //$('#main a:eq(' + index + ')').addClass('current');
       		 }
    	});
		*/

	}).scroll();


	//--------------------------------------------------WINDOW RESIZE AND REFRESH

	//window resize
	$(window).resize(function() {
		getWidthHeight();
		
		//boolean function-if the user has not yet clicked, make sure large logo is correctly placed
		if (!clk)  
			positionLogo();
	});

	//window refresh
	$(window).load(function() {
  		//This doens't make sense but if you first change html to scroll
  		//to a number other than 0, it wakes up the browser
  		$('html').scrollTop(1);
  		//load logo in relation to bubble...
  		//THIS WAS MISSING AND IS WHY ON REFRESH OFTEN THE LOGO WAS IN THE WRONG PLACE
		positionLogo();	
  	}); 

	//--------------------------------------------------NAVIGATION SCROLL
		 
	function filterPath(string) {
	    return string
	      .replace(/^\//,'')
	      .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
	      .replace(/\/$/,'');
	  }

	  $('a[href*=#]').each(function() {
	    if ( filterPath(location.pathname) == filterPath(this.pathname)
	    && location.hostname == this.hostname
	    && this.hash.replace(/#/,'') ) {
	      var $targetId = $(this.hash), $targetAnchor = $('[name=' + this.hash.slice(1) +']');
	      var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;
	       if ($target) {
	         var targetOffset = $target.offset().top;
	         $(this).click(function() {

	         	//if PROJECTS is chosen from the main menu or up button, add label of first project
	    		if (whichMenu == "#menu-project" && mainNav){
	    			console.log('projects chosen from mainNav');
				loadFirstProject();
				}

	           //scrolling
	           $('html, body').animate({scrollTop: targetOffset}, 1000);
	           return false;
	         });
	      }
	    }
	  });

	  // var deck = new $.scrolldeck();
	  
});