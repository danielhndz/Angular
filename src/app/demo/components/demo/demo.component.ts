import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  title = 'angular';
  items = ['Daniel', 'Felipe', 'Hernández', 'Mancipe'];
  number = 10;

  constructor() { }

  ngOnInit(): void {
  }

  addItem(): void {
    this.items.push('nuevo');
  }

  deleteItem(index: number): void {
    this.items.splice(index, 1);
  }

}
