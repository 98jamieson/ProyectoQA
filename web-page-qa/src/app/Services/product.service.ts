import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { Product } from '../Models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  items$: Observable<any[]> | undefined;
  constructor(private firestore: Firestore) {
    this.getProducts();
  }
  getProducts() {
    const productsCollection = collection(this.firestore, 'product-collection');
    this.items$ = collectionData(productsCollection);
    this.items$.subscribe(products => {
      //console.log(products);
    });
    return this.items$
  }

  addProduct(product: Product): Promise<void> {
    const productsCollection = collection(this.firestore, 'product-collection');
    return addDoc(productsCollection, product)
      .then(() => {
        console.log('Product added successfully!');
      })
      .catch(error => {
        console.error('Error adding product:', error);
        throw error;
      });

  }


  async deleteProductById(documentId: string): Promise<void> {
    const productDocRef = doc(this.firestore, `product-collection/${documentId}`);

    try {
      await deleteDoc(productDocRef);
      console.log(`Product with ID '${documentId}' deleted successfully!`);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }








  async getProduct(id: string): Promise<any[]> {
    const productsCollection = collection(this.firestore, 'product-collection');
    const productQuery = query(productsCollection, where('codigo', '==', id));
  
    try {
      const querySnapshot = await getDocs(productQuery);
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,       // This is the document ID
        ...doc.data()     // This spreads all the fields from the document
      }));
      
      return products;
    } catch (error) {
      throw new Error(`Error fetching product:${ error}`);
    }
  }
  


  getDocumentsWithIds(): Observable<any[]> {
    const productsCollection = collection(this.firestore, 'product-collection');
    // Use `from()` to convert the promise from `getDocs()` into an Observable
    return from(getDocs(productsCollection)).pipe(
      map((snapshot) => {
        // `snapshot.docs` contains all documents
        return snapshot.docs.map((doc) => {
          return {
            id: doc.id,       // Document ID
            ...doc.data(),    // Spread the document data
          };
        });
      })
    );
  }


  updateProduct(item: any) {
    const productDocRef = doc(this.firestore, 'product-collection', item.id);

    console.log('the id to update is: '+item.id)
    // Updating the document with the new values for code, name, and price
    return updateDoc(productDocRef, {
      codigo: item.codigo,
      name: item.name,
      price: item.price,
    }).then(() => {
      console.log('Product updated successfully');
    }).catch(error => {
      console.error('Error updating product: ', error);
    });
  }
  






}
