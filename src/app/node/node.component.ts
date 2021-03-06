import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {

  @Input() node: any;
  @Input() nodeIndex: number;
  @Input() box: any;
  @Input() boxIndex: number;
  @Input() boxes: any[];
  @Input() isInnerChild: string;

  @Output() dragStartEvent: EventEmitter<string> = new EventEmitter();

  options: Array<string> = [];
  showNodeName = 'false';
  mouseOvered = undefined;
  firstLetter = '';
  colorCode = 0;
  data = ["Chad Foreman", "Chad Muncie", "Chad Noll", "Archie Rooney", "Arnold Davis", "Arnold Jenkins", "Arnold Karras", "Arnold Page", "Arnold Rashad", "Paul Rozelle"];

  constructor(private http: Http) { }

  ngOnInit() {
  }

  //Search method
  search(searchTerm) {
    this.options = this.data.filter((i) => i.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ? true : false);
  }

  select(nodeName) {
    this.node.name = nodeName;
    this.options = [];
    this.showNodeName = 'true';
    this.mouseOvered = undefined;
    this.firstLetter = nodeName[0];
    this.colorCode = parseInt('' + Math.random() * 8);
  }

  clearNode() {
    this.showNodeName = 'false';
    this.mouseOvered = undefined;
  }

  addNode(where: 'left' | 'right' | 'top' | 'bottom') {
    switch (where) {
      case 'top':
        this.box.nodes.splice(this.nodeIndex ? this.nodeIndex - 1 : 0, 0, { "name": "Node " + Date.now() });
        break;

      case 'bottom':
        this.box.nodes.splice(this.nodeIndex + 1, 0, { "name": "Node " + Date.now() });
        break;

      case 'left':
        if (this.node.boxes && this.node.boxes.length) {
          this.boxes.splice(this.boxIndex ? this.boxIndex - 1 : 0, 0, { nodes: [{ name: 'New' }] });
        } else {
          const nodeName = this.node.name;
          this.node['boxes'] = [{ nodes: [{ name: 'New' }] }, { nodes: [{ name: nodeName }] }];
        }
        break;

      case 'right':
        if (this.node.boxes && this.node.boxes.length) {
          this.boxes.splice(this.boxIndex + 1, 0, { nodes: [{ name: 'New' }] });
        } else {
          const nodeName = this.node.name;
          this.node['boxes'] = [{ nodes: [{ name: nodeName }] }, { nodes: [{ name: 'New' }] }];
        }
        break;

      default:
        break;
    }
  }

  removeNode() {
    this.box.nodes.splice(this.nodeIndex, 1);
    if (this.isInnerChild === 'true') {
      this.boxes.splice(this.boxIndex, 1);
      if(this.boxes.length <= 1){
        this.boxes.length = 0;
      }
    }
  }

  dragstart(event){
    event.dataTransfer.effectAllowed = "move";
    const img = new Image(); 
    img.src = 'assets/drag-img.gif'; 
    event.dataTransfer.setDragImage(img, 0, 0);
    this.dragStartEvent.next(this.node.name);
  }

  dragend(event){
    if(event.dataTransfer.dropEffect === 'move'){
      this.removeNode();
    }
  }

}
