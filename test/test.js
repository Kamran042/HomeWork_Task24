fetch("./test.json")
  .then((resp) => resp.json())
  .then((data) => console.log(data));

const mainSection = document.querySelector(".main__content");
const btnContainer = document.querySelector(".btn__container");

window.addEventListener("DOMContentLoaded", function () {
  fetch("./test.json")
  .then((resp) => resp.json())
  .then((data) => {
    displayMenuItems(data);

  });
  displayMenuButtons();
});

function displayMenuItems(menuItems) {
  let displayMenu = menuItems.map(function (item) {
    return `<div class="menu__item">
    <div class="item__photo">
      <img src=${item.img} alt=${item.title} />
    </div>
      
        <div class="item__info">
          <h4>${item.title}</h4>
          <p class="description">Airedale monterey jack cream cheese. </p>
        </div>
      </div>`;
  });
  displayMenu = displayMenu.join("");
  mainSection.innerHTML = displayMenu;
}

function displayMenuButtons() {
  const filterBtns = btnContainer.querySelectorAll(".filter__btn");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const category = e.currentTarget.dataset.id;
      fetch("./test.json")
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
