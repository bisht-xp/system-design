class ResourcePoolMember {
  constructor(data) {
    this.available = true;
    this.data = data;
  }
}

class ResourcePool {
  poolArray = null;

  creatorFunc = () => {};
  resetFunc = () => {};

  constructor(creatorFunc, resetFunc, size = 100) {
    this.creatorFunc = creatorFunc;
    this.resetFunc = resetFunc;
    this.poolArray = new Array(size).fill(0).map(() => this.createElement());
  }

  createElement() {
    const data = this.resetFunc(this.creatorFunc());
    return new ResourcePoolMember(data);
  }

  getElement() {
    for (let i = 0; i < this.poolArray.length; i++) {
      if (this.poolArray[i].available) {
        this.poolArray[i].available = false;
        return this.poolArray[i];
      }
    }
  }

  releaseElement(element) {
    element.available = true;
    this.resetFunc(element.data);
  }
}

const creatorFunc = () => {
  return { counter: 0 };
};

const resetFunc = (coolThing) => {
  coolThing.counter = 0;
  delete coolThing.name;
  return coolThing;
};

const myPool = new ResourcePool(creatorFunc, resetFunc, 1);
const objectThatIsReadyToUse = myPool.getElement();

console.log(objectThatIsReadyToUse);

objectThatIsReadyToUse.data.counter++;
objectThatIsReadyToUse.data.name = "bisht-xp";
console.log(objectThatIsReadyToUse);

myPool.releaseElement(objectThatIsReadyToUse);
console.log(objectThatIsReadyToUse);
