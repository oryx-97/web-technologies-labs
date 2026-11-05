const dishes = [
    { keyword: 'borscht', name: 'Борщ домашний', price: 180, category: 'soup', count: '350 г', image: 'assets/images/borscht.svg', kind: 'meat' },
    { keyword: 'mushroom-soup', name: 'Грибной суп-пюре', price: 185, category: 'soup', count: '320 г', image: 'assets/images/mushroom-soup.svg', kind: 'veg' },
    { keyword: 'pumpkin-soup', name: 'Тыквенный крем-суп', price: 190, category: 'soup', count: '320 г', image: 'assets/images/pumpkin-soup.svg', kind: 'veg' },
    { keyword: 'fish-soup', name: 'Уха по-фински', price: 260, category: 'soup', count: '350 г', image: 'assets/images/fish-soup.svg', kind: 'fish' },
    { keyword: 'tom-yum', name: 'Том ям с креветками', price: 290, category: 'soup', count: '350 г', image: 'assets/images/tom-yum.svg', kind: 'fish' },
    { keyword: 'chicken-soup', name: 'Куриный суп с лапшой', price: 195, category: 'soup', count: '350 г', image: 'assets/images/chicken-soup.svg', kind: 'meat' },

    { keyword: 'chicken-rice', name: 'Курица с рисом и овощами', price: 340, category: 'main', count: '400 г', image: 'assets/images/chicken.svg', kind: 'meat' },
    { keyword: 'tomato-pasta', name: 'Паста с томатами', price: 310, category: 'main', count: '350 г', image: 'assets/images/pasta.svg', kind: 'veg' },
    { keyword: 'salmon-potato', name: 'Лосось с картофелем', price: 420, category: 'main', count: '380 г', image: 'assets/images/salmon.svg', kind: 'fish' },
    { keyword: 'cod-vegetables', name: 'Треска с овощами', price: 390, category: 'main', count: '380 г', image: 'assets/images/cod-vegetables.svg', kind: 'fish' },
    { keyword: 'beef-stroganoff', name: 'Бефстроганов с пюре', price: 410, category: 'main', count: '420 г', image: 'assets/images/beef-stroganoff.svg', kind: 'meat' },
    { keyword: 'vegetable-stew', name: 'Овощное рагу', price: 280, category: 'main', count: '380 г', image: 'assets/images/vegetable-stew.svg', kind: 'veg' },

    { keyword: 'tuna-salad', name: 'Салат с тунцом', price: 240, category: 'starter', count: '180 г', image: 'assets/images/tuna-salad.svg', kind: 'fish' },
    { keyword: 'chicken-salad', name: 'Куриный салат', price: 220, category: 'starter', count: '180 г', image: 'assets/images/chicken-salad.svg', kind: 'meat' },
    { keyword: 'greek-salad', name: 'Греческий салат', price: 210, category: 'starter', count: '180 г', image: 'assets/images/greek-salad.svg', kind: 'veg' },
    { keyword: 'tomato-bruschetta', name: 'Брускетта с томатами', price: 170, category: 'starter', count: '150 г', image: 'assets/images/tomato-bruschetta.svg', kind: 'veg' },
    { keyword: 'beet-salad', name: 'Салат со свёклой', price: 180, category: 'starter', count: '170 г', image: 'assets/images/beet-salad.svg', kind: 'veg' },
    { keyword: 'vegetable-rolls', name: 'Овощные роллы', price: 190, category: 'starter', count: '160 г', image: 'assets/images/vegetable-rolls.svg', kind: 'veg' },

    { keyword: 'orange-juice', name: 'Апельсиновый сок', price: 120, category: 'drink', count: '300 мл', image: 'assets/images/orange-juice.svg', kind: 'cold' },
    { keyword: 'apple-juice', name: 'Яблочный сок', price: 90, category: 'drink', count: '300 мл', image: 'assets/images/apple-juice.svg', kind: 'cold' },
    { keyword: 'carrot-juice', name: 'Морковный сок', price: 110, category: 'drink', count: '300 мл', image: 'assets/images/carrot-juice.svg', kind: 'cold' },
    { keyword: 'black-tea', name: 'Чёрный чай', price: 80, category: 'drink', count: '300 мл', image: 'assets/images/black-tea.svg', kind: 'hot' },
    { keyword: 'cappuccino', name: 'Капучино', price: 160, category: 'drink', count: '250 мл', image: 'assets/images/cappuccino.svg', kind: 'hot' },
    { keyword: 'cocoa', name: 'Какао', price: 140, category: 'drink', count: '250 мл', image: 'assets/images/cocoa.svg', kind: 'hot' },

    { keyword: 'macaron', name: 'Макарон', price: 90, category: 'dessert', count: '40 г', image: 'assets/images/macaron.svg', kind: 'small' },
    { keyword: 'potato-cake', name: 'Пирожное картошка', price: 110, category: 'dessert', count: '70 г', image: 'assets/images/potato-cake.svg', kind: 'small' },
    { keyword: 'cheesecake', name: 'Чизкейк классический', price: 190, category: 'dessert', count: '100 г', image: 'assets/images/cheesecake.svg', kind: 'small' },
    { keyword: 'honey-cake', name: 'Медовик', price: 220, category: 'dessert', count: '150 г', image: 'assets/images/honey-cake.svg', kind: 'medium' },
    { keyword: 'tiramisu', name: 'Тирамису', price: 230, category: 'dessert', count: '150 г', image: 'assets/images/tiramisu.svg', kind: 'medium' },
    { keyword: 'berry-cake', name: 'Ягодный торт', price: 450, category: 'dessert', count: '500 г', image: 'assets/images/berry-cake.svg', kind: 'large' }
];
