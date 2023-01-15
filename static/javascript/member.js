fetch("api/member").then(function(response){
    return response.json()
}).then(function(data){
    console.log(data)
    const memberpageName = document.querySelector(".memberpageName")
    const memberpageEmail = document.querySelector(".memberpageEmail")
    memberpageName.textContent = data.data.name
    memberpageEmail.textContent = data.data.email
    arr = data.data.image
    // console.log(arr)
    // ab = URL.createObjectURL(new Blob([new Uint8Array(arr)], {type: "image/png"}));
    // console.log(ab)
    // abc = 'data:image/jpg;base64,' + btoa(ab)
    // console.log(abc)
    document.querySelector('.bob2').src = arr

})

let memberNameBack = document.querySelector(".memberNameBack")
let memberEmailBack = document.querySelector(".memberEmailBack")
let memberPasswordBack = document.querySelector(".memberPasswordBack")
let memberAvatarBack = document.querySelector(".memberAvatarBack")


let memberpageModifyName = document.querySelector(".memberpageModifyName")
let memberpageModifyEmail = document.querySelector(".memberpageModifyEmail")
let memberpageModifyPassword = document.querySelector(".memberpageModifyPassword")
let memberpageModifyavatar = document.querySelector(".memberpageModifyavatar")
let closeX = document.querySelectorAll(".close")

memberpageModifyName.addEventListener("click", ()=>{
    memberNameBack.classList.remove("none");
    let okgooogle = document.querySelector(".ok")
    okgooogle.addEventListener("click", ()=>{
        console.log(22222)
        const memberAfterName = document.querySelector(".memberAfterName").value
        let data = {
            "name": memberAfterName
        }
        fetch("api/member",{
            method:"PUT",
            body : JSON.stringify(data),
            cache : "no-cache",
            headers : new Headers({
                "content-type" : "application/json"
            })
        }).then(function(response){
            return response.json()
        }).then(function(data){

        })
    })
})
memberpageModifyEmail.addEventListener("click", ()=>{
    memberEmailBack.classList.remove("none");
})
memberpageModifyPassword.addEventListener("click", ()=>{
    memberPasswordBack.classList.remove("none");
})
memberpageModifyavatar.addEventListener("click", ()=>{
    memberAvatarBack.classList.remove("none");
    let okk = document.querySelector(".okk")
    console.log(okk)
    okk.addEventListener("click", ()=>{
        console.log(a)
        // const outputsrc = document.querySelector(".output")
        // console.log(outputsrc)
        let data = {
            "avatar": a
        }
        console.log(data)
        fetch("api/member",{
            method:"POST",
            body : JSON.stringify(data),
            cache : "no-cache",
            headers : new Headers({
                "content-type" : "application/json"
            })
        }).then(function(response){
            return response.json()
        }).then(function(data){
            console.log(data)
        })
    })
})
closeX.forEach(element => {
    element.addEventListener("click", ()=>{
        let searchmemberpageModifyName = memberpageModifyName.className.includes("none");
        let searchmemberpageModifyEmail = memberpageModifyEmail.className.includes("none");
        let searchmemberpageModifyPassword = memberpageModifyPassword.className.includes("none");
        let searchmemberpageModifyavatar = memberpageModifyavatar.className.includes("none");
        console.log(searchmemberpageModifyName)
        if (!searchmemberpageModifyName){
            memberNameBack.classList.add("none");
        }
        if (!searchmemberpageModifyEmail){
            memberEmailBack.classList.add("none");
        }
        if (!searchmemberpageModifyPassword){
            memberPasswordBack.classList.add("none");
        }
        if (!searchmemberpageModifyavatar){
            memberAvatarBack.classList.add("none");
        }
    })
});

let a;
var loadFile = function(event) {
    var reader = new FileReader();
    const file = event.target.files[0]
    reader.onload = function(){
        const blob = new Blob([reader.result], { type: 'image/jpeg' })
        console.log(blob)
        var output = document.querySelector('.output');
        const str = String.fromCharCode.apply(null, new Uint8Array(reader.result))
        // 將其組成 DataURL
        a = 'data:image/jpg;base64,' + btoa(str)
        console.log(a)
        output.src = URL.createObjectURL(blob);
        // outputsrc = output.src
        // (async () => {
        //     const blob = new Blob([reader.result], { type: 'image/jpeg' })
        //     const arrayBuffer = await blob.arrayBuffer();
        //     console.log(arrayBuffer)
        //     console.log( arrayBuffer.byteLength ); // 5
        //     a = Array.from(new Uint8Array(arrayBuffer))
        //     console.log(a)
        //   })();
        
    };
    reader.readAsArrayBuffer(file)
};
