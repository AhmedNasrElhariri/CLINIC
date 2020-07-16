export class APIExceptcion extends Error {
  constructor(message) {
    super(message);
    this.name = 'APIExceptcionError';
  }
}
