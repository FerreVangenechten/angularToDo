import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { List } from '../list';
import { ListService } from '../list.service';
import {Item} from '../item';
import {ItemService} from '../item.service';
import { Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  items: Item[] = [];
  items$: Subscription = new Subscription();
  deleteItem$: Subscription = new Subscription();
  deleteList$: Subscription = new Subscription();
  errorMessage: string = 'Kan item niet verwijderen';


  @Input() list: List = {id: 0, name: "", color:"",textcolor:""};

  constructor(private listService: ListService ,private router: Router, private itemService: ItemService) { }

  ngOnInit(): void {
    this.getItems();
  }

  //get items by listId
  getItems() {
    //this.items$ = this.itemService.getItemsOrderedByOrder().subscribe(result => this.items = result);
    this.items$ = this.itemService.getItemsByListId(this.list.id).subscribe(result => this.items = result);

  }

  editList(id:number) {
    //Navigate to form in edit mode
    this.router.navigate(['list/form'], {state: {id: id, mode: 'edit'}});
  }

  deleteList(id: number) {
    this.deleteList$ = this.listService.deleteList(id).subscribe(result => {
      //all went well
      this.getItems();
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }




  //item CRUD

  addItem(listId:number) {
    //Navigate to form in add mode and take the listId with it
    this.router.navigate(['item/form'], {state: {listId: listId, mode: 'add'}});
  }

  editItem(id: number) {
    //Navigate to form in edit mode
    this.router.navigate(['item/form'], {state: {id: id, mode: 'edit'}});
  }

  deleteItem(id: number) {
    this.deleteItem$ = this.itemService.deleteItem(id).subscribe(result => {
      //all went well
      this.getItems();
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }

  //Drag and drop
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }




}
