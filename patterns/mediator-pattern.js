class Mediator {
  send(message, colleague) {
    throw new Error("this should be called from the sub class");
  }
}

class ChatMediator extends Mediator {
  constructor() {
    super();
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
  }

  send(message, sender) {
    if (this.users.length > 0) {
      this.users.forEach((user) => {
        if (user.name !== sender) {
          user.recieve(message);
        }
      });
    }
  }
}

class User {
  constructor(name, mediator) {
    this.name = name;
    this.mediator = mediator;
  }

  send(message) {
    console.log(`${this.name} sends: ${message}`);
    this.mediator.send(message, this.name);
  }

  recieve(message) {
    console.log(`${this.name} receives: ${message}`);
  }
}

const mediator = new ChatMediator();
const user1 = new User("Alice", mediator);
const user2 = new User("Bob", mediator);
const user3 = new User("Charlie", mediator);

mediator.addUser(user1);
mediator.addUser(user2);
mediator.addUser(user3);

user1.send("Hello everyone!");
user2.send("Hi Alice!");
