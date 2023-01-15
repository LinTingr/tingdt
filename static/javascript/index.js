////////////////////////////////////////////////////////////////////////////////
function xx(){
    if (window.event && window.event.keyCode == 13) {
        window.event.returnValue = false;
    }
}
////////////////////////////////////////////////////////////////////////////////
let isloading = false
let attractionsGroup = document.querySelector(".attractionsGroup");
let nextpage = 0;
let keywordget = " "
////////////////////////////////////////////////////////////////////////////////
function createframe(data, i){
    return ('<a class="link" href=/attraction/'+data.data[i].id+'>'+
            '<div class="frame">'+
            '<img class="pic" src='+ data.data[i].images[0] +' alt="" >'+
            '<div class="name"><div class="nametext">'+ data.data[i].name +'</div></div>'+
            '<div class="context">'+
            '<div class="mrt">'+ data.data[i].mrt +'</div>'+'<div class="cat">'+ data.data[i].category +'</div>'+
            '</div>'+'</div>'+'</a>');
}
////////////////////////////////////////////////////////////////////////////////
fetch(`/api/attractions?page=${nextpage}&keyword=`).then(function(response){
            return response.json();
        }).then(function(data){
            next = data.nextPage
            for(let i = 0; i < data.data.length; i++){
                let frame = createframe(data, i)
                attractionsGroup.innerHTML += frame;
            }
            if (next == 1){
                nextpage = nextpage + 1 ;
            }else{
                nextpage = null;
            }
        })
////////////////////////////////////////////////////////////////////////////////
let categoryList = document.querySelector(".categorylist")
setTimeout(function(){
    fetch("/api/categories").then(function(response){
        return response.json();
    }).then(function(data){
        for(let i = 0; i < data.data.length; i++){
            let list = ('<ol class = "items">'+'<div id="item">'+data.data[i]+'</div>'+'</ol>')
            categoryList.innerHTML += list
        }
        let cat = document.getElementsByTagName('ol');
        // console.log(cat)
        for (let i = 0; i < cat.length; i++){
            cat[i].onclick = function(){
                // console.log(this.innerText)
                document.querySelector(".inputText").textContent = this.innerText
                categoryList.className = "categorylist none"
            }
        }
    })
},100)

categoryList.addEventListener("click", function(){
    categoryList.className = "categorylist"
})
////////////////////////////////////////////////////////////////////////////////  
function e(obj){return document.getElementById(obj)}
e('inputText').onclick=function(event){
    e('categorylist').className='categorylist';
    stopBubble(event); 
    document.onclick=function(){
    e('categorylist').className='categorylist none';
        document.onclick=null;
    }
}

e('categorylist').onclick=function(event){
    //只阻止了向上冒泡，而沒有阻止向下捕獲，所以點擊con的內部對象時，仍然可以執行這個函數
    stopBubble(event); 
}
//阻止冒泡函數
function stopBubble(e){  
    if(e && e.stopPropagation){
    e.stopPropagation();  //w3c
    }else{
    window.event.cancelBubble=true; //IE
    }
}
////////////////////////////////////////////////////////////////////////////////      
document.querySelector('.categorylist').className = "categorylist none";
const searchBtn = document.querySelector(".searchBtn");
searchBtn.addEventListener("click", ()=>{
    nextpage = 0;
    keywordget = document.querySelector(".inputText").innerText
    fetch(`/api/attractions?page=${nextpage}&keyword=${keywordget}`).then(function(response){
        return response.json();
    }).then(function(data){
        attractionsGroup.innerHTML = ""
        next = data.nextPage
        for(let i = 0; i < data.data.length; i++){
            frame = createframe(data, i);
            attractionsGroup.innerHTML += frame;
        }
        if (next == 1){
            nextpage = nextpage + 1 ;
        }else{
            nextpage = null;
        }
    })
})

////////////////////////////////////////////////////////////////////////////////
let loading = false
setTimeout(function(){
    const footer = document.querySelector('.footer');
    const threshold = 0.5
    const options = {
        root: null,
        threshold: threshold,
    };
    const observer = new IntersectionObserver(callback, options);
    // console.log(new IntersectionObserver(callback, options))
    function callback(entry){
        // console.log(entry)
        if (entry[0].isIntersecting){
            if (isloading == false){
                loading = true
                if (nextpage != null){
                    // keywordget = document.querySelector(".inputText").innerText
                    fetch(`/api/attractions?page=${nextpage}&keyword=${keywordget}`).then(function(response){
                        return response.json();
                    }).then(function(data){
                        console.log(data)
                        next = data.nextPage
                        for(let i = 0; i < data.data.length; i++){
                            attractionsGroup.innerHTML += createframe(data, i) ;
                        }
                        if (next == 1){
                            nextpage = nextpage + 1 ;
                        }else{
                            nextpage = null;
                        }
                    })
                }
            }
            isloading = false
        }
    }
    observer.observe(footer);  
},1000)
////////////////////////////////////////////////////////////////////////////////
// window.addEventListener("scroll", function(){
//     console.log("document.body.offsetHeight", document.body.offsetHeight);
//     console.log("window.innerHeight", window.innerHeight);
//     console.log("window.pageYOffset", parseInt(window.pageYOffset));
//     // let elem = document.querySelector(".attractionsGroup")
//     // let rect = elem.getBoundingClientRect()
//     // let yyy = window.pageYOffset+rect.top
//     // console.log("rect", rect.top)
//     // console.log("yyy",yyy)
//     if (isloading == false){
//         loading = true
//         if (window.innerHeight + parseInt(window.pageYOffset)-165 == document.body.offsetHeight){
//             if (nextpage != null){
//                 // keywordget = document.querySelector(".inputText").innerText
//                 fetch(`/api/attractions?page=${nextpage}&keyword=${keywordget}`).then(function(response){
//                     return response.json();
//                 }).then(function(data){
//                     console.log(data)
//                     next = data.nextPage
//                     for(let i = 0; i < data.data.length; i++){
//                         frame = ('<div class="frame">'+
//                             '<img class="pic" src='+ data.data[i].images[0] +' alt="" >'+
//                             '<div class="name"><div class="nametext">'+ data.data[i].name +'</div></div>'+
//                             '<div class="context">'+
//                             '<div class="mrt">'+ data.data[i].mrt +'</div>'+'<div class="cat">'+ data.data[i].category +'</div>'+
//                             '</div>'+'</div>');
//                         attractionsGroup.innerHTML += frame ;
//                     }
//                     if (next == 1){
//                         nextpage = nextpage + 1 ;
//                     }else{
//                         nextpage = null;
//                     }
//                 })
//             }
//         }
//         isloading = false
//     }
// })

