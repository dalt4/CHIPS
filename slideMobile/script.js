const programs__items = document.querySelector('.programs__items');
let x1 = 0,
    x2 = 0;

const swipe_it = () => {
    if (window.innerWidth < 1024) {
        programs__items.addEventListener('touchstart', (e) => {
            x1 = e.changedTouches[0].pageX
        }, false);

        programs__items.addEventListener('touchend', (e) => {
            x2 = e.changedTouches[0].pageX;
            let diff = x1 - x2,
                pos1 = document.querySelector('.pos1'),
                pos2 = document.querySelector('.pos2'),
                pos3 = document.querySelector('.pos3');
            if (diff < -30) {
                pos1.classList.add('pos5');
                pos1.classList.remove('pos1');
                pos2.classList.add('pos6');
                pos2.classList.remove('pos2');
                pos3.classList.add('pos4');
                pos3.classList.remove('pos3');
                setTimeout(() => {
                    pos1.classList.add('pos2');
                    pos1.classList.remove('pos5');
                    pos2.classList.add('pos3');
                    pos2.classList.remove('pos6');
                    pos3.classList.add('pos1');
                    pos3.classList.remove('pos4');
                }, 100)
            } else {
                pos1.classList.add('pos6');
                pos1.classList.remove('pos1');
                pos2.classList.add('pos4');
                pos2.classList.remove('pos2');
                pos3.classList.add('pos5');
                pos3.classList.remove('pos3');
                setTimeout(() => {
                    pos1.classList.add('pos3');
                    pos1.classList.remove('pos6');
                    pos2.classList.add('pos1');
                    pos2.classList.remove('pos4');
                    pos3.classList.add('pos2');
                    pos3.classList.remove('pos5');
                }, 100)
            }
        }, false);
    }
}

swipe_it();