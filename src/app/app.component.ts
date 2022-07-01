import { Component, OnInit, VERSION } from '@angular/core';
import { CasesService } from './services/cases.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;

  constructor(private caseService: CasesService) {}

  ngOnInit() {
    this.caseService.searchForCases();
  }

  get cases() {
    return this.caseService.cases;
  }
}
