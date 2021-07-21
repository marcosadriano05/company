export class OutOfRangeParam extends Error {
  constructor (message: string) {
    super(message)
    this.name = 'OutOfRangeParam'
  }
}
