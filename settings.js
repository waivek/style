function toggle_option_display(elem) {
    var container = document.querySelector(".floating_options");
    if (container.classList.contains("floating_options_hidden")) {
        container.classList.remove("floating_options_hidden");
        container.classList.add("floating_options_shown");
        elem.innerText = "-";
        elem.classList.add("floating_button_clicked");
    } else if (container.classList.contains("floating_options_shown")) {
        container.classList.remove("floating_options_shown");
        container.classList.add("floating_options_hidden");
        elem.classList.remove("floating_button_clicked");
        elem.innerText = "";
    }
}

function toggle_reader_mode(elem) {
    if (document.body.classList.contains("reader")) {
        document.body.classList.remove("reader");
        elem.innerText = "Reader Mode: OFF";
        Cookies.set("reader_mode", "off", { path : "/style/"});
    } else {
        document.body.classList.add("reader");
        elem.innerText = "Reader Mode: ON";
        Cookies.set("reader_mode", "on", { path : "/style/"});
    }
}

function reposition_floating_element_and_options() {
    var content = document.querySelector("#content");
    var floating_container = document.querySelector(".floating_container");
    floating_container.style.right = content.offsetLeft + "px";
}

function set_theme(theme_string) {
    document.body.classList.remove("light");
    document.body.classList.remove("sepia");
    document.body.classList.remove("dark");
    
    document.body.classList.add(theme_string);
    Cookies.set("theme", theme_string, { path : "/style/"});
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
    Cookies.set("temperature", String(temperature_value), { path : "/style/"});
}

function add_floating_element() {
    var right_padding = 40;
    var content = document.querySelector("#content");
    floating_button = document.createElement("button");
    floating_button.classList.add("floating_button");
    floating_button.classList.add("hide_options");
    floating_button.innerText = "";

    option_header = document.createElement("div");

    option_header.innerText = "Settings";
    option_header.classList.add("option_header");

    option_1 = document.createElement("button");
    if (document.body.classList.contains("reader")) {
        option_1.innerText = "Reader Mode: ON";
    } else {
        option_1.innerText = "Reader Mode: OFF";
    }
    option_1.classList.add("option");
    option_1.classList.add("reader_mode_button");
    option_1.addEventListener("click", function () { toggle_reader_mode(option_1); });

    option_2 = document.createElement("div");

    theme_1 = document.createElement("button");
    theme_1.classList.add("option_theme");
    theme_1.classList.add("option_theme_light");
    theme_1.innerText = "Light";
    theme_1.addEventListener("click", function () { set_theme("light"); })

    theme_2 = document.createElement("button");
    theme_2.classList.add("option_theme");
    theme_2.classList.add("option_theme_sepia");
    theme_2.innerText = "Sepia";
    theme_2.addEventListener("click", function () { set_theme("sepia"); })

    theme_3 = document.createElement("button");
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

    slider.addEventListener("input", function () { 
        set_temperature(this.value) ;
    });
    /* IE Support: START */
    slider.addEventListener("change", function () { 
        set_temperature(this.value) ;
    });
    /* IE Support: END */
    slider.classList.add("slider");

    option_3.appendChild(slider);
    option_3.appendChild(slider_value);


    option_4 = document.createElement("button");
    option_4.innerText = "Reset Settings";
    option_4.classList.add("option");
    option_4.classList.add("option_last");
    option_4.addEventListener("click", default_settings);

    container = document.createElement("div");
    container.classList.add("floating_options");
    container.classList.add("floating_options_hidden");

    container.appendChild(option_header);
    container.appendChild(option_1);
    container.appendChild(option_2);
    container.appendChild(option_3);
    container.appendChild(option_4);

    floating_container = document.createElement("div");
    floating_container.classList.add("floating_container");
    floating_container.appendChild(container);
    floating_container.appendChild(floating_button);

    floating_container.style.right = content.offsetLeft + "px";

    document.body.appendChild(floating_container);

    floating_button.addEventListener("click", function () { toggle_option_display(floating_button); });
}

this.oldScroll = this.scrollY;
var net_y_floating_offset = 0;
function make_floating_element_respond_to_scroll (event) {
    var floating_button = document.querySelector(".floating_button");
    if (this.oldScroll < this.scrollY) {
        var y_offset = this.scrollY - this.oldScroll;
        net_y_floating_offset += y_offset / 10;
        floating_button.style.transform = "translateY(" + net_y_floating_offset + "px)";
        
        var elem_top = parseInt(floating_button.style.bottom) + (net_y_floating_offset * 10);
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

    Cookies.set("cookies_exist", "true", { path : "/style/"});
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
    if (!document.body.classList) {
        /*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */
        "document"in self&&("classList"in document.createElement("_")&&(!document.createElementNS||"classList"in document.createElementNS("http://www.w3.org/2000/svg","g"))||!function(t){"use strict";if("Element"in t){var e="classList",n="prototype",i=t.Element[n],s=Object,r=String[n].trim||function(){return this.replace(/^\s+|\s+$/g,"")},o=Array[n].indexOf||function(t){for(var e=0,n=this.length;n>e;e++)if(e in this&&this[e]===t)return e;return-1},c=function(t,e){this.name=t,this.code=DOMException[t],this.message=e},a=function(t,e){if(""===e)throw new c("SYNTAX_ERR","The token must not be empty.");if(/\s/.test(e))throw new c("INVALID_CHARACTER_ERR","The token must not contain space characters.");return o.call(t,e)},l=function(t){for(var e=r.call(t.getAttribute("class")||""),n=e?e.split(/\s+/):[],i=0,s=n.length;s>i;i++)this.push(n[i]);this._updateClassName=function(){t.setAttribute("class",this.toString())}},u=l[n]=[],h=function(){return new l(this)};if(c[n]=Error[n],u.item=function(t){return this[t]||null},u.contains=function(t){return~a(this,t+"")},u.add=function(){var t,e=arguments,n=0,i=e.length,s=!1;do t=e[n]+"",~a(this,t)||(this.push(t),s=!0);while(++n<i);s&&this._updateClassName()},u.remove=function(){var t,e,n=arguments,i=0,s=n.length,r=!1;do for(t=n[i]+"",e=a(this,t);~e;)this.splice(e,1),r=!0,e=a(this,t);while(++i<s);r&&this._updateClassName()},u.toggle=function(t,e){var n=this.contains(t),i=n?e!==!0&&"remove":e!==!1&&"add";return i&&this[i](t),e===!0||e===!1?e:!n},u.replace=function(t,e){var n=a(t+"");~n&&(this.splice(n,1,e),this._updateClassName())},u.toString=function(){return this.join(" ")},s.defineProperty){var f={get:h,enumerable:!0,configurable:!0};try{s.defineProperty(i,e,f)}catch(p){void 0!==p.number&&-2146823252!==p.number||(f.enumerable=!1,s.defineProperty(i,e,f))}}else s[n].__defineGetter__&&i.__defineGetter__(e,h)}}(self),function(){"use strict";var t=document.createElement("_");if(t.classList.add("c1","c2"),!t.classList.contains("c2")){var e=function(t){var e=DOMTokenList.prototype[t];DOMTokenList.prototype[t]=function(t){var n,i=arguments.length;for(n=0;i>n;n++)t=arguments[n],e.call(this,t)}};e("add"),e("remove")}if(t.classList.toggle("c3",!1),t.classList.contains("c3")){var n=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(t,e){return 1 in arguments&&!this.contains(t)==!e?e:n.call(this,t)}}"replace"in document.createElement("_").classList||(DOMTokenList.prototype.replace=function(t,e){var n=this.toString().split(" "),i=n.indexOf(t+"");~i&&(n=n.slice(i),this.remove.apply(this,n),this.add(e),this.add.apply(this,n.slice(1)))}),t=null}());
    }
    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function(searchString, position){
            return this.substr(position || 0, searchString.length) === searchString;
        };
    }
    if (!window.innerHeight) {
        (function(d,b){var c=b.documentElement;var a=b.body;var e=function(g,h,f){if(typeof g[h]==="undefined"){Object.defineProperty(g,h,{get:f})}};e(d,"innerWidth",function(){return c.clientWidth});e(d,"innerHeight",function(){return c.clientHeight});e(d,"scrollX",function(){return d.pageXOffset||c.scrollLeft});e(d,"scrollY",function(){return d.pageYOffset||c.scrollTop});e(b,"width",function(){return Math.max(a.scrollWidth,c.scrollWidth,a.offsetWidth,c.offsetWidth,a.clientWidth,c.clientWidth)});e(b,"height",function(){return Math.max(a.scrollHeight,c.scrollHeight,a.offsetHeight,c.offsetHeight,a.clientHeight,c.clientHeight)});return e}(window,document));
    }

    add_floating_element();
    if (Cookies.get("cookies_exist") === "true") {
        cookie_settings();
    } else {
        default_settings();
    }
    window.addEventListener("resize", reposition_floating_element_and_options);

    window.addEventListener("mousedown", function() {
        document.body.classList.add("using-mouse");
    });
    window.addEventListener("keydown", function() {
        document.body.classList.remove("using-mouse");
    });

    // var floating_button = document.querySelector(".floating_button");
    // toggle_option_display(floating_button);
}

if (!window.addEventListener) {
    // https://github.com/nbouvrette/eventListenerPolyfill/blob/master/eventListenerIEPolyfill.min.js
    !function(e,t,n){if((!e.addEventListener||!e.removeEventListener)&&e.attachEvent&&e.detachEvent){var r=function(e){return"function"==typeof e},a=function(e,t){var r=t[n];if(r)for(var a,i=r.length;i--;)if(a=r[i],a[0]===e)return a[1]},i=function(e,t,r){var i=t[n]||(t[n]=[]);return a(e,t)||(i[i.length]=[e,r],r)},o=function(e){var n=t[e];t[e]=function(e){return u(n(e))}},v=function(n,a){if(r(a)){var o=this;o.attachEvent("on"+n,i(o,a,function(n){n=n||e.event,n.preventDefault=n.preventDefault||function(){n.returnValue=!1},n.stopPropagation=n.stopPropagation||function(){n.cancelBubble=!0},n.target=n.target||n.srcElement||t.documentElement,n.currentTarget=n.currentTarget||o,n.timeStamp=n.timeStamp||(new Date).getTime(),a.call(o,n)}))}},c=function(e,t){if(r(t)){var n=this,i=a(n,t);i&&n.detachEvent("on"+e,i)}},u=function(e){var t=e.length;if(t)for(;t--;)e[t].addEventListener=v,e[t].removeEventListener=c;else e.addEventListener=v,e.removeEventListener=c;return e};if(u([t,e]),"Element"in e){var f=e.Element;f.prototype.addEventListener=v,f.prototype.removeEventListener=c}else t.attachEvent("onreadystatechange",function(){u(t.all)}),o("getElementsByTagName"),o("getElementById"),o("createElement"),u(t.all)}}(window,document,"x-ms-event-listeners");
}

!function(e){var n=!1;if("function"==typeof define&&define.amd&&(define(e),n=!0),"object"==typeof exports&&(module.exports=e(),n=!0),!n){var o=window.Cookies,t=window.Cookies=e();t.noConflict=function(){return window.Cookies=o,t}}}(function(){function g(){for(var e=0,n={};e<arguments.length;e++){var o=arguments[e];for(var t in o)n[t]=o[t]}return n}return function e(l){function C(e,n,o){var t;if("undefined"!=typeof document){if(1<arguments.length){if("number"==typeof(o=g({path:"/"},C.defaults,o)).expires){var r=new Date;r.setMilliseconds(r.getMilliseconds()+864e5*o.expires),o.expires=r}o.expires=o.expires?o.expires.toUTCString():"";try{t=JSON.stringify(n),/^[\{\[]/.test(t)&&(n=t)}catch(e){}n=l.write?l.write(n,e):encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),e=(e=(e=encodeURIComponent(String(e))).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent)).replace(/[\(\)]/g,escape);var i="";for(var c in o)o[c]&&(i+="; "+c,!0!==o[c]&&(i+="="+o[c]));return document.cookie=e+"="+n+i}e||(t={});for(var a=document.cookie?document.cookie.split("; "):[],s=/(%[0-9A-Z]{2})+/g,f=0;f<a.length;f++){var p=a[f].split("="),d=p.slice(1).join("=");this.json||'"'!==d.charAt(0)||(d=d.slice(1,-1));try{var u=p[0].replace(s,decodeURIComponent);if(d=l.read?l.read(d,u):l(d,u)||d.replace(s,decodeURIComponent),this.json)try{d=JSON.parse(d)}catch(e){}if(e===u){t=d;break}e||(t[u]=d)}catch(e){}}return t}}return(C.set=C).get=function(e){return C.call(C,e)},C.getJSON=function(){return C.apply({json:!0},[].slice.call(arguments))},C.defaults={},C.remove=function(e,n){C(e,"",g(n,{expires:-1}))},C.withConverter=e,C}(function(){})});
window.addEventListener("load", initialize);
// window.addEventListener("scroll", make_floating_element_respond_to_scroll);


