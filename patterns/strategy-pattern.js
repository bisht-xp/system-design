class DiscountStrategy {
    calculate(price) {
        throw new Error("This method should be overridden!");
    }
}

class NoDiscount extends DiscountStrategy {
    calculate(price) {
        return price;
    }
}

class PercentageDiscount extends DiscountStrategy {
    constructor(percentage) {
        super();
        this.percentage = percentage;
    }

    calculate(price) {
        return price - ((price * this.percentage)/100);
    }
}


class FixedDiscount extends DiscountStrategy {
    constructor(discount) {
        super();
        this.discount = discount;
    }

    calculate(price) {
        return price - this.discount;
    }
}


class ShoppingCart{
    constructor() {
        this.items = []
        this.discountStrategy = new NoDiscount();
    }

    addItem(item) {
        this.items.push(item);
    }

    setDiscountStrategy(discountStrategy) {
        this.discountStrategy = discountStrategy;
    }

    calculateTotal() {
        return this.items.reduce((total, item) => {
            return total + this.discountStrategy.calculate(item.price);
        }, 0)
    }
}

const cart = new ShoppingCart();
cart.addItem({item: "Shirt", price: 50});
cart.addItem({item: "Pants", price: 100});
console.log("Total without discount:", cart.calculateTotal());
cart.setDiscountStrategy(new PercentageDiscount(10));
console.log("Total with 10% discount:", cart.calculateTotal());
cart.setDiscountStrategy(new FixedDiscount(15));
console.log("Total with $15 discount:", cart.calculateTotal());