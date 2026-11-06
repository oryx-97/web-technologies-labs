let dishes = [];

async function loadDishes() {
    const response = await fetch('https://edu.std-900.ist.mospolytech.ru/labs/api/dishes');
    if (!response.ok) {
        throw new Error(`Ошибка загрузки блюд: ${response.status}`);
    }

    const data = await response.json();
    const categories = {
        'main-course': 'main',
        salad: 'starter'
    };
    dishes = data.map((dish) => ({
        ...dish,
        category: categories[dish.category] || dish.category
    }));
}
