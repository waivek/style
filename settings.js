
!function(e){var n=!1;if("function"==typeof define&&define.amd&&(define(e),n=!0),"object"==typeof exports&&(module.exports=e(),n=!0),!n){var o=window.Cookies,t=window.Cookies=e();t.noConflict=function(){return window.Cookies=o,t}}}(function(){function g(){for(var e=0,n={};e<arguments.length;e++){var o=arguments[e];for(var t in o)n[t]=o[t]}return n}return function e(l){function C(e,n,o){var t;if("undefined"!=typeof document){if(1<arguments.length){if("number"==typeof(o=g({path:"/"},C.defaults,o)).expires){var r=new Date;r.setMilliseconds(r.getMilliseconds()+864e5*o.expires),o.expires=r}o.expires=o.expires?o.expires.toUTCString():"";try{t=JSON.stringify(n),/^[\{\[]/.test(t)&&(n=t)}catch(e){}n=l.write?l.write(n,e):encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),e=(e=(e=encodeURIComponent(String(e))).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent)).replace(/[\(\)]/g,escape);var i="";for(var c in o)o[c]&&(i+="; "+c,!0!==o[c]&&(i+="="+o[c]));return document.cookie=e+"="+n+i}e||(t={});for(var a=document.cookie?document.cookie.split("; "):[],s=/(%[0-9A-Z]{2})+/g,f=0;f<a.length;f++){var p=a[f].split("="),d=p.slice(1).join("=");this.json||'"'!==d.charAt(0)||(d=d.slice(1,-1));try{var u=p[0].replace(s,decodeURIComponent);if(d=l.read?l.read(d,u):l(d,u)||d.replace(s,decodeURIComponent),this.json)try{d=JSON.parse(d)}catch(e){}if(e===u){t=d;break}e||(t[u]=d)}catch(e){}}return t}}return(C.set=C).get=function(e){return C.call(C,e)},C.getJSON=function(){return C.apply({json:!0},[].slice.call(arguments))},C.defaults={},C.remove=function(e,n){C(e,"",g(n,{expires:-1}))},C.withConverter=e,C}(function(){})});

function toggle_option_display(elem) {
    var container = document.querySelector(".option_container");
    if (container.classList.contains("option_container_hidden")) {
        container.classList.remove("option_container_hidden");
        container.classList.add("option_container_shown");
        container.style.left = (elem.offsetLeft + elem.offsetWidth - container.offsetWidth);
        container.style.bottom = window.innerHeight - elem.offsetTop;
        elem.innerText = "-";
        /* /reposition_floating_element_and_options/ */
        elem.classList.add("floating_clicked");
    } else if (container.classList.contains("option_container_shown")) {
        container.classList.remove("option_container_shown");
        container.classList.add("option_container_hidden");
        elem.classList.remove("floating_clicked");
        elem.innerText = "+";
    }
}

function toggle_reader_mode(elem) {
    if (document.body.classList.contains("reader")) {
        document.body.classList.remove("reader");
        elem.innerText = "Reader Mode: OFF";
        Cookies.set("reader_mode", "off", {domain: "/style/"});
    } else {
        document.body.classList.add("reader");
        elem.innerText = "Reader Mode: ON";
        Cookies.set("reader_mode", "on", {domain: "/style/"});
    }
}

function reposition_floating_element_and_options() {
    var content = document.querySelector("#content");
    var elem = document.querySelector(".floating");
    var right_padding = 40;
    elem.style.left = content.offsetLeft + content.offsetWidth - elem.offsetWidth - right_padding + "px";
    elem.style.bottom =  right_padding;

    var container = document.querySelector(".option_container");
    container.style.left = (elem.offsetLeft + elem.offsetWidth - container.offsetWidth);
    // container.style.top = elem.offsetTop - container.offsetHeight;
    container.style.bottom = window.innerHeight - elem.offsetTop;
}

function set_theme(theme_string) {
    document.body.classList.remove("light");
    document.body.classList.remove("sepia");
    document.body.classList.remove("dark");
    
    document.body.classList.add(theme_string);
    Cookies.set("theme", theme_string, {domain: "/style/"});
}


function set_temperature(temperature_value) {
    var slider_value = document.querySelector(".slider_value");
    slider_value.innerText = temperature_value + "K"; 
    var classes = document.body.classList;

    for (var i = 0; i < classes.length; i++) {
        if (classes[i].startsWith("temperature_")) {
            document.body.classList.remove(classes[i]);
        }
    }
    document.body.classList.add("temperature_" + temperature_value);
    Cookies.set("temperature", String(temperature_value), {domain: "/style/"});
}

function add_floating_element() {
    var right_padding = 40;
    content = document.querySelector("#content");
    elem = document.createElement("div");
    elem.classList.add("floating");
    elem.classList.add("hide_options");
    elem.innerText = "+";
    document.body.appendChild(elem);
    elem.style.left = content.offsetLeft + content.offsetWidth - elem.offsetWidth - right_padding + "px";
    elem.style.bottom = right_padding;


    option_header = document.createElement("div");

    option_header.innerText = "Settings";
    option_header.classList.add("option_first");
    option_header.classList.add("option_header");

    option_1 = document.createElement("div");
    if (document.body.classList.contains("reader")) {
        option_1.innerText = "Reader Mode: ON";
    } else {
        option_1.innerText = "Reader Mode: OFF";
    }
    option_1.classList.add("option");
    // option_1.classList.add("option_first");
    option_1.classList.add("reader_mode_button");
    option_1.addEventListener("click", function () { toggle_reader_mode(option_1); });

    option_2 = document.createElement("div");

    theme_1 = document.createElement("div");
    theme_1.classList.add("option_theme");
    theme_1.classList.add("option_theme_light");
    theme_1.innerText = "Light";
    theme_1.addEventListener("click", function () { set_theme("light"); })

    theme_2 = document.createElement("div");
    theme_2.classList.add("option_theme");
    theme_2.classList.add("option_theme_sepia");
    theme_2.innerText = "Sepia";
    theme_2.addEventListener("click", function () { set_theme("sepia"); })

    theme_3 = document.createElement("div");
    theme_3.classList.add("option_theme");
    theme_3.classList.add("option_theme_dark");
    theme_3.innerText = "Dark";
    theme_3.addEventListener("click", function () { set_theme("dark"); })

    option_2.appendChild(theme_1);
    option_2.appendChild(theme_2);
    option_2.appendChild(theme_3);

    option_2.classList.add("option");
    option_2.classList.add("option_theme_container");

    option_3 = document.createElement("div");
    option_3.classList.add("option");

    slider = document.createElement("input");
    slider.setAttribute("type", "range");
    slider.setAttribute("min", 2000);
    slider.setAttribute("max", 6500);
    slider.setAttribute("step", 500);
    slider.setAttribute("value", 6500);
    slider.classList.add("slider");

    slider_value = document.createElement("span");
    slider_value.innerText = 6500;
    slider_value.classList.add("slider_value");

    // slider.addEventListener("input", function() { 
    //     slider_value.innerText = this.value; 
    //     var classes = document.body.classList;
    //
    //     for (var i = 0; i < classes.length; i++) {
    //         if (classes[i].startsWith("temperature_")) {
    //             document.body.classList.remove(classes[i]);
    //         }
    //     }
    //     document.body.classList.add("temperature_" + this.value);
    // });

    slider.addEventListener("input", function () { 
        set_temperature(this.value) ;
    });
    slider.classList.add("slider");

    option_3.appendChild(slider);
    option_3.appendChild(slider_value);


    option_4 = document.createElement("div");
    option_4.innerText = "Reset Settings";
    option_4.classList.add("option");
    option_4.classList.add("option_last");
    option_4.addEventListener("click", default_settings);

    container = document.createElement("div");
    container.classList.add("option_container");
    container.classList.add("option_container_hidden");

    container.appendChild(option_header);
    container.appendChild(option_1);
    container.appendChild(option_2);
    container.appendChild(option_3);
    container.appendChild(option_4);

    document.body.appendChild(container);

    elem.addEventListener("click", function () { toggle_option_display(elem); });
}

this.oldScroll = this.scrollY;
var net_y_floating_offset = 0;
function make_floating_element_respond_to_scroll (event) {
    var elem = document.querySelector(".floating");
    if (this.oldScroll < this.scrollY) {
        var y_offset = this.scrollY - this.oldScroll;
        net_y_floating_offset += y_offset / 10;
        elem.style.transform = "translateY(" + net_y_floating_offset + "px)";
        
        var elem_top = parseInt(elem.style.bottom) + (net_y_floating_offset * 10);
        console.log("elem_top: " + elem_top);
    } else if (this.oldScroll > this.scrollY) {
        console.log("up");
    }
    this.oldScroll = this.scrollY;

}

function default_settings() {
    set_theme("light");

    var slider = document.querySelector(".slider");
    slider.value = 6500;
    set_temperature(6500);

    reader_mode_button = document.querySelector(".reader_mode_button");
    if (!document.body.classList.contains("reader")) {
        toggle_reader_mode(reader_mode_button);
    }

    Cookies.set("cookies_exist", "true", {domain: "/style/"});
}
function cookie_settings() {
    set_theme(Cookies.get("theme"));

    var v = parseInt(Cookies.get("temperature"));
    var slider = document.querySelector(".slider");
    slider.value = v;
    set_temperature(v);

    var r = Cookies.get("reader_mode");
    reader_mode_button = document.querySelector(".reader_mode_button");
    if (r === "on") {
        toggle_reader_mode(reader_mode_button);
    } else if (r === "off") {
        toggle_reader_mode(reader_mode_button);
        toggle_reader_mode(reader_mode_button);
    }

}

    
function initialize() {
    add_floating_element();
    if (Cookies.get("cookies_exist") === "true") {
        cookie_settings();
    } else {
        default_settings();
    }
}

window.addEventListener("load", initialize);
window.addEventListener("resize", reposition_floating_element_and_options);
// window.addEventListener("scroll", make_floating_element_respond_to_scroll);
