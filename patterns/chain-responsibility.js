class Handler {
    constructor() {
        this.nextHandler = null;
    }

    setNext(handler) {
        this.nextHandler = handler;
        return handler;
    }

    handleRequest(request) {
        if(this.nextHandler) {
            return this.nextHandler.handleRequest(request)
        }

        return null;
    }
}

class Lead extends Handler {

    handleRequest(request) {
        if(request.type === "simple") {
            return  `lead handled request: ${request.content}`;
        }

        return super.handleRequest(request)
    }
}

class Manager extends Handler {
    handleRequest(request) {
        if(request.type === "intermediate") {
            return `Manager support handled request: ${request.content}`;
        }

        return super.handleRequest(request)
    }
}

class Director extends Handler {
    handleRequest(request) {
        if(request.type === "complex") {
            return `Director support handled request: ${request.content}`;
        }
        return super.handleRequest(request)
    }
}

const lead = new Lead();
const manager = new Manager();
const director = new Director();

lead.setNext(manager).setNext(director);

const requests = [{
    type: 'simple',
    content: 'Password reset'
  },
  {
    type: 'intermediate',
    content: 'Software installation'
  },
  {
    type: 'complex',
    content: 'Server outage'
  },
];
requests.forEach((request) => {
  const response = lead.handleRequest(request);
  console.log(response);
});