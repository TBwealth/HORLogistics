import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-new-order-modal',
  templateUrl: './add-new-order-modal.component.html',
  styleUrls: ['./add-new-order-modal.component.scss'],
})
export class AddNewOrderModalComponent implements OnInit {
  @Input() subject: Subject<boolean>
  constructor() { }

  ngOnInit() {}

  submit(val){
    this.subject.next(val)
    this.subject.complete()
  }
}
