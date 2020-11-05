import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit {
  model: any;
  inputType = 'text'
  @Input() placeholder = '';
  @Input() name = 'name'
  @Input() validators = [];
  @Input() extraErrors = [];
  @Input() set value(val: any){
    this.model = val
  }
  @Input() set type(val: string){
    this.inputType = val
  }
  @Output() valueChange = new EventEmitter<any>()
  constructor() { }

  ngOnInit() {}

  valueChanged(){
    this.valueChange.emit(this.model)
  }

}
