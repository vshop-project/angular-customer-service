import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CartService } from '../service/http-client.service';

@Component({
  selector: 'app-popup-window',
  templateUrl: './popup-window.component.html',
  styleUrls: ['./popup-window.component.css']
})
export class PopupWindowComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PopupWindowComponent>,private cartService: CartService,) { }

  ngOnInit(): void {
  }
  clearCart(): void {
  this.cartService.clearCart();
  this.cartService.clearTotalAmount();
  this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
