const socket = io();
const container = document.querySelector("#container");

socket.on("realTimeProducts", (data) => {
  let products = "";
  data.forEach((p) => {
    products += `<p>${p.title} - $${p.price}<p/>`;
  });
  container.innerHTML = products;
});
