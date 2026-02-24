class FileSystem {
    getName() {
        throw new Error("This should be called from the sub classes")
    }

    getSize() {
        throw new Error("This should be called from the sub classes")
    }
}

class File extends FileSystem{
    constructor(name, size) {
        super()
        this.name = name;
        this.size = size;
    }

    getName() {
        return this.name;
    }

    getSize() {
        return this.size;
    }
}

class Folder extends FileSystem {
    constructor(name) {
        super();
        this.name = name;
        this.items = []
    }

    add(item) {
        this.items.push(item)
    }

    getName() {
        return this.name;
    }

    getSize() {
        return this.items.reduce((total, item) => total + item.getSize() , 0)
    }
}


const file1 = new File("file1.txt", 100);
const file2 = new File("file2.txt", 200);
const file3 = new File("file3.txt", 300);

const folder1 = new Folder("folder1");
folder1.add(file1);
folder1.add(file2);

const folder2 = new Folder("folder2");
folder2.add(folder1);
folder2.add(file3);

console.log(`${folder2.getName()} size: ${folder2.getSize()} bytes`);