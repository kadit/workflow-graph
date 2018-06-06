import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {

  @Input()
  node: any;
  options: Array<string> = [];

  constructor(private http: Http) { }

  ngOnInit() {
  }

  //Search method
  search(searchTerm) {
    console.log(searchTerm);
    //service should fetch data here, google api is used for demo
    /*const data: any = this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchTerm}`)
      .map(res => res.json());

    data.subscribe(response => {
      this.options = response.results && response.results[0].address_components.map(i=>i.short_name);
      console.log(this.options, response);
    });*/
    this.options = ["Bang, Bocaranga, République Centrafricaine", "Bang, Koui, République Centrafricaine", "Bang, Koui, République Centrafricaine", "Bang, Ngaoundaye, République Centrafricaine", "Bang, Delanga, OD, India", "Bang, Iran", "Bang, Mondol Kiri, Cambodia", "Bang, Stjørdal, Trøndelag, Norge", "Bang, Kakri, Rapti, Nepal", "Bang, Al Mabien, Upper Nile, South Sudan"]
  }

}
