var clock = document.querySelector('.clock'),
    switchTimer = document.querySelector('.switch'),
    wrapper = document.querySelector('.wrapper'),
    mainTitle = document.querySelector('title');

var days = clock.querySelector('.days span'),
    hours = clock.querySelector('.hours span'),
    minutes = clock.querySelector('.minutes span'),
    seconds = clock.querySelector('.seconds span'),
    interval,
    timeinterval,
    deadline = "April 02 2020 10:00:00 GMT+0300";

//-----------------Clock---------------------------------//

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

    function initializeClock() {
        function startTime() {

            var tm = new Date();
            var d = tm.getDay();
            var h = tm.getHours().toString();
            var m = tm.getMinutes().toString();
            var s = tm.getSeconds().toString();
            var ms = tm.getMilliseconds().toString();

            days.innerHTML = dayOfW[d];
            hours.innerHTML = ('0' + h).slice(-2);
            minutes.innerHTML = ('0' + m).slice(-2);
            seconds.innerHTML = ('0' + s).slice(-2);
            mainTitle.innerHTML = 'CLOCK ' + ('0' + h).slice(-2) + ':' + ('0' + m).slice(-2) + ':' + ('0' + s).slice(-2);
        }

        startTime();
        interval = setInterval(startTime, 500);
    }

    initializeClock();
};

clockMode();

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

            t.days === 1 ? days.innerHTML = (t.days).toString() + " <sup>day</sup>" : days.innerHTML = (t.days).toString() + " <sup>days</sup>";
            hours.innerHTML = ('0' + t.hours).slice(-2);
            minutes.innerHTML = ('0' + t.minutes).slice(-2);
            seconds.innerHTML = ('0' + t.seconds).slice(-2);
            mainTitle.innerHTML = 'CLOCK ' + ('0' + t.days).slice(-2)  + 'd ' + ('0' + t.hours).slice(-2) + ':' + ('0' + t.minutes).slice(-2) + ':' + ('0' + t.seconds).slice(-2);

            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        }

        updateClock();
        timeinterval = setInterval(updateClock, 1000);
    }

    initializeTimer(endtime)
};

//-------------------------switch----------------------------------//

switchTimer.addEventListener('click', function () {
    if (switchTimer.innerHTML === 'clock') {
        switchTimer.innerHTML = 'timer';
        days.classList.remove('dayText');
        clearInterval(interval);
        timerMode(deadline);
    }
    else {
        switchTimer.innerHTML = 'clock';
        clearInterval(timeinterval);
        clockMode();
    }
});

if ((wrapper.clientWidth - wrapper.clientHeight) < 0) {
    switchTimer.classList.add('x2');
    clock.classList.add('vertical')
}