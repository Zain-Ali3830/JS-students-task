const form=document.getElementById("form");

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;
    const name=document.getElementById("name").value;
    localStorage.setItem("email",email);
    localStorage.setItem("password",password);
    localStorage.setItem("name",name);

    if(email && password && name){
        window.location.href="home.html";
    }
    else{
        alert("Please fill all the fields");
    }

})