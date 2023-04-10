var circlecolorPicker = new iro.ColorPicker(".circlecolorPicker", {
    // color picker options
    // Option guide: https://iro.js.org/guide.html#color-picker-options
    width: 150,
    color: "rgb(255, 0, 0)",
    borderWidth: 1,
    borderColor: "#fff",
});

var circleColorvalues = document.getElementById("circleColorvalues");
var circleColor = document.getElementById("circleColor");
console.log(circleColor)

// https://iro.js.org/guide.html#color-picker-events
circlecolorPicker.on(["color:init", "color:change"], function(color){
    // Show the current color in different formats
    // Using the selected color: https://iro.js.org/guide.html#selected-color-api
    circleColorvalues.innerHTML = [
        "hex: " + color.hexString,
        "rgb: " + color.rgbString,
        "hsl: " + color.hslString,
    ].join("<br>");

    circleColor.value = color.hexString;
});

circleColor.addEventListener('change', function() {
    circlecolorPicker.color.hexString = this.value;
});


var circleStrokeColorPicker = new iro.ColorPicker(".circleStrokeColorPicker", {
    width: 150,
    color: "rgb(255, 0, 0)",
    borderWidth: 1,
    borderColor: "#fff",
});

var circleStrokeColorvalues = document.getElementById("circleStrokeColorvalues");
var circleStrokeColor = document.getElementById("circleStrokeColor");
console.log(circleStrokeColor)

circleStrokeColorPicker.on(["color:init", "color:change"], function(color){
    circleStrokeColorvalues.innerHTML = [
        "hex: " + color.hexString,
        "rgb: " + color.rgbString,
        "hsl: " + color.hslString,
    ].join("<br>");

    circleStrokeColor.value = color.hexString;
});

circleStrokeColor.addEventListener('change', function() {
    circleStrokeColorPicker.color.hexString = this.value;
});


// ----------------------------------------------------------------
var linecolorPicker = new iro.ColorPicker(".linecolorPicker", {
    width: 150,
    color: "rgb(255, 0, 0)",
    borderWidth: 1,
    borderColor: "#fff",
});

var lineColorvalues = document.getElementById("lineColorvalues");
var lineColor = document.getElementById("lineColor");
console.log(lineColor)

linecolorPicker.on(["color:init", "color:change"], function(color){
    lineColorvalues.innerHTML = [
        "hex: " + color.hexString,
        "rgb: " + color.rgbString,
        "hsl: " + color.hslString,
    ].join("<br>");

    lineColor.value = color.hexString;
});

lineColor.addEventListener('change', function() {
    linecolorPicker.color.hexString = this.value;
});

// --------------------------------------------------------------------
var polygoncolorPicker = new iro.ColorPicker(".polygoncolorPicker", {
    // color picker options
    // Option guide: https://iro.js.org/guide.html#color-picker-options
    width: 150,
    color: "rgb(255, 0, 0)",
    borderWidth: 1,
    borderColor: "#fff",
});

var polygonColorvalues = document.getElementById("polygonColorvalues");
var polygonColor = document.getElementById("polygonColor");
console.log(polygonColor)

// https://iro.js.org/guide.html#color-picker-events
polygoncolorPicker.on(["color:init", "color:change"], function(color){
    // Show the current color in different formats
    // Using the selected color: https://iro.js.org/guide.html#selected-color-api
    polygonColorvalues.innerHTML = [
        "hex: " + color.hexString,
        "rgb: " + color.rgbString,
        "hsl: " + color.hslString,
    ].join("<br>");

    polygonColor.value = color.hexString;
});

polygonColor.addEventListener('change', function() {
    polygoncolorPicker.color.hexString = this.value;
});



var outlineColorPicker = new iro.ColorPicker(".outlineColorPicker", {
    width: 150,
    color: "rgb(255, 0, 0)",
    borderWidth: 1,
    borderColor: "#fff",
});

var outlineColorvalues = document.getElementById("outlineColorvalues");
var outlineColor = document.getElementById("outlineColor");
console.log(outlineColor)

outlineColorPicker.on(["color:init", "color:change"], function(color){
    outlineColorvalues.innerHTML = [
        "hex: " + color.hexString,
        "rgb: " + color.rgbString,
        "hsl: " + color.hslString,
    ].join("<br>");

    outlineColor.value = color.hexString;
});

outlineColor.addEventListener('change', function() {
    outlineColorPicker.color.hexString = this.value;
});