let users = JSON.parse(localStorage.getItem("ltd_users")) || [
    { id: "boss", prenom: "Patron", nom: "LTD", password: "admin", role: "admin" }
];

let session = null;
let cart = [];
let total = 0;

const products = {
    boisson: [{ name: "Eau", price: 5 }, { name: "Café", price: 10 }],
    repas: [{ name: "Sandwich", price: 15 }, { name: "Burger", price: 25 }],
    alcool: [{ name: "Bière", price: 20 }],
    soft: [{ name: "Cola", price: 8 }]
};

// ---------- AUTH ----------
function login() {
    const id = loginId.value;
    const pwd = loginPassword.value;

    const user = users.find(u => u.id === id && u.password === pwd);
    if (!user) return alert("Identifiants invalides");

    session = user;
    document.getElementById("login").classList.add("hidden");

    if (user.role === "admin") {
        document.getElementById("admin").classList.remove("hidden");
        loadEmployees();
    } else {
        document.getElementById("caisse").classList.remove("hidden");
        employeeName.innerText = `${user.prenom} ${user.nom}`;
    }
}

function logout() {
    session = null;
    cart = [];
    total = 0;
    document.querySelectorAll(".card, .caisse").forEach(e => e.classList.add("hidden"));
    document.getElementById("login").classList.remove("hidden");
}

// ---------- ADMIN ----------
function createEmployee() {
    const emp = {
        id: newId.value,
        prenom: newPrenom.value,
        nom: newNom.value,
        password: newPassword.value,
        role: "employee"
    };

    if (users.find(u => u.id === emp.id)) return alert("ID déjà utilisé");

    users.push(emp);
    localStorage.setItem("ltd_users", JSON.stringify(users));
    loadEmployees();
}

function loadEmployees() {
    employeeList.innerHTML = "";
    users.filter(u => u.role === "employee").forEach(e => {
        const li = document.createElement("li");
        li.innerText = `${e.prenom} ${e.nom} (${e.id})`;
        employeeList.appendChild(li);
    });
}

// ---------- CAISSE ----------
function showCategory(cat) {
    categoryTitle.innerText = cat.toUpperCase();
    productList.innerHTML = "";

    products[cat].forEach(p => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `<span>${p.name} - ${p.price}$</span>
            <button onclick="addToCart('${p.name}', ${p.price})">+</button>`;
        productList.appendChild(div);
    });
}

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    updateCart();
}

function updateCart() {
    cartList.innerHTML = "";
    cart.forEach(i => {
        const li = document.createElement("li");
        li.innerText = `${i.name} - ${i.price}$`;
        cartList.appendChild(li);
    });
    document.getElementById("total").innerText = total;
}

function pay() {
    alert(`Paiement ${total}$ encaissé`);
    cart = [];
    total = 0;
    updateCart();
}
