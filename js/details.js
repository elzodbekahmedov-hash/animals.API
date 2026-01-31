const id = new URLSearchParams(location.search).get("id");
fetch("https://json-api.uz/api/project/game-over/animals/"+id).then(res=>res.text()).then(
    res=>{
        if(res!="Resource not found") {
            let pd = JSON.parse(res);
            document.querySelector(".Name").textContent=pd.name||"No content";
            document.querySelector(".Category").textContent=pd.category||"No content";
            document.querySelector(".speed").textContent=pd.speed||"No content";
            document.querySelector(".SaundText").textContent=pd.soundText||"No content";
            document.querySelector(".Years").textContent=pd.year||"No content";
            document.querySelector(".Weight").textContent=pd.weight||"No content";
            document.querySelector(".Color").textContent=pd.color||"No content";
            document.querySelector(".Habitate").textContent=pd.habitat||"No content";
            document.querySelector(".isWild").textContent=String(pd.isWild)||"No content";
        } else window.location.href=window.location.origin;
        
    }
);