class DataProcess {
  process() {
    this.readData();
    this.processData();
    this.writeData();
  }
  readData() {}
  processData() {}
  writeData() {}
}

class CSVDataProcess extends DataProcess {
  constructor() {
    super();
    // this.data = data;
  }

  readData() {
    console.log("Reading data from CSV file");
    this.data = "name,age\nJohn,30\nJane,25";
  }
  processData() {
    console.log("Processing CSV data");
    this.data = this.data.split("\n").map((row) => row.split(","));
  }
  writeData() {
    console.log("Writing data to CSV file");
    console.log(this.data);
  }
}

const csvProcessor = new CSVDataProcess();
csvProcessor.process();
