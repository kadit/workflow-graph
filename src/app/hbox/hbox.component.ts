import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hbox',
  templateUrl: './hbox.component.html',
  styleUrls: ['./hbox.component.scss']
})
export class HboxComponent implements OnInit {

  @Input() box: any;
  @Input() boxIndex: number;
  @Input() hboxes: any[];

  constructor() { }

  ngOnInit() {
  }

}
