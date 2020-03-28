var clock = document.querySelector('.clock');
var days = clock.querySelector('.days span'),
    hours = clock.querySelector('.hours span'),
    minutes = clock.querySelector('.minutes span'),
    seconds = clock.querySelector('.seconds span');
firstSemicolon = clock.querySelector('.semicolon:nth-child(2)');

//-----------------Часы---------------------------------//

var clockMode = function () {
    var dayOfW = [
        'воскресенье',
        'понедельник',
        'вторник',
        'среда',
        'четверг',
        'пятница',
        'суббота'
    ];
    days.classList.add('dayText');
    firstSemicolon.classList.add('hide');

    function initializeClock() {
        function startTime(){

            var tm = new Date();
            var d = tm.getDay();
            var h = tm.getHours().toString();
            var m = tm.getMinutes().toString();
            var s=tm.getSeconds().toString();
            var ms=tm.getMilliseconds().toString();

            days.innerHTML = dayOfW[d];
            hours.innerHTML = ('0' + h).slice(-2);
            minutes.innerHTML = ('0' + m).slice(-2);
            seconds.innerHTML = ('0' + s).slice(-2);
        }

        startTime();
        var interval = setInterval(startTime, 500);
    }

    initializeClock();
};
//----------------------timer-----------------------------//
var timerMode = function (endtime) {

    function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function initializeTimer(endtime) {

        function updateClock() {
            var t = getTimeRemaining(endtime);

            days.innerHTML = (t.days).toString();
            hours.innerHTML = ('0' + t.hours).slice(-2);
            minutes.innerHTML = ('0' + t.minutes).slice(-2);
            seconds.innerHTML = ('0' + t.seconds).slice(-2);

            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        }

        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
    }
    initializeTimer(endtime)
};

// var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000); // for endless timer
var deadline="April 02 2020 10:00:00 GMT+0300";
timerMode(deadline);