const addToCart = async (pid) => {
  const cid = "6417037139dfcbd8cd40ae4d";
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
