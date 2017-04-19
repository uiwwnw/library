/** * Created by uiwwnw on 2017-04-03.*/
function counter(elem, during) {
    (during === undefined) && (during = 1000);
    var cut = {};
    if (elem.match('.')) {
        elem = elem.replace('.', '').trim();
        cut.dom = document.getElementsByClassName(elem);
    } else if (elem.match('#')) {
        elem = elem.replace('#', '').trim();
        cut.dom = document.getElementById(elem);
    } else {
        cut.dom = document.getElementsByTagName(elem);
    }
    console.log(cut.dom);
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
// function _counter(elem, during) {
//     (during === undefined) && (during = 1000);
//     var counter_item = document.getElementsByClassName(elem);
//     var counter_item_length = counter_item.length;
//     var counter_position = [];
//     var counter_switch = 0;
//     var bodySize = {};
//     var bodyScroll = {};
//     var counter_item_txt = [];
//     var si;
//     var position;
//     for (var i = 0; i < counter_item_length; i++) {
//         counter_item_txt.push(counter_item[i].innerHTML);
//         counter_position.push(counter_item[i].offsetTop);
//     }
//     function spd(setNum, idx) {
//         var num = setNum / during * 10;
//         var speed = setNum / num / during * 100;
//         var displayNum = 0;
//         si = setInterval(function () {
//             displayNum = displayNum + num;
//             counter_item[idx].innerHTML = Math.ceil(displayNum);
//             if (displayNum >= setNum) return counter_item[idx].innerHTML = setNum;
//         }, speed);
//         stop(si, during, speed)
//     }
//
//     function stop(id, during, speed) {
//         setTimeout(function () {
//             clearInterval(id);
//         }, during + speed * 5);
//         // '+ speed * 3' is complementary code about delay time.
//     }
//
//     function size() {
//         bodySize.width = window.innerWidth
//             || document.documentElement.clientWidth
//             || document.body.clientWidth;
//
//         bodySize.height = window.innerHeight
//             || document.documentElement.clientHeight
//             || document.body.clientHeight;
//         return bodySize;
//     }
//
//     function start(position) {
//         for (var i = counter_switch; i <= position; i++) {
//             counter_item[i].innerHTML = 0;
//             spd(counter_item_txt[i], i);
//         }
//         counter_switch = position + 2;
//         console.log(counter_switch)
//     }
//
//     document.addEventListener("scroll", function () {
//         bodyScroll.y = window.scrollY;
//         if (counter_position[position] < bodyScroll.y) {
//             start(position)
//         }
//         for (var i = counter_item_length - 1; i >= 0; i--) {
//             if (counter_position[i] < bodyScroll.y) {
//                 position = i;
//                 return false;
//             }
//         }
//     });
//     document.addEventListener("resize", function () {
//         size();
//     }, false);
//     // size();
// }
//version 0.2
