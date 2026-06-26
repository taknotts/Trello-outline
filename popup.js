const outline = document.getElementById("outline");
const addButton = document.getElementById("addItem");

let items = [];

function render() {

    outline.innerHTML = "";

    items.forEach((item, index) => {

        const input = document.createElement("input");

        input.type = "text";
        input.value = item.text;
        input.placeholder = "New item";

        input.addEventListener("input", function () {
            item.text = input.value;
        });

        input.addEventListener("keydown", function (e) {

            if (e.key === "Enter") {

                e.preventDefault();

                items.splice(index + 1, 0, {
                    text: ""
                });

                render();

                const inputs = outline.querySelectorAll("input");
                inputs[index + 1].focus();

            }

        });

        outline.appendChild(input);

    });

}

addButton.addEventListener("click", function () {

    items.push({
        text: ""
    });

    render();

    const inputs = outline.querySelectorAll("input");
    inputs[inputs.length - 1].focus();

});

render();