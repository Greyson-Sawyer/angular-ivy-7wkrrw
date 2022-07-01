import { Component, OnInit, Input } from '@angular/core';
import { SuperiorCourtCase } from '../../services/cases.service';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss'],
})
export class CaseComponent implements OnInit {
  @Input('case') case: SuperiorCourtCase;
  @Input('index') index: number;

  isDocumentsOpen = true;
  isPartiesOpen = true;
  isCalendarItemsOpen = true;
  isJudgementsOpen = true;
  constructor() {}

  ngOnInit() {
    if (this.calendarItems.length === 0) this.isCalendarItemsOpen = false;
    if (this.judgements.length === 0) this.isJudgementsOpen = false;
  }

  get eAccessUrl() {
    return `https://www.azcourtdocs.gov/arizona/search.do?indexName=casedetails&templateName=Main&lq=CaseID%3A%22${this.case.eAccess_Id}%22+AND+CourtCode%3A%220700%22`;
  }

  get props() {
    const dontInclude = [
      'Case_Number',
      'File_Date',
      'Aslan_Case_Type',
      'Title',
      'nodes',
      'url',
      'Case_Type',
      'rels',
    ];
    return Object.getOwnPropertyNames(this.case)
      .filter((prop) => !dontInclude.find((p) => p === prop))
      .sort(
        (a, b) => a.toUpperCase().charCodeAt(0) - b.toUpperCase().charCodeAt(0)
      );
  }

  get caseTypeColor() {
    if (this.case.Aslan_Case_Type === 'TLC') return 'rgb(223, 94, 94)';
    if (this.case.Aslan_Case_Type === 'EXP') return 'rgb(87, 212, 135)';
    return 'rgb(200, 200, 200)';
  }

  get documents() {
    return this.case.nodes
      .filter((node) => node.labels.includes('SuperiorCourtDocument'))
      .map((node) => node.properties)
      .sort((a, b) => {
        return (
          this.convertToJSDate(b.filingDate).getTime() -
          this.convertToJSDate(a.filingDate).getTime()
        );
      });
  }

  get parties() {
    const idSet = new Set();
    return this.case.nodes
      .filter((node) => {
        const check =
          node.labels.includes('SuperiorCourtParty') &&
          !idSet.has(node.identity);
        if (check) idSet.add(node.identity);
        return check;
      })
      .map((node) => {
        const id = node.identity;
        const rel = this.case.rels.find((r) => r.end === id);
        node.properties.role = rel.properties.relationship;
        return node.properties;
      })
      .sort((a, b) => {
        return b.role && a.role
          ? b.role.charCodeAt(0) - a.role.charCodeAt(0)
          : -1;
      });
  }

  get calendarItems() {
    return this.case.nodes
      .filter((node) => node.labels.includes('SuperiorCourtCalendarItem'))
      .map((node) => node.properties)
      .sort((a, b) => {
        return (
          this.convertToJSDate(b.date).getTime() -
          this.convertToJSDate(a.date).getTime()
        );
      });
  }

  get judgements() {
    return this.case.nodes
      .filter((node) => node.labels.includes('SuperiorCourtJudgement'))
      .map((node) => node.properties)
      .sort((a, b) => {
        return (
          this.convertToJSDate(b.date).getTime() -
          this.convertToJSDate(a.date).getTime()
        );
      });
  }

  convertToJSDate(neo4jDateObject: {
    day: number;
    hour: number;
    minute: number;
    month: number;
    nanosecond: number;
    second: number;
    timeZoneOffsetSeconds: number;
    year: number;
  }) {
    if (!neo4jDateObject) return null;
    return new Date(
      neo4jDateObject.year,
      neo4jDateObject.month - 1,
      neo4jDateObject.day,
      neo4jDateObject.hour,
      neo4jDateObject.minute,
      neo4jDateObject.second
    );
  }

  toggleDocs() {
    this.isDocumentsOpen = !this.isDocumentsOpen;
  }

  toggleParties() {
    this.isPartiesOpen = !this.isPartiesOpen;
  }

  toggleCalendarItems() {
    this.isCalendarItemsOpen = !this.isCalendarItemsOpen;
  }

  toggleJudgements() {
    this.isJudgementsOpen = !this.isJudgementsOpen;
  }
}
