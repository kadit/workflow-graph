import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  data = { "boxes": [{ "nodes": [{ "type": "startNode", "name": "Node 1" }] }, { "nodes": [{ "name": "Node 1" }] }, { "nodes": [{ "name": "Node 2" }, { "name": "Node 3" }] }, { "nodes": [{ "name": "Node 6" }] }, { "nodes": [{ "type": "endNode", "name": "Node 1" }] }] };

  dragNodeName: string;
  dragStarted: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  addNode(where: 'top' | 'bottom' | 'right' | 'left', nodes: any[], nodeIndex: number) {
    switch (where) {
      case 'top':
        nodes.splice(nodeIndex ? nodeIndex - 1 : 0, 0, { "name": "Node " + Date.now() });
        break;

      case 'bottom':
        nodes.splice(nodeIndex + 1, 0, { "name": "Node " + Date.now() });
        break;

      case 'right':
        nodes.splice(nodeIndex + 1, 0, { nodes: [{ "name": "Node " + Date.now() }] });
        break;

      case 'left':
        nodes.splice(nodeIndex - 1, 0, { nodes: [{ "name": "Node " + Date.now() }] });
        break;
    }
  }

  onLiHover(node: any, nodes: any[]) {
    nodes.forEach(node => node.hovered = false);
    node.hovered = true;
  }

  onUlMouseOut(box: any) {
    box.nodes.forEach(node => node.hovered = false);
  }

  dragStartEvent(nodeName) {
    this.dragNodeName = nodeName;
    this.dragStarted = true;
  }

  dragenter(event) {
    event.target.style.color = "#fff";
    event.target.style.background = "#FFC107";
    event.target.style.fontSize = '40px';
    event.target.style.width = '40px';
    event.target.style.left = '45%';
    event.target.style.zIndex = '6';
  }

  dragleave(event) {
    event.target.style.color = "#b5b5b5";
    this.clearDragover(event);
  }

  dragover(ev){
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move"
  }

  drop(event, where: 'top' | 'bottom' | 'right' | 'left', nodes: any[], nodeIndex: number) {
    event.preventDefault();
    this.clearDragover(event);

    this.addNode(where, nodes, nodeIndex);

    this.dragStarted = false;
  }

  private clearDragover(event){
    event.target.style.background = "";
    event.target.style.left = '50%';
    event.target.style.width = 'inherit';
    event.target.style.fontSize = 'inherit';
    event.target.style.zIndex = '6';
  }

}
