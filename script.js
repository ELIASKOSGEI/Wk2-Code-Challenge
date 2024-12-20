// Array to store shopping list items
let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

// Select DOM elements
const itemInput = document.getElementById('item-input');
const addBtn = document.getElementById('add-btn');
const clearBtn = document.getElementById('clear-btn');
const shoppingListContainer = document.getElementById('shopping-list');

// Function to render the shopping list
function renderShoppingList() {
  shoppingListContainer.innerHTML = ''; // Clear the list
  shoppingList.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = item.text;
    if (item.purchased) {
      listItem.classList.add('purchased');
    }

    // Mark as purchased
    listItem.addEventListener('click', () => togglePurchased(index));

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    editBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      editItem(index);
    });

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteItem(index);
    });

    listItem.appendChild(editBtn);
    listItem.appendChild(deleteBtn);
    shoppingListContainer.appendChild(listItem);
  });
  saveToLocalStorage();
}

// Add item to the shopping list
addBtn.addEventListener('click', () => {
  const itemText = itemInput.value.trim();
  if (itemText) {
    shoppingList.push({ text: itemText, purchased: false });
    itemInput.value = ''; // Clear input field
    renderShoppingList();
  }
});

// Mark item as purchased
function togglePurchased(index) {
  shoppingList[index].purchased = !shoppingList[index].purchased;
  renderShoppingList();
}

// Edit an item
function editItem(index) {
  const newItemText = prompt('Edit item:', shoppingList[index].text);
  if (newItemText !== null && newItemText.trim()) {
    shoppingList[index].text = newItemText.trim();
    renderShoppingList();
  }
}

// Delete an item
function deleteItem(index) {
  shoppingList.splice(index, 1);
  renderShoppingList();
}

// Clear the list
clearBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to clear the entire list?')) {
    shoppingList = [];
    renderShoppingList();
  }
});

// Save list to localStorage
function saveToLocalStorage() {
  localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

// Initial render
renderShoppingList();
