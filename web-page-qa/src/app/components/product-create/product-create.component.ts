import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductsListComponent } from '../products-list/products-list.component';
import { Firestore } from '@angular/fire/firestore';
import { ProductService } from '../../Services/product.service';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  // Make sure this is imported
import { Product } from '../../Models/Product';
import { Router } from 'express';
import { Observable } from 'rxjs';
import { databaseInstance$, object } from '@angular/fire/database';

import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [RouterModule,CommonModule, ProductsListComponent, ReactiveFormsModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent implements OnInit {


  product: Product={
    codigo:'',
    name:'',
    price:0
  };

  myForm!: FormGroup;
  id!: string | null;
  items$: Observable<any[]> | undefined;
  productData!: Product;
  productList: any[] = [];  // Aquí almacenamos la lista de productos
  productobj!: Object;

@Input() pro:any;


  constructor(private productservice: ProductService, private fb: FormBuilder, aRoute:ActivatedRoute){
    this.myForm=fb.group({
      codigo: ['',Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required],
     
    })
  
    this.id= aRoute.snapshot.paramMap.get('id');
    console.log('the code selected is: '+this.id

    )
  }
  
  
  addProduct(){
    this.product={
      codigo:this.myForm.value.codigo,
      name:this.myForm.value.name,
      price:this.myForm.value.price
    }


    this.productservice.addProduct(this.product).then(()=>{
      console.log('producto registrado con exito')
      alert("producto agregado")
    }).catch(error=> {
      console.log(error)
    });

    this.refresh();
  }


  ngOnInit(){
    var obj=this.pro;
    this.product.codigo=obj.codigo;
    this.product.name=obj.name;
    this.product.price=obj.price;
    this.product.id=obj.id;
    
  }

  async getProductDetails(id: string) {
    try {
      this.productobj = await this.productservice.getProduct(id);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  }
  

  updateProduct(item: any){

    this.product={
      id:item.id,
      codigo:this.myForm.value.codigo,
      name:this.myForm.value.name,
      price:this.myForm.value.price
    }

    confirm("desea actualizar?")
    this.productservice.updateProduct(this.product);
    alert("producto actualizado")

    this.refresh();
  }

  
  refresh(){
    this.myForm.reset();
  }
  

  

}
