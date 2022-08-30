const api = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
fetch(api).then(res=>res.json()).then(res=>createslides(res));

const createslides = (data)=>{
   const slider = document.querySelector(".carousel-inner");
   data.forEach(item => {
        const slide = document.createElement("div");
        slide.classList.add("carousel-item");
        const img  = document.createElement("img");
        img.setAttribute("src",item.image);
        img.setAttribute("alt",item.symbol);
        const p = document.createElement("p");
        const ptext = document.createTextNode(item.name);
        p.appendChild(ptext);
        slide.appendChild(img);
        slide.appendChild(p);
        slider.appendChild(slide)
   });
   

   slider.firstChild.classList.add("active");


}