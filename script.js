/* UTILISATEURS (exemple) */
const users = [
    {name:"Jean Dupont", password:"1234"},
    {name:"Marie Martin", password:"azerty"}
];

/* PRODUITS */
const products = {
    menu:[{name:"Menu Basique",price:20},{name:"Menu VIP",price:50}],
    boisson:[{name:"Eau",price:5},{name:"Coca",price:8}],
    nourriture:[{name:"Burger",price:15}],
    fleur:[{name:"Rose",price:25}]
};

let cart=[];
let total=0;

/* CONNEXION */
function login(){
    const name = loginName.value.trim();
    const pass = loginPassword.value.trim();

    const user = users.find(u => u.name === name && u.password === pass);
    if(!user) return alert("Nom ou mot de passe incorrect");

    loginScreen.classList.add("hidden");
    caisseApp.classList.remove("hidden");
}

function logout(){
    location.reload();
}

/* PRODUITS */
function showCategory(cat){
    categoryTitle.innerText = cat.toUpperCase();
    productList.innerHTML="";
    products[cat].forEach(p=>{
        productList.innerHTML+=`
        <div class="product">
            <span>${p.name}</span>
            <button onclick="add('${p.name}',${p.price})">+</button>
        </div>`;
    });
}

/* PANIER */
function add(name,price){
    cart.push({name,price});
    total+=price;
    updateCart();
}

function updateCart(){
    cartList.innerHTML="";
    const grouped={};

    cart.forEach(i=>{
        if(!grouped[i.name]) grouped[i.name]={q:0};
        grouped[i.name].q++;
    });

    for(let n in grouped){
        cartList.innerHTML+=`<li>${n} x${grouped[n].q}</li>`;
    }
    document.getElementById("total").innerText = total;
}

function pay(){
    alert("Encaissement : "+total+" $");
    cart=[]; total=0;
    updateCart();
}
