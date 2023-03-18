const addToCart = async (id) => {
  const response = await fetch(
    `http://localhost:8080/api/carts/641525b808554bf135e5b8fe/product/${id}`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
};
