const outline = document.getElementById("outline");
const addButton = document.getElementById("addItem");

function addItem(text = "") {

    const input = document.createElement("input");

    input.type = "text";
    input.placeholder = "New item";
    input.value = text;

    outline.appendChild(input);

    input.focus();

    input.addEventListener("keydown", function(e){

        if(e.key === "Enter"){
            addItem();
        }

    });

}

addButton.addEventListener("click", function(){
    addItem();
});