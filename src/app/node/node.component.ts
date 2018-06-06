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

  options: Array<string> = [];
  showNodeName = 'false';
  mouseOvered = undefined;

  constructor(private http: Http) { }

  ngOnInit() {
  }

  //Search method
  search(searchTerm) {
    this.options = ["Bang, Bocaranga, République Centrafricaine", "Bang, Koui, République Centrafricaine", "Bang, Koui, République Centrafricaine", "Bang, Ngaoundaye, République Centrafricaine", "Bang, Delanga, OD, India", "Bang, Iran", "Bang, Mondol Kiri, Cambodia", "Bang, Stjørdal, Trøndelag, Norge", "Bang, Kakri, Rapti, Nepal", "Bang, Al Mabien, Upper Nile, South Sudan"]
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

        break;

      case 'right':

        break;

      default:
        break;
    }
  }

  removeNode() {
    this.box.nodes.splice(this.nodeIndex, 1);
  }

}
