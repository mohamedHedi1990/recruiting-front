import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-sectionun',
  templateUrl: './sectionun.component.html',
  styleUrls: ['./sectionun.component.scss']
})
export class SectionunComponent implements OnInit {
@Input() section:string=''
role:string=''
@Output()
change=new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  changeRole() {
  this.change.emit()

  }

}
