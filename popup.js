const t = window.TrelloPowerUp.iframe();

const outline = document.getElementById("outline");
const addButton = document.getElementById("addItem");

let items = [];

// Create a new outline item
function createItem(text = "") {
    return {
        id: crypto.randomUUID(),
        text: text,
        level: 0,
        completed: false,
        collapsed: false
    };
}

// Save outline to this Trello card
async function saveItems() {
    try {
        await t.set("card", "shared", "outline", items);
    } catch (err) {
        console.error("Error saving outline:", err);
    }
}

// Load outline from this Trello card
async function loadItems() {
    try {
        const saved = await t.get("card", "shared", "outline", []);

        if (Array.isArray(saved) && saved.length > 0) {
            items = saved;
        } else {
            items = [createItem()];
        }

        render();

    } catch (err) {
        console.error("Error loading outline:", err);

        items = [createItem()];
        render();
    }
}

// Return bullet based on nesting level
function bullet(level) {
    switch (level) {
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

// Draw outline
function render() {

    outline.innerHTML = "";

    items.forEach((item, index) => {

        const row = document.createElement("div");
        row.className = "outline-item";
        row.style.marginLeft = (item.level * 24) + "px";

        const dot = document.createElement("span");
        dot.className = "bullet";
        dot.textContent = bullet(item.level);

        const text = document.createElement("div");
        text.className = "text";
        text.contentEditable = true;
        text.textContent = item.text;

        // Update text as user types
        text.addEventListener("input", () => {
            item.text = text.textContent;
            saveItems();
        });

        // Enter creates new sibling
        text.addEventListener("keydown", (e) => {

    // TAB = indent/outdent
if (e.key === "Tab") {

    e.preventDefault();

    if (e.shiftKey) {

        // Outdent
        item.level = Math.max(0, item.level - 1);

    } else {

        // Indent
        if (index > 0) {

            // Can't indent more than one level deeper than previous item
            const maxLevel = items[index - 1].level + 1;

            item.level = Math.min(item.level + 1, maxLevel);

        }

    }

    render();
    saveItems();

    const rows = document.querySelectorAll(".text");
    rows[index].focus();

    return;
}

    // ENTER = new sibling
    if (e.key === "Enter") {

        e.preventDefault();

        const newItem = createItem();
        newItem.level = item.level;   // New item stays at same level

        items.splice(index + 1, 0, newItem);

        render();
        saveItems();

        const rows = document.querySelectorAll(".text");
        rows[index + 1].focus();

    }

});

        row.appendChild(dot);
        row.appendChild(text);

        outline.appendChild(row);

    });

}

// Add Item button
addButton.addEventListener("click", () => {

    items.push(createItem());

    render();

    saveItems();

    const rows = document.querySelectorAll(".text");
    rows[rows.length - 1].focus();

});

// Load saved outline
loadItems();