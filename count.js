/** * Created by uiwwnw on 2017-04-03.*/
var counter = function (elem, during) {
    'use strict';
    function elem_return(elem, cut) {
        var cssElem = elem.replace('.', '').replace('#', '').trim();
        if (elem.match('.')) {
            cut.dom = document.getElementsByClassName(cssElem);
        } else if (elem.match('#')) {
            cut.dom = document.getElementById(cssElem);
        } else {
            cut.dom = document.getElementsByTagName(elem);
        }
        return cut;
    }
    function counters(elem, during) {
        (during === undefined) && (during = 1000);
        var cut = {};
        elem_return(elem, cut);
        cut.length = cut.dom.length;
        cut.position = [];
        cut.txt = [];
        cut.swit = 0;
        cut.check = 0;
        cut.during = during;
        cut.body = {};
        counters.prototype.sizeCheck(cut);
        counters.prototype.init(cut);
        counters.prototype.check(cut);
        counters.prototype.refresh();
    }
    counters.prototype = {
        init: function (cut) {
            var i = 0,
                zeroIndex = cut.dom[0].offsetTop - 200;
            for (i; i < cut.length; i += 1) {
                cut.txt.push(cut.dom[i].innerHTML);
                cut.position.push(cut.dom[i].offsetTop);
            }
            if (zeroIndex < 0) {
                zeroIndex = 0;
            }
            cut.position.unshift(zeroIndex);
            return cut;
        },
        check: function (cut) {
            document.addEventListener("scroll", function () {
                var i = cut.length;
                cut.body.y = window.scrollY //Modern Way (Chrome, Firefox)
                    || window.pageYOffset //(Modern IE, including IE11
                || document.documentElement.scrollTop; //(Old IE, 6,7,8)
                for (i; i >= 0; i -= 1) {
                    if (cut.body.y === 0) {
                        cut.check = -1;
                        counters.prototype.start(cut);
                    } else if (cut.position[i] - cut.body.height / 2 < cut.body.y) {
                        cut.check = i - 1;
                        counters.prototype.start(cut);
                        return false;
                    }
                }
            });
        },
        setup: function (cut, idx) {
            var num = cut.txt[idx] / cut.during * 10,
                displayNum = 0,
                si;
            cut.speed = cut.txt[idx] / num / cut.during * 100;
            si = setInterval(function () {
                displayNum = displayNum + num;
                cut.dom[idx].innerHTML = Math.ceil(displayNum);
                if (displayNum >= cut.txt[idx]) {
                    cut.dom[idx].innerHTML = cut.txt[idx];
                    clearInterval(si);
                    return false;
                }
            }, cut.speed);
            // counters.prototype.stop(cut, si);
        },
        start: function (cut) {
            var i = cut.swit;
            for (i; i <= cut.check; i += 1) {
                cut.dom[i].innerHTML = 0;
                counters.prototype.setup(cut, i);
            }
            cut.swit = cut.check + 1;
        },
        // stop: function (cut, si) {
        //     setTimeout(function () {
        //         clearInterval(si);
        //     }, cut.during * 1.5);
        // },
        sizeCheck: function (cut) {
            cut.body.width = window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth;
            cut.body.height = window.innerHeight ||
                document.documentElement.clientHeight ||
                document.body.clientHeight;
            return cut;
        },
        refresh: function () {
            document.addEventListener("resize", function () {
                counters.prototype.sizeCheck();
            }, false);
        }
    };
    counters(elem, during);
};

// version 0.5
// https://github.com/uiwwnw/scrollcounter