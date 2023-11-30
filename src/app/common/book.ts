export class Book {
    public id: number;
    public autor: string;
    public nombre: string;
    public precio: number;
  
    constructor(id: number, autor: string, nombre: string, precio: number) {
      this.id = id;
      this.autor = autor;
      this.nombre = nombre;
      this.precio = precio;
    }
  }  