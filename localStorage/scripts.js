// /* <script src="https://gist.github.com/dalt4/40f040ede22f14668da6b772715dcf6f.js"></script> /*

const myNumber = 42

localStorage.removeItem('number')
console.log(localStorage.getItem('number'))
localStorage.setItem('number', myNumber.toString())
console.log(localStorage.getItem('number'))
localStorage.clear()

const object = {
    name: 'Max',
    age: 20
}

localStorage.setItem('person', JSON.stringify(object))

const raw = localStorage.getItem('person')
const person = JSON.parse(raw)
person.name = 'Vladilen'

console.log(person)

window.addEventListener('storage', event => {
    console.log(event)
})

// window.onstorage = () => {}
