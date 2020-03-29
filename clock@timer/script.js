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
    deadline = "April 02 2020 10:00:00 GMT+0300",
    timerDays = 5,
    timerHours = 0,
    timerMinutes = 0,
    timerValue = (timerDays * 86400000) + (timerHours * 3600000) + (timerMinutes * 60000);


function getTimeRemaining(endtime, timer) {
    var t;
    timer !== 0 ? t = timerValue - (Date.parse(endtime) - Date.parse(new Date())) : t = Date.parse(endtime) - Date.parse(new Date());
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

//----------------------countdown-----------------------------//
var countdownMode = function (endtime, timer) {

    function initializeTimer(endtime, timer) {

        function updateClock() {
            var t = getTimeRemaining(endtime, timer);

            t.days === 1 ? days.innerHTML = (t.days).toString() + " <sup>day</sup>" : days.innerHTML = (t.days).toString() + " <sup>days</sup>";
            hours.innerHTML = ('0' + t.hours).slice(-2);
            minutes.innerHTML = ('0' + t.minutes).slice(-2);
            seconds.innerHTML = ('0' + t.seconds).slice(-2);
            mainTitle.innerHTML = 'CLOCK ' + ('0' + t.days).slice(-2)  + 'd ' + ('0' + t.hours).slice(-2) + ':' + ('0' + t.minutes).slice(-2) + ':' + ('0' + t.seconds).slice(-2);

            if (t.total <= 0 || t.total === timerValue) {
                clearInterval(timeinterval);
            }
        }

        updateClock();
        timeinterval = setInterval(updateClock, 1000);
    }

    initializeTimer(endtime, timer)
};

//-------------------------switch----------------------------------//

switchTimer.addEventListener('click', function () {
    if (switchTimer.innerHTML === 'clock') {
        switchTimer.innerHTML = 'countdown';
        days.classList.remove('dayText');
        clearInterval(interval);
        countdownMode(deadline, 0);
    }
    else if  (switchTimer.innerHTML === 'countdown') {
        switchTimer.innerHTML = 'timer';
        days.classList.remove('dayText');
        clearInterval(timeinterval);
        countdownMode(deadline, timerValue);
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