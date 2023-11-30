import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Book} from "../common/book";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  booksUrl: string = 'http://localhost:8080/libros';

  constructor(private http: HttpClient) { }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.booksUrl}/` + id);
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl);
  }

  deleteBook(id: number): Observable<Book[]> {
    return this.http.delete<Book[]>(`${this.booksUrl}/` + id);
  }

  patchBook(id: number, data: any): Observable<Book> {
    return this.http.patch<Book>(`${this.booksUrl}/` + id, data);
  }

  createBook(bookData: any): Observable<Book> {
    return this.http.post<Book>(`${this.booksUrl}`, bookData);
  }

  searchBook(keyword: string): Observable<Book> {
    return this.http.get<Book>(`${this.booksUrl}?keyword=` + keyword);
  }
}
