import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { List } from '../list';
import { ListService } from '../list.service';
import {Item} from '../item';
import {ItemService} from '../item.service';
import { Subscription } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatCheckboxChange } from '@angular/material/checkbox';


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

  @Output("getLists") loadLists : EventEmitter<string> = new EventEmitter();

  @Input() list: List = {id: 0, name: "",color:""};

  item$: Subscription = new Subscription();
  item: Item = { id: 0, listId: 0,title:"",description:"",date:"",statusId:0,order:0 };
  orderItem: Item = { id: 0, listId: 0,title:"",description:"",date:"",statusId:0,order:0 };
  orderItem$: Subscription = new Subscription();
  orderItems: Item[] = [];


  putItem$: Subscription = new Subscription();
  checkBoxInstance: any;

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
      this.loadLists.emit();
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

  deleteItem(id: number,listId:number) {

    //change order if delete item
    this.orderItem$ = this.itemService.getItemById(id).subscribe(result =>{
      this.item = result

      for(let i = this.item.order+1; i <= this.items.length; i++ ){
        this.item$ = this.itemService.getItemByOrder(i, listId).subscribe(result => {
          this.orderItems = result;
          this.orderItems[0].order -= 1
          var id = this.orderItems[0].id
          this.itemService.putItem(id, this.orderItems[0]).subscribe(result => {
            //all went well
            this.router.navigateByUrl("/");
          },
          error => {
            this.errorMessage = error.message;
          });

        });
      }
    })

    this.deleteItem$ = this.itemService.deleteItem(id).subscribe(result => {
      //all went well
      this.getItems();
    }, error => {
      //error
      this.errorMessage = error.message;
    });
  }

  //Drag and drop
  drop(event: CdkDragDrop<string[]>,listId:number) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    let currentorder = event.previousIndex + 1;
    let newOrder = event.currentIndex + 1;

    //change the selected order
    this.orderItem$ = this.itemService.getItemByOrder(currentorder,listId).subscribe(result => {
      this.orderItems = result
      this.orderItems[0].order = newOrder
      this.itemService.putItem(this.orderItems[0].id, this.orderItems[0]).subscribe(result => {
        //all went well
        this.router.navigateByUrl("/");
      },
      error => {
        this.errorMessage = error.message;
      });
    });

      //change all the other orders
      if(currentorder < newOrder){
        for(let i = newOrder; i > currentorder; i-- ){
          this.item$ = this.itemService.getItemByOrder(i, listId).subscribe(result => {
            this.orderItems = result;
            this.orderItems[0].order -= 1
            var id = this.orderItems[0].id
            this.itemService.putItem(id, this.orderItems[0]).subscribe(result => {
              //all went well
              this.router.navigateByUrl("/");
            },
            error => {
              this.errorMessage = error.message;
            });

          });
        }
      }else if(currentorder > newOrder) {
        for(let i = newOrder; i < currentorder; i++ ){
          this.item$ = this.itemService.getItemByOrder(i, listId).subscribe(result => {
            this.orderItems = result;
            this.orderItems[0].order += 1
            var id = this.orderItems[0].id
            this.itemService.putItem(id, this.orderItems[0]).subscribe(result => {
              //all went well
              this.router.navigateByUrl("/");
            },
            error => {
              this.errorMessage = error.message;
            });

          });
        }
      }

  }

  @Output()
  change!: EventEmitter<MatCheckboxChange>;

  changeStatus(id:number){
    this.itemService.getItemById(id).subscribe(result =>
    {
      this.item = result

      if(this.item.statusId == 1){
        this.item.statusId = 2;
      } else {
        this.item.statusId = 1;
      }

      this.itemService.putItem(id, this.item).subscribe(result => {
        //all went well
        this.router.navigateByUrl("/");
      },
      error => {
        this.errorMessage = error.message;
      });
    });
  }

}
