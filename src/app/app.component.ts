import { Component,OnInit } from '@angular/core';
import {HttpModule, Http} from '@angular/http';
import {Node} from './node';
import { CompleterService, CompleterData } from 'ng2-completer';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  private strArray : Node[][][] = [];
  private offSets : number[] = [];
  private connectionOffsets : number[] = [];
  private hoveredElement : Node = null;
  

  ngOnInit(): void {
    // this.http.get('./assets/data/approval.json').subscribe(e => {
    //   let body = e.json();
    //   body.nodes.forEach(element => {
    //      //this.nodeArray.push(new AgNode(element.approverName,AgNodeType.SERIES));
    //      //this.strArray.push(element.approverName);
    //   });;
    // });
    this.strArray.push([[new Node("",false, false, false)]]);
    this.calculateOffsets();
  }

  calculateOffsets(){
    for(let i=0;i<this.strArray.length;i++){
      this.offSets.push(this.getOffset(i));
    }
  }

  getConnectionOffsetsForEndNodes(){
    let max_number = this.getMaxNumber();
    let currentMargin = 120*(max_number-1)/2;
    return 2*Math.ceil(currentMargin/120) + currentMargin;
  }

  getConnectionOffsets(index : number, j : number) : any{
    let max_number = this.getMaxNumber();
    let elementsCount = this.strArray[index].length;
    if(j===0){
      let currentMargin = 120*(max_number-elementsCount)/2;
      return 2*Math.ceil(currentMargin/120) + currentMargin;
    }
    else{
      return 0;
    }
  } 

  getOffset(index: number): any {
     return 92;
  }

  getMaxNumber(): any {
     let max = 0;
     for(let i=0;i<this.strArray.length;i++){
        if(this.strArray[i].length>max) max = this.strArray[i].length;
     }
     return max;
  }

  addSeriesNode(parentIndex : number,elementIndex : number, childIndex : number): void {
   
    if(parentIndex!=undefined){
      if(this.strArray[parentIndex].length===1){
        this.strArray.push([[new Node("",false, false, false)]]);
        for(let i=this.strArray.length-1;i>parentIndex+1;i--){
          let temp = this.strArray[i];
          this.strArray[i] = this.strArray[i-1];
          this.strArray[i-1] = temp;
        }
      }else{
        this.strArray[parentIndex][elementIndex].push(new Node("",false, false, false));
        for(let i=this.strArray[parentIndex][elementIndex].length-1;i>parentIndex+1;i--){
          let temp = this.strArray[parentIndex][elementIndex][i];
          this.strArray[parentIndex][elementIndex][i] = this.strArray[parentIndex][elementIndex][i-1];
          this.strArray[parentIndex][elementIndex][i-1] = temp;
        }
      }
    }else{
      this.strArray.push([[new Node("",false, false, false)]]);
    }
   
    this.calculateOffsets();
  }

  addParallelNode(parentIndex : number, elementIndex : number, position : string) : void{
    let elementsArray = this.strArray[parentIndex];
    elementsArray.push([new Node("",false, false, false)]);
    let index = elementsArray.length-1;
    let actualIndex = position==="T" ? elementIndex : elementIndex+1;

    for(let i=elementsArray.length-1;i>actualIndex;i--){
      let temp = elementsArray[i];
      elementsArray[i] = elementsArray[i-1];
      elementsArray[i-1] = temp;
    }
  }

  getLiBorder(position : string, parentIndex : number, elementIndex : number){
    switch(position){
      case "R" : return this.hasRightBorder(parentIndex,elementIndex);
      case "L" : return this.hasLeftBorder(parentIndex,elementIndex);
      case "T" : return this.hasTopBorder(parentIndex,elementIndex);
      case "B" : return this.hasBottomBorder(parentIndex,elementIndex);
    }
  }


  hasRightBorder(parentIndex : number, elementIndex : number){
    if(parentIndex===this.strArray.length-1 && elementIndex!=0){
      return true;
    }else if(elementIndex===0){
      return false;
    }else{
      //In case of equal, give left border only.
      return this.strArray[parentIndex].length > this.strArray[parentIndex+1].length;
    }
  }
  hasLeftBorder(parentIndex : number, elementIndex : number){
    if(parentIndex===0 && elementIndex>0){
      return true;
    }else if(parentIndex===0){
      return false;
    }else if(elementIndex===0){
      return false;
    }else{
      return this.strArray[parentIndex].length >= this.strArray[parentIndex-1].length;
    }
  }
  hasTopBorder(parentIndex : number, elementIndex : number){
    return false;
  }
  hasBottomBorder(parentIndex : number, elementIndex : number){
    return true;
  }

  handleHover(parentIndex : number, elementIndex : number, childIndex : number, action : string){
    if(this.hoveredElement){
      this.hoveredElement.AllowParallelAddition = false;
      this.hoveredElement.AllowSeriesAddition = false;
    }
    
    this.hoveredElement = this.strArray[parentIndex][elementIndex][childIndex];
    this.hoveredElement.AllowParallelAddition = true;
    this.hoveredElement.AllowSeriesAddition = true;
  }

  deleteNode(parentIndex: number , elementIndex: number, childIndex : number){
    //Handle delete
    if(this.strArray[parentIndex].length===1 && this.strArray[parentIndex][elementIndex].length===1){
      this.strArray.splice(parentIndex,1);
    }else if(this.strArray[parentIndex][elementIndex].length===1){
      let tempArr = this.strArray[parentIndex];
      tempArr.splice(elementIndex,1);
    }else{
      let tempArr = this.strArray[parentIndex][elementIndex];
      tempArr.splice(childIndex,1);
    }
  }

  getPanelWidth(parentIndex : number){
    let ar = this.strArray[parentIndex];
    let max = 1;
    for(let i=0;i<ar.length;i++){
      if(max<ar[i].length){
        max = ar[i].length;
      }
    }
    return 25 * max;
  }


  constructor(private http : Http){
    this.http = http;
  }
  title = 'app';

}
