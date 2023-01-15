const number = document.querySelector(".number")
const ordername = document.querySelector(".name")
const orderemail = document.querySelector(".email")
const orderphone = document.querySelector(".phone")
const price = document.querySelector(".price")
const orderstatus = document.querySelector(".status")
let url = window.location.search
document.querySelector(".footer").style.display = "none"
fetch("/api/orders"+url).then(function(response){
    return response.json()
}).then(function(datas){
    let data = datas.data
    let Payment
    if (data.status == 0){
        Payment = "已付款"
    }else{
        Payment = "未付款"
    }
    number.textContent = data.number
    ordername.textContent = data.contact.name
    orderemail.textContent = data.contact.email
    orderphone.textContent = data.contact.phone
    price.textContent = data.price
    orderstatus.textContent = Payment
})


// 取得 canvas 元素並建立 2D 繪圖環境
var canvas = document.getElementById('fireworks');
var ctx = canvas.getContext('2d');

// 設定 canvas 的寬度和高度


// 定義一個煙火物件
function Firework() {
    this.x = Math.random() * canvas.width; // 煙火的 x 座標
    this.y = canvas.height; // 煙火的 y 座標
    this.vx = Math.random() * 5 - 2.5; // 煙火的 x 速度
    this.vy = -(Math.random() * 10 + 0); // 煙火的 y 速度
    this.radius = Math.random() * 2 + 0; // 煙火的半徑
    this.color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)'; // 煙火的顏色
    this.lifetime = 0; // 煙火的生命週期
}

// 更新煙火的位置
Firework.prototype.update = function() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.1;
    this.lifetime++;
};

// 繪製煙火
Firework.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
};

// 建立一個存放煙火的陣列
var fireworks = [];

// 每次畫面重新渲染時執行的函式
function animate() {
    requestAnimationFrame(animate); // 請求畫面重新渲染

    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除畫面

// 更新並繪製所有煙火
    for (var i = 0; i < fireworks.length; i++) {
        fireworks[i].update();
        fireworks[i].draw();
            // 如果煙火的生命週期大於 50，就從陣列中移除它
        if (fireworks[i].lifetime > 100) {
        fireworks.splice(i, 1);
        i--;
        }
    }

        // 如果陣列中的煙火數量小於 10，就加入一顆新的煙火
    if (fireworks.length < 30) {
        fireworks.push(new Firework());
    }
}

// 啟動動畫
animate();
