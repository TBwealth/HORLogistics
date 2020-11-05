import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-neworder',
  templateUrl: './neworder.component.html',
  styleUrls: ['./neworder.component.scss'],
})
export class NeworderComponent implements OnInit {
  @Input() subject: Subject<boolean>
  constructor() { }

  ngOnInit() {}
  submit(val){
    this.subject.next(val)
    this.subject.complete()
  }
}
