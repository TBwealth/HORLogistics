import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-slide-down-box',
  templateUrl: './slide-down-box.component.html',
  styleUrls: ['./slide-down-box.component.scss'],
})
export class SlideDownBoxComponent implements OnInit {
  @Input() disabled = false
  @Input() icon = ''
  @Input() set show(val: boolean){
    this.innerShow = val
  }
  @Output() showChange = new EventEmitter<boolean>()
  innerShow = false
  constructor() { }

  ngOnInit() {}
  showDropdown(){
    this.innerShow = true
    this.showChange.emit(true)
  }

}
