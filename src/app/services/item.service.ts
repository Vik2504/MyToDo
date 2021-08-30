import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import {  Observable } from 'rxjs';
import { Item, OrderBy } from '../models/item';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemsCollection!: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemDoc!: AngularFirestoreDocument<Item>;


  constructor(public afs: AngularFirestore) {
    this.items = this.getItems(OrderBy.NEWEST);
  }

  getItems(order: OrderBy) {
    let orderBy: [string, any] = ['title', 'asc'];
    switch (order) {
      case OrderBy.DESCENDING:
        orderBy = ['title', 'desc'];
        break;
      case OrderBy.ASCENDING:
        orderBy = ['title', 'asc'];
        break;
      case OrderBy.NEWEST:
        orderBy = ['date', 'desc'];
        break;
      case OrderBy.OLDEST:
        orderBy = ['date', 'asc'];
        break;
    }

    this.itemsCollection = this.afs.collection('items', ref => ref.orderBy(orderBy[0], orderBy[1]));

    return this.itemsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  addItem(item: Item) {
    item = {
      ...item,
      date: new Date()
    }
    this.itemsCollection.add(item);
  }

  deleteItem(item: Item) {
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.delete();
  }

  updateItem(item: Item) {
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.update(item);
  }
}


