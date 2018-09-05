document.addEventListener("DOMContentLoaded", () => {

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById("toy-collection")
let addToy = false

// YOUR CODE HERE
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(data => data.forEach(toy => {
    toyCollection.append(createToyDiv(toy))
  }))

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    let nameInput = document.querySelectorAll('input')[0]
    let urlInput = document.querySelectorAll('input')[1]

    // submit listener here
    toyForm.addEventListener('submit', (event) => {
      event.preventDefault();
      fetch("http://localhost:3000/toys", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: nameInput.value,
          url: urlInput.value,
          likes: 0
        })
      }).then(res => res.json())
      .then(data => {
        toyCollection.append(createToyDiv(data))
      })

    })
  } else {
    toyForm.style.display = 'none'
  }
})
// OR HERE!
})//end dom loaded


function createToyDiv(toy){
  let toy_div = document.createElement('div')
  toy_div.setAttribute('class', "card`")
  display = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar">
    <p>${toy.likes} Likes <p>
  `
  const like_button = document.createElement('button')
  like_button.setAttribute('class','like-btn')
  like_button.innerText = "Like <3"

  like_button.addEventListener('click', ()=> {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({likes: toy.likes+=1  })
    })
    toy_div.querySelector('p').innerText = `${toy.likes} Likes`
  })//end like_button listener

  toy_div.innerHTML = display
  toy_div.append(like_button)

  return toy_div
}
