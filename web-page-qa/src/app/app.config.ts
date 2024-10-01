import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideFirebaseApp(() => initializeApp({"projectId":"app-qa-6d2ba","appId":"1:888370754727:web:b04b3cc6a7e80159e11782","storageBucket":"app-qa-6d2ba.appspot.com","apiKey":"AIzaSyDfp--OrfLqajP2s0oqHBWbbb-AG8mgFMg","authDomain":"app-qa-6d2ba.firebaseapp.com","messagingSenderId":"888370754727"})), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideFirebaseApp(() => initializeApp({"projectId":"app-qa-6d2ba","appId":"1:888370754727:web:b04b3cc6a7e80159e11782","storageBucket":"app-qa-6d2ba.appspot.com","apiKey":"AIzaSyDfp--OrfLqajP2s0oqHBWbbb-AG8mgFMg","authDomain":"app-qa-6d2ba.firebaseapp.com","messagingSenderId":"888370754727"})), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())]
};
