export class IndexOutOfBoundsException extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'IndexOutOfBoundsException'

		Object.setPrototypeOf(this, IndexOutOfBoundsException.prototype)
	}
}
