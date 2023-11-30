import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA, MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import { BooksService } from "../../services/books.service";

export interface DialogData {
  id: number;
  author: string;
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, MatInputModule, FormsModule, MatDialogClose, MatButtonModule, MatDialogContent, MatDialogTitle, MatDialogActions],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private booksService: BooksService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
