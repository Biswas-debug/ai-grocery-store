async function buy(product, price) {

  try {

    const response = await fetch(
      "https://ai-grocery-store.onrender.com/buy",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          product: product,
          price: price,
          email: prompt("Enter your email")
        })
      }
    );

    const data = await response.json();

    alert(data.message);

  } catch (err) {
    alert("Server not connected!");
    console.log(err);
  }
}
