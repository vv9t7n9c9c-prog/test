// ===== USERS =====
let users = JSON.parse(localStorage.getItem("ltd_users"));
if (!users) {
    users = [
        { username: "direction.portolina", prenom: "Direction", nom: "Portolina", password: "portolina2026", role: "admin" }
    ];
    localStorage.setItem("ltd_users", JSON.stringify(users));
}

let session = null;
let cart = [];
let totalPrice = 0;

// ===== PRODUCTS =====
const products = {
    menu: [{name:"Menu Basique", price:20},{name:"Menu VIP", price:50}],
    boisson: [{name:"Eau", price:5},{name:"Coca", price:8}],
    plat: [{name:"Burger", price:15},{name:"Pizza", price:20}],
    stup: [{name:"Substance X", price:100}],
    soft: [{name:"Jus d'orange", price:6},{name:"Thé", price:5}]
};

// ===== ELEMENTS =====
const loginDiv = document.getElementById("login");
const adminDiv = document.getElementById("admin");
const caisseDiv = document.getElementById("caisse");

const btnLogin = document.getElementById("btnLogin");
const btnLogoutAdmin = document.getElementById("btnLogoutAdmin");
const btnLogoutCashier = document.getElementById("btnLogoutCashier");
const btnCreateEmployee = document.getElementById("btnCreateEmployee");

const loginId = document.getElementById("loginId");
const loginPassword = document.getElementById("loginPassword");

const employeeName = document.getElementById("employeeName");
const employeeList = document.getElementById("employeeList");
const categoryTitle = document.getElementById("categoryTitle");
const productList = document.getElementById("productList");
const cartList = document.getElementById("cartList");
const totalEl = document.getElementById("total");

// ===== EVENTS =====
btnLogin.addEventListener("click", loginUser);
btnLogoutAdmin.addEventListener("click", logout);
btnLogoutCashier.addEventListener("click", logout);
btnCreateEmployee.addEventListener("click", createEmployee);

// ===== FUNCTIONS =====
function loginUser() {
    const username = loginId.value.trim().toLowerCase();
    const password = loginPassword.value;

    const user = users.find(u=>u.username===username && u.password===password);
    if(!user) return alert("Identifiant ou mot de passe incorrect");

    session = user;
    loginDiv.classList.add("hidden");

    if(user.role==="admin"){
        adminDiv.classList.remove("hidden");
        loadEmployees();
    } else {
        caisseDiv.classList.remove("hidden");
        employeeName.innerText = `${user.prenom} ${user.nom}`;
    }
}

function logout(){
    session=null;
    cart=[];
    totalPrice=0;
    updateCart();

    loginDiv.classList.remove("hidden");
    adminDiv.classList.add("hidden");
    caisseDiv.classList.add("hidden");
}

// ===== ADMIN =====
function createEmployee(){
    const prenom = document.getElementById("newPrenom").value.trim();
    const nom = document.getElementById("newNom").value.trim();
    const password = document.getElementById("newPassword").value;

    if(!prenom||!nom||!password) return alert("Tous les champs sont obligatoires");

    const username = `${nom}.${prenom}`.toLowerCase();
    if(users.find(u=>u.username===username)) return alert("Cet employé existe déjà");

    users.push({username, prenom, nom, password, role:"employee"});
    localStorage.setItem("ltd_users",JSON.stringify(users));
    loadEmployees();
    alert(`Employé créé : ${username}`);
}

function loadEmployees(){
    employeeList.innerHTML="";
    users.filter(u=>u.role==="employee").forEach(e=>{
        const li=document.createElement("li");
        li.innerText=`${e.prenom} ${e.nom} — ${e.username}`;
        employeeList.appendChild(li);
    });
}

// ===== CAISSE =====
function showCategory(cat){
    categoryTitle.innerText=cat.toUpperCase();
    productList.innerHTML="";
    products[cat].forEach(p=>{
        const div=document.createElement("div");
        div.className="product";
        div.innerHTML=`<span>${p.name} - ${p.price}$</span>
        <button onclick="addToCart('${p.name}',${p.price})">+</button>`;
        productList.appendChild(div);
    });
}

function addToCart(name,price){
    cart.push({name,price});
    totalPrice+=price;
    updateCart();
}

function updateCart(){
    cartList.innerHTML="";
    cart.forEach(i=>{
        const li=document.createElement("li");
        li.innerText=`${i.name} - ${i.price}$`;
        cartList.appendChild(li);
    });
    totalEl.innerText=totalPrice;
}

function pay(){
    if(cart.length===0) return alert("Le panier est vide !");
    alert(`Paiement encaissé : ${totalPrice}$`);
    cart=[];
    totalPrice=0;
    updateCart();
}
