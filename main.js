const sebetHoverBox = document.querySelector(".sebet__hover");
const sebet = document.querySelector(".sebet");
const mainSection = document.querySelector(".filter__container__grid");
const btnContainer = document.querySelector(".btn__container");
const btns = document.querySelectorAll(".filter__btn");
const sebetCards = document.querySelector(".sebet__hover__cards");
const totalPrice = document.querySelector('.sebet__hover__button__total_price')
let korzina;

if (localStorage.getItem("korzina")) {
  korzina = JSON.parse(localStorage.getItem("korzina"));
} else {
  korzina = [];
  localStorage.setItem("korzina", JSON.stringify(korzina));
}

document.addEventListener("DOMContentLoaded", function () {
  var mySwiper = new Swiper(".swiper-container", {
    direction: "horizontal", // or 'vertical'
    loop: true,
    centeredSlides: true,

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // Autoplay
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },

    // Use slide or fade transition effect
    speed: 2000,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
  });
});

window.addEventListener("DOMContentLoaded", function () {
  fetch("./products.json")
    .then((resp) => resp.json())
    .then((data) => {
      displayMenuItems(data);
    });
  displayMenuButtons();
});

function displayMenuItems(menuItems) {
  let displayMenu = menuItems.map(function (item) {
    return `            
    <div class="grid__card">
        <div class="grid__card__img">
            <img src="${item.img}" alt="">
        </div>
        <div class="grid__card__tittle">
            <p>${item.name}</p>
        </div>
        <div class="grid__card__price">
            <p>$${item.price}</p>
            <button onclick="cardToLocal(${item.id})">
            <span>Add to cart</span>
            </button>
        </div>
    </div>
  `;
  });
  displayMenu = displayMenu.join("");
  mainSection.innerHTML = displayMenu;
}

function displayMenuButtons() {
  const filterBtns = btnContainer.querySelectorAll(".filter__btn");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const category = e.currentTarget.dataset.id;
      fetch("./products.json")
        .then((resp) => resp.json())
        .then((data) => {
          const menuCategory = data.filter(function (menuItem) {
            if (menuItem.category === category) {
              return menuItem;
            }
          });
          if (category === "all") {
            displayMenuItems(data);
          } else {
            displayMenuItems(menuCategory);
          }
        });
    });
  });
}

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btns.forEach((btn) => {
      btn.style.color = "#1B1B1B";
    });
    btn.style.color = "#f34f3f";
  });
});

function renderIUKorzina() {
  sebetCards.innerHTML = "";
  for (let i = 0; i < korzina.length; i++) {
    sebetCards.innerHTML += `
    <div class="sebet__hover__card">
    <div class="sebet__hover__card__img">
      <img
        src="${korzina[i].img}"
        alt=""
      />
    </div>
    <div class="sebet__hover__card__right">
      <div class="sebet__hover__card__tittle">
        <h2>${korzina[i].name}</h2>
        <p>${korzina[i].count} X $${korzina[i].price}</p>
      </div>
      <button onclick="deleteToKorzina(${
        korzina[i].id
      })"><i class="fa-solid fa-x"></i></button>
    </div>
  </div>
    `;
  }
}
renderIUKorzina();
totalPriceJS()


function cardToLocal(id) {
  fetch("./products.json")
    .then((resp) => resp.json())
    .then((data) => {
      let targetOfKorzina = korzina.find((item) => item.id == id);
      if (!targetOfKorzina) {
        let target = data.find((item) => item.id == id);
        korzina.push(target);
        renderIUKorzina();
        totalPriceJS()
      } else {
        targetOfKorzina.count++;
        renderIUKorzina();
        totalPriceJS()
      }
      localStorage.setItem("korzina", JSON.stringify(korzina));
    });
}

function deleteToKorzina(id) {
  let target = korzina.find((item) => item.id == id);
  let targetOfIndex = korzina.indexOf(target);
  korzina.splice(targetOfIndex, 1);
  localStorage.setItem("korzina", JSON.stringify(korzina));
  renderIUKorzina();
  totalPriceJS()
}

function totalPriceJS(){
  let totalKorzinaSumm = 0
  for (let i = 0; i < korzina.length; i++) {
    totalKorzinaSumm+=korzina[i].count*korzina[i].price    
  }
  totalPrice.innerHTML=`
  <p>PRICE:</p>
  <span>$${totalKorzinaSumm}</span>
  `
}
