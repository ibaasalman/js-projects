const cards = document.querySelectorAll('.card');

cards.forEach((el,index)=>{
    el.addEventListener('click',(e)=>{
        removeActive();
        el.classList.add("active")
    })
})

const removeActive = ()=>{
cards.forEach(el=>el.classList.remove("active"))
}