let employees = [];
let sales = [];
let cart = [];
let total = 0;

const products = {
    menu:[{n:"Menu Basique",p:20},{n:"Menu VIP",p:50}],
    collector:[{n:"Collector Gold",p:150}],
    boisson:[{n:"Eau",p:5},{n:"Coca",p:8}],
    nourriture:[{n:"Burger",p:15}],
    fleur:[{n:"Rose",p:25}]
};

/* ===== LOGIN ===== */
function login(){
    const id = loginId.value.trim();
    const pw = loginPassword.value.trim();
    if(!id || !pw) return alert("Champs manquants");

    loginScreen.classList.add("hidden");
    caisseApp.classList.remove("hidden");
}

function logout(){
    location.reload();
}

/* ===== PRODUITS ===== */
function showCategory(cat){
    productList.innerHTML="";
    products[cat].forEach(p=>{
        productList.innerHTML+=`
        <div class="product">
            <span>${p.n}</span>
            <button onclick="addToCart('${p.n}',${p.p})">+</button>
        </div>`;
    });
}

/* ===== PANIER ===== */
function addToCart(name, price){
    cart.push({name, price});
    total += price;
    updateCart();
}

function updateCart(){
    cartList.innerHTML="";
    const grouped = {};

    cart.forEach(i=>{
        if(!grouped[i.name]) grouped[i.name]={qty:0, price:i.price};
        grouped[i.name].qty++;
    });

    for(let n in grouped){
        cartList.innerHTML += `<li>${n} x${grouped[n].qty}</li>`;
    }

    document.getElementById("total").innerText = total;
}

function pay(){
    sales.push(...cart);
    cart=[];
    total=0;
    updateCart();
    updateCA();
}

/* ===== EMPLOYÉS ===== */
function addEmployee(){
    if(!empPrenom.value || !empNom.value) return;

    employees.push({
        prenom: empPrenom.value,
        nom: empNom.value,
        role: empRole.value
    });

    empPrenom.value="";
    empNom.value="";
    renderEmployees();
}

function renderEmployees(){
    employeeList.innerHTML="";
    employees.forEach(e=>{
        employeeList.innerHTML+=`
        <li>${e.prenom} ${e.nom} – ${e.role}</li>`;
    });
}

/* ===== CA ===== */
function updateCA(){
    const ca = sales.reduce((t,s)=>t+s.price,0);
    totalCA.innerText = ca+" $";
}
