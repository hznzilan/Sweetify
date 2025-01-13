//TOP NAVIGATION
function NavBar() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
  x.className += " responsive";
  } else {
  x.className = "topnav";
  }
  }
  window.onscroll = function() { 
      scrollFunction()};


      function scrollFunction() {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("myTopnav").style.width = "100%";
        document.getElementById("header").style.position = "fixed";
        document.getElementById("header").style.top = "0%";
        document.getElementById("roll_back").style.display = "block";
        } else {
        document.getElementById("myTopnav").style.width = "80%";
        document.getElementById("header").style.position = "fixed";
        document.getElementById("header").style.top = "2rem";
        document.getElementById("roll_back").style.display = "none";
        }
        }
       document.addEventListener("DOMContentLoaded", () => {
      const slider = document.getElementById("imageSlider");
      const prevBtn = document.querySelector(".prev-btn");
      const nextBtn = document.querySelector(".next-btn");
      const images = slider.querySelectorAll("img");
      let index = 1.5; 
      let imageWidth;
    
      // Calculate image width dynamically
      function updateImageWidth() {
        imageWidth = slider.clientWidth;
        console.log("Updated Image Width:", imageWidth); 
        slider.style.transform = `translateX(${-imageWidth * index}px)`;
      }
    
      // Update image width on load and resize
      updateImageWidth();
      window.addEventListener("resize", updateImageWidth);
    
      // Navigate Slider
      function navigateSlider(direction) {
        slider.style.transition = "transform 1.5s ease-in-out";
        index += direction;
        slider.style.transform = `translateX(${-imageWidth * index}px)`;
      }
    
      // Handle seamless looping
      slider.addEventListener("transitionend", () => {
        const totalImages = images.length;
        if (index === 0) {
          slider.style.transition = "none";
          index = totalImages -  2;
          slider.style.transform = `translateX(${-imageWidth * index}px)`;
        } else if (index === totalImages - 1) {
          slider.style.transition = "none";
          index = 1; 
          slider.style.transform = `translateX(${-imageWidth * index}px)`;
        }
      });
    
      prevBtn.addEventListener("click", () => navigateSlider(-1));
      nextBtn.addEventListener("click", () => navigateSlider(1));
    
      let element = document.getElementById('elementId');
      if (element) {
        element.addEventListener('click', function() {
          let prevBtn = document.getElementById('prevButton');
    
          prevBtn.addEventListener("click", () => {
            console.log("Previous clicked");
            navigateSlider(-1);
          });
    
          nextBtn.addEventListener("click", () => {
            console.log("Next clicked");
            navigateSlider(1);
          });
          console.log("Image width:", imageWidth);
          console.log("Prev button:", prevBtn);
          console.log("Next button:", nextBtn);
        });
      }
    });

    // DESSERT OF THE WEEK ARRAY 
const desserts = [
  {
    name: "Cheesecake",
    image: "/Sweetify Images/cakes/cheesecake.jpg" 
  },
  {
    name: "Red Velvet Cupcake",
    image: "/Sweetify Images/Cupcake/RedVelvetCupcake.png" 
  },
  {
    name: "Sea Salt Cookies",
    image: "/Sweetify Images/Cookies/SeaSaltCookies.jpeg" 
  }
];


const dessertsContainer = document.getElementById('dessertsContainer');
desserts.forEach(dessert => {
  const dessertDiv = document.createElement('div');
  dessertDiv.classList.add('dessert-item');
  dessertDiv.innerHTML = `
    <img src="${dessert.image}" alt="${dessert.name}">
    <h4>${dessert.name}</h4>
  `;
  dessertsContainer.appendChild(dessertDiv);
});

document.querySelectorAll('.btnorder').forEach((button) => {
  button.addEventListener('click', () => {
      // Hide other sections and show the product container
      document.querySelector('.product-page').style.display = 'block';

       // Hide other sections
    document.querySelectorAll('.container, .sections, .section3').forEach(function (section) {
      section.style.display = 'none';
  });
     
      
  });

  document.getElementById('aboutUsLink').addEventListener('click', function (event) {
    event.preventDefault(); 
    
    // Hide other sections
    document.querySelectorAll('.container, .sections, .product-page, contactForm,.cart-page,.payment-page').forEach(function (section) {
        section.style.display = 'none';
    document.getElementById('contactSection').style.display = 'none';
    });
    
    // Show the "About Us" section
    document.getElementById('aboutUsSection').style.display = 'block';
});


// Contact Page Form Submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
e.preventDefault();


const name = document.getElementById('name').value.trim();
const email = document.getElementById('email').value.trim();
const message = document.getElementById('message').value.trim();
const responseMessage = document.getElementById('responseMessage');

if (!name || !email || !message) {
  responseMessage.textContent = 'All fields are required.';
  responseMessage.style.color = 'red';
  return;
}

//  AJAX request
fetch('http://127.0.0.1:3000/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, message })
})
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      responseMessage.textContent = 'Thank you for reaching out! We will get back to you soon.';
      responseMessage.style.color = 'green';
      document.getElementById('contactForm').reset();
    } else {
      responseMessage.textContent = 'Oops! Something went wrong. Please try again.';
      responseMessage.style.color = 'red';
    }
  })
  .catch(error => {
    console.error('Error:', error);
    responseMessage.textContent = 'Error submitting form. Please try again.';
    responseMessage.style.color = 'red';
  });
});

document.getElementById('ContactLink').addEventListener('click', function () {
document.getElementById('contactSection').style.display = 'block';
document.getElementById('aboutUsSection').style.display = 'none';
document.querySelector('.container').style.display = 'none';
 // Hide other sections
 document.querySelectorAll('.container, .sections, .section3,.product-page,.cart-page,.payment-page').forEach(function (section) {
  section.style.display = 'none';
});

});

const cart = []; 

// Function to add item to the cart
function addToCart(itemName, itemPrice) {
const existingItem = cart.find(item => item.name === itemName);

if (existingItem) {
  existingItem.quantity++;
} else {
  cart.push({ name: itemName, price: parseFloat(itemPrice), quantity: 1 });
}

updateCart();
}

// Function to increase the quantity of an item
function increaseQuantity(itemName) {
const item = cart.find(item => item.name === itemName);
if (item) {
  item.quantity++;
  updateCart();
}
}

// Function to decrease the quantity of an item
function decreaseQuantity(itemName) {
const item = cart.find(item => item.name === itemName);
if (item) {
  item.quantity--;
  if (item.quantity === 0) {
    cart.splice(cart.indexOf(item), 1); // Remove item if quantity is zero
  }
  updateCart();
}
}

// Function to update the cart display
function updateCart() {
const cartItemsContainer = document.getElementById("cart-items-container");
const cartTotalElement = document.getElementById("cart-total");

cartItemsContainer.innerHTML = ""; // Clear existing items
let total = 0;

cart.forEach(item => {
  total += item.price * item.quantity;

  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");
  cartItem.innerHTML = `
    <p>${item.name} (RM${item.price.toFixed(2)})</p>
    <div class="quantity-controls">
      <button class="decrease-quantity" onclick="decreaseQuantity('${item.name}')">-</button>
      <span>${item.quantity}</span>
      <button class="increase-quantity" onclick="increaseQuantity('${item.name}')">+</button>
    </div>
  `;
  cartItemsContainer.appendChild(cartItem);
});

cartTotalElement.textContent = `RM${total.toFixed(2)}`;
}
document.getElementById("cart-items-container").addEventListener("click", (event) => {
const button = event.target;
const action = button.getAttribute("data-action");
const itemName = button.getAttribute("data-name");

if (action === "increase") {
    increaseQuantity(itemName);
} else if (action === "decrease") {
    decreaseQuantity(itemName);
}
});


const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach(button => {
button.addEventListener("click", function () {
  const itemName = this.previousElementSibling.previousElementSibling.textContent;
  const itemPrice = this.previousElementSibling.textContent.replace("Price: RM", "");
  addToCart(itemName, itemPrice);
});
});

document.getElementById("CartLink").addEventListener("click", function () {
  document.querySelector(".product-page").style.display = "none";
  document.querySelector(".cart-page").style.display = "block";
  // Hide other sections
  document.querySelectorAll('.container, .sections, .section3, #contactSection,.contactForm, #aboutUsSection,.payment-page').forEach(function (section) {
      section.style.display = 'none';
  });
});


});

document.getElementById('checkout-btn').addEventListener('click', function () {
  document.querySelector('.payment-page').style.display = 'block';
 
  document.querySelectorAll('.container, .sections, .section3, #aboutUsSection, #contactSection ,.contactForm,.cart-page').forEach(function (section) {
    section.style.display = 'none';
  });
  
 
});


function addincart() {
alert('Item added to cart successfully');
}

function submitForm() {
const receiptInput = document.getElementById('receipt');
const remarksInput = document.getElementById('remarks');

// Validate receipt upload
if (receiptInput.files.length === 0) {
    alert('Please upload your receipt.');
    return;
}

// Validate remarks input
const remarks = remarksInput.value.trim();
if (remarks === '') {
    alert('Please add your remarks.');
    return;
}

alert('Thank you for ordering with us!');

document.querySelector('.payment-page').style.display = 'none';
document.querySelector('.confirmation-page').style.display = 'block';
document.querySelector('.container').style.display = 'block'; 
}



