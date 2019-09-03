
const initTopFunction = () => {
  const scrollToButton = document.getElementById('scroll-top-btn')
  if (scrollToButton) {
    scrollToButton.addEventListener("click", (event) => {
      topFunction()
    });
  }
};

function topFunction() {
  document.documentElement.scrollTop = 0;
};

export { initTopFunction };
