import { Component, OnInit } from '@angular/core';
import { ISelectedOrder, SelectedOrder } from '../_models/service-models';

enum SEGMENTS {
  PENDING,
  APPROVED,
  REJECTED
}
@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  statusColor = {
    pending: '#EF6102',
    approved: '#049B1B',
    rejected: '#E1440B'
  }

  SEGMENTS = SEGMENTS
  selectedSegment = SEGMENTS.PENDING

  constructor() { }

  ngOnInit() {
  }
  segmentChanged(segment){
    this.selectedSegment = segment
  }

}
