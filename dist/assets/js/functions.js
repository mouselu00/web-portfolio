$(document).ready(() => {
  console.log('working! ')
  const links = document.querySelectorAll(".nav-link");
  links.forEach(e => {
    const id = e.dataset.link;
    e.addEventListener("click", e => {
      e.preventDefault();
      // toggleBtn(e);
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
})