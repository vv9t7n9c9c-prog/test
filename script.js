// ===== INITIAL DATA =====
let users = JSON.parse(localStorage.getItem("ltd_users")) || [
    {username:"direction.portolina", prenom:"Direction", nom:"Portolina", password:"portolina2026", role:"admin"}
];
let sales = JSON.parse(localStorage.getItem("ltd_sales")) || [];
let stock = JSON.parse(localStorage.getItem("ltd_stock")) || {
    menu: 50, boisson: 50, plat:50, stup:20, soft:50
};
localStorage.setItem("ltd_users",JSON.stringify(users));
localStorage.setItem("ltd_stock",JSON.stringify(stock));
localStorage.setItem("ltd_sales",JSON.stringify(sales));

let session = null;
let cart = [];
let totalPrice = 0;

// ===== PRODUCTS =====
const products = {
    menu:[{name:"Menu Basique", price:20},{name:"Menu VIP", price:50}],
    boisson:[{name:"Eau", price:5},{name:"Coca", price:8}],
    plat:[{name:"Burger", price:15},{name:"Pizza", price:20}],
    stup:[{name:"Substance X", price:100}],
    soft:[{name:"Jus d'orange", price:6},{name:"Thé", price:5}]
};

// ===== ELEMENTS =====
const loginDiv=document.getElementById("login");
const directionDiv=document.getElementById("direction");
const cashierDiv=document.getElementById("cashier");

const btnLogin=document.getElementById("btnLogin");
btnLogin.addEventListener("click", login);
const btnLogout=document.getElementById("btnLogout");

btnLogout.addEventListener("click", logout);

function login(){
    const id=document.getElementById("loginId").value.trim().toLowerCase();
    const pw=document.getElementById("loginPassword").value;
    const user = users.find(u=>u.username===id && u.password===pw);
    if(!user) return alert("Identifiant ou mot de passe incorrect");
    session=user; loginDiv.classList.add("hidden");
    if(user.role==="admin"){
        directionDiv.classList.remove("hidden");
        loadEmployees(); loadSales(); loadStock(); showCategory("menu");
    } else {
        cashierDiv.classList.remove("hidden");
        document.getElementById("employeeName").innerText=`${user.prenom} ${user.nom}`;
        showCategoryCashier("menu");
    }
}

function logout(){
    session=null; cart=[]; totalPrice=0;
    loginDiv.classList.remove("hidden");
    directionDiv.classList.add("hidden");
    cashierDiv.classList.add("hidden");
    updateCart(); updateCartCashier();
}

// ===== EMPLOYEES =====
function createEmployee(){
    const prenom=document.getElementById("newPrenom").value.trim();
    const nom=document.getElementById("newNom").value.trim();
    const pw=document.getElementById("newPassword").value;
    if(!prenom||!nom||!pw) return alert("Tous les champs sont obligatoires");
    const username=`${nom}.${prenom}`.toLowerCase();
    if(users.find(u=>u.username===username)) return alert("Cet employé existe déjà");
    users.push({username, prenom, nom, password:pw, role:"employee"});
    localStorage.setItem("ltd_users",JSON.stringify(users));
    loadEmployees();
}

function loadEmployees(){
    const list=document.getElementById("employeeList"); list.innerHTML="";
    users.filter(u=>u.role==="employee").forEach(e=>{
        const li=document.createElement("li"); li.innerText=`${e.prenom} ${e.nom} — ${e.username}`; list.appendChild(li);
    });
}

// ===== SALES =====
function pay(){
    if(cart.length===0) return alert("Panier vide");
    cart.forEach(p=>{
        sales.push({product:p.name, price:p.price, date:new Date().toLocaleString()});
        stock[getCategoryFromProduct(p.name)]--;
    });
    localStorage.setItem("ltd_sales",JSON.stringify(sales));
    localStorage.setItem("ltd_stock",JSON.stringify(stock));
    alert(`Encaissement : ${totalPrice}$`);
    cart=[]; totalPrice=0; updateCart(); loadSales(); loadStock();
}

function loadSales(){
    const list=document.getElementById("salesList"); list.innerHTML="";
    let total=0;
    sales.forEach(s=>{
        const li=document.createElement("li"); li.innerText=`${s.date} — ${s.product} : ${s.price}$`; list.appendChild(li);
        total+=s.price;
    });
    document.getElementById("totalCA").innerText=total;
}

// ===== STOCK =====
function loadStock(){
    const list=document.getElementById("stockList"); list.innerHTML="";
    for(let cat in stock){
        const li=document.createElement("li");
        li.innerHTML=`${cat.toUpperCase()}: ${stock[cat]} <button onclick="addStock('${cat}',10)">+10</button> <button onclick="removeStock('${cat}',10)">-10</button>`;
        list.appendChild(li);
    }
}

function addStock(cat, q){ stock[cat]+=q; localStorage.setItem("ltd_stock",JSON.stringify(stock)); loadStock(); }
function removeStock(cat,q){ stock[cat]=Math.max(stock[cat]-q,0); localStorage.setItem("ltd_stock",JSON.stringify(stock)); loadStock(); }

// ===== CATEGORY SWITCH =====
function showPanel(panel){
    document.getElementById("productsPanel").classList.add("hidden");
    document.getElementById("employeesPanel").classList.add("hidden");
    document.getElementById("salesPanel").classList.add("hidden");
    document.getElementById("stockPanel").classList.add("hidden");
    document.getElementById(panel+"Panel").classList.remove("hidden");
}

function showCategory(cat){
    showPanel("products");
    const list=document.getElementById("productList"); list.innerHTML="";
    document.getElementById("categoryTitle").innerText=cat.toUpperCase();
    products[cat].forEach(p=>{
        const div=document.createElement("div"); div.className="product";
        div.innerHTML=`<span>${p.name} - ${p.price}$</span> <button onclick="addToCart('${p.name}',${p.price})">+</button>`;
        list.appendChild(div);
    });
}

// ===== CART =====
function addToCart(name, price){ cart.push({name,price}); totalPrice+=price; updateCart(); }
function updateCart(){
    const list=document.getElementById("cartList"); list.innerHTML="";
    cart.forEach(i=>{ const li=document.createElement("li"); li.innerText=`${i.name} - ${i.price}$`; list.appendChild(li); });
    document.getElementById("total").innerText=totalPrice;
}

function getCategoryFromProduct(name){
    for(let cat in products){
        if(products[cat].some(p=>p.name===name)) return cat;
    }
    return null;
}

// ===== CASHIER =====
function showCategoryCashier(cat){
    const list=document.getElementById("productListCashier"); list.innerHTML="";
    document.getElementById("categoryTitleCashier").innerText=cat.toUpperCase();
    products[cat].forEach(p=>{
        const div=document.createElement("div"); div.className="product";
        div.innerHTML=`<span>${p.name} - ${p.price}$</span> <button onclick="addToCartCashier('${p.name}',${p.price})">+</button>`;
        list.appendChild(div);
    });
}

let cartCashier=[], totalCashier=0;
function addToCartCashier(name,price){ cartCashier.push({name,price}); totalCashier+=price; updateCartCashier(); }
function updateCartCashier(){
    const list=document.getElementById("cartListCashier"); list.innerHTML="";
    cartCashier.forEach(i=>{ const li=document.createElement("li"); li.innerText=`${i.name} - ${i.price}$`; list.appendChild(li); });
    document.getElementById("totalCashier").innerText=totalCashier;
}
function payCashier(){
    if(cartCashier.length===0) return alert("Panier vide");
    cartCashier.forEach(p=>{
        sales.push({product:p.name, price:p.price, date:new Date().toLocaleString()});
        stock[getCategoryFromProduct(p.name)]--;
    });
    localStorage.setItem("ltd_sales",JSON.stringify(sales));
    localStorage.setItem("ltd_stock",JSON.stringify(stock));
    alert(`Encaissement : ${totalCashier}$`);
    cartCashier=[]; totalCashier=0; updateCartCashier();
}
