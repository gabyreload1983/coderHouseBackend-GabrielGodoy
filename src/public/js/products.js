let cid = "";

const cart = document.querySelector("#cart");
cart.href = localStorage.getItem("cid")
  ? `/carts/${localStorage.getItem("cid")}`
  : "#";

const createCart = async () => {
  const response = await fetch(`http://localhost:8080/api/carts/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const json = await response.json();
  cid = json.response._id;
  localStorage.setItem("cid", cid);
  cart.href = `/carts/${localStorage.getItem("cid")}`;
};

localStorage.getItem("cid")
  ? (cid = localStorage.getItem("cid"))
  : createCart();

const addToCart = async (pid) => {
  const response = await fetch(
    `http://localhost:8080/api/carts/${cid}/product/${pid}`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  if (response.status === 200)
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      title: `Product added to cart`,
      icon: "success",
    });
};
