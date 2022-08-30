const searchinput = document.getElementById("myInput");
const table = document.querySelector(".tbody");
const api = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

fetch(api).then(res=>res.json()).then(res=>createtable(res));

const search = ()=>{
    let word = searchinput.value.toUpperCase();
    table.childNodes.forEach(i=>{
        if(i.id != null){
            if(i.id.toUpperCase().search(word) > -1){
                i.style.display = null;
            }
            else{
                i.style.display = "none";
            }
        }
     })
}
const createtable = (data)=>{
   let counter = 0; 
   data.forEach(item => {
        const tr = document.createElement("tr");
        tr.setAttribute("id",item.name)
        const td1 = document.createElement("td");
        const td1cont = document.createTextNode(++counter);
        td1.appendChild(td1cont);
        const td2 = document.createElement("td");
        const td2cont = document.createTextNode(item.name);
        td2.appendChild(td2cont);
        const td3 = document.createElement("td");
        const td3cont = document.createTextNode(item.current_price);
        td3.appendChild(td3cont);
        const td4 = document.createElement("td");
        const td4cont = document.createTextNode(item.high_24h);
        td4.appendChild(td4cont);
        const td5 = document.createElement("td");
        const td5cont = document.createTextNode(item.low_24h);
        td5.appendChild(td5cont);
        const td6 = document.createElement("td");
        const td6cont = document.createTextNode(item.total_volume);
        td6.appendChild(td6cont);   
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        
        table.appendChild(tr);

    });
  
}

