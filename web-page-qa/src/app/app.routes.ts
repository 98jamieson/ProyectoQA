import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [

    { path: 'products', component: ProductsListComponent },
    { path: 'crear', component: ProductCreateComponent },
    {path:'editProduct/:id', component: ProductCreateComponent},
    { path: '**', component: ProductsListComponent }
    
];  

@NgModule({
    imports: [RouterModule.forRoot(routes)],  // Ensure you're using forRoot
    exports: [RouterModule]
  })
  export class AppRoutingModule {}