const selectedDishes = {
    soup: null,
    main: null,
    starter: null,
    drink: null,
    dessert: null
};

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
        <button type="button">Добавить</button>
    `;
    card.querySelector('button').addEventListener('click', () => selectDish(dish));
    return card;
}

function renderDishes() {
    document.querySelectorAll('.dishes-grid').forEach((grid) => {
        dishes
            .filter((dish) => dish.category === grid.dataset.category)
            .sort((a, b) => a.name.localeCompare(b.name, 'ru'))
            .forEach((dish) => grid.append(createDishCard(dish)));
    });
}

function updateOrder() {
    const hasSelection = Object.values(selectedDishes).some(Boolean);
    document.getElementById('order-empty').hidden = hasSelection;
    document.getElementById('order-total').hidden = !hasSelection;

    Object.entries(selectedDishes).forEach(([category, dish]) => {
        const orderCategory = document.querySelector(`[data-order-category="${category}"]`);
        orderCategory.hidden = !hasSelection;
        orderCategory.querySelector('p').textContent = dish
            ? `${dish.name} ${dish.price}₽`
            : category === 'drink' ? 'Напиток не выбран' : 'Блюдо не выбрано';
        document.getElementById(`${category}-input`).value = dish ? dish.keyword : '';
    });

    document.getElementById('total-price').textContent = Object.values(selectedDishes)
        .reduce((sum, dish) => sum + (dish ? dish.price : 0), 0);
}

function selectDish(dish) {
    selectedDishes[dish.category] = dish;
    document.querySelectorAll(`[data-category="${dish.category}"] .dish-card`)
        .forEach((card) => card.classList.toggle('selected', card.dataset.dish === dish.keyword));
    updateOrder();
}

function applyFilter(button) {
    const filters = button.closest('.filters');
    const category = filters.dataset.category;
    const kind = button.dataset.kind;
    const shouldReset = button.classList.contains('active');

    filters.querySelectorAll('button').forEach((item) => {
        item.classList.toggle('active', item === button && !shouldReset);
        item.setAttribute('aria-pressed', String(item === button && !shouldReset));
    });

    document.querySelectorAll(`.dishes-grid[data-category="${category}"] .dish-card`)
        .forEach((card) => {
            card.hidden = !shouldReset && card.dataset.kind !== kind;
        });
}

async function initMenu() {
    await loadDishes();
    renderDishes();
    updateOrder();
}

initMenu().catch((error) => {
    alert(error.message);
});

document.querySelectorAll('.filters button').forEach((button) => {
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => applyFilter(button));
});

document.querySelector('.order-form').addEventListener('reset', () => {
    Object.keys(selectedDishes).forEach((category) => {
        selectedDishes[category] = null;
    });
    document.querySelectorAll('.dish-card').forEach((card) => card.classList.remove('selected'));
    updateOrder();
});
