import { IndexOutOfBoundsException } from './exceptions/IndexOutOfBoundsException'
import { NoSuchElementException } from './exceptions/NoSuchElementException'

class SinglyLinkedListNode<T> {
	constructor(
		public data: T,
		public next: SinglyLinkedListNode<T> | null
	) {}
}

export class SinglyLinkedList<T> {
	private size: number = 0
	private head: SinglyLinkedListNode<T> | null = null
	private tail: SinglyLinkedListNode<T> | null = null

	/**
	 * @description Constructs an empty list
	 */
	public constructor()
	/**
	 * Constructs a list containing the elements in the array.
	 * @param collection the array whose elements are to be placed into this list
	 */
	public constructor(collection: T[])
	public constructor(collection?: T[]) {
		if (collection?.length)
			this.addAll(0, collection)
	}

	private nodeAt(index: number): SinglyLinkedListNode<T> | null {
		if (index === 0) return this.head
		if (index === this.size - 1) return this.tail
		if (index < 0 || index >= this.size) return null

		let current = this.head
		for (let i = 0; i < index; i++)
			current = current?.next ?? null
		return current
	}

	public getSize(): number {
		return this.size
	}

	//////////////////////////////////////////////////////////////////////////////////////
	// * RETRIEVAL
	//////////////////////////////////////////////////////////////////////////////////////
	/**
	 * @description Retrieves the head without removing, or returns null if the head is not set
	 */
	public peekFirst(): T | null {
		return this.head?.data ?? null
	}

	/**
	 * @description Retrieves the tail without removing, or returns null if the tail is not set
	 */
	public peekLast(): T | null {
		return this.tail?.data ?? null
	}

	/**
	 * @description Retrieves the element at the specified position in this list
	 * @param index index of the element to return
	 */
	public peekAt(index: number): T | null {
		return this.nodeAt(index)?.data ?? null
	}

	//////////////////////////////////////////////////////////////////////////////////////
	// * INSERTION
	//////////////////////////////////////////////////////////////////////////////////////
	/**
	 * @description Inserts the specified element at the beginning of this list by setting it as the head
	 * and pointing it to the previous head. If the list is empty, the tail is also set to the new node.
	 * 
	 * @param data element to be inserted
	 */
	public addFirst(data: T): this {
		const node = new SinglyLinkedListNode(data, this.head)
		if (this.head === null) this.tail = node
		this.head = node
		this.size++

		return this
	}

	/**
	 * @description Inserts the specified element at the end of this list by setting it as the tail
	 * and pointing the previous tail to the new node. If the list is empty, the head is also set to the new node.
	 * 
	 * @param data element to be inserted
	 */
	public addLast(data: T): this {
		const node = new SinglyLinkedListNode(data, null)
		if (!this.head) this.head = node
		if (this.tail) this.tail.next = node
		this.tail = node
		this.size++
		return this
	}

	/**
	 * @description Inserts the specified element at the specified position in this list
	 * by shifting the element currently at that position and any subsequent elements to the right
	 * @throws {IndexOutOfBoundsException} if the index is less than 0 or greater than the size of the list
	 * @param index index at which the specified element is to be inserted
	 * @param data element to be inserted
	 */
	public addAt(index: number, data: T) {
		if (index < 0 || index > this.size)
			throw new IndexOutOfBoundsException(`Index ${index} is out of bounds for size ${this.size}`)
		if (index === 0) return this.addFirst(data)
		if (index === this.size) return this.addLast(data)

		const predecessor = this.nodeAt(index - 1)
		predecessor!.next = new SinglyLinkedListNode(data, predecessor!.next)
		this.size++
		return this
	}

	/**
	 * @throws {IndexOutOfBoundsException} if the index is less than 0 or greater than the size of the list
	 * @param index 
	 * @param collection 
	 * @returns 
	 */
	public addAll(index: number, collection: T[]): this {
		if (index < 0 || index > this.size)
			throw new IndexOutOfBoundsException(`Index ${index} is out of bounds for size ${this.size}`)
		if (!collection.length) return this

		let predecessor: SinglyLinkedListNode<T> | null = null
		let successor: SinglyLinkedListNode<T> | null = null

		if (index === this.size) {
			successor = null
			predecessor = this.tail
		} else if (index === 0) {
			predecessor = null
			successor = this.head
		} else {
			predecessor = this.nodeAt(index - 1)
			successor = predecessor?.next ?? null
		}

		for (const element of collection) {
			const newNode = new SinglyLinkedListNode(element, null)
			if (predecessor === null)
				this.head = newNode
			else
				predecessor.next = newNode
			predecessor = newNode
		}

		if (successor === null)
			this.tail = predecessor
		else
			predecessor!.next = successor

		this.size += collection.length

		return this
	}

	//////////////////////////////////////////////////////////////////////////////////////
	// * REMOVAL
	//////////////////////////////////////////////////////////////////////////////////////
	/**
	 * @description Removes and returns the first element from this list.
	 * Sets the head to the next node. In case the next node is the tail, the new head becomes the tail.
	 * @throws {Error} if the list is empty
	 */
	public removeFirst(): T {
		const head = this.head
		if (!head)
			throw new NoSuchElementException('Head is null.')

		const next = head.next
		this.head = next
		if (!next) this.tail = null
		this.size--

		return head.data
	}

	/**
	 * @description Removes and returns the last element from this list.
	 * Sets the tail to the previous node. In case the previous node is the head, the new tail becomes the head.
	 * @throws {Error} if the list is empty
	 */
	public removeLast(): T {
		const tail = this.tail
		if (!tail)
			throw new NoSuchElementException('Tail is null.')
		
		const newTail = this.nodeAt(this.size - 2)
		if (newTail) {
			newTail.next = null
			this.tail = newTail
		} else {
			this.head = null
			this.tail = null
		}
		this.size--
		return tail.data
	}

	/**
	 * @description Removes the element at the specified position in this list
	 * by shifting any subsequent elements to the left.
	 * @param index the index of the element to be removed
	 * @throws {Error} if the index is out of bounds
	 */
	public removeAt(index: number): T {
		if (index < 0 || index >= this.size)
			throw new IndexOutOfBoundsException(`Index ${index} is out of bounds for size ${this.size}`)
		if (index === 0) return this.removeFirst()
		if (index === this.size - 1) return this.removeLast()

		const predecessor = this.nodeAt(index - 1)
		const node = predecessor!.next
		predecessor!.next = node!.next
		this.size--
		return node!.data
	}

	/**
	 * @description Removes all of the elements from this list
	 * @returns {this} list
	 */
	public clear(): this {
		this.head = null
		this.tail = null
		this.size = 0
		return this
	}

	toArray(): T[] {
		const result: T[] = []
		let current = this.head
		while (current) {
			result.push(current.data)
			current = current.next
		}
		return result
	}
}
