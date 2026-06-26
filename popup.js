const outline = document.getElementById("outline");
const addButton = document.getElementById("addItem");

let items = [];

function createItem(text = ""){

    return {

        id: crypto.randomUUID(),

        text,

        level:0,

        completed:false,

        collapsed:false

    };

}

function bullet(level){

    switch(level){

        case 0:
            return "●";

        case 1:
            return "○";

        case 2:
            return "◦";

        default:
            return "▪";

    }

}

function render(){

    outline.innerHTML="";

    items.forEach((item,index)=>{

        const row=document.createElement("div");
        row.className="outline-item";

        row.style.marginLeft=(item.level*24)+"px";

        const dot=document.createElement("span");
        dot.className="bullet";
        dot.textContent=bullet(item.level);

        const text=document.createElement("div");
        text.className="text";
        text.contentEditable=true;
        text.textContent=item.text;

        text.addEventListener("input",()=>{

            item.text=text.textContent;

        });

        text.addEventListener("keydown",(e)=>{

            if(e.key==="Enter"){

                e.preventDefault();

                items.splice(index+1,0,createItem());

                render();

                document.querySelectorAll(".text")[index+1].focus();

            }

        });

        row.appendChild(dot);
        row.appendChild(text);

        outline.appendChild(row);

    });

}

addButton.addEventListener("click",()=>{

    items.push(createItem());

    render();

    const rows=document.querySelectorAll(".text");

    rows[rows.length-1].focus();

});

render();