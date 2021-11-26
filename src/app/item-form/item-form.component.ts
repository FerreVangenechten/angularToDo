import { Component,OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../item';
import { ItemService } from '../item.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {
  isAdd: boolean = false;
  isEdit: boolean = false;
  itemId: number = 0;
  listId: number= 0;

  item: Item = { id: 0, listId: 0,title:"",description:"",date:"",statusId:0,order:0 };

  isSubmitted: boolean = false;
  errorMessage: string = "";

  item$: Subscription = new Subscription();
  postItem$: Subscription = new Subscription();
  putItem$: Subscription = new Subscription();

  constructor(private router: Router, private itemService: ItemService) {
    this.isAdd = this.router.getCurrentNavigation()?.extras.state?.mode === 'add';
    this.isEdit = this.router.getCurrentNavigation()?.extras.state?.mode === 'edit';
    this.itemId = +this.router.getCurrentNavigation()?.extras.state?.id;
    this.listId = +this.router.getCurrentNavigation()?.extras.state?.listId;

    if (this.itemId != null && this.itemId > 0) {
      this.item$ = this.itemService.getItemById(this.itemId).subscribe(result => this.item = result);
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.item$.unsubscribe();
    this.postItem$.unsubscribe();
    this.putItem$.unsubscribe();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.isAdd) {
      //zorgen dat het bij de juiste lijst terecht komt
      this.item.listId = this.listId
      this.postItem$ = this.itemService.postItem(this.item).subscribe(result => {
                //all went well
                this.router.navigateByUrl("/");
              },
              error => {
                this.errorMessage = error.message;
              });
    }
    if (this.isEdit) {
      this.putItem$ = this.itemService.putItem(this.itemId, this.item).subscribe(result => {
                //all went well
                this.router.navigateByUrl("/");
              },
              error => {
                this.errorMessage = error.message;
              });
    }
  }

}
