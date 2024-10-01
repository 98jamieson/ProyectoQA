import { Component, ElementRef, inject, input, OnInit, ViewChild } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { enviroment } from '../../../Enviroments/eviroment';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../Services/product.service';

import { ProductCreateComponent } from '../product-create/product-create.component';
import { create } from 'domain';
import { Product } from '../../Models/Product';




@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCreateComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]> | undefined;
  products: any[] = [];
  showProductCreate: boolean = true;

  modalTitle!: string;
  ActivatedAddEditProd: boolean=false;
  pro!:any
  documents: any[] = [];



  constructor(private productService: ProductService) { }

  addProduct(){
    this.pro={
      id:0,
      codigo:'',
      name:'',
      price:0
    }
    this.modalTitle="Agregar Producto";
    this.ActivatedAddEditProd=true;
  }

  editProduct(item: any){
 
    this.pro=item;
    this.modalTitle="Modificar Producto";
    this.ActivatedAddEditProd=true;
    console.log(this.pro.id)

  }


  closeClick(){
    this.ActivatedAddEditProd=false;
    this.ngOnInit();
  }


  ngOnInit() {
    this.productService.getDocumentsWithIds().subscribe((docs) => {
      this.documents = docs;
    });

  }

  deleteItem(id: any) {

    this.productService.deleteProductById(id.id)
    confirm("dese eliminar")
    this.ngOnInit()

  }






 



}
