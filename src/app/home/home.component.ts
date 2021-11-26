import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { List } from '../list';
import { ListService } from '../list.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

 // new property lists$ for the observable we get back from ListService
 lists$: Observable<List[]> = new Observable<List[]>();

 constructor(private listService: ListService, private router: Router) { }

  ngOnInit(): void {
    this.lists$ = this.listService.getLists();
  }

  addList() {
    //Navigate to form in add mode
    this.router.navigate(['list/form'], {state: {mode: 'add'}});
  }

}
