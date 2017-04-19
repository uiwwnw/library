/** * Created by uiwwnw on 2017-04-03.*/
function counter(elem, during) {
    (during === undefined) && (during = 1000);
    var cut = {};
    elem_return(elem, cut);
    cut.length = cut.dom.length;
    cut.position = [];
    cut.txt = [];
    cut.switch = 0;
    cut.check = 0;
    cut.during = during;
    cut.body = {};
    _counter.init(cut);
    _counter.sizeCheck(cut);
    _counter.check(cut);
    _counter.refresh();
};
function word_return(elem) {
    cssElem = elem.replace('.', '').replace('#', '').trim();
    return cssElem;
}
function elem_return(elem, cut) {
    word_return(elem);
    if (elem.match('.')) {
        cut.dom = document.getElementsByClassName(cssElem);
    } else if (elem.match('#')) {
        cut.dom = document.getElementById(cssElem);
    } else {
        cut.dom = document.getElementsByTagName(elem);
    }
    return cut;
}
var _counter = {
    init: function (cut) {
        for (var i = 0; i < cut.length; i++) {
            cut.txt.push(cut.dom[i].innerHTML);
            cut.position.push(cut.dom[i].offsetTop);
        }
        var zeroIndex = cut.dom[0].offsetTop - 200;
        if (zeroIndex < 0) {
            zeroIndex = 0
        }
        cut.position.unshift(zeroIndex);
        return cut;
    }
    , check: function (cut) {
        document.addEventListener("scroll", function () {
            cut.body.y = window.scrollY;
            for (var i = cut.length; i >= 0; i--) {
                if (cut.body.y === 0) {
                    cut.check = -1;
                    _counter.start(cut);
                } else if (cut.position[i] - cut.body.height / 2 < cut.body.y) {
                    cut.check = i - 1;
                    // console.log(cut.check)
                    _counter.start(cut);
                    return false;
                }
            }
        });
    }
    , setup: function (cut, idx) {
        var num = cut.txt[idx] / cut.during * 10;
        cut.speed = cut.txt[idx] / num / cut.during * 100;
        var displayNum = 0;
        var si = setInterval(function () {
            displayNum = displayNum + num;
            cut.dom[idx].innerHTML = Math.ceil(displayNum);
            if (displayNum >= cut.txt[idx]) return cut.dom[idx].innerHTML = cut.txt[idx];
        }, cut.speed);
        this.stop(cut, si)
    }
    , start: function (cut) {
        for (var i = cut.switch; i <= cut.check; i++) {
            cut.dom[i].innerHTML = 0;
            this.setup(cut, i);
        }
        cut.switch = cut.check + 1;
    }
    , stop: function (cut, si) {
        setTimeout(function () {
            clearInterval(si);
        }, cut.during * 1.1);
    }
    , sizeCheck: function (cut) {
        cut.body.width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
        cut.body.height = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;
        return cut;
    }
    , refresh: function () {
        document.addEventListener("resize", function () {
            _counter.sizeCheck();
        }, false);
    }
};
// version 0.3
// https://github.com/uiwwnw/scrollcounter