import { Component, OnInit, Input, } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-assignrider',
  templateUrl: './assignrider.component.html',
  styleUrls: ['./assignrider.component.scss'],
})
export class AssignriderComponent implements OnInit {

  @Input() subject: Subject<boolean>
  constructor() { }

  ngOnInit() {}
  submit(val){
    this.subject.next(val)
    this.subject.complete()
  }


}
