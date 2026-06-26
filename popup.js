const outline = document.getElementById("outline");
const addButton = document.getElementById("addItem");

// Our outline data
let items = [];

// Create a new outline item
function createItem() {
    return {
        id: crypto.randomUUID(),
        text: "",
        level: 0,
        completed: false,
        collapsed: false
    };
}

// Draw the outline on the screen
function render() {

    outline.innerHTML = "";

    items.forEach((item, index) => {

        const input = document.createElement("input");

        input.type = "text";
        input.placeholder = "New item";
        input.value = item.text;

        // Keep the data model updated as the user types
        input.addEventListener("input", function () {
            item.text = input.value;
        });

        // Press Enter to create a new item below
        input.addEventListener("keydown", function (e) {

            if (e.key === "Enter") {

                e.preventDefault();

                items.splice(index + 1, 0, createItem());

                render();

                const inputs = outline.querySelectorAll("input");
                inputs[index + 1].focus();
            }

        });

        outline.appendChild(input);

    });

}

// + Add Item button
addButton.addEventListener("click", function () {

    items.push(createItem());

    render();

    const inputs = outline.querySelectorAll("input");
    inputs[inputs.length - 1].focus();

});

// Draw the initial empty outline
render();