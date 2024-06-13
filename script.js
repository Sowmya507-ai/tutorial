document.addEventListener("DOMContentLoaded", function() {
    const recipeForm = document.getElementById('recipeForm');
    const todolist = document.getElementById('todolist');
    const searchInput = document.getElementById('search');

    recipeForm.addEventListener('submit', handleAddItems);

    let recipes = [];

    function handleAddItems(event) {
        event.preventDefault(); // Prevent form submission

        const nameInput = document.getElementById('name');
        const ingredientInput = document.getElementById('ingredients');
        const methodInput = document.getElementById('method');

        const name = nameInput.value.trim();
        const ingredients = ingredientInput.value.trim();
        const method = methodInput.value.trim();

        if (name === '' || ingredients === '' || method === '') {
            alert('Please enter all fields: name, ingredients, and method');
            return;
        }

        const recipe = {
            name: name,
            ingredients: ingredients,
            method: method
        };

        recipes.push(recipe);

        renderList();

        nameInput.value = '';
        ingredientInput.value = '';
        methodInput.value = '';
    }

    function renderList() {
        todolist.innerHTML = ''; // Clear the current list

        recipes.forEach((recipe, index) => {
            const card = document.createElement('div');
            card.classList.add('recipe-card');
            card.innerHTML = `
                <h4>${recipe.name}</h4>
                <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                <p><strong>Method:</strong> ${recipe.method}</p>
                <button class="delete-btn" onclick="deleteItem(${index})">Delete</button>
            `;
            todolist.appendChild(card);
        });
    }

    window.deleteItem = function(index) {
        recipes.splice(index, 1); // Remove the recipe at the given index
        renderList(); // Render the updated list
    };

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredRecipes = recipes.filter(recipe => 
            recipe.name.toLowerCase().includes(searchTerm) ||
            recipe.ingredients.toLowerCase().includes(searchTerm) ||
            recipe.method.toLowerCase().includes(searchTerm)
        );
        renderFilteredRecipes(filteredRecipes);
    });

    function renderFilteredRecipes(filteredRecipes) {
        todolist.innerHTML = ''; // Clear the current list

        filteredRecipes.forEach((recipe, index) => {
            const card = document.createElement('div');
            card.classList.add('recipe-card');
            card.innerHTML = `
                <h4>${recipe.name}</h4>
                <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                <p><strong>Method:</strong> ${recipe.method}</p>
                <button class="delete-btn" onclick="deleteItem(${index})">Delete</button>
            `;
            todolist.appendChild(card);
        });
    }
});