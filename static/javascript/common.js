////////////////////////////////////////////////////////////////////////////////
let signinup = document.querySelector(".signinup");
signinup.addEventListener("click", function(){
    let signin = document.querySelector(".signinBack");
    if (signinup.textContent == "登入/註冊"){
        signin.style.display = "";
    }
})
////////////////////////////////////////////////////////////////////////////////
let signout = document.querySelector(".signout");
signout.addEventListener("click", ()=>{
    if (document.cookie){
        fetch("/api/user/auth",{
            method : "DELETE"
        }).then(function(response){
            response.json().then(function(data){
                let signinup = document.querySelector(".signinup");
                signinup.className = "signinup";
            })
        })
        location.reload()
    }
})

////////////////////////////////////////////////////////////////////////////////
let close_ = document.querySelectorAll(".close");
close_.forEach(function(ele){
    ele.addEventListener("click", function (){
        let signinFrame = document.querySelector(".signinBack");
        signinFrame.style.display = "none";
    })
})

////////////////////////////////////////////////////////////////////////////////
const signinSignup = document.querySelectorAll(".inUp");
signinSignup.forEach(ele => {
    ele.addEventListener("click", function (){
        let mess = document.querySelector(".mess");
        let signin = document.querySelector(".signinFrame");
        let signup = document.querySelector(".signupFrame");
        searchSignup = signup.className.includes("none");
        if(searchSignup){
            signin.classList.add("none");
            signup.classList.remove("none");
            if(mess){
                mess.remove();
            }
        }else{
            signin.classList.remove("none");
            signup.classList.add("none");
            if(mess){
                mess.remove();
            }
        }
    })
})

////////////////////////////////////////////////////////////////////////////////
const signinBtn = document.querySelector(".signinBtn");
const messageSignin = document.querySelector(".messageSignin");
const newdivSignin = document.createElement("div");

signinBtn.addEventListener("click", function (){
    let account = document.querySelector(".accountSignin").value;
    let password = document.querySelector(".passwordSignin").value;
    let signindata = {
        "account" : account, 
        "password" : password
    }
    fetch("/api/user/auth",{
        method : "PUT",
        body : JSON.stringify(signindata),
        cache : "no-cache",
        headers : new Headers({
            "content-type" : "application/json"
        })
    }).then(function(response){
        return response.json()
    }).then(function (data){
        if(data.error){
            newdivSignin.setAttribute("class", "mess")
            newdivSignin.setAttribute("style", "color:red")
            messageSignin.appendChild(newdivSignin)
            let mess = document.querySelector(".mess")
            mess.innerText = data.message
        }
        if(data.ok){
            location.reload()
        }
    })
})

////////////////////////////////////////////////////////////////////////////////
fetch("/api/user/auth",{
    method : "GET"
}).then(function(response){
    response.json().then(function(data){
        if (data.data){
            let signinup = document.querySelector(".signinup")
            signinup.style.display = "none"
            const MemberSystem = document.querySelector(".MemberSystem")
            MemberSystem.className = "MemberSystem"
        }else{
            const MemberSystem = document.querySelector(".MemberSystem")
            MemberSystem.style.display="none"
        }
    })
})
////////////////////////////////////////////////////////////////////////////////
const memberSystem = document.querySelector(".MemberSystem")
memberSystem.addEventListener("click", ()=>{
    const memberSystem = document.querySelector(".memberSystem")
    console.log(memberSystem.style.display)
    if (memberSystem.style.display == "none"){
        memberSystem.style.display = ""
    }else{
        memberSystem.style.display = "none"
    }
    
})
////////////////////////////////////////////////////////////////////////////////
const emailRule = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

const signupBtn = document.querySelector(".signupBtn");
let messageSignup = document.querySelector(".messageSignup")
let newdiv = document.createElement("div")
signupBtn.addEventListener("click", ()=>{
    let name = document.querySelector(".nameSignup").value;
    let account = document.querySelector(".accountSignup").value;
    let password = document.querySelector(".passwordSignup").value;
    let signupdata = null
    // console.log(account.search(emailRule))
    if(name == "" || account == "" || password == ""){
        newdiv.setAttribute("class", "mess")
        newdiv.setAttribute("style", "color:red")
        messageSignup.appendChild(newdiv)
        let mess = document.querySelector(".mess")
        mess.innerText = "欄位不能為空"
    }else{
        if (account.search(emailRule)!=-1){
            signupdata = {
                "name" : name,
                "account" : account,
                "password" : password
            }

            fetch("/api/user",{
                method : "POST",
                body : JSON.stringify(signupdata),
                cache : "no-cache",
                headers : new Headers({
                    "content-type" : "application/json"
                })
            }).then(function(response){
                response.json().then(function(data){
                    if (data.error){
                        newdiv.setAttribute("class", "mess")
                        newdiv.setAttribute("style", "color:red")
                        messageSignup.appendChild(newdiv)
                        let mess = document.querySelector(".mess")
                        mess.innerText = data.message
                    }
                    if (data.ok){
                        newdiv.setAttribute("class", "mess")
                        newdiv.setAttribute("style", "color:green")
                        messageSignup.appendChild(newdiv)
                        let mess = document.querySelector(".mess")
                        mess.innerText = "註冊成功"
                    }
                })
            })
        }else{
            newdiv.setAttribute("class", "mess")
            newdiv.setAttribute("style", "color:red")
            messageSignup.appendChild(newdiv)
            let mess = document.querySelector(".mess")
            mess.innerText = "信箱格式錯誤"
        }
    }
})

////////////////////////////////////////////////////////////////////////////////
const errorClose = document.querySelector(".errorClose")
errorClose.addEventListener("click", ()=>{
    const errorBack = document.querySelector(".errorBack");
    errorBack.style.display = "none";
})