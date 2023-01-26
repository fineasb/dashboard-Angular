import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { BehaviorSubject, of } from 'rxjs';
import { ToDo } from './todos';
import { tap, catchError, takeLast, take, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  lists$ = this.dashboardService.getData();

  add() {
    this.dashboardService.addPost();
  }

  updatePost(id: number) {
    this.dashboardService.patchPost(id);
  }


  delete(id: number) {
    console.log(id);
    this.dashboardService.deletePost();
    this.lists$
        .pipe(
            map(lists => {
                // Here goes some condition, the condition only will return when condition matches
                return lists.filter(list => list.id !== id);
            }),
            map(response => (this.lists$ = of(response)))
        )
        .subscribe(result => console.warn('Result: ', result));
  }


  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.lists$.subscribe(el => console.log(el))

  }

}
