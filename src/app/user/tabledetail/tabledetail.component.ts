import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-tabledetail',
  templateUrl: './tabledetail.component.html',
  styleUrls: ['./tabledetail.component.scss']
})
export class TabledetailComponent implements OnInit {

  //google map true charts

  dataXX = [
    ["51.19992126794831, 5.04178920411455", "TeamB2 Box1"],
    ["51.20181319998421, 5.042669230307413", "TeamB2 Box2"]
  ];


  title = '';
  type = 'Map';
  data = [
     [37.4232, -122.0853, "Work"],
     [37.4289, -122.1697, "University"],
     [37.6153, -122.3900, "Airport"],
     [37.4422, -122.1731, "Shopping"]
  ];
  columnNames = ["Latitude","Longitude","Name"];
  options = {   
    showTip: true
  };
  width = 550;
  height = 400;

  myType = 'PieChart';
  myData = [
      ['London', 8136000],
      ['New York', 8538000],
      ['Paris', 2244000],
      ['Berlin', 3470000],
      ['Kairo', 19500000]
    ]; 

  constructor() { }

  ngOnInit(): void {
  }

}
