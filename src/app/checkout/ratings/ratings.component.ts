import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss'],
})
export class RatingsComponent implements OnInit {

  @Input() subject: Subject<boolean>
  constructor() { }

  ngOnInit() {}
  submit(val){
    this.subject.next(val)
    this.subject.complete()
  }

  stars = [1,2,3,4,5];
  isRated = true;
  rating = 1;

  ratetrip(item){
    this.rating = item
  }
}
