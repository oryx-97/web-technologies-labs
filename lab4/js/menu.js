const selectedDishes = {
    soup: null,
    main: null,
    drink: null
};

function createDishCard(dish) {
    const card = document.createElement('div');
    card.className = 'dish-card';
    card.dataset.dish = dish.keyword;
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
        const categoryDishes = dishes
            .filter((dish) => dish.category === grid.dataset.category)
            .sort((a, b) => a.name.localeCompare(b.name, 'ru'));
        categoryDishes.forEach((dish) => grid.append(createDishCard(dish)));
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

    const total = Object.values(selectedDishes)
        .reduce((sum, dish) => sum + (dish ? dish.price : 0), 0);
    document.getElementById('total-price').textContent = total;
}

function selectDish(dish) {
    selectedDishes[dish.category] = dish;
    document.querySelectorAll(`[data-category="${dish.category}"] .dish-card`)
        .forEach((card) => card.classList.toggle('selected', card.dataset.dish === dish.keyword));
    updateOrder();
}

renderDishes();
updateOrder();

document.querySelector('.order-form').addEventListener('reset', () => {
    Object.keys(selectedDishes).forEach((category) => {
        selectedDishes[category] = null;
    });
    document.querySelectorAll('.dish-card').forEach((card) => card.classList.remove('selected'));
    updateOrder();
});
