const selectedDishes = { soup: null, main: null, starter: null, drink: null, dessert: null };
const storageKey = 'lab9Order';

function saveOrder() {
    const ids = {};
    Object.entries(selectedDishes).forEach(([category, dish]) => {
        ids[category] = dish ? dish.id : null;
    });
    localStorage.setItem(storageKey, JSON.stringify(ids));
}

function createDishCard(dish) {
    const card = document.createElement('div');
    card.className = 'dish-card';
    card.dataset.dish = dish.keyword;
    card.dataset.kind = dish.kind;
    card.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}" width="700" height="480">
        <p class="dish-price">${dish.price}₽</p>
        <p class="dish-name">${dish.name}</p>
        <p class="dish-weight">${dish.count}</p>
        <button type="button">Добавить</button>`;
    card.querySelector('button').addEventListener('click', () => selectDish(dish));
    return card;
}

function renderDishes() {
    document.querySelectorAll('.dishes-grid').forEach((grid) => {
        dishes.filter((dish) => dish.category === grid.dataset.category)
            .sort((a, b) => a.name.localeCompare(b.name, 'ru'))
            .forEach((dish) => grid.append(createDishCard(dish)));
    });
}

function restoreOrder() {
    const ids = JSON.parse(localStorage.getItem(storageKey) || '{}');
    Object.keys(selectedDishes).forEach((category) => {
        const dish = dishes.find((item) => item.id === ids[category]);
        if (dish) selectDish(dish);
    });
}

function updatePanel() {
    const total = Object.values(selectedDishes).reduce((sum, dish) => sum + (dish?.price || 0), 0);
    const hasSelection = Object.values(selectedDishes).some(Boolean);
    const isValid = getComboError(selectedDishes) === '';
    document.getElementById('panel-total').textContent = total;
    document.getElementById('checkout-panel').hidden = !hasSelection;
    const link = document.getElementById('checkout-link');
    link.classList.toggle('disabled', !isValid);
    link.setAttribute('aria-disabled', String(!isValid));
}

function selectDish(dish) {
    selectedDishes[dish.category] = dish;
    document.querySelectorAll(`[data-category="${dish.category}"] .dish-card`)
        .forEach((card) => card.classList.toggle('selected', card.dataset.dish === dish.keyword));
    saveOrder();
    updatePanel();
}

function applyFilter(button) {
    const filters = button.closest('.filters');
    const shouldReset = button.classList.contains('active');
    filters.querySelectorAll('button').forEach((item) => {
        const active = item === button && !shouldReset;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll(`.dishes-grid[data-category="${filters.dataset.category}"] .dish-card`)
        .forEach((card) => { card.hidden = !shouldReset && card.dataset.kind !== button.dataset.kind; });
}

document.querySelectorAll('.filters button').forEach((button) => {
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => applyFilter(button));
});

document.getElementById('checkout-link').addEventListener('click', (event) => {
    const error = getComboError(selectedDishes);
    if (error) {
        event.preventDefault();
        showNotification(error);
    }
});

async function initMenu() {
    await loadDishes();
    renderDishes();
    restoreOrder();
    updatePanel();
}

initMenu().catch((error) => alert(error.message));
