async function addProduct(){
 await fetch("/add-product",{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({
   name:name.value,
   price:price.value,
   stock:stock.value,
   image:image.value
  })
 });

 alert("Added");
 loadAdmin();
}

async function loadAdmin(){
 const res=await fetch("/products");
 const products=await res.json();

 const div=document.getElementById("adminProducts");
 div.innerHTML="";

 products.forEach(p=>{
  div.innerHTML+=`
   <div class="card">
    <h3>${p.name}</h3>
    <button onclick="del(${p.id})">Delete</button>
   </div>`;
 });
}

async function del(id){
 await fetch("/delete-product",{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({id})
 });

 loadAdmin();
}

loadAdmin();
