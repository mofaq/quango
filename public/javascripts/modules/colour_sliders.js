/* This script and many more are available free online at
The JavaScript Source :: http://javascript.internet.com
Creatd by: Steve DeGroof :: http://degroof.blogspot.com */
//Heavily modified by Stephen Sullivan

var colorSquare;
var slHue;
var slSaturation;
var slLightness;
var start_top = 264;
var start_left = 32;
var swatches = [];
var auto = false;

function slider_init(){
	slHue=new SliderControl();
	slSaturation=new SliderControl();
	slLightness=new SliderControl();

	slHue.setSize(448,40);
	slHue.setPosition(start_left,start_top);
	slHue.setTracking(true, false);

	slSaturation.setSize(448,40);
	slSaturation.setPosition(start_left,start_top+56);
	slSaturation.setTracking(true, false);

	slLightness.setSize(448,40);
	slLightness.setPosition(start_left,start_top+112);
	slLightness.setTracking(true, false);

  colorSquare = document.getElementById('group_primary_dark');
  setSliders(colorSquare.style.backgroundColor);
  calculateHsl();

  ids = ['group_primary_dark','group_primary','group_secondary','group_tertiary','group_text_colour'];
  for(var i = 0; i < 5; i++){
    swatch = document.getElementById(ids[i]);
    swatches[i] = swatch;
  }

  slHue.setNotifier(calculateHsl);
  slSaturation.setNotifier(calculateHsl);
  slLightness.setNotifier(calculateHsl);
}

//Matches sliders to current swatch colour
function setSliders(color){
  rgb = rgbStringToRgb(color);
  hsl = rgbToHsl(rgb[0],rgb[1],rgb[2]);
  slHue.setValue(hsl[0]);
  slSaturation.setValue(hsl[1]);
  slLightness.setValue(hsl[2]);
}

//Toggles auto mode on and off
function set_auto(){
  auto = !auto;
}

//Triggered when a swatch is clicked
function swatch_click(id){
  swatch = document.getElementById(id);
  if(!swatch.className.match(/colorwell-selected/)){
    colorSquare.setAttribute('class','colorwell');
    colorSquare=swatch;
    colorSquare.setAttribute('class','colorwell colorwell-selected');
    setSliders(colorSquare.style.backgroundColor);
  }
}

//convert rgb to hsl (all values 0..1)
function rgbToHsl(r, g, b) {
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var l = (max + min) / 2;
  var h = 0;
  var s = 0;
  if(max != min)
  {
    if (l<.5) {
      s= (max - min) / (max + min);
    } else {
      s=(max - min) / (2 - max - min);
    }
    if (r==max) {
      h = (g-b)/(max-min)/6;
    }
    if (g==max) {
      h = (2.0 + (b-r)/(max-min))/6;
    }
    if (b==max) {
      h = (4.0 + (r-g)/(max-min))/6;
    }
  }
  if(h < 0) {
    h += 1;
  }
  return [h, s, l];
}

//calculate rgb component
function hToC(x, y, h) {
	var c;
	if(h < 0) {
	  h += 1;
	}
	if(h > 1) {
	  h -= 1;
	}
	if (h<1/6) {
	  c=x +(y - x) * h * 6;
	} else {
	  if(h < 1/2) {
	    c=y;
	  } else {
	    if(h < 2/3) {
	      c=x + (y - x) * (2 / 3 - h) * 6;
	    } else {
	      c=x;
	    }
	  }
	}
	return c;
}

//convert hsl to rgb (all values 0..1)
function hslToRgb(h, s, l){
	var
	  y = (l > .5)?
	    l + s - l * s:
	    l * (s + 1),
	  x = l * 2 - y,
	  r = hToC(x, y, h + 1 / 3),
	  g = hToC(x, y, h),
	  b = hToC(x, y, h - 1 / 3);
	return [r, g, b];
}

//convert hsl to an html color string
function hslToHtmlColor(h,s,l) {
	var rgb=hslToRgb(h,s,l);
	return "#"+toHex(rgb[0]*255)+toHex(rgb[1]*255)+toHex(rgb[2]*255);
}

//convert decimal to hex
function toHex(decimal,places) {
	if(places == undefined || isNaN(places))  places = 2;
	var hex = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");
	var next = 0;
	var hexidecimal = "";
	decimal=Math.floor(decimal);
	while(decimal > 0) {
	  next = decimal % 16;
	  decimal = Math.floor((decimal - next)/16);
	  hexidecimal = hex[next] + hexidecimal;
	}
	while (hexidecimal.length<places) {
	  hexidecimal = "0"+hexidecimal;
	}
	return hexidecimal;
}

//listens for any hsl slider change
//calculates html color and rgb slider values
function calculateHsl(x,y) {
  if (auto){
    var selected_hsl_offset = colorSquare.getAttribute('hsl').split(',');
    var selected_hue_offset = parseFloat(selected_hsl_offset[0]);
    var selected_sat_offset = parseFloat(selected_hsl_offset[1]);
    var selected_lum_offset = parseFloat(selected_hsl_offset[2]);
    var l = swatches.length;

    for(var i = 0; i < l; i++){
      swatch = swatches[i];
      swatch_hsl_offset = swatch.getAttribute('hsl').split(',');
      hue_diff = selected_hue_offset - parseFloat(swatch_hsl_offset[0]);
      sat_diff = selected_sat_offset - parseFloat(swatch_hsl_offset[1]);
      lum_diff = selected_lum_offset - parseFloat(swatch_hsl_offset[2]);

      hue = slHue.xValue + (slHue.xValue * hue_diff);
      sat = slSaturation.xValue + (slSaturation.xValue * sat_diff);
      lum = slLightness.xValue + (slLightness.xValue * lum_diff);
          
      hexcolor = hslToHtmlColor(hue,sat,lum);
      swatch.style.backgroundColor=hexcolor;
      swatch.style.color=hexcolor;
      swatch.value=hexcolor;
    }
  }

  else{
    hexcolor = hslToHtmlColor(slHue.xValue,slSaturation.xValue,slLightness.xValue);
    colorSquare.style.backgroundColor=hexcolor;
    colorSquare.style.color=hexcolor;
    colorSquare.value=hexcolor;
  }

  slHue.setColors(hslToHtmlColor(slHue.xValue,1,.5),'black');
  slSaturation.setColors(hslToHtmlColor(slHue.xValue,slSaturation.xValue,.5),'black');
  slLightness.setColors(hslToHtmlColor(.5,0,slLightness.xValue),'red');
}

//Convert rgb(x,y,z) style colour string to rgb array
function rgbStringToRgb(rgb_string){
  rgb = rgb_string.split(',');
  rgb[0] = parseFloat(rgb[0].slice(4))/255;
  rgb[1] = parseFloat(rgb[1].slice(1))/255;
  rgb[2] = parseFloat(rgb[2].slice(1,-1))/255;
  return rgb;
}

function invertSwatches(){
  var hsl_list = [];
  var color_list = [];
  for(var i=0; i < 5; i++){
    hsl_list[i] = swatches[0-i+4].getAttribute('hsl');
    color_list[i] = swatches[0-i+4].style.backgroundColor;
  }
  for(var i = 0; i < 5; i++){
    swatch = swatches[i];
    color = color_list[i];
    swatch.setAttribute('hsl',hsl_list[i]);
    swatch.style.backgroundColor = color;
    swatch.style.color=color;
    swatch.value=color;
  }
}
