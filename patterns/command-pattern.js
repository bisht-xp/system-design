class OrderManger {
    constructor() {
        this.order = []
    }

    execute(command) {
        return command.execute(this.order);
    }
}


class Command {
  execute(orders) {
    throw new Error("Execute method must be implemented");
  }
}

class PlaceOrderCommand extends Command{
    constructor(name, id) {
        super();
        this.name = name;
        this.id = id;
    }

    execute(order) {
        order.push(this)
        console.log(`✅ Successfully ordered ${this.order} (${this.id})`);
    }
}

class CancelOrderCommand extends Command {
  constructor(id) {
    super();
    this.id = id;
  }

  execute(orders) {
    const index = orders.findIndex(o => o.id === this.id);
    if (index !== -1) {
      orders.splice(index, 1); 
      console.log(`❌ Canceled order: ${this.id}`);
    } else {
      console.log(`⚠️ Order ${this.id} not found.`);
    }
  }
}

class TrackOrderCommand extends Command {
  constructor(id) {
    super();
    this.id = id;
  }

  execute() {
    console.log(`🚚 Order ${this.id} will arrive in 20 minutes.`);
  }
}



const orderManger = new OrderManger()

const placeOrder = new PlaceOrderCommand("thai", "1234")

orderManger.execute(placeOrder);


