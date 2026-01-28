const products = [
  { id: 1, name: "Shoes", price: 2000 },
  { id: 2, name: "Watch", price: 3000 },
  { id: 3, name: "Headphones", price: 1500 },
  { id: 4, name: "Laptop", price: 100000},
  { id: 5, name: "Moblie", price: 12000}
];

let cart = [];

const productDiv = document.getElementById("products");
const cartDiv = document.getElementById("cart");
const totalSpan = document.getElementById("total");

// Display products
products.forEach(p => {
  productDiv.innerHTML += `
    <div class="product">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `;
});

function addToCart(id) {
  const item = products.find(p => p.id === id);
  cart.push(item);
  updateCart();
}

function updateCart() {
  cartDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    cartDiv.innerHTML += `
      <p>
        ${item.name} - ₹${item.price}
        <button onclick="removeItem(${index})">X</button>
      </p>
    `;
  });

  totalSpan.innerText = total;
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}
