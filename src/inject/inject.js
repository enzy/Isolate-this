var html = $('html');
var body = $('body');

// Highlight active element with outline
// @TODO Fails at flash objects
// @TODO Fails at overflowed objects
addCSS(".isolatethis-shadow{ outline:2px solid rgba(255,255,0,0.5) }");
$(document).on('mousemove', function(e) {
	e.stopPropagation();
	$('.isolatethis-shadow').removeClass('isolatethis-shadow');
	$(e.target).addClass('isolatethis-shadow');
});

// Element is choosed
$(document).one('mousedown', function(e) {
	e.preventDefault();
	// Capture element
	var $el = $(e.target);
	var w = $el.outerWidth();
	var h = $el.outerHeight();
	// Make page still
	body.css({ width: body.width(), height: body.height() });
	html.css({ position: 'absolute', width: w, height: h });
	addCSS("::-webkit-scrollbar{display:none !important;} html, body{overflow-x:hidden !important; overflow-y:hidden !important;}");
	// Capture element position
	var pos = $el.offset();
	// Isolate element on page
	html.css({
		top: - pos.top,
		left: -pos.left,
		clip: 'rect(' + pos.top + 'px ' + (pos.left+w) + 'px ' + (pos.top+h) + 'px ' + pos.left + 'px)'
	});

	// Request a new window
	chrome.extension.sendMessage({
		width: w,
		height: h
	}, function(response) {
		// Make final window size correction
		resizeTo(w + gapW(), h + gapH());
		scrollTo(0,0);
	});

	// Clear higlighting of active element
	$(document).off('mousemove');
	$('.isolatethis-shadow').removeClass('isolatethis-shadow');

	return false;
});



/* Helpers */



// Window frame gaps
function gapW() {
	return Math.max(window.outerWidth - window.innerWidth,
	                window.outerWidth - document.documentElement.clientWidth);
};
function gapH() {
	return Math.max(window.outerHeight - window.innerHeight,
	                window.outerHeight - document.documentElement.clientHeight);
};

// Add CSS styles to document
function addCSS(styles) {
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = styles;
	document.body.appendChild(css);
};
