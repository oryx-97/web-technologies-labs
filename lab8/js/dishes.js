let dishes = [];

const localDishes = [
    { id: 1, keyword: 'tom-yum', name: 'Том ям', price: 350, category: 'soup', count: '350 г', kind: 'fish', image: 'assets/images/tom-yum.svg' },
    { id: 2, keyword: 'borscht', name: 'Борщ', price: 280, category: 'soup', count: '350 г', kind: 'meat', image: 'assets/images/borscht.svg' },
    { id: 3, keyword: 'mushroom-soup', name: 'Грибной суп', price: 300, category: 'soup', count: '350 г', kind: 'veg', image: 'assets/images/mushroom-soup.svg' },
    { id: 4, keyword: 'chicken-soup', name: 'Куриный суп', price: 270, category: 'soup', count: '350 г', kind: 'meat', image: 'assets/images/chicken-soup.svg' },
    { id: 5, keyword: 'fish-soup', name: 'Рыбный суп', price: 320, category: 'soup', count: '350 г', kind: 'fish', image: 'assets/images/fish-soup.svg' },
    { id: 6, keyword: 'pumpkin-soup', name: 'Тыквенный суп', price: 290, category: 'soup', count: '350 г', kind: 'veg', image: 'assets/images/pumpkin-soup.svg' },
    { id: 7, keyword: 'salmon', name: 'Лосось с овощами', price: 480, category: 'main', count: '300 г', kind: 'fish', image: 'assets/images/salmon.svg' },
    { id: 8, keyword: 'chicken', name: 'Курица с картофелем', price: 390, category: 'main', count: '350 г', kind: 'meat', image: 'assets/images/chicken.svg' },
    { id: 9, keyword: 'vegetable-stew', name: 'Овощное рагу', price: 300, category: 'main', count: '300 г', kind: 'veg', image: 'assets/images/vegetable-stew.svg' },
    { id: 10, keyword: 'pasta', name: 'Паста с соусом', price: 320, category: 'main', count: '300 г', kind: 'veg', image: 'assets/images/pasta.svg' },
    { id: 11, keyword: 'beef-stroganoff', name: 'Бефстроганов', price: 420, category: 'main', count: '300 г', kind: 'meat', image: 'assets/images/beef-stroganoff.svg' },
    { id: 12, keyword: 'cod-vegetables', name: 'Треска с овощами', price: 410, category: 'main', count: '300 г', kind: 'fish', image: 'assets/images/cod-vegetables.svg' },
    { id: 13, keyword: 'tuna-salad', name: 'Салат с тунцом', price: 290, category: 'starter', count: '200 г', kind: 'fish', image: 'assets/images/tuna-salad.svg' },
    { id: 14, keyword: 'chicken-salad', name: 'Салат с курицей', price: 280, category: 'starter', count: '200 г', kind: 'meat', image: 'assets/images/chicken-salad.svg' },
    { id: 15, keyword: 'greek-salad', name: 'Греческий салат', price: 250, category: 'starter', count: '200 г', kind: 'veg', image: 'assets/images/greek-salad.svg' },
    { id: 16, keyword: 'beet-salad', name: 'Свекольный салат', price: 220, category: 'starter', count: '200 г', kind: 'veg', image: 'assets/images/beet-salad.svg' },
    { id: 17, keyword: 'tomato-bruschetta', name: 'Брускетта с томатами', price: 240, category: 'starter', count: '150 г', kind: 'veg', image: 'assets/images/tomato-bruschetta.svg' },
    { id: 18, keyword: 'vegetable-rolls', name: 'Овощные роллы', price: 260, category: 'starter', count: '180 г', kind: 'veg', image: 'assets/images/vegetable-rolls.svg' },
    { id: 19, keyword: 'orange-juice', name: 'Апельсиновый сок', price: 180, category: 'drink', count: '300 мл', kind: 'cold', image: 'assets/images/orange-juice.svg' },
    { id: 20, keyword: 'apple-juice', name: 'Яблочный сок', price: 170, category: 'drink', count: '300 мл', kind: 'cold', image: 'assets/images/apple-juice.svg' },
    { id: 21, keyword: 'carrot-juice', name: 'Морковный сок', price: 170, category: 'drink', count: '300 мл', kind: 'cold', image: 'assets/images/carrot-juice.svg' },
    { id: 22, keyword: 'black-tea', name: 'Чёрный чай', price: 120, category: 'drink', count: '300 мл', kind: 'hot', image: 'assets/images/black-tea.svg' },
    { id: 23, keyword: 'cappuccino', name: 'Капучино', price: 190, category: 'drink', count: '300 мл', kind: 'hot', image: 'assets/images/cappuccino.svg' },
    { id: 24, keyword: 'cocoa', name: 'Какао', price: 180, category: 'drink', count: '300 мл', kind: 'hot', image: 'assets/images/cocoa.svg' },
    { id: 25, keyword: 'tiramisu', name: 'Тирамису', price: 240, category: 'dessert', count: '100 г', kind: 'small', image: 'assets/images/tiramisu.svg' },
    { id: 26, keyword: 'cheesecake', name: 'Чизкейк', price: 250, category: 'dessert', count: '120 г', kind: 'small', image: 'assets/images/cheesecake.svg' },
    { id: 27, keyword: 'macaron', name: 'Макаруны', price: 280, category: 'dessert', count: '150 г', kind: 'medium', image: 'assets/images/macaron.svg' },
    { id: 28, keyword: 'potato-cake', name: 'Пирожное Картошка', price: 260, category: 'dessert', count: '150 г', kind: 'medium', image: 'assets/images/potato-cake.svg' },
    { id: 29, keyword: 'berry-cake', name: 'Ягодный торт', price: 350, category: 'dessert', count: '250 г', kind: 'large', image: 'assets/images/berry-cake.svg' },
    { id: 30, keyword: 'honey-cake', name: 'Медовик', price: 360, category: 'dessert', count: '250 г', kind: 'large', image: 'assets/images/honey-cake.svg' }
];

async function loadDishes() {
    try {
        const response = await fetch('https://edu.std-900.ist.mospolytech.ru/labs/api/dishes');
        if (!response.ok) throw new Error(`Ошибка загрузки блюд: ${response.status}`);
        const data = await response.json();
        const categories = { 'main-course': 'main', salad: 'starter' };
        dishes = data.map((dish) => ({ ...dish, category: categories[dish.category] || dish.category }));
    } catch (error) {
        dishes = localDishes;
    }
}
