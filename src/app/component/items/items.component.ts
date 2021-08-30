import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item, OrderBy } from 'src/app/models/item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html'
})

export class ItemsComponent implements OnInit {
  items: Item[] = [];
  editState: boolean = false;
  itemToEdit!: Item;
  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.itemService.getItems(OrderBy.ASCENDING).subscribe(items => {
      this.items = items;
    })
  }

  deleteItem(event: any, item: Item) {
    this.clearState();
    this.itemService.deleteItem(item);
  }

  editItem(event: any, item: Item) {
    this.editState = true;
    this.itemToEdit = item;
  }

  updateItem(item: Item) {
    this.itemService.updateItem(item);
    this.clearState();
  }

  sort(order: string) {
    let definedOrder: OrderBy = OrderBy.ASCENDING;
    switch (order) {
      case 'ASCENDING':
        definedOrder = OrderBy.ASCENDING;
        break;
      case 'DESCENDING':
        definedOrder = OrderBy.DESCENDING;
        break;
      case 'NEWEST':
        definedOrder = OrderBy.NEWEST;
        break;
      case 'OLDEST':
        definedOrder = OrderBy.OLDEST;
        break;
    }
    this.itemService.getItems(definedOrder).subscribe(items => {
      this.items = items;
    })
  }

  clearState() {
    this.editState = false;
    //this.itemToEdit = null;
  }
}
