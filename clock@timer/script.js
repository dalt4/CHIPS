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
    timerDays,
    timerHours,
    timerMinutes,
    deadline = localStorage.getItem('deadline'),
    timerValue = localStorage.getItem('timerValue');

window.addEventListener('storage', function () {
    deadline = localStorage.getItem('deadline');
    timerValue = localStorage.getItem('timerValue');
    location.reload()
});

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

//--------------------------settings---------------------------------------//

var settings_ico = document.querySelector('.settings-ico');
var settings = document.querySelector('.settings');
var submit = settings.querySelector('.submit'),
    closeButton = settings.querySelector('.closeButton');

settings_ico.addEventListener('click', function () {
    settings.classList.add('active')
});

closeButton.addEventListener('click', function () {
    settings.classList.remove('active')
});

submit.addEventListener('click', function (e) {
    e.preventDefault();

    timerDays = settings.querySelector('.days').value;
    timerHours = settings.querySelector('.hours').value;
    timerMinutes = settings.querySelector('.minutes').value;
    settings.querySelector('.days').value = '';
    settings.querySelector('.hours').value = '';
    settings.querySelector('.minutes').value = '';
    timerValue = (timerDays * 86400000) + (timerHours * 3600000) + (timerMinutes * 60000);
    localStorage.setItem('timerValue', timerValue.toString());
    deadline = (Date.now() + timerValue);
    deadline = new Date(deadline);
    localStorage.setItem('deadline', deadline.toString());
    switchTimer.innerHTML = 'countdown';
    days.classList.remove('dayText');
    settings.classList.remove('active');
    clearInterval(timeinterval);
    clearInterval(interval);
    countdownMode(deadline, 0);
});

//-----------------------resize-------------------------------//

function resize () {
    if ((wrapper.clientWidth - wrapper.clientHeight) < 0) {
        switchTimer.classList.add('x2');
        var labels = document.querySelectorAll('label');
        for (var i =0; i < labels.length; i++ ) {
            labels[i].classList.add('x2')
        }
        clock.classList.add('vertical');
        submit.classList.add('x2')
    } else {
        switchTimer.classList.remove('x2');
        labels = document.querySelectorAll('label');
        for ( i =0; i < labels.length; i++ ) {
            labels[i].classList.remove('x2')
        }
        clock.classList.remove('vertical');
        submit.classList.remove('x2')
    }
}

resize ();

window.addEventListener('resize', function () {
    resize ()
});


//----------------------countdown-----------------------------//
var countdownMode = function (endtime, timer) {

    function initializeTimer(endtime, timer) {

        function updateClock() {

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

            var t = getTimeRemaining(endtime, timer);
            timerValue === null ? days.innerHTML = '0 <sup>days</sup>': t.days === 1 ? days.innerHTML = (t.days).toString() + " <sup>day</sup>" : days.innerHTML = (t.days).toString() + " <sup>days</sup>";
            hours.innerHTML = timerValue === null ? '0 0' : ('0' + t.hours).slice(-2);
            minutes.innerHTML = timerValue === null ? '0 0' : ('0' + t.minutes).slice(-2);
            seconds.innerHTML = timerValue === null ? '0 0' : ('0' + t.seconds).slice(-2);
            mainTitle.innerHTML = 'TIMER ' + ('0' + t.days).slice(-2)  + 'd ' + ('0' + t.hours).slice(-2) + ':' + ('0' + t.minutes).slice(-2) + ':' + ('0' + t.seconds).slice(-2);

            if (t.total <= 0 || t.total === timerValue) {
                clearInterval(timeinterval);
            }
        }

        updateClock();
        timeinterval = setInterval(updateClock, 1000);
    }

    initializeTimer(endtime, timer)
};