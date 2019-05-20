const adBtns = document.querySelectorAll(".ad-btn");
const modal2 = document.getElementById("modal2");
const closeForm = document.getElementById("close-form");

adBtns.forEach(adBtn => {
  adBtn.addEventListener("click", () => {
    modal2.style.display = "block";
  });
});

closeForm.onclick = () => {
  modal2.style.display = "none";
};
const modal = document.getElementById("modal");
const imgs = document.querySelectorAll(".ad-img");
const modalImg = document.getElementById("mod-img");
const caption = document.getElementById("caption");

imgs.forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;
    caption.innerHTML = img.alt;
  });
});

const closePic = document.getElementById("close-pic");

closePic.onclick = () => {
  modal.style.display = "none";
};

const sidepanel = document.getElementById('sidepanel');

const openNav = () => {
    sidepanel.style.width = '100%';
  };
  
  const closeNav = () => {
    sidepanel.style.width = '0';
  };
