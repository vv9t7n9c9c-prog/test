let session = null;
let cart = [];
let total = 0;

// FAKE BDD (à remplacer par serveur)
let users = JSON.parse(localStorage.getItem("ltd_users")) || [];

const products = {
    boisson: [
        { name: "Eau", price: 5 },
        { name: "Café", price: 10 }
    ],
    repas: [
        { name: "Sandwich", price: 15 },
        { name: "Burger", price: 25 }
    ],
    alcool: [
        { name: "Bière", price: 20 }
    ],
    soft: [
        { name: "Cola", price: 8 }
    ]
};

// ---------- AUTH ----------
function register() {
    const id = playerId.value;
    const prenom = document.getElementById("prenom").value;
    const nom = document.getElementById("nom").value;
    const password = document.getElementById("password").value;

    if (!id || !prenom || !nom || !password) {
        alert("Tous les champs sont obligatoires");
        return;
    }

    if (users.find(u => u.id === id)) {
        alert("Compte déjà existant");
        return;
    }

    const user = { id, prenom, nom, password };
    users.push(user);
    localStorage.setItem("ltd_users", JSON.stringify(users));

    alert("Compte créé !");
}

function login() {
    const id = playerId.value;
    const password = document.getElementById("password").value;

    const user = users.find(u => u.id === id && u.password === password);

    if (!user) {
        alert("Identifiants invalides");
        return;
    }

    session = user;
    document.getElementById("login").classList.add("hidden");
    document.getElementById("caisse").classList.remove("hidden");
    document.getElementById("employee-name").innerText =
        `${user.prenom} ${user.nom}`;

    // FiveM server example
    // fetch(`https://nom_ressource/login`, {
    //   method: "POST",
    //   body: JSON.stringify(user)
    // });
}

function logout() {
    session = null;
    cart = [];
    total = 0;
    updateCart();

    document.getElementById("login").classList.remove("hidden");
    document.getElementById("caisse").classList.add("hidden");
}

// ---------- CAISSE ----------
function showCategory(cat) {
    document.getElementById("category-title").innerText = cat.toUpperCase();
    const list = document.getElementById("product-list");
    list.innerHTML = "";

    products[cat].forEach(p => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
            <span>${p.name} - ${p.price}$</span>
            <button onclick="addToCart('${p.name}', ${p.price})">+</button>
        `;
        list.appendChild(div);
    });
}

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    updateCart();
}

function updateCart() {
    const list = document.getElementById("cart-list");
    list.innerHTML = "";
    cart.forEach(i => {
        const li = document.createElement("li");
        li.innerText = `${i.name} - ${i.price}$`;
        list.appendChild(li);
    });
    document.getElementById("total").innerText = total;
}

function pay() {
    alert(`Encaissement ${total}$ par ${session.prenom}`);
    cart = [];
    total = 0;
    updateCart();
}
