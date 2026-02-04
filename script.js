let employees=[];
let sales=[];
let cart=[];
let total=0;

const products={
    menu:[{n:"Menu Basique",p:20}],
    collector:[{n:"Collector Gold",p:150}],
    boisson:[{n:"Eau",p:5}],
    nourriture:[{n:"Burger",p:15}],
    fleur:[{n:"Rose",p:25}]
};

function login(){
    login.classList.add("hidden");
    app.classList.remove("hidden");
}

function logout(){
    location.reload();
}

function showCategory(cat){
    productList.innerHTML="";
    products[cat].forEach(p=>{
        productList.innerHTML+=`
        <div class="product">
            <span>${p.n}</span>
            <button onclick="add('${p.n}',${p.p})">+</button>
        </div>`;
    });
}

function add(name,price){
    cart.push({name,price});
    total+=price;
    updateCart();
}

function updateCart(){
    cartList.innerHTML="";
    const g={};
    cart.forEach(i=>{
        if(!g[i.name]) g[i.name]={q:0,p:i.price};
        g[i.name].q++;
    });
    for(let n in g){
        cartList.innerHTML+=`<li>${n} x${g[n].q}</li>`;
    }
    totalSpan.innerText=total;
}

function pay(){
    sales.push(...cart);
    cart=[];
    total=0;
    updateCart();
    updateCA();
}

function addEmployee(){
    employees.push({
        prenom:empPrenom.value,
        nom:empNom.value,
        role:empRole.value
    });
    renderEmployees();
}

function renderEmployees(){
    employeeList.innerHTML="";
    employees.forEach(e=>{
        employeeList.innerHTML+=`<li>${e.prenom} ${e.nom} (${e.role})</li>`;
    });
}

function updateCA(){
    totalCA.innerText = sales.reduce((t,s)=>t+s.price,0)+" $";
}
