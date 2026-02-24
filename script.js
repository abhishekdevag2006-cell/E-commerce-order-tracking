const products = [
  { id: 1, name: "Shoes", price: 2000 },
  { id: 2, name: "Watch", price: 3000 },
  { id: 3, name: "Headphones", price: 1500 },
  { id: 4, name: "Laptop", price: 100000 },
  { id: 5, name: "Mobile", price: 12000 }
];

let cart = [];

const productDiv = document.getElementById("products");
const cartDiv = document.getElementById("cart");
const totalSpan = document.getElementById("total");

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

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}



function placeOrder() {

  const name = document.getElementById("custName").value;
  const phone = document.getElementById("custPhone").value;
  const address = document.getElementById("custAddress").value;

  if(cart.length === 0){
    alert("Cart is empty");
    return;
  }

  if(name=="" || phone=="" || address==""){
    alert("Fill customer details");
    return;
  }

  const orderId = "ORD"+Math.floor(Math.random()*10000);

  const order={
    id:orderId,
    total: cart.reduce((sum,item)=>sum+item.price,0),
    status:"Order Placed"
  };

  localStorage.setItem(orderId,JSON.stringify(order));

  document.getElementById("orderMsg").innerText=
  "Order Successful! Order ID: "+orderId;

  cart=[];
  updateCart();
}



function trackOrder(){

const id=document.getElementById("trackId").value;

const data=localStorage.getItem(id);

if(!data){
document.getElementById("trackResult").innerText=
"Order Not Found";
return;
}

const order=JSON.parse(data);

document.getElementById("trackResult").innerText=
"Status: "+order.status+" | Total ₹"+order.total;

}
