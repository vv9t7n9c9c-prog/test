// ================== UTILISATEURS ==================
let users = JSON.parse(localStorage.getItem("ltd_users"));

if (!users) {
    users = [
        {
            username: "direction.portolina",
            prenom: "Direction",
            nom: "Portolina",
            password: "portolina2026",
            role: "admin"
        }
    ];
    localStorage.setItem("ltd_users", JSON.stringify(users));
}

// ================== VARIABLES ==================
let session = null;
let cart = [];
let totalPrice = 0;

// ================== PRODUITS ==================
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

// ================== CONNEXION ==================
function loginUser() {
    const username = document.getElementById("loginId").value.toLowerCase();
    const pwd = document.getElementById("loginPassword").value;

    const user = users.find(
        u => u.username === username && u.password === pwd
    );

    if (!user) {
        alert("Identifiant ou mot de passe incorrect");
        return;
    }

    session = user;

    document.getElementById("login").classList.add("hidden");

    if (user.role === "admin") {
        document.getElementById("admin").classList.remove("hidden");
        loadEmployees();
    } else {
        document.getElementById("caisse").classList.remove("hidden");
        document.getElementById("employeeName").innerText =
            `${user.prenom} ${user.nom}`;
    }
}

// ================== DÉCONNEXION ==================
function logout() {
    session = null;
    cart = [];
    totalPrice = 0;
    updateCart();

    document.getElementById("admin").classList.add("hidden");
    document.getElementById("caisse").classList.add("hidden");
    document.getElementById("login").classList.remove("hidden");
}

// ================== ADMIN ==================
function createEmployee() {
    const prenom = document.getElementById("newPrenom").value.trim();
    const nom = document.getElementById("newNom").value.trim();
    const password = document.getElementById("newPassword").value;

    if (!prenom || !nom || !password) {
        alert("Tous les champs sont obligatoires");
        return;
    }

    const username = `${nom}.${prenom}`.toLowerCase();

    if (users.find(u => u.username === username)) {
        alert("Cet employé existe déjà");
        return;
    }

    const emp = {
        username,
        prenom,
        nom,
        password,
        role: "employee"
    };

    users.push(emp);
    localStorage.setItem("ltd_users", JSON.stringify(users));
    loadEmployees();

    alert(`Employé créé : ${username}`);
}

// ================== LISTE EMPLOYÉS ==================
function loadEmployees() {
    const list = document.getElementById("employeeList");
    list.innerHTML = "";

    users
        .filter(u => u.role === "employee")
        .forEach(e => {
            const li = document.createElement("li");
            li.innerText = `${e.prenom} ${e.nom} — ${e.username}`;
            list.appendChild(li);
        });
}

// ================== CAISSE ==================
function showCategory(cat) {
    document.getElementById("categoryTitle").innerText = cat.toUpperCase();
    const list = document.getElementById("productList");
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
    totalPrice += price;
    updateCart();
}

function updateCart() {
    const list = document.getElementById("cartList");
    list.innerHTML = "";

    cart.forEach(i => {
        const li = document.createElement("li");
        li.innerText = `${i.name} - ${i.price}$`;
        list.appendChild(li);
    });

    document.getElementById("total").innerText = totalPrice;
}

function pay() {
    alert(`Paiement encaissé : ${totalPrice}$`);
    cart = [];
    totalPrice = 0;
    updateCart();
}
