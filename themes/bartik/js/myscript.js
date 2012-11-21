(function ($) {


	$(document).ready(function() {
		// alert("yess");

		Object.size = function(obj) {
		    var size = 0, key;
		    for (key in obj) {
		        if (obj.hasOwnProperty(key)) size++;
		    }
		    return size;
		};

		$("#facebook-button").click(function(){window.open("https://www.facebook.com/GdelaunayAKAminimalanimal");});
		$("#linkedin-button").click(function(){window.open("http://www.linkedin.com/pub/gonçalo-delaunay/17/443/64");});

		//change menus ids
		$("#block-system-main-menu div.content > ul.menu > li").each(function(){
		  var id = $(this).find("a").html().replace(" ", "-").toLowerCase() + "-menu-leaf";
		  $(this).attr("id", id);
		});

		//getting key press
		$(document).keydown(function(e){
		    if (e.keyCode == 37 || e.keyCode == 40) { 
		       scrollPrev();
		       return false;
		    }
			else if(e.keyCode == 38 || e.keyCode == 39)
		    { 
		       scrollNext();
		       return false;
		    }
		});

		//mousewheel
		$("body").mousewheel(function(event, delta) {
			this.scrollLeft -= (delta * 30);
			moveBGDeep(delta);
			event.preventDefault();
		}); 

		resizeRefresh();
		getNodeIds();
		changeRefs();


		$(window).resize(function() {
			resizeRefresh();
		});


	});

function changeRefs()
{
	var i = 0;
	$("#block-system-main-menu ul li ul li.leaf a").each(function(){
		var ref = $(this).attr("href");
		var pos = ref.indexOf("node/");
		if(pos !== -1)
		{
			ref = ref.substring(pos);
			ref = '#' + ref.replace('/', '-');
			$(this).removeAttr('href', '#');
			$(this).click(function(){
				scrollTo(ref);
			});
		}
		i++;
	});
}

function resizeRefresh()
{	
		var node_width = $(window).width();
		var body_height = $(window).height();
		var body_width = $(".views-row").size()*(node_width+8);
		$("body").css("width", body_width+"px");
		$("#page-wrapper").css("height", body_height+"px");
		$("div.views-row").css("width", node_width+"px");

		//determine the max window.width()
		scroll_max = $(document).width() - $(window).width();
}

var xPos=0;
var scroll_min = 0;
var scroll_max;
function moveBGDeep(delta)
{
	if($(window).scrollLeft() != 0 && $(window).scrollLeft() < scroll_max)
	{
		xPos += delta;
		if(xPos>0) xPos=0;

		// $("#bg-deep").css({ 'backgroundPosition': xPos + 'px ' + '0px' });
		$("#bg-deep").css({ 'left': xPos + 'px ' });
	}
}

function scrollNext(){
	//curr_node = Math.abs((curr_node+1)%$(".views-row .node").size());
	var curr = curr_node;
	incrementCurrNode();
	curr = curr-curr_node;

	$('body').animate({
	    scrollLeft: $("#"+getCurrentNode()).offset().left,

	   // scrollLeft: $("#node-"+(curr_node%$(".views-row .node").size())).offset().left
	 }, 1000);

	xPos += ((curr%$(".views-row .node").size())*$(window).width() )/32;
	if(xPos>0) xPos=0;

	$("#bg-deep").animate({
		'left': xPos+'px' 
	}, 1000);

}

function scrollPrev(){
	// curr_node = Math.abs((curr_node-1)%$(".views-row .node").size());
	var curr = curr_node;
	decrementCurrNode();
	curr = curr-curr_node;

	$('body').animate({
	    scrollLeft: $("#"+getCurrentNode()).offset().left
	 }, 1000);


	xPos += ((curr%$(".views-row .node").size())*$(window).width() )/32;
	//console.debug(xPos);
	$("#bg-deep").animate({
		'left': xPos+'px' 
	}, 1000);
}

function scrollTo(selector)
{
	var curr = curr_node;
	updateCurrNode(selector);
	curr = curr-curr_node;

	$('body').animate({
	    scrollLeft: $(selector).offset().left
	 }, 1000);

	xPos += ((curr%$(".views-row .node").size())*$(window).width() )/32;
	if(xPos>0) xPos=0;

	$("#bg-deep").animate({
		'left': xPos+'px' 
	}, 1000);
}

var ids;
var curr_node = $(".views-row .node").size()*10000;
function getNodeIds(){
	ids = new Object;
	var i = 0;
	$(".views-row .node").each(function(){
		ids[i] = $(this).attr('id');
		i++;
	});
	console.debug(ids);	
}

function updateCurrNode(selector)
{
	var ret = 0;
	for(var i in ids)
	{
		if(ids[i] == selector.substring(1))
		{
			curr_node=i;
			return i;
		}
	}
}

function getCurrentNode()
{

	return ids[Math.abs(curr_node%$(".views-row .node").size())];

	// return ids[curr_node];
}

function getCurrentNodeNumber()
{
	var result = ids[Math.abs(curr_node%$(".views-row .node").size())];

	return result.substring(result.length-1);
}

function incrementCurrNode()
{
	if(curr_node+1 == $(".views-row .node").size())
		curr_node = 0;
	else 
		curr_node++;

}
function decrementCurrNode()
{
	if(curr_node == 0)
		curr_node = $(".views-row .node").size()-1;
	else 
		curr_node--;
}

function openNewWindow(url)
{
	console.debug(url);
	window.open(url);
}

}(jQuery));


