const save = document.getElementById("save");
const delet = document.getElementById("delete");
const input = document.getElementById("input");
const list = document.getElementById("list");
const tabBtn = document.getElementById("tab-btn")
let links = [];
let linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinnks"));

if(linksFromLocalStorage){
    links = linksFromLocalStorage;
    render();
}

delet.addEventListener('click',()=>{
    localStorage.clear();
    links = [];
    render();
})

save.addEventListener('click',()=>{
    const link = input.value;
    links.push(link);
    localStorage.setItem("myLinnks", JSON.stringify(links));
    render();
    input.value = ""
})

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        links.push(tabs[0].url)
        localStorage.setItem("myLinnks", JSON.stringify(links) )
        render();
    })
})

function render(){
    let listItems = "" ;
    for(let i=0;i<links.length;i++){
        listItems += `<li>
        <a href="${links[i]}" target="_blank">
        ${links[i]}
        </a>
        </li>`
    }
    list.innerHTML = listItems;
}