import { Component } from '@angular/core';
import { ProductsListComponent } from '../products-list/products-list.component';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ProductsListComponent,RouterModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  items: Observable<any[]> | undefined;

  //constructor(firestore: AngularFirestore){}



}
