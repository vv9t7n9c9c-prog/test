const users = [
    {user:"admin", pass:"1234"}
];

const products = {
    menu:[{name:"Menu Basique",price:20},{name:"Menu VIP",price:50}],
    boisson:[{name:"Eau",price:5},{name:"Coca",price:8}],
    nourriture:[{name:"Burger",price:15}],
    fleur:[{name:"Rose",price:25}]
};

let cart=[];
let total=0;

/* LOGIN */
function login(){
    const u = loginUser.value;
    const p = loginPass.value;

    const ok = users.find(x=>x.user===u && x.pass===p);
    if(!ok) return alert("Identifiants incorrects");

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
    total.innerText=total;
}

function pay(){
    alert("Encaissement : "+total+" $");
    cart=[]; total=0;
    updateCart();
}
