const STATUS = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  HALF_OPEN: 'HALF-OPEN'
};


class CircuitBreak {
    constructor(request, timeout, retry) {
        this.request = request;
        this.status = STATUS.CLOSED
        this.failureThreshold = retry || 3;
        this.timeout = timeout || 5000;

        this.failure = 0;
        this.lastFailureTime = null;
    }


    async fire(...args) {
        if(this.status === STATUS.OPEN) {
            if(Date.now() - this.lastFailureTime > this.timeout) {
                this.status = STATUS.HALF_OPEN;
            } else {
                throw newError('Circuit Break Open: Request Rejected')
            }
        }

        try {
            const response =  await this.request(...args);
            this.#success()
            return response;
        } catch (error) {
            this.#fail()
            throw error;
        }
    }

    #success() {
        this.failure = 0
        this.status = STATUS.CLOSED
    }

    #fail() {
        this.failure++;
        this.lastFailureTime = Date.now()
        if(this.status === STATUS.HALF_OPEN || this.failure >= this.failureThreshold) {
            this.status = STATUS.OPEN
        }
    }
}