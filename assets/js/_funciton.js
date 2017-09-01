$(document).ready(() => {
  const navBtn = document.querySelector(".nav-btn");
  const nav = document.querySelector("nav");
  const main = document.querySelector("main");
  const header = document.querySelector("header");
  const blockBlack = document.querySelector(".block-black ");

  const toggleBtn = e => {
    e.preventDefault();
    nav.classList.toggle("nav_close");
    main.classList.toggle("main_back");
    header.classList.toggle("main_back");
    blockBlack.classList.toggle("block_close");
  };
  navBtn.addEventListener("click", toggleBtn);
  blockBlack.addEventListener("click", toggleBtn);

  const links = document.querySelectorAll("a");
  links.forEach(e => {
    const id = e.dataset.link;
    e.addEventListener("click", e => {
      e.preventDefault();
      toggleBtn(e);
      const node_Y = document.querySelector(`#${id}`).offsetTop;
      const win_Y = window.pageYOffset;
      let y = win_Y;

      if (win_Y < node_Y) {
        setInterval(() => {
          if (y < node_Y) {
            window.scrollTo(0, y);
            y += 10;
          } else {
            clearInterval();
          }
        }, 5);
      } else {
        setInterval(() => {
          if (y > node_Y) {
            window.scrollTo(0, y);
            y -= 10;
          } else {
            clearInterval();
          }
        }, 5);
      }
    });
  });
});
