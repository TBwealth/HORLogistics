import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
  @Input() set value(val: boolean){
    this.checkedIdx = val
  }
  @Output() valueChange = new EventEmitter<boolean>()

  constructor() { }
  checkedIdx = false

  ngOnInit() {}

  yesfn(event){
    if(event.detail.checked) this.checkedIdx = true;
    this.valueChange.emit(this.checkedIdx)
  }

  nofn(event){
    if(event.detail.checked) this.checkedIdx = false;
    this.valueChange.emit(this.checkedIdx)
   }

}

