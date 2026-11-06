function getComboError(order) {
    const hasAnything = Object.values(order).some(Boolean);

    if (!hasAnything) {
        return 'Ничего не выбрано. Выберите блюда для заказа';
    }
    if (!order.drink) {
        return 'Выберите напиток';
    }
    if (order.soup && !order.main && !order.starter) {
        return 'Выберите главное блюдо/салат/стартер';
    }
    if (order.starter && !order.soup && !order.main) {
        return 'Выберите суп или главное блюдо';
    }
    if (!order.main && !order.soup) {
        return 'Выберите главное блюдо';
    }
    return '';
}

function showNotification(message) {
    document.querySelector('.notification-overlay')?.remove();

    const overlay = document.createElement('div');
    overlay.className = 'notification-overlay';
    overlay.innerHTML = `
        <div class="notification" role="alert">
            <p>${message}</p>
            <button type="button">Окей</button>
        </div>
    `;
    overlay.querySelector('button').addEventListener('click', () => overlay.remove());
    document.body.append(overlay);
}

document.querySelector('.order-form').addEventListener('submit', (event) => {
    const error = getComboError(selectedDishes);
    if (error) {
        event.preventDefault();
        showNotification(error);
    }
});
