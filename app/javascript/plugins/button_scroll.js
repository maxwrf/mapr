
const initTopFunction = () => {
  document.querySelector("#scroll-top-btn").addEventListener("click", (event) => {
    topFunction()
  });
};

function topFunction() {
  document.documentElement.scrollTop = 0;
};

export { initTopFunction };
