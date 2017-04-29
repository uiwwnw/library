/** * Created by uiwwnw on 2017-04-03.*/
function elem_return(elem, cut) {
    'use strict';
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

function counter(elem, during) {
    'use strict';
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
    counter.prototype.sizeCheck(cut);
    counter.prototype.init(cut);
    counter.prototype.check(cut);
    counter.prototype.refresh();
}
counter.prototype = {
    init: function (cut) {
        'use strict';
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
        'use strict';
        document.addEventListener("scroll", function () {
            var i = cut.length;
            cut.body.y = window.scrollY;
            for (i; i >= 0; i -= 1) {
                if (cut.body.y === 0) {
                    cut.check = -1;
                    counter.prototype.start(cut);
                } else if (cut.position[i] - cut.body.height / 2 < cut.body.y) {
                    cut.check = i - 1;
                    counter.prototype.start(cut);
                    return false;
                }
            }
        });
    },
    setup: function (cut, idx) {
        'use strict';
        var num = cut.txt[idx] / cut.during * 10,
            displayNum = 0,
            si;
        cut.speed = cut.txt[idx] / num / cut.during * 100;
        si = setInterval(function () {
            displayNum = displayNum + num;
            cut.dom[idx].innerHTML = Math.ceil(displayNum);
            if (displayNum >= cut.txt[idx]) {
                clearInterval(si);
                cut.dom[idx].innerHTML = cut.txt[idx];
                return false;
            }
        }, cut.speed);
        counter.prototype.stop(cut, si);
    },
    start: function (cut) {
        'use strict';
        var i = cut.swit;
        for (i; i <= cut.check; i += 1) {
            cut.dom[i].innerHTML = 0;
            counter.prototype.setup(cut, i);
        }
        cut.swit = cut.check + 1;
    },
    stop: function (cut, si) {
        'use strict';
        setTimeout(function () {
            clearInterval(si);
        }, cut.during * 1.5);
    },
    sizeCheck: function (cut) {
        'use strict';
        cut.body.width = window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
        cut.body.height = window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight;
        return cut;
    },
    refresh: function () {
        'use strict';
        document.addEventListener("resize", function () {
            counter.prototype.sizeCheck();
        }, false);
    }
};
// version 0.5
// https://github.com/uiwwnw/scrollcounter