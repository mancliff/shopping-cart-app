import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';

import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';
import {Observable} from 'rxjs';  
import { NgForm } from '@angular/forms';
import {Product} from '../interfaces/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  

  constructor(private ps: ProductService, private storage: AngularFireStorage) { }

  @ViewChild('image') image: ElementRef

  ngOnInit(): void {
  }

  saveProduct(form : NgForm){
    let productname = (<Product>form.value).productname,
      description = (<Product>form.value).description,
      price = (<Product>form.value).price,
      image = (<HTMLInputElement>this.image.nativeElement).files[0];
      this.ps.createProduct(productname, description, price, image)
  }
}
