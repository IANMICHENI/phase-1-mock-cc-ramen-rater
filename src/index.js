document.addEventListener('DOMContentLoaded', () => {
    const ramenMenu = document.getElementById('ramen-menu');
    const ramenDetail = document.getElementById('ramen-detail');
    const ratingDisplay = document.getElementById('rating-display');
    const commentDisplay = document.getElementById('comment-display');
    const newRamenForm = document.getElementById('new-ramen');
  
    fetch('http://localhost:3000/ramens')
      .then(response => response.json())
      .then(ramens => {
        ramens.forEach(ramen => {
          displayRamen(ramen);
        });
  
        displayRamenDetails(ramens[0]);
      });
  
    ramenMenu.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') {
        const ramenId = parseInt(e.target.parentElement.dataset.id);
        const selectedRamen = ramenData.find(ramen => ramen.id === ramenId);
        displayRamenDetails(selectedRamen);
      }
    });
  
    newRamenForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const name = document.getElementById('new-name').value;
      const restaurant = document.getElementById('new-restaurant').value;
      const image = document.getElementById('new-image').value;
      const rating = parseInt(document.getElementById('new-rating').value);
      const comment = document.getElementById('new-comment').value;
  
      const newRamen = {
        name: name,
        restaurant: restaurant,
        image: image,
        rating: rating,
        comment: comment
      };
  
      displayRamen(newRamen);
  
      newRamenForm.reset();
    });
  
    function displayRamen(ramen) {
      const ramenDiv = document.createElement('div');
      ramenDiv.classList.add('ramen-item');
      ramenDiv.dataset.id = ramen.id;
      ramenDiv.innerHTML = `<img src="${ramen.image}" alt="${ramen.name}" />`;
      ramenMenu.appendChild(ramenDiv);
    }
  
    function displayRamenDetails(ramen) {
      ramenDetail.innerHTML = `
        <img class="detail-image" src="${ramen.image}" alt="${ramen.name}" />
        <h2 class="name">${ramen.name}</h2>
        <h3 class="restaurant">${ramen.restaurant}</h3>
      `;
  
      ratingDisplay.textContent = ramen.rating;
      commentDisplay.textContent = ramen.comment;
    }
  });
  