items = [];
id = 0;
const cont = document.querySelector('.cont');

const deletHandler = (elm) => {
    let confirmAction = confirm("Are you sure to delet this item ?");
    console.log(elm.target.parentNode)
  
}
const addItem = (element)=>{
    item=  document.createElement('div');
        item.classList.add('item');
        badge=  document.createElement('div');
        badge.classList.add('badge');
        t1 = document.createTextNode(element.btext);
        badge.appendChild(t1);
        img = document.createElement('img');
        img.setAttribute('src',element.img)
    
        title =  document.createElement('span');
        title.classList.add('ititle');
        t2 = document.createTextNode(element.title);
        title.appendChild(t2);
    
        price = document.createElement('span');
        price.classList.add('iprice');
        t3 = document.createTextNode(element.price);
        price.appendChild(t3);
        des = document.createElement('p');
        t4 = document.createTextNode(element.des);
        des.appendChild(t4);
    
        editbutton = document.createElement("button");
        editbutton.classList.add('btnedit');
        t5 = document.createTextNode("Edit");
        editbutton.style.background = "var(--primary)";
        editbutton.appendChild(t5);
    
        deletbutton = document.createElement("button");
        deletbutton.style.background = "var(--red)";
        t6 = document.createTextNode("Delet");
        deletbutton.classList.add('btndelet');
        deletbutton.appendChild(t6);
        deletbutton.addEventListener('click',deletHandler)
    
       item.appendChild(badge);
       item.appendChild(img);
       item.appendChild(title);
       item.appendChild(price);
       item.appendChild(des);
       item.appendChild(editbutton);
       item.appendChild(deletbutton);
       cont.appendChild(item);
}

const refresh = ()=>{
    cont.innerHTML = '';
    items.forEach(element => {
        addItem(element);
        });
    }


const btn = document.querySelector('.addbutton');
btn.addEventListener('click', () => {
    let title = document.getElementById("title").value;
    let price = document.getElementById("price").value;
    let img = document.getElementById("img").value;
    let des = document.getElementById("des").value;
    let btext = document.getElementById("btext").value;
    let bcolor = document.getElementById("bcolor").value;
    
    myitem = {
        id: ++id,
        title,
        price,
        img,
        des,
        btext,
        bcolor
    }
    items.push(myitem);
    addItem(myitem);
})


const edit = document.querySelectorAll('.btnedit');
