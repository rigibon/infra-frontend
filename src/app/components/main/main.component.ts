import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {BooksService} from "../../services/books.service";
import {Book} from "../../common/book";
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent, MatDialogRef, MatDialogClose, MatDialogActions,
} from '@angular/material/dialog';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {DialogComponent} from "../dialog/dialog.component";
import {AddBookComponent} from "../add-book/add-book.component";
import {faAdd, faEdit, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

export interface DialogData {
  animal: string;
  name: string;
  id: number;
  author: string;
}

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatToolbarModule, MatButtonModule, MatInputModule, MatDialogTitle, MatDialogContent, FormsModule, MatDialogClose, FaIconComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  books: Book[] = [];
  booksListColumns: string[] = ['id', 'autor', 'nombre', 'precio', 'eliminar'];

  animal: string = "";
  name: string = "";
  author: string = "";
  search: string = "";

  constructor(private route: ActivatedRoute, private booksService: BooksService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.updateBooksList();
  }

  updateBooksList() {
    this.booksService.getBooks().subscribe((data) => {
      this.books = data;
    });
  }

  deleteBook(id: number) {
    this.booksService.deleteBook(id).subscribe(
      (response) => {
        this.updateBooksList();
      }
    );
  }

  openDialog(id: number, author: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.updateAuthor(result.id, result.author);
    });
  }

  updateAuthor(id: number, author: string) {
    var bookData = { autor: author };
    this.booksService.patchBook(id, bookData).subscribe(result => {
      this.updateBooksList();
    });
  }

  createBookDialog(): void {
    const dialogRef = this.dialog.open(AddBookComponent, {
      width: '250px',
      data: { name: this.name, animal: this.animal, author: this.author }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.createBook(result);
    });
  }

  createBook(data: any) {
    var bookData = { autor: data.author, nombre: data.name, precio: data.price };
    this.booksService.createBook(bookData).subscribe(result => {
      this.updateBooksList();
    });
  }

  searchBook(keyword: string) {
    if (keyword == "") {
      this.updateBooksList();
    } else {
      this.booksService.searchBook(keyword).subscribe((result: Book) => {
        console.log(result);
        if (result) {
          this.books = [result];
        } else {
          this.books = [];
        }
      });
    }
  }

  protected readonly faMagnifyingGlass = faMagnifyingGlass;
  protected readonly faAdd = faAdd;
  protected readonly faEdit = faEdit;
}
