
//////////////////////////////////////////////////////////////////
const todaystart = document.querySelector("#start")
let today = new Date()
let year = today.getFullYear()
let date = today.getDate()+1
let month = today.getMonth()+1
let todayNow = year+"-"+month+"-"+date
console.log(todayNow)
todaystart.setAttribute("min", todayNow)
//////////////////////////////////////////////////////////////////
let url = '/api'+window.location.pathname
let image 
let count = 0
fetch(url).then(function(response){
    return response.json()
}).then(function(data){
    console.log(data)
    console.log(data.data[0])
    const data_ = data.data[0]
    image = data.data[0].images
    for (let i = 0; i<data.data[0].images.length;i++){
        document.querySelector(".img").innerHTML += '<img class="pic" src='+data_.images[i]+'>'
        document.querySelector(".bottom").innerHTML +="<div class='circle'><div class='incircle' onclick='clickslide("+ i +")'></div></div>"
        let pic = document.querySelectorAll(".pic")
        pic[i].style.display="none"
    }
    let pic = document.querySelectorAll(".pic")
    pic[count].style.display="inline"
    let aa = document.querySelectorAll(".incircle")
    aa[count].className += " active"
    document.querySelector(".name").innerHTML = data_.name
    document.querySelector(".mrtCat").innerHTML = data_.category+" at "+data_.mrt
    document.querySelector(".description").innerHTML = data_.description
    document.querySelector(".addressCon").innerHTML = data_.address
    document.querySelector(".transportCon").innerHTML = data_.transport
})
//////////////////////////////////////////////////////////////////
// const witch = document.querySelectorAll("._switch");
// // console.log(witch)
// witch.forEach(ele=>{
//     ele.addEventListener("click", ()=>{
//         console.log("ele")
//     })
// })
//////////////////////////////////////////////////////////////////
let start = 1
function slide(n) {
    show(start += n);
}

function clickslide(n) {
    show(start = n+1);
}

function show(n){
    let i;
    let slides = document.querySelectorAll(".pic")
    let incircle = document.querySelectorAll(".incircle")
    if (n == slides.length+1){
        start = 1
    }
    if (n < 1) {start = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < incircle.length; i++) {
        incircle[i].className = incircle[i].className.replace(" active", "");
    }
    slides[start-1].style.display = "block";  
    incircle[start-1].className += " active";
}
//////////////////////////////////////////////////////////////////
const morBtnDiv = document.querySelector(".morBtnDiv");
morBtnDiv.addEventListener("click", ()=>{
    const morBtn = document.querySelector(".morBtnShow")
    const aftBtn = document.querySelector(".aftBtnShow")
    const money = document.querySelector(".priceMoney")
    aftBtn.style.display = "none"
    morBtn.style.display = "block"
    money.innerText = '新台幣 2000元'
})
//////////////////////////////////////////////////////////////////
const aftBtnDiv = document.querySelector(".aftBtnDiv");
aftBtnDiv.addEventListener("click", ()=>{
    const morBtn = document.querySelector(".morBtnShow")
    const aftBtn = document.querySelector(".aftBtnShow")
    const money = document.querySelector(".priceMoney")
    morBtn.style.display = "none"
    aftBtn.style.display = "block"
    money.innerText = '新台幣 2500元'
})
//////////////////////////////////////////////////////////////////
const startreserve = document.querySelector(".btn")
startreserve.addEventListener("click", function(){
    if(!document.cookie){
        const signinup = document.querySelector(".signinup");
        const signin = document.querySelector(".signinBack");
        if (signinup.textContent == "登入/註冊"){
            signin.style.display = "";
        } 
    }else{
        let id = window.location.pathname.replace(/[^\d]/g, "")
        const date = document.querySelector("#start").value
        const priceMoney = document.querySelector(".priceMoney").textContent
        let price = priceMoney.replace(/[^\d]/g, "")
        let time =""
        if(price == 2000){
            time = "早上"
        }else{
            time = "下午"
        }
        let schedule = {
            "attractionId": id,
            "date": date,
            "time": time,
            "price": price
        }
        fetch("/api/booking",{
            method : "POST",
            body : JSON.stringify(schedule),
            cache : "no-cache",
            headers : new Headers({
                "content-type" : "application/json"
            })
        }).then(function(response){
            return response.json()
        }).then(function(data){
            if (data.ok){
                window.location.href = "/booking"
            }
            if (data.error){
                const errorBack = document.querySelector(".errorBack");
                errorBack.style.display = "";
                const errorMessageText = document.querySelector(".errorMessageText");
                errorMessageText.innerHTML = data.message;
            }
        })
    }
})

//////////////////////////////////////////////////////////////////
// console.log(document.cookie)
// const date1 = document.querySelector("#start").value
// const priceMoney = document.querySelector(".priceMoney").textContent
// let pa = priceMoney.replace(/[^\d]/g, "")
// console.log(pa)
// console.log(date1)
