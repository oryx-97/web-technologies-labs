const apiKey = 'fde24a8c-bd7f-40eb-9d1a-4e29b384e20e';
const apiUrl = 'https://edu.std-900.ist.mospolytech.ru/labs/api';
let orders = [];

function orderDishes(order) {
    return [order.soup_id, order.main_course_id, order.salad_id, order.drink_id, order.dessert_id]
        .filter(Boolean)
        .map((id) => dishes.find((dish) => dish.id === id)?.name || 'Блюдо')
        .join(', ');
}

function orderPrice(order) {
    return [order.soup_id, order.main_course_id, order.salad_id, order.drink_id, order.dessert_id]
        .reduce((sum, id) => sum + (dishes.find((dish) => dish.id === id)?.price || 0), 0);
}

function deliveryText(order) {
    return order.delivery_type === 'by_time'
        ? order.delivery_time
        : 'Как можно скорее (с 7:00 до 23:00)';
}

function renderOrders() {
    const list = document.getElementById('orders-list');
    list.innerHTML = '';
    orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    orders.forEach((order, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${new Date(order.created_at).toLocaleString('ru-RU')}</td>
            <td>${orderDishes(order)}</td>
            <td>${orderPrice(order)}₽</td>
            <td>${deliveryText(order)}</td>
            <td class="order-actions">
                <button type="button" data-action="details">Подробнее</button>
                <button type="button" data-action="edit">Редактирование</button>
                <button type="button" data-action="delete">Удаление</button>
            </td>`;
        row.querySelector('[data-action="details"]').addEventListener('click', () => showDetails(order));
        row.querySelector('[data-action="edit"]').addEventListener('click', () => showEdit(order));
        row.querySelector('[data-action="delete"]').addEventListener('click', () => showDelete(order));
        list.append(row);
    });
    document.getElementById('orders-message').textContent = orders.length ? '' : 'У вас пока нет заказов';
    document.querySelector('.orders-table-wrap').hidden = !orders.length;
}

function openModal(title, content) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-content').innerHTML = content;
    document.getElementById('order-modal').hidden = false;
}

function closeModal() {
    document.getElementById('order-modal').hidden = true;
}

function showDetails(order) {
    openModal('Информация о заказе', `
        <p><strong>Дата:</strong> ${new Date(order.created_at).toLocaleString('ru-RU')}</p>
        <p><strong>Имя:</strong> ${order.full_name}</p>
        <p><strong>Email:</strong> ${order.email}</p>
        <p><strong>Телефон:</strong> ${order.phone}</p>
        <p><strong>Адрес:</strong> ${order.delivery_address}</p>
        <p><strong>Состав:</strong> ${orderDishes(order)}</p>
        <p><strong>Стоимость:</strong> ${orderPrice(order)}₽</p>
        <p><strong>Доставка:</strong> ${deliveryText(order)}</p>
        <p><strong>Комментарий:</strong> ${order.comment || '—'}</p>
        <button type="button" data-close>Ок</button>`);
    document.querySelector('[data-close]').addEventListener('click', closeModal);
}

function showEdit(order) {
    openModal('Редактирование заказа', `
        <form id="edit-form" class="edit-form">
            <label>Имя<input name="full_name" value="${order.full_name}" required></label>
            <label>Email<input name="email" type="email" value="${order.email}" required></label>
            <label>Телефон<input name="phone" value="${order.phone}" required></label>
            <label>Адрес<input name="delivery_address" value="${order.delivery_address}" required></label>
            <label>Тип доставки<select name="delivery_type"><option value="now">Как можно скорее</option><option value="by_time">Ко времени</option></select></label>
            <label>Время<input name="delivery_time" type="time" min="07:00" max="23:00" step="300" value="${order.delivery_time || ''}"></label>
            <label>Комментарий<textarea name="comment">${order.comment || ''}</textarea></label>
            <div class="modal-actions"><button type="submit">Сохранить</button><button type="button" data-close>Отмена</button></div>
        </form>`);
    const form = document.getElementById('edit-form');
    form.delivery_type.value = order.delivery_type;
    form.querySelector('[data-close]').addEventListener('click', closeModal);
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${apiUrl}/orders/${order.id}?api_key=${apiKey}`, { method: 'PUT', body: new FormData(form) });
            if (!response.ok) throw new Error('Не удалось изменить заказ');
            closeModal();
            alert('Заказ успешно изменён');
            await loadOrders();
        } catch (error) {
            alert(error.message);
        }
    });
}

function showDelete(order) {
    openModal('Удаление заказа', `<p>Удалить заказ от ${new Date(order.created_at).toLocaleString('ru-RU')}?</p><div class="modal-actions"><button type="button" id="confirm-delete">Да</button><button type="button" data-close>Отмена</button></div>`);
    document.querySelector('[data-close]').addEventListener('click', closeModal);
    document.getElementById('confirm-delete').addEventListener('click', async () => {
        try {
            const response = await fetch(`${apiUrl}/orders/${order.id}?api_key=${apiKey}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Не удалось удалить заказ');
            closeModal();
            alert('Заказ успешно удалён');
            await loadOrders();
        } catch (error) {
            alert(error.message);
        }
    });
}

async function loadOrders() {
    const response = await fetch(`${apiUrl}/orders?api_key=${apiKey}`);
    if (!response.ok) throw new Error('Не удалось загрузить заказы');
    orders = await response.json();
    renderOrders();
}

document.querySelector('.modal-close').addEventListener('click', closeModal);

async function initOrders() {
    await loadDishes();
    await loadOrders();
}

initOrders().catch((error) => {
    document.getElementById('orders-message').textContent = error.message;
    document.querySelector('.orders-table-wrap').hidden = true;
});
