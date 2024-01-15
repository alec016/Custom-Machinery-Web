export class IllegalResourceLocationException extends Error {
  constructor (error: string, options?: ErrorOptions) {
    super(error)
    this.name = 'IllegalResourceLocationException'
  }
}
