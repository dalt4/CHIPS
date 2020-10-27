const triangl = document.querySelector('.triangl');
const getRandomInt = function (max) {
    return Math.floor(Math.random() * Math.floor(max));
};

const createDots = function (quantityDots, figure) {
    for (let i = 1; i <= quantityDots; i++) {
        let newDot = document.createElement('div');
        newDot.classList.add('dot');
        newDot.style.position = 'absolute';
        newDot.style.width ='5px';
        newDot.style.height = '5px';
        newDot.style.background = 'black';
        newDot.style.transition = '2s all linear';
        i < 4 ? newDot.style.top = getRandomInt(50) + 'px':
            i < 8 ? newDot.style.top = (getRandomInt(50) + 100) + 'px':
                i < 12 ? newDot.style.top = (getRandomInt(50) + 200) + 'px':
                    i < 16 ? newDot.style.top = (getRandomInt(50) + 300) + 'px':
                        i < 20 ? newDot.style.top = (getRandomInt(20) + 400) + 'px':
                            newDot.style.top = (getRandomInt(50) + 550) + 'px' ;
        newDot.style.left = getRandomInt(150) + 'px';
        figure.appendChild(newDot);
    }
};

createDots(24, triangl);

const dots = document.querySelectorAll('.dot');

const createFrags = function (a, b, figure, frag_class) {
    let distX = parseInt(a.style.left) - parseInt(b.style.left);
    let distY = parseInt(a.style.top) - parseInt(b.style.top);
    let xFrags = distX > 0 ? distX : distX * (-1);
    let yFrags = distY > 0 ? distY : distY * (-1);

    let quantityFrags = (yFrags + xFrags)/10;
    // console.log(quantityFrags)
    for (let i = 0; i < quantityFrags; i++) {
        let newFrag = document.createElement('div');
        newFrag.classList.add(frag_class);
        newFrag.style.position = 'absolute';
        newFrag.style.width ='1px';
        newFrag.style.height = '1px';
        newFrag.style.background = 'grey';
        newFrag.style.transition = '2s all linear';
        newFrag.style.top = (parseInt(b.style.top) + (distY/quantityFrags * i)).toString() + 'px';
        newFrag.style.left = (parseInt(b.style.left) + (distX/quantityFrags * i)).toString() + 'px';
        figure.appendChild(newFrag);
    }
};

dots.forEach((item, i, arr) => {
    var count = 0
    while (count < 4) {
        let indexForDotB = i + 1 + count;
        indexForDotB >= arr.length ? indexForDotB = indexForDotB - (indexForDotB + (indexForDotB - arr.length)):

            createFrags(item, arr[indexForDotB], triangl, ('arrFrag' + i + count).toString());
        count++;
    }


})

// let fragLines = document.querySelectorAll('.line__frag');


const moveFrags = (a, b, frags) => {
    frags.forEach((item, i,l) => {
        let distX = parseInt(a.style.left) - parseInt(b.style.left);
        let distY = parseInt(a.style.top) - parseInt(b.style.top);
        item.style.top = (parseInt(b.style.top) + (distY/l.length * i)).toString() + 'px';
        item.style.left = (parseInt(b.style.left) + (distX/l.length * i)).toString() + 'px';
    })
}

setInterval(() => {
// dots[0].style.left === '200px' ? dots[0].style.left = '-50px' :dots[0].style.left = '200px';
// dots[1].style.top === '50px' ? dots[1].style.top = '25px' : dots[1].style.top = '50px';
// dots[1].style.left === '50px' ? dots[1].style.left = '25px' : dots[1].style.left = '50px';
// dots[2].style.left === '105px' ? dots[2].style.left = '15px' : dots[2].style.left = '105px';
// fragLines.forEach((item, i) => {
//     moveFrags(dots[i], dots[i + 1], item);
// })
// moveFrags(dot1, dot2, frags);
// moveFrags(dot2, dot3, frags2);
// moveFrags(dot3, dot1, frags3);
// moveFrags(dot4, dot1, frags4);
// moveFrags(dot4, dot2, frags5);
// moveFrags(dot4, dot3, frags6);
    dots.forEach((item,i,arr) => {
        i < 4 ? item.style.top = getRandomInt(50) + 'px':
            i < 8 ? item.style.top = (getRandomInt(50) + 100) + 'px':
                i < 12 ? item.style.top = (getRandomInt(50) + 200) + 'px':
                    i < 16 ? item.style.top = (getRandomInt(50) + 300) + 'px':
                        i < 20 ? item.style.top = (getRandomInt(20) + 400) + 'px':
                            item.style.top = (getRandomInt(50) + 550) + 'px' ;
        item.style.left = getRandomInt(150) + 'px';

    })
setTimeout( () => {
    dots.forEach((item,i,arr) => {

    let count = 0;
    while (count < 4) {
        let indexForDotB = i + 1 + count;
        let frags = document.querySelectorAll(('.arrFrag' + i + count).toString());
        indexForDotB >= arr.length ? indexForDotB = indexForDotB - (indexForDotB + (indexForDotB - arr.length)): '';
        moveFrags(item, arr[indexForDotB], frags);
        count++;
    }
})},10)


    // moveFrags(dots[0], dots[1], document.querySelectorAll('.arrFrag00'));
    // moveFrags(dots[0], dots[2], document.querySelectorAll('.arrFrag01'));
    // moveFrags(dots[0], dots[3], document.querySelectorAll('.arrFrag02'));
    // moveFrags(dots[0], dots[4], document.querySelectorAll('.arrFrag03'));
    // moveFrags(dots[1], dots[2], document.querySelectorAll('.arrFrag10'));
    // moveFrags(dots[1], dots[3], document.querySelectorAll('.arrFrag11'));
    // moveFrags(dots[1], dots[4], document.querySelectorAll('.arrFrag12'));
    // moveFrags(dots[1], dots[5], document.querySelectorAll('.arrFrag13'));


}, 2000)