const pending = document.querySelector(".pending")
const already = document.querySelector(".already")
const end = document.querySelector(".end")

let today = new Date()
let year = today.getFullYear()+""
let date 
let month
if (today.getDate() < 10 ){
    date = "0"+(today.getDate())
    month = "0"+(today.getMonth()+1)
}else{
    date = today.getDate()+""
    month = today.getMonth()+1+""
}
let todayNow = parseInt(year+month+date)
function frame(one, data, i){
    return ('<div class="historyOrderFrame">'+
                '<div class="orderImage">'+
                '<img src = "'+one +'">'+'</div>'+
                '<div class="orderFrame">'+
                    '<div class="orderNumber">'+
                        '<h5>訂單資訊</h5>'+
                        '<div class="orderItem"><div>訂單編號 : </div><div class="number">'+data.data[i].number+'</div></div>'+
                        '<div class="orderItem"><div>日期 : </div><div class="date">'+data.data[i].date+'</div></div>'+
                        '<div class="orderItem"><div>景點名稱 : </div><div class="attractionName">'+data.data[i].attractionName+'</div></div>'+
                        '<div class="orderItem"><div>時間 : </div><div class="time">'+data.data[i].time+'</div></div>'+
                        '<div class="orderItem"><div>金額 : </div><div class="price">'+data.data[i].price+'</div></div>'+
                    '</div>'+
                    '<div class="orderName">'+
                        '<h5>聯絡人資訊</h5>'+
                        '<div class="orderItem"><div> 聯絡人 : </div><div class="number">'+data.data[i].name+'</div></div>'+
                        '<div class="orderItem"><div> 手機 : </div><div class="attractionName">'+data.data[i].phone+'</div></div>'+
                        '<div class="orderItem"><div> 信箱 : </div><div class="date">'+data.data[i].email+'</div></div>'+
                    '</div>'+
                '</div>')
}


fetch("api/history").then(function(response){
    return response.json();
}).then((data)=>{
    let date = data.data[0].date.split("-")
    let datatime = parseInt(date[0]+date[1]+date[2])
    // let Frame = ()
    let historyOrder = document.querySelector(".historyOrder")
    // console.log(historyOrder)   
    let datas = data.data
    historyOrder.innerHTML=""
    already.className = "historyitem already"
    end.className = "historyitem end"
    pending.className = "historyitem pending borderbottom"
    for(let i = 0 ; i < data.data.length; i++){
        if (data.data[i].status == 1){
            let one = datas[i].images.split(", ", 1)
            historyOrder.innerHTML += frame(one[0], data, i)
        }
    }      
    pending.addEventListener("click", ()=>{
        historyOrder.innerHTML=""
        already.className = "historyitem already"
        end.className = "historyitem end"
        pending.className = "historyitem pending borderbottom"
        for(let i = 0 ; i < data.data.length; i++){
            if (data.data[i].status == 1){
                let one = datas[i].images.split(", ", 1)
                historyOrder.innerHTML += frame(one[0], data, i)
            }
        }      
    })
    already.addEventListener("click", ()=>{
        historyOrder.innerHTML=""
        pending.className = "historyitem pending"
        end.className = "historyitem end"
        already.className = "historyitem already borderbottom"
        
        for(let i = 0 ; i < data.data.length; i++){
            let date = data.data[i].date.split("-")
            let datetime = parseInt(date[0]+date[1]+date[2])
            if (data.data[i].status == 0 && todayNow <= datetime){
                console.log(datetime)
                console.log(todayNow)
                let one = datas[i].images.split(", ", 1)
                historyOrder.innerHTML += frame(one[0], data, i)
            }
        }      
    })
    end.addEventListener("click", ()=>{
        historyOrder.innerHTML=""
        already.className = "historyitem already"
        pending.className = "historyitem pending"
        end.className = "historyitem end borderbottom"
        for(let i = 0 ; i < data.data.length; i++){
            let date = data.data[i].date.split("-")
            let datetime = parseInt(date[0]+date[1]+date[2])
            if (data.data[i].status == 0 && datetime < todayNow){
                let one = datas[i].images.split(", ", 1)
                historyOrder.innerHTML += frame(one[0], data, i)
            }
        }      
    })
})

// historyItem.forEach(function(ele){
//     console.log(ele)
//     ele.addEventListener("click", ()=>{
//         console.log(ele.className)
//         ele.className = "historyitem borderbottom"
//     })
// });

// const fileInput = document.querySelector(".fileinput");
// fileInput.addEventListener("change", ()=>{
//     // const file = this.files[0];
//     readURL(this)
// })

// function readURL(input){
//     if(input.files && input.files[0]){
//       var reader = new FileReader();
//       reader.onload = function (e) {
//         console.log(e)
//         const avatar = document.querySelector(".avatar")
//         avatar.attr('src', e.target.result);
//       }
//       reader.readAsDataURL(input.files[0]);
//     }
//   }
var loadFile = function(event) {
    var avatar = document.querySelector('.avatar');
    avatar.src = URL.createObjectURL(event.target.files[0]);
    avatar.onload = function() {
        URL.revokeObjectURL(avatar.src) // free memory
    }
};