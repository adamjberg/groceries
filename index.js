if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/serviceworker.js");
}

const root = document.createElement("div");

const itemsList = document.createElement("div");
root.append(itemsList);

function addItem(item) {
  const itemDiv = document.createElement("div");
  itemDiv.style.display = "flex";
  itemDiv.style.alignItems = "center";
  itemDiv.style.padding = "8px";
  itemDiv.style.borderBottom = "1px solid #eee";

  itemDiv.addEventListener("click", (e) => {
    item.checked = !item.checked;
    checkbox.checked = item.checked;
    saveItems();
  });

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = item.checked;
  itemDiv.append(checkbox);

  const name = document.createElement("div");
  name.style.width = "100%";
  name.style.marginLeft = "8px";
  name.style.fontSize = "1.5em";
  name.innerText = item.name;
  itemDiv.append(name);

  const btnDelete = document.createElement("div");
  btnDelete.style.padding = "4px 24px";
  btnDelete.innerText = "x";
  btnDelete.addEventListener("click", (e) => {
    e.stopPropagation();
    items.splice(items.indexOf(item), 1);
    saveItems();
  });
  itemDiv.append(btnDelete);

  itemsList.append(itemDiv);
}

const btnAdd = document.createElement("div");
btnAdd.id = "add";

btnAdd.addEventListener("click", promptName);

function promptName() {
  const name = prompt("What would you like to add?");

  if (name) {
    const newItem = {
      name,
      checked: false,
    };

    items.push(newItem);

    addItem(newItem);

    saveItems();
    setTimeout(promptName, 50);
  }
}

root.append(btnAdd);

document.body.appendChild(root);

let items = [];

const localStorageItems = localStorage.getItem("items");
if (localStorageItems) {
  items = JSON.parse(localStorageItems);
}

function renderItemList() {
  itemsList.innerHTML = "";
  for (const item of items) {
    addItem(item);
  }
}

renderItemList();

function saveItems() {
  items = items.sort((a, b) => {
    if (a.checked && !b.checked) {
      return 1;
    }
    if (b.checked && !a.checked) {
      return -1;
    }
    return a.name.localeCompare(b.name);
  });
  renderItemList();
  localStorage.setItem("items", JSON.stringify(items));
}
