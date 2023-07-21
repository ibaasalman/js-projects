const count = document.getElementsByTagName("h2")[0];
const inc = document.getElementById("inc");
const save = document.getElementById("save");
const prev = document.getElementById("prev");
inc.addEventListener('click',()=>{
    count.textContent = +count.textContent + 1;
})

save.addEventListener('click',()=>{
    prev.textContent += count.textContent + " - ";  
    count.textContent = 0;
})