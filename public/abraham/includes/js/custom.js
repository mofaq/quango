/*Some simple sizing stuff*/

jQuery.event.add(window, "load", resizeFrame1);
jQuery.event.add(window, "load", setDefaults);
jQuery.event.add(window, "load", panelHeight);

jQuery.event.add(window, "resize", resizeFrame1);
jQuery.easing.def = "easeOutBounce";




function choose(lang){
  $(".primary-option").removeClass("selected");
  var language = $("#"+lang).attr("alias");
  var lantext = $(language).text();
  $("#"+lang).addClass("selected");
  $(".language_filter").text(language)
}

function chooseCountry(lang){
  $("#"+lang).siblings().removeClass("selected");
  var language = $("#"+lang).attr("alias");
  var lantext = $(language).text();
  $("#"+lang).addClass("selected");
  $(".country_filter").text(language)
}


function setDefaults()
{
  $("input:hidden[name=text-direction]").val('ltr');
	// $('html').attr('dir','ltr'); //
	$('[dir|="null"]').attr('dir','ltr'); //
	$(".text-direction").text('ltr');
	$(".text-direction").text('ltr');
    $("input:hidden[name=language-filter]").val('english');
  choose('lang_1');
  chooseCountry('country_1');
	//$(".language_filter").text('english');
	$("#map_canvas").css('float','right');
	$("#panel").css('float','left');
	$("#language-list").css('float','left').css('display','none');
	$("#country-list").css('float','left').css('display','none');
	$(".logo").css('float','left');
	$(".search").css('float','left');
	$(".choose").css('float','left');
  $(".select_language").load("./select_language.html");
  $(".select_country").load("./select_country.html");
}

function panelHeight()
{
	var hmod = 256
	var wh = $(window).height();
  var ph = (wh-hmod);
	$(".panel-container").css('min-height',ph);
	$(".viewport").css('height',(ph));
	$("#language-selector").css('height',(ph));
	$("#country_selector").css('height',(ph));

	var pch = $(".panel-container").height();


  $(".panel-container-height").text(pch);

  $('#scrollbar1').tinyscrollbar({ size: pch });
  $('#scrollbar2').tinyscrollbar({ size: (pch-101)});


  if (ph >= pch){
  $(".psb").text('false');
  



  }else{
  $(".psb").text('true');


  }
}

$(document).ready(function() {
$('a.add').click(function(ev){
    ev.preventDefault();
    $('.inner-results').children(':first').clone().appendTo('.inner-results');
    $('.inner-results').children(':first').clone().appendTo('.inner-results');
    $('.inner-results').children(':first').clone().appendTo('.inner-results');
    panelHeight();


});
$('a.remove').click(function(ev){
    ev.preventDefault();
    $('.inner-results').children(':first').remove();
    panelHeight();

});

});


function resizeFrame() 
{
	var hmod = 101
	var wmod = 381
	var wselector = 256
	var h = $(window).height();
  var w = $(window).width();
  $("#content").css('height',(h - hmod));
  $("#content").css('width',(w))
  $("#panel").css('height',(h - hmod));
  $("#panel").css('width',(wmod));
  $("#map_canvas").css('height',(h - hmod));
	$("#map_canvas").css('width', (w));

	$(".language_filter").text(h);

	$(".wheight").text(h);
	$(".wwidth").text(w);

  panelHeight();
  initMap();

}


function resizeFrame1() 
{
	var hmod = 101
	var wmod = 381
	var wselector = 256
	var h = $(window).height();
  var w = $(window).width();
  $("#content").css('height',(h - hmod));
  $("#content").css('width',(w))
  $("#panel").css('height',(h - hmod));
  $("#panel").css('width',(wmod));
  $("#language-list").css('width',(wselector));
  $("#language-list").css('height',(h - hmod));
  $("#country-list").css('width',(wselector));
  $("#country-list").css('margin-left',(wmod));
  $("#language-list").css('margin-left',(wmod));
  $("#country-list").css('height',(h - hmod));
  $("#map_canvas").css('height',(h - hmod));
	$("#map_canvas").css('width', (w - wmod));

	$(".wheight").text(h);
	$(".wwidth").text(w);

  panelHeight();
  initMap();

}

function resizeFrame2() 
{
	var hmod = 101
	var wmod = 381
	var wselector = 256
	var h = $(window).height();
    var w = $(window).width();
  $("#content").css('height',(h - hmod));
  $("#content").css('width',(w))
  $("#panel").css('height',(h - hmod));
  $("#panel").css('width',(wmod));
  $("#language-list").css('width',(wselector));
  $("#language-list").css('height',(h - hmod));
  $("#country-list").css('width',(wselector));
  //$("#country-list").css('margin-right',(w + wselector));
  //$("#language-list").css('margin-right',(w + wselector));
  $("#country-list").css('height',(h - hmod));
  $("#map_canvas").css('height',(h - hmod));
	$("#map_canvas").css('width', (w - wmod - wselector));


	$(".wheight").text(h);
	$(".wwidth").text(w);

}

function resizeFrame3() 
{
	var hmod = 101
	var wmod = 381
	var wselector = 256
	var h = $(window).height();
    var w = $(window).width();
  $("#content").css('height',(h - hmod));
  $("#content").css('width',(w))
  $("#map_canvas").css('height',(h - hmod));
	$("#map_canvas").css('width', (w));


	$(".wheight").text(h);
	$(".wwidth").text(w);

}

$(document).ready(function() {
  $('button#results').click(function() {
  $(".searches").hide();
  $(".shortlist").hide();
  $(".results").show();

  panelHeight();

    });
});



$(document).ready(function() {
  $('button#searches').click(function() {
  $(".results").hide();
  $(".shortlist").hide();
  $(".searches").show();
  $(".searches").load("./my-searches.html");

  panelHeight();
  panelHeight();

    });
});

$(document).ready(function() {
  $('button#shortlist').click(function() {
  $(".results").hide();
  $(".searches").hide();
  $(".shortlist").show();
  $(".shortlist").load("./my-shortlist.html");

  panelHeight();
  panelHeight();

    });
});


$(document).ready(function() {
  $('button.ltr').click(function() {
    $("input:hidden[name=text-direction]").val('ltr');
	$(".text-direction").text('ltr');
	$('[dir]').attr('dir','ltr'); // 
  $('.left').toggleClass('left').toggleClass('right');
	$("#map_canvas").css('float','right');
	$("#panel").css('float','left');
	$(".logo").css('float','left');
	$(".search").css('float','left');
  $(".results").load("./results.html");
	resizeFrame1();
    });
});


$(document).ready(function() {
  $('button.ltr').click(function() {
    $("input:hidden[name=text-direction]").val('ltr');
	$(".text-direction").text('ltr');
	$('[dir]').attr('dir','ltr'); // 
  $('.left').toggleClass('left').toggleClass('right');
	$("#map_canvas").css('float','right');
	$("#panel").css('float','left');
	$(".logo").css('float','left');
	$(".search").css('float','left');
  $(".results").load("./results.html");
	resizeFrame1();
    });
});

$(document).ready(function() {
  $('button.rtl').click(function() {
    $("input:hidden[name=text-direction]").val('rtl');
	$(".text-direction").text('rtl');
	$('[dir]').attr('dir','rtl'); //
  $('.right').toggleClass('right').toggleClass('left');
	$("#map_canvas").css('float','left');
	$("#panel").css('float','right');
	$(".logo").css('float','right');
	$(".search").css('float','right');
  $(".results").load("./results-arabic.html");
	resizeFrame1();
    });
});

$(document).ready(function() {
  var w = $(window).width();
  var d = $("input:hidden[name=text-direction]").val();
	$('.language-out').click(function() {
    var $panel = $('#language-list');
    if (d == 'ltr'){
      $panel.animate({
        marginLeft: parseInt($panel.css('marginLeft'),10) == 0 ?
          -$panel.outerWidth(+40) : 0
      });

    }
    if (d == 'rtl'){
      $panel.animate({
        marginRight: parseInt($panel.css('marginRight'),10) == 0 ?
          -$panel.outerWidth(+40) : 0
      });

    }
	$("#language-list").css({display:'inline'}).animate();
	$("#language-list").css({width:256});

	resizeFrame2();
	initMap();
/*$("#panel").animate({"marginLeft": "-=340px"}, "fast");*/
  });
});

$(document).ready(function() {
  var w = $(window).width();
  var d = $("input:hidden[name=text-direction]").val();
	$('.country-out').click(function() {
    var $panel = $('#country-list');
    if (d == 'ltr'){
      $panel.animate({
        marginLeft: parseInt($panel.css('marginLeft'),10) == 0 ?
          +$panel.outerWidth(+40) : 0
      });


    }
    if (d == 'rtl'){
      $panel.animate({
        marginRight: parseInt($panel.css('marginRight'),10) == 0 ?
          +$panel.outerWidth(+40) : 0

      });

    }
	$("#language-list").css({display:'none'});
	$("#country-list").css({display:'inline'});
	$("#country-list").css({width:256});

	resizeFrame2();
	//initMap();
/*$("#panel").animate({"marginLeft": "-=340px"}, "fast");*/
  });
});

$(document).ready(function() {
  var w = $(window).width();
  var d = $("input:hidden[name=text-direction]").val();
	$('button.country-in').click(function() {
    var $panel = $('#country-list');
    if (d == 'ltr'){
      $panel.animate({
        marginLeft: parseInt($panel.css('marginLeft'),10) == 0 ?
          -$panel.outerWidth(+40) : 0
      });

    }
    if (d == 'rtl'){
      $panel.animate({
        marginRight: parseInt($panel.css('marginRight'),10) == 0 ?
          $panel.outerWidth(+40) : 0
      });

    }
	$("#country-list").hide();
	$("#map_canvas").animate({width:w-(381)},700);
	$("#map_canvas").css({width:w-(381)});
	//$("#country-list").css({width:256});

	//resizeFrame2();
	initMap();
    //$("#language-list").toggle();
    //$("#country-list").toggle();
    resizeFrame1();

  });
});


$(document).ready(function() {
  var w = $(window).width();
  var d = $("input:hidden[name=text-direction]").val();
	$('.language-in').click(function() {
    var $panel = $('#language-list');
    if (d == 'ltr'){
      $panel.animate({
        marginLeft: parseInt($panel.css('marginLeft'),10) == 0 ?
          -$panel.outerWidth(+40) : 0
      });

    }
    if (d == 'rtl'){
      $panel.animate({
        marginRight: parseInt($panel.css('marginRight'),10) == 0 ?
          -$panel.outerWidth(+40) : 0
      });

    }
	$("#language-list").hide();
	//$("#language-list").css({width:256});

	$("#map_canvas").animate({width:w-(381)},700);
	$("#map_canvas").css({width:w-(381)});

	resizeFrame1();
	//initMap();*/
    //$("#language-list").toggle();
    //$("#country-list").toggle();
   // resizeFrame1();
  });
});


$(document).ready(function() {
  var w = $(window).width();
  var d = $("input:hidden[name=text-direction]").val();
	$('button.panel-out').click(function() {
    var $panel = $('#panel');
    if (d == 'ltr'){
      $panel.animate({
        marginLeft: parseInt($panel.css('marginLeft'),10) == 0 ?
          +$panel.outerWidth(+40) : 0
      });

    }
    if (d == 'rtl'){
      $panel.animate({
        marginRight: parseInt($panel.css('marginRight'),10) == 0 ?
          +$panel.outerWidth(+40) : 0
      });

    }
	$("#panel").css({display:'inline'});
	$("#panel").css({width:381});
	$("#map_canvas").animate({width:w-381},700);
	$("#map_canvas").css({width:w-381});
	resizeFrame1();
	//initMap();
/*$("#panel").animate({"marginLeft": "-=340px"}, "fast");*/
  });
});

$(document).ready(function() {
  var w = $(window).width();
  var d = $("input:hidden[name=text-direction]").val();
	$('button.panel-in').click(function() {
    var $panel = $('#panel');
    if (d == 'ltr'){
      $panel.animate({
        marginLeft: parseInt($panel.css('marginLeft'),10) == 0 ?
          -$panel.outerWidth(+40) : 0
      });
    }
    if (d == 'rtl'){
      $panel.animate({
        marginRight: parseInt($panel.css('marginRight'),10) == 0 ?
          -$panel.outerWidth(+40) : 0
      });
    }
	$("#panel").css({display:'none'});
	$("#language-list").css({display:'none'});
	$("#country-list").css({display:'none'});
	$("#map_canvas").animate({width:w},700);
	$("#map_canvas").css({width:w});
	resizeFrame();
	//initMap();
/*$("#panel").animate({"marginLeft": "+=340px"}, "fast");*/
  });
});


/*just for the mockup*/

function createMap(geo,address) {
  var options = {
    center: geo,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    panControl: true,
    streetViewControl: true,
    mapTypeControl: false
  };
  var canvas = document.getElementById('map_canvas');
  var map =  new google.maps.Map(canvas,options);
  map.panBy(0,0);

  var marker = new google.maps.Marker({
    position: geo,
    map: map,
    icon: 'images/marker.png',
    title: "Stuff marker"
  });

  var overlay = new google.maps.InfoWindow({
    content: "<p style = \"color:black\"><div class=\"result-item\" style=\"padding:0\"><div class=\"right\"><a href=\"#\">Lorem ipsum dolor sit amet</a><br>consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</div><div class=\"right\"><b>Something: " +
      address[0] + "</b></div></div>"
  });
  overlay.open(map,marker);
  return map;
}

function initMap() {
	var map = null;
	var geo = new google.maps.LatLng(46.800358,-71.219401)
	var address = [
	"Abraham",
	"Rue Garneau",
	"Quebec City",
	"Quebec"
	];
	map = createMap(geo,address);

}

