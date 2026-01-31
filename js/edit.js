const id = new URLSearchParams(location.search).get("id");
const editForm = document.getElementById("editForm");
fetch("https://json-api.uz/api/project/game-over/animals/"+id).then(res=>res.json())
.then(res=>{
    for(let key in res) {
        if(key!="id") {
            editForm.querySelector(`[name="${key}"`).value=res[key];            
        }
        
    }    
})
.catch(()=>window.location.href=window.location.origin);
editForm.addEventListener("submit",(evt)=>{
    evt.preventDefault();
    let data = new FormData(editForm);
    const reqObj = {};
    data.forEach((val,key)=>{
        reqObj[key]=val;
    });
    fetch("https://json-api.uz/api/project/game-over/animals/"+id,{
        method:"PATCH",
        headers: {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${localStorage.getItem("token")}`
        }, body:JSON.stringify(reqObj)
    }).then(res=>{if(res.ok){window.location.href=window.location.origin}else{
        
        localStorage.removeItem("token");
        window.location.href="/login.html"
    }}).catch(()=>{
        localStorage.removeItem("token");
        window.location.href="/login.html"
    });
})
