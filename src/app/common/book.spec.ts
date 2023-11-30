import { Book } from './book';

describe('Book', () => {
  it('should create an instance', () => {
    expect(new Book(0, "autor", "nombre", 15)).toBeTruthy();
  });
});
