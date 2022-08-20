items = [];
id = 0;
const cont = document.querySelector('.cont');
const btn = document.querySelector('.addbutton');

const savetolocal = ()=>{

}
const deletHandler = (elm) => {
    let confirmAction = confirm("Are you sure to delet this item ?");
    if(confirmAction == true){
        deletedID = elm.target.parentNode.firstChild.value;
        items = items.filter((prod)=>{
            return prod.id != deletedID;
        });
        elm.target.parentNode.remove();
        savetolocal();
    }
}

const btnaddhandler = () => {
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
    savetolocal();
    fillform({
        id : '',
        title : '',
        price : '',
        img : '',
        des : '' ,
        btext : '' ,
        bcolor :''
    })}

const btnedithandler = () => {
    let oldid = document.getElementById("hideid").value;
    let title = document.getElementById("title").value;
    let price = document.getElementById("price").value;
    let img = document.getElementById("img").value;
    let des = document.getElementById("des").value;
    let btext = document.getElementById("btext").value;
    let bcolor = document.getElementById("bcolor").value;
    
    myitem = {
        id: oldid,
        title,
        price,
        img,
        des,
        btext,
        bcolor
    }
    let index = items.findIndex((item)=>{
        return item.id == oldid
    })
    items[index] = myitem;
    savetolocal();
    fillform({
        id:'',
        title : '',
        price : '',
        img : '',
        des : '' ,
        btext : '' ,
        bcolor :''
    })
    refresh();
    btn.innerHTML = 'Add product';
    btn.mode = "";
}
const editHandler = (elm) => {
        editID = elm.target.parentNode.firstChild.value;
        e_item = items.filter((prod)=>{
            return prod.id == editID;
        })[0];
        fillform(e_item);
        btn.innerHTML = 'Edit';
        btn.mode = "edit";
}

const fillform = (elm) => {
    document.getElementById("hideid").value = elm.id;
    document.getElementById("title").value = elm.title;
    document.getElementById("price").value = elm.price;
    document.getElementById("img").value = elm.img;
    document.getElementById("des").value = elm.des;
    document.getElementById("btext").value = elm.btext;
    document.getElementById("bcolor").value = elm.bcolor;
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
    
        hiddenId = document.createElement('input');
        hiddenId.setAttribute("value",element.id);
        hiddenId.setAttribute("id","hiddenid");
        hiddenId.style.display = "none";

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
        editbutton.addEventListener('click',editHandler);
    
        deletbutton = document.createElement("button");
        deletbutton.style.background = "var(--red)";
        t6 = document.createTextNode("Delet");
        deletbutton.classList.add('btndelet');
        deletbutton.appendChild(t6);
        deletbutton.addEventListener('click',deletHandler);
    
       item.appendChild(hiddenId);
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



btn.addEventListener('click', (elem)=>{
if(elem.target.mode == "edit"){
btnedithandler(elem);
}
else{
    btnaddhandler(elem);
}
}
)


const edit = document.querySelectorAll('.btnedit');
