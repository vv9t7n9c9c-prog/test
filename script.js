let users = JSON.parse(localStorage.getItem("ltd_users")) || [
    {
        id: "admin",
        prenom: "Direction",
        nom: "Portolina",
        password: "portolina2026",
        role: "admin"
    }
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

function login() {
    const id = loginId.value;
    const pwd = loginPassword.value;

    const user = users.find(u => u.id === id && u.password === pwd);
    if (!user) return alert("Identifiants invalides");

    session = user;
    login.classList.add("hidden");

    if (user.role === "admin") {
        admin.classList.remove("hidden");
        loadEmployees();
    } else {
        caisse.classList.remove("hidden");
        employeeName.innerText = `${user.prenom} ${user.nom}`;
    }
}

function logout() {
    session = null;
    cart = [];
    total = 0;
    document.querySelectorAll(".admin-panel, .caisse").forEach(e => e.classList.add("hidden"));
    document.getElementById("login").classList.remove("hidden");
}

function createEmployee() {
    const emp = {
        id: newId.value,
        prenom: newPrenom.value,
        nom: newNom.value,
        password: newPassword.value,
        role: "employee"
    };

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

function showCategory(cat) {
    categoryTitle.innerText = cat.toUpperCase();
    productList.innerHTML = "";

    products[cat].forEach(p => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `${p.name} - ${p.price}$ 
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
    total.innerText = total;
}

function pay() {
    alert(`Paiement encaissé : ${total}$`);
    cart = [];
    total = 0;
    updateCart();
}
