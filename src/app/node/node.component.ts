import { Component, OnInit, Input } from '@angular/core';
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

  options: Array<string> = [];
  showNodeName = 'false';
  mouseOvered = undefined;
  data = ["Bang, Bocaranga, République Centrafricaine", "Bang, Koui, République Centrafricaine", "Bang, Koui, République Centrafricaine", "Bang, Ngaoundaye, République Centrafricaine", "Bang, Delanga, OD, India", "Bang, Iran", "Bang, Mondol Kiri, Cambodia", "Bang, Stjørdal, Trøndelag, Norge", "Bang, Kakri, Rapti, Nepal", "Bang, Al Mabien, Upper Nile, South Sudan"];

  constructor(private http: Http) { }

  ngOnInit() {
  }

  //Search method
  search(searchTerm) {
    this.options = this.data.filter((i) =>  i.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ? true : false );       
  }

  select(nodeName) {
    this.node.name = nodeName;
    this.options = [];
    this.showNodeName = 'true';
    this.mouseOvered = undefined;
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
  }

}
