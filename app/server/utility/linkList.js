// const mySet = new Set([
//     { name: 'Alice', status: true },
//     { name: 'Bob', status: false },
//     { name: 'Charlie', status: false },
//     { name: 'Charlie', status: false },
// ]);

// const targetName = 'Charlie';
// const targetAge = false;

// const targetElement = Array.from(mySet).find(
//     (element) => element.name === targetName
// );
// const newElement = { name: "james", status: false }

// const updateSet = new Set([...mySet, newElement])

// console.log(Array.from(mySet).forEach(e => console.log("element", e)))
// console.log(updateSet)
// if (targetElement) {
//     console.log('Found element:', targetElement);
// } else {
//     console.log('Element not found in the Set');
// } 

// const resultData = new Map()

// resultData.set("guy", 26)
// resultData.set("john", 28)

// resultData.set({ 'emy': 32, "johndoe": 22 })
// console.log(resultData.get('guy'))
// console.log(resultData)
// resultData.delete("john")
// console.log(resultData.get())

class LinkedList {
    constructor() {
        this.head = null
        this.tail = null
    }

    find(value) {
        if (!this.head) {
            return
        }
        let curNode = this.head
        while (curNode) {
            if (curNode.value === value) {
                return curNode
            }
            curNode = curNode.next
        }
        return null
    }
    insertAfter(value, afterValue) {
        const existingNode = this.find(afterValue)
        if (existingNode) {
            const newNode = { value: value, next: existingNode.next }
            existingNode.next = newNode
        }
    }
    append(value) {
        const newNode = { value: value, next: null }
        if (this.tail) {
            this.tail.next = newNode
        }
        this.tail = newNode
        if (!this.head) {
            this.head = newNode
        }
    }
    prepend(value) {
        const newNode = { value: value, next: this.head }

        this.head = newNode
        if (!this.tail) {
            this.tail = newNode
        }

    }
    delete(value) {
        if (!this.head) {
            return
        }

        while (this.head && this.head.value === value) {
            this.head = this.head.next
        }

        let curNode = this.head
        while (curNode.next) {
            if (curNode.next.value === value) {
                curNode.next = curNode.next.next
            } else {
                curNode = curNode.next
            }
        }
        if (this.tail.value === value) {
            this.tail = curNode
        }
    }
    toArray() {
        const elements = []

        let curNode = this.head
        while (curNode) {
            elements.push(curNode)
            curNode = curNode.next
        }
        return elements
    }
}
const linkedList = new LinkedList()
linkedList.append(1)
linkedList.append('james')
linkedList.append('max')
linkedList.append(19.5)
linkedList.append('max')

linkedList.prepend('first value')
console.log(linkedList.toArray())

linkedList.delete('max')
console.log(linkedList.find('james'))
linkedList.insertAfter('value-1', "james")
linkedList.insertAfter('value-2', 'first value')

const newList = linkedList.toArray()

const valueList = newList.forEach((element) => console.log(element.value))
console.log(valueList)