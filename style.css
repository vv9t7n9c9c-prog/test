let users = JSON.parse(localStorage.getItem("ltd_users")) || [
    {username:"direction.portolina", password:"portolina2026", role:"admin"}
];
let sales = [];
let stock = { menu:50, boisson:50, plat:50, stup:20, soft:50 };

let session = null;
let cart = [];
let cartCashier = [];
let totalPrice = 0;
let totalCashier = 0;

const products = {
    menu:[{name:"Menu Basique", price:20},{name:"Menu VIP", price:50}],
    boisson:[{name:"Eau", price:5},{name:"Coca", price:8}],
    plat:[{name:"Burger", price:15},{name:"Pizza", price:20}],
    stup:[{name:"Substance X", price:100}],
    soft:[{name:"Jus", price:6},{name:"Thé", price:5}]
};

document.getElementById("btnLogin").onclick = login;

function login(){
    const id = loginId.value.toLowerCase();
    const pw = loginPassword.value;
    const user = users.find(u=>u.username===id && u.password===pw);
    if(!user) return alert("Erreur de connexion");
    session = user;
    login.classList.add("hidden");
    user.role==="admin" ? direction.classList.remove("hidden") : cashier.classList.remove("hidden");
}

function logout(){
    session=null;
    cart=[]; cartCashier=[];
    totalPrice=0; totalCashier=0;
    updateCart(); updateCartCashier();
    login.classList.remove("hidden");
    direction.classList.add("hidden");
    cashier.classList.add("hidden");
}

function showCategory(cat){
    categoryTitle.innerText = cat.toUpperCase();
    productList.innerHTML="";
    products[cat].forEach(p=>{
        productList.innerHTML += `
        <div class="product">
            <span>${p.name} - ${p.price}$</span>
            <button onclick="addToCart('${p.name}',${p.price})">+</button>
        </div>`;
    });
}

function showCategoryCashier(cat){
    categoryTitleCashier.innerText = cat.toUpperCase();
    productListCashier.innerHTML="";
    products[cat].forEach(p=>{
        productListCashier.innerHTML += `
        <div class="product">
            <span>${p.name} - ${p.price}$</span>
            <button onclick="addToCartCashier('${p.name}',${p.price})">+</button>
        </div>`;
    });
}

function addToCart(name,price){
    cart.push({name,price});
    totalPrice+=price;
    updateCart();
}

function addToCartCashier(name,price){
    cartCashier.push({name,price});
    totalCashier+=price;
    updateCartCashier();
}

function groupItems(list){
    const grouped={};
    list.forEach(i=>{
        if(!grouped[i.name]) grouped[i.name]={qty:0, price:i.price};
        grouped[i.name].qty++;
    });
    return grouped;
}

function updateCart(){
    cartList.innerHTML="";
    const g = groupItems(cart);
    for(let name in g){
        cartList.innerHTML += `<li>${name} x${g[name].qty}</li>`;
    }
    total.innerText = totalPrice;
}

function updateCartCashier(){
    cartListCashier.innerHTML="";
    const g = groupItems(cartCashier);
    for(let name in g){
        cartListCashier.innerHTML += `<li>${name} x${g[name].qty}</li>`;
    }
    totalCashier.innerText = totalCashier;
}

function pay(){
    alert("Encaissement : "+totalPrice+"$");
    cart=[]; totalPrice=0;
    updateCart();
}

function payCashier(){
    alert("Encaissement : "+totalCashier+"$");
    cartCashier=[]; totalCashier=0;
    updateCartCashier();
}
