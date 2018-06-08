import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vbox',
  templateUrl: './vbox.component.html',
  styleUrls: ['./vbox.component.scss']
})
export class VboxComponent implements OnInit {

  @Input() liIndex: number;
  @Input() hboxIndex: number;
  @Input() node: any;
  @Input() hboxes: any[];
  @Input() hbox: any;

  constructor() { }

  ngOnInit() {
  }

}
