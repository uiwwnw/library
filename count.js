/**
 * Created by uiwwnw on 2017-04-03.
 */
function _counter(className, during) {
    (during === undefined) && (during = 1000);
    var counter_item = document.getElementsByClassName(className);
    var counter_item_length = counter_item.length;
    var counter_item_txt = [];
    var si;
    var t = 1;
    for (var i = 0; i < counter_item_length; i++) {
        counter_item_txt.push(counter_item[i].innerHTML);
        counter_item[i].innerHTML = 0;
        spd(counter_item_txt[i], i);
    }
    function spd(setNum, idx) {
        var num = setNum / during * 10;
        var speed = setNum / num / during * 100;
        var displayNum = 0;
        console.log(idx, speed, num);
        si = setInterval(function () {
            displayNum = displayNum + num;
            counter_item[idx].innerHTML = Math.ceil(displayNum);
            if (displayNum >= setNum) return counter_item[idx].innerHTML = setNum;
        }, speed);
        stop(si, during, speed)
    }

    function stop(id, during, speed) {
        setTimeout(function () {
            clearInterval(id);
            clearInterval(a);
        }, during + speed * 5);
        var a = setInterval(function () {
            console.log(t++, counter_item_txt[0]);
        }, 1000)
    }
}