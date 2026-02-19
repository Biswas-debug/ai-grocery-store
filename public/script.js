async function buy(product, price) {
  try {
    const res = await fetch(
      "https://ai-grocery-api.onrender.com/buy", // CHANGE AFTER DEPLOY
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product,
          price,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      alert("✅ Order placed! Email sent to seller.");
    } else {
      alert("❌ Order failed");
    }
  } catch (err) {
    console.log(err);
    alert("Server not connected.");
  }
}
