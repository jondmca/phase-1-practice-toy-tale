let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  getToys()
  addToys()
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function getToys(){
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(data => data.forEach(toy => renderToys(toy)))
}

function renderToys(toy){
  let card = document.createElement('div')
  card.className = 'card'
  card.innerHTML = `
 
    <h2>${toy.name}<h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn" id="${toy.id}">Like <3 </button>
  
  `
  document.querySelector('#toy-collection').appendChild(card)
  document.getElementById(`${toy.id}`).addEventListener('click', () => {
    toy.likes += 1
    card.querySelector('p').textContent = `${toy.likes} Likes`
    updateLikes(toy)
  })
  
}

function addToys(){
  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify({
      "name": "Jessie",
      "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
      "likes": 0
    })
    .then(res => res.json())
    .then(toy => console.log(toy))
  })
}

function updateLikes(toyObj){
  fetch(`http://localhost:3000/toys/${toyObj.id}`,{
    method: 'PATCH',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toyObj)
  })
  .then(res => res.json())
  
}