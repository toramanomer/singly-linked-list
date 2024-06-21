import { describe, it, expect, vi } from 'vitest'
import { SinglyLinkedList } from './index'

describe('SinglyLinkedList', () => {
	describe('constructor', () => {
		it('can be called with no argument', () => {
			const list = new SinglyLinkedList<number>()

			expect(list.getSize()).toBe(0)
			expect(list.peekFirst()).toBe(null)
			expect(list.peekLast()).toBe(null)
		})

		it('can be called with an empty array', () => {
			const list = new SinglyLinkedList<number>([])

			expect(list.getSize()).toBe(0)
			expect(list.peekFirst()).toBe(null)
			expect(list.peekLast()).toBe(null)
		})

		it('can be called with a single element', () => {
			const list = new SinglyLinkedList<number>([1])

			expect(list.getSize()).toBe(1)
			expect(list.peekFirst()).toBe(1)
			expect(list.peekLast()).toBe(1)
		})

		it('can be called with a multiple elements', () => {
			const list = new SinglyLinkedList<number>([1, 2])

			expect(list.getSize()).toBe(2)
			expect(list.peekFirst()).toBe(1)
			expect(list.peekLast()).toBe(2)
		})
	})

	describe('clear', () => {
		it('should remove all elements from the list when there are elements', () => {
			const list = new SinglyLinkedList<number>([1, 2, 3])

			list.clear()

			expect(list.getSize()).toBe(0)
			expect(list.peekFirst()).toBe(null)
			expect(list.peekLast()).toBe(null)
		})

		it('should not throw when there are no elements', () => {
			const list = new SinglyLinkedList<number>()

			expect(() => list.clear()).not.toThrow()
			expect(list.getSize()).toBe(0)
			expect(list.peekFirst()).toBe(null)
			expect(list.peekLast()).toBe(null)
		})
	})
	
	//////////////////////////////////////////////////////////////////////////////////////
	// * RETRIEVAL
	//////////////////////////////////////////////////////////////////////////////////////
	describe('retrieval', () => {
		describe('peekFirst', () => {
			it('should return the first element when there are elements', () => {
				const list = new SinglyLinkedList<number>([1, 2, 3])

				expect(list.peekFirst()).toBe(1)
			})

			it('should return null when there are no elements', () => {
				const list = new SinglyLinkedList<number>()

				expect(list.peekFirst()).toBe(null)
			})
		})

		describe('peekLast', () => {
			it('should return the last element when there are elements', () => {
				const list = new SinglyLinkedList<number>([1, 2, 3])

				expect(list.peekLast()).toBe(3)
			})

			it('should return null when there are no elements', () => {
				const list = new SinglyLinkedList<number>()

				expect(list.peekLast()).toBe(null)
			})
		})

		describe('peekAt', () => {
			it('should return the element at the index when there are elements', () => {
				const list = new SinglyLinkedList<number>([1, 2, 3])

				expect(list.peekAt(1)).toBe(2)
			})

			it('should return null when the index is less than zero', () => {
				const list = new SinglyLinkedList<number>([1, 2, 3])

				expect(list.peekAt(-1)).toBe(null)
			})

			it('should return null when the index is more than the size of the list', () => {
				const list = new SinglyLinkedList<number>([1, 2, 3])

				expect(list.peekAt(3)).toBe(null)
			})
		})
	})

	//////////////////////////////////////////////////////////////////////////////////////
	// * INSERTION
	//////////////////////////////////////////////////////////////////////////////////////
	describe('insertion', () => {
		describe('addFirst', () => {
			it('when list is empty should set the element as both head and tail, setting size as 1', () => {
				const list = new SinglyLinkedList<number>()
				list.addFirst(1)

				expect(list.getSize()).toBe(1)
				expect(list.peekFirst()).toBe(1)
				expect(list.peekLast()).toBe(1)
			})

			it('when list is not empty should set the element as head and update the size', () => {
				const list = new SinglyLinkedList<number>([2, 3])
				list.addFirst(1)

				expect(list.getSize()).toBe(3)
				expect(list.peekFirst()).toBe(1)
				expect(list.peekAt(1)).toBe(2)
				expect(list.peekLast()).toBe(3)
			})
		})

		describe('addLast', () => {
			it('when list is empty should set the element as both head and tail, setting size as 1', () => {
				const list = new SinglyLinkedList<number>()
				list.addLast(1)

				expect(list.getSize()).toBe(1)
				expect(list.peekFirst()).toBe(1)
				expect(list.peekLast()).toBe(1)
			})

			it('when list is not empty should set the element as tail and update the size', () => {
				const list = new SinglyLinkedList<number>([1, 2])
				list.addLast(3)

				expect(list.getSize()).toBe(3)
				expect(list.peekFirst()).toBe(1)
				expect(list.peekAt(1)).toBe(2)
				expect(list.peekLast()).toBe(3)
			})
		})

		describe('addAll', () => {
			it('case a', () => {
				const list = new SinglyLinkedList<number>()
				list.addAll(0, [1, 2, 3])

				expect(list.getSize()).toBe(3)

				expect(list.peekFirst()).toBe(1)
				expect(list.peekLast()).toBe(3)

				expect(list.peekAt(0)).toBe(1)
				expect(list.peekAt(1)).toBe(2)
				expect(list.peekAt(2)).toBe(3)
			})


			it('should add to the front when index is zero', () => {
				const list = new SinglyLinkedList<number>([3, 4, 5])
				list.addAll(0, [1, 2])

				expect(list.getSize()).toBe(5)
				expect(list.peekFirst()).toBe(1)
				expect(list.peekLast()).toBe(5)

				expect(list.peekAt(0)).toBe(1)
				expect(list.peekAt(1)).toBe(2)
				expect(list.peekAt(2)).toBe(3)
				expect(list.peekAt(3)).toBe(4)
				expect(list.peekAt(4)).toBe(5)
			})

			it('should throw when index is more than the list size and not modify the list', () => {
				const list = new SinglyLinkedList<number>([])

				expect(() => list.addAll(1, [1, 2, 3])).toThrowError()
				expect(list.getSize()).toBe(0)
				expect(list.peekFirst()).toBe(null)
				expect(list.peekLast()).toBe(null)
			})

			it('should throw when index is less than the zero and not modify the list', () => {
				const list = new SinglyLinkedList<number>([4, 5])

				expect(() => list.addAll(-1, [1, 2, 3])).toThrowError()
				expect(list.getSize()).toBe(2)
				expect(list.peekFirst()).toBe(4)
				expect(list.peekLast()).toBe(5)
			})
		})

		describe('addAt', () => {
			it('should add at the front when index is zero', () => {
				const list = new SinglyLinkedList<number>([2, 3])
				list.addAt(0, 1)

				expect(list.getSize()).toBe(3)
				expect(list.peekFirst()).toBe(1)
				expect(list.peekAt(1)).toBe(2)
				expect(list.peekLast()).toBe(3)
			})

			it('should add at the end when index is equal to the size', () => {
				const list = new SinglyLinkedList<number>([1, 2])
				list.addAt(2, 3)

				expect(list.getSize()).toBe(3)
				expect(list.peekFirst()).toBe(1)
				expect(list.peekAt(1)).toBe(2)
				expect(list.peekLast()).toBe(3)
			})

			it('should add at the middle when index is in between', () => {
				const list = new SinglyLinkedList<number>([1, 3])
				list.addAt(1, 2)

				expect(list.getSize()).toBe(3)
				expect(list.peekFirst()).toBe(1)
				expect(list.peekAt(1)).toBe(2)
				expect(list.peekLast()).toBe(3)
			})

			it('should throw when index is more than the list size and not modify the list', () => {
				const list = new SinglyLinkedList<number>([])

				expect(() => list.addAt(1, 1)).toThrowError()
				expect(list.getSize()).toBe(0)
				expect(list.peekFirst()).toBe(null)
				expect(list.peekLast()).toBe(null)
			})

			it('should throw when index is less than the zero and not modify the list', () => {
				const list = new SinglyLinkedList<number>([1, 2])

				expect(() => list.addAt(-1, 0)).toThrowError()
				expect(list.getSize()).toBe(2)
				expect(list.peekFirst()).toBe(1)
				expect(list.peekLast()).toBe(2)
			})

			it('should call addFirst when index is zero', () => {
				const list = new SinglyLinkedList<number>()
				const addFirst = vi.spyOn(list, 'addFirst')

				list.addAt(0, 1)

				expect(addFirst).toHaveBeenCalledWith(1)
			})

			it('should call addLast when index is equal to the size', () => {
				const list = new SinglyLinkedList<number>([1, 2])
				const addLast = vi.spyOn(list, 'addLast')

				list.addAt(2, 3)

				expect(addLast).toHaveBeenCalledWith(3)
			})
		})
	})
})
