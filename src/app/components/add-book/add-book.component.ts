import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA, MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import { BooksService } from "../../services/books.service";

export interface DialogData {
  author: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogActions, MatDialogContent, MatDialogTitle, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule, MatDialogClose],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {
  constructor(
    public dialogRef: MatDialogRef<AddBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private booksService: BooksService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
