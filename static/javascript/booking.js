let Alldata 
const contactNameInput = document.querySelector(".contact_name_input")
const contactEmailInput = document.querySelector(".contact_email_input")
const contactPhoneInput = document.querySelector(".contact_phone_input")
fetch("/api/user/auth").then(function(response){
    return response.json()
}).then(function(data){
    if(data.data == null){
        window.location.href = "/"
    }else{
        document.querySelector(".no_booking").style.display = "none"
        const userName = document.querySelector(".username")
        userName.textContent = data.data.name
        contactNameInput.setAttribute("value", data.data.name) 
        contactEmailInput.setAttribute("value", data.data.email) 
        fetch("/api/booking").then(function(response){
            return response.json()
        }).then(function(data){
            if(data.data){
                // console.log(data.data)
                document.querySelector(".footer").style.height = "auto"
                const attraction = data.data.attraction
                Alldata = data.data
                const img = document.querySelector(".book_img")
                const bookname = document.querySelector(".bookname")
                const inforBookdate = document.querySelector(".infor_bookdate")
                const inforBooktime = document.querySelector(".infor_booktime")
                const inforBookcost = document.querySelector(".infor_bookcost")
                const inforBooklocal = document.querySelector(".infor_booklocal")
                const AllPrice = document.querySelector(".confirm_price")
                img.setAttribute("src", attraction.image)
                bookname.textContent = "台北一日遊 :" + attraction.name
                inforBookdate.textContent = Alldata.date
                inforBooktime.textContent = Alldata.time
                inforBookcost.textContent = "新台幣 " + Alldata.price + " 元"
                inforBooklocal.textContent = attraction.address
                AllPrice.textContent = "總價 : 新台幣 " + Alldata.price + " 元" 
            }
            if(data.data == null){
                const section = document.querySelector(".section")
                const contactForm = document.querySelector(".contact_form")
                const paymentForm = document.querySelector(".payment_form")
                const confirm = document.querySelector(".confirm")
                section.style.display="none"
                contactForm.style.display="none"
                paymentForm.style.display="none"
                confirm.style.display="none"
                const hr = document.querySelectorAll(".booking_hr")
                hr.forEach(ele =>{
                    ele.style.display="none"
                })
                document.querySelector(".no_booking").style.display = "block"
                document.querySelector(".footerNobooking").style.display = "block"
            }
        })
    }
})

const deleteBooking = document.querySelector(".delete")
deleteBooking.addEventListener("click", ()=>{
    fetch("/api/booking",{
        method : "DELETE"
    }).then(function(response){
        return response.json()
    }).then((data)=>{
        if(data.ok){
            location.reload()
        }
    })
})


////////////////////////////////////////////////////////////////
TPDirect.setupSDK(126945, 'app_Wn78bq4K4yjCnCVg6piFtvyHdtzhITekWcwN50wRbltyHlfCSOXxH6Ogv15Y', 'sandbox')
TPDirect.card.setup({
    fields:{
        number: {
            // css selector
            element: document.querySelector('#card-number'),
            placeholder: '**** **** **** ****'
        },
        expirationDate: {
            // DOM object
            element: document.getElementById('card-expiration-date'),
            placeholder: 'MM / YY'
        },
        ccv: {
            element: document.querySelector('#card-ccv'),
            placeholder: 'ccv'
        }
    },
    styles: {
        // Style all elements
        'input': {
            'color': 'gray'
        },
        // Styling ccv field
        'input.ccv': {
            // 'font-size': '16px'
        },
        // Styling expiration-date field
        'input.expiration-date': {
            // 'font-size': '16px'
        },
        // Styling card-number field
        'input.card-number': {
            // 'font-size': '16px'
        },
        // style focus state
        ':focus': {
            // 'color': 'black'
        },
        // style valid state
        '.valid': {
            'color': 'green'
        },
        // style invalid state
        '.invalid': {
            'color': 'red'
        },
        // Media queries
        // Note that these apply to the iframe, not the root window.
        '@media screen and (max-width: 400px)': {
            'input': {
                'color': 'orange'
            }
        }
    },
    // 此設定會顯示卡號輸入正確後，會顯示前六後四碼信用卡卡號
    isMaskCreditCardNumber: true,
    maskCreditCardNumberRange: {
        beginIndex: 6,
        endIndex: 11
    }
})

TPDirect.card.onUpdate(function (update) {
    update.canGetPrime === true
    let cardResult = document.querySelector(".cardResult") 
    let expiryResult = document.querySelector(".expiryResult") 
    let cvvResult = document.querySelector(".cvvResult") 
    if (update.status.number === 2) {
        // setNumberFormGroupToError()
        cardResult.textContent="✘"
        cardResult.style.color="#FF0000"
    } else if (update.status.number === 0) {
        // setNumberFormGroupToSuccess()
        cardResult.textContent="✔"
        cardResult.style.color="#008000"
    }
    if (update.status.expiry === 2) {
        // setNumberFormGroupToError()
        expiryResult.textContent="✘"
        expiryResult.style.color="#FF0000"
    } else if (update.status.expiry === 0) {
        // setNumberFormGroupToSuccess()
        expiryResult.textContent="✔"
        expiryResult.style.color="#008000"
    }
    if (update.status.ccv === 2) {
        // setNumberFormGroupToError()
        cvvResult.textContent="✘"
        cvvResult.style.color="#FF0000"
    } else if (update.status.ccv === 0) {
        // setNumberFormGroupToSuccess()
        cvvResult.textContent="✔"
        cvvResult.style.color="#008000"
    }

})
let prime
const confirm_btn = document.querySelector(".confirm_btn")
confirm_btn.addEventListener("click",function(event){
    let contact_name = contactNameInput.value
    let contact_email = contactEmailInput.value
    let contact_phone = contactPhoneInput.value
    if (contact_name == "" || contact_email == "" || contact_phone == "" ){
        const errorBack = document.querySelector(".errorBack");
        errorBack.style.display = "";
        const errorMessageText = document.querySelector(".errorMessageText");
        errorMessageText.innerHTML = "請輸入完整資訊";
    }
    event.preventDefault()
    const tappayStatus = TPDirect.card.getTappayFieldsStatus();
    if (tappayStatus.canGetPrime === false) {
        const errorBack = document.querySelector(".errorBack");
        errorBack.style.display = "";
        const errorMessageText = document.querySelector(".errorMessageText");
        errorMessageText.innerHTML = "請輸入信用卡資訊";
        return
    }
    TPDirect.card.getPrime((result) => {
        if (result.status!=0){
            console.log(result.msg)
        }
        console.log('get prime 成功，prime: ' + result.card.prime)
        prime = result.card.prime
        let data = {
            "prime": prime,
            "order": {
                "price": Alldata.price,
                "trip": {
                "attraction": {
                    "id": Alldata.attraction.id,
                    "name": Alldata.attraction.name,
                    "address":Alldata.attraction.address,
                    "image": Alldata.attraction.image
                },
                "date": Alldata.date,
                "time": Alldata.time
                },
                "contact": {
                "name": contact_name,
                "email": contact_email,
                "phone": contact_phone
                }
            }
        }
        fetch("/api/orders",{
            method : "POST",
            body : JSON.stringify(data),
            headers : new Headers({
                "content-type" : "application/json"
            })
        }).then(function(response){
            return response.json()
        }).then(function(data){
            if(data.error){
                const errorBack = document.querySelector(".errorBack");
                errorBack.style.display = "";
                const errorMessageText = document.querySelector(".errorMessageText");
                errorMessageText.innerHTML = data.message;
            }
            if(data.data){
                let number = data.data.number 
                window.location.href = "/thankyou?number="+number
            }
        })
    })
})



