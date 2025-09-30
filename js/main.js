// Select the container where recipes will be displayed
const recipesList = document.getElementById("recipes-list");
const generateBtn = document.getElementById("generate-grocery");

// Array to store selected recipes
let selectedRecipes = [];

// Load recipes from the JSON file
fetch('data/recipes.json')
    .then(response => response.json())
    .then(data => {
        for (const [name, details] of Object.entries(data)) {
            // Create a container div for each recipe
            const recipeDiv = document.createElement("div");
            recipeDiv.classList.add("recipe-item");

            // Create a checkbox
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = name;

            // Track selected recipes
            checkbox.addEventListener("change", (e) => {
                if (e.target.checked) {
                    selectedRecipes.push(name);
                } else {
                    selectedRecipes = selectedRecipes.filter(r => r !== name);
                }
            });

            // Create a label with recipe instructions
            const label = document.createElement("label");
            label.textContent = `${name}: ${details.instructions}`;

            // Add checkbox and label to the recipe container
            recipeDiv.appendChild(checkbox);
            recipeDiv.appendChild(label);

            // Add the recipe container to the main list
            recipesList.appendChild(recipeDiv);
        }
    })
    .catch(err => console.error("Error loading recipes:", err));

// Handle Generate Grocery List button click
generateBtn.addEventListener("click", () => {
    if (selectedRecipes.length === 0) {
        alert("Please select at least one recipe.");
        return;
    }

    // Save selected recipes to localStorage
    localStorage.setItem("selectedRecipes", JSON.stringify(selectedRecipes));

    // Redirect to grocery.html
    window.location.href = "grocery.html";
});
