const selectedDishes = { soup: null, main: null, starter: null, drink: null, dessert: null };
const storageKey = 'lab8Order';
const apiKey = 'fde24a8c-bd7f-40eb-9d1a-4e29b384e20e';
const apiUrl = 'https://edu.std-900.ist.mospolytech.ru/labs/api';

function saveOrder() {
    const ids = {};
    Object.entries(selectedDishes).forEach(([category, dish]) => { ids[category] = dish?.id || null; });
    localStorage.setItem(storageKey, JSON.stringify(ids));
}

function updateSummary() {
    Object.entries(selectedDishes).forEach(([category, dish]) => {
        document.querySelector(`[data-order-category="${category}"] p`).textContent = dish
            ? `${dish.name} — ${dish.price}₽`
            : category === 'drink' ? 'Не выбран' : 'Не выбрано';
    });
    document.getElementById('total-price').textContent = Object.values(selectedDishes)
        .reduce((sum, dish) => sum + (dish?.price || 0), 0);
    document.getElementById('checkout-empty').hidden = Object.values(selectedDishes).some(Boolean);
}

function removeDish(category, card) {
    selectedDishes[category] = null;
    card.remove();
    saveOrder();
    updateSummary();
}

function renderOrder() {
    const grid = document.getElementById('selected-dishes');
    grid.innerHTML = '';
    Object.entries(selectedDishes).forEach(([category, dish]) => {
        if (!dish) return;
        const card = document.createElement('div');
        card.className = 'dish-card';
        card.innerHTML = `<img src="${dish.image}" alt="${dish.name}"><p class="dish-price">${dish.price}₽</p><p class="dish-name">${dish.name}</p><p class="dish-weight">${dish.count}</p><button type="button">Удалить</button>`;
        card.querySelector('button').addEventListener('click', () => removeDish(category, card));
        grid.append(card);
    });
    updateSummary();
}

async function sendOrder(event) {
    event.preventDefault();
    const error = getComboError(selectedDishes);
    if (error) {
        showNotification(error);
        return;
    }

    const data = new FormData(event.target);
    const idFields = { soup: 'soup_id', main: 'main_course_id', starter: 'salad_id', drink: 'drink_id', dessert: 'dessert_id' };
    Object.entries(selectedDishes).forEach(([category, dish]) => {
        if (dish) data.append(idFields[category], dish.id);
    });

    try {
        const response = await fetch(`${apiUrl}/orders?api_key=${apiKey}`, { method: 'POST', body: data });
        if (!response.ok) throw new Error('Не удалось оформить заказ');
        localStorage.removeItem(storageKey);
        alert('Заказ успешно оформлен');
        location.href = 'lunch.html';
    } catch (error) {
        alert(error.message);
    }
}

async function initCheckout() {
    await loadDishes();
    const ids = JSON.parse(localStorage.getItem(storageKey) || '{}');
    Object.keys(selectedDishes).forEach((category) => {
        selectedDishes[category] = dishes.find((dish) => dish.id === ids[category]) || null;
    });
    renderOrder();
    document.getElementById('checkout-form').addEventListener('submit', sendOrder);
}

initCheckout().catch((error) => alert(error.message));
