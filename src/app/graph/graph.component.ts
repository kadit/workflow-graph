import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  data = { "boxes": [{ "nodes": [{ type: 'startNode', "name": "Node 1" }] }, { "nodes": [{ "name": "Node 1" }] }, { "nodes": [{ "name": "Node 2" }, { "name": "Node 3" }, { "boxes": [{ "nodes": [{ "name": "Node 4", "boxes": [] }] }, { "nodes": [{ "name": "Node 5", "boxes": [] }] }] }] }, { "nodes": [{ "name": "Node 6" }, { "name": "Node 6.1" }, { "name": "Node 6.2" }, { "name": "Node 6.3" }] }, { "nodes": [{ "name": "Node 7" }, { "name": "Node 8" }] }, { "nodes": [{ type: 'endNode', "name": "Node 1" }] }] };

  constructor() { }

  ngOnInit() {
  }

}
