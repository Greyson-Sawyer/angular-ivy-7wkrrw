import { Injectable } from '@angular/core';
// import caseData from '../../assets/cases-preview.json';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { query } from './neo4j-helper/query';

// import partiesRaw from '../../assets/parties.json';

export interface SuperiorCourtCase {
  Case_Number: string;
  Aslan_Case_Type: string;
  Case_Type: string;
  Category: string;
  Category_Description: string;
  Court_Name: string;
  File_Date: any;
  Judge: string;
  Location: string;
  Title: string;
  eAccess_Id: string;
  eAccess_Status: string;
  nodes: Node[];
  rels: Rel[];
  url: string;
}

export interface Node {
  identity: number;
  labels: string[];
  properties: any;
}

export interface Rel {
  end: number;
  identity: number;
  properties: any;
  start: number;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class CasesService {
  cases: any = [];
  constructor(private http: HttpClient) {}

  async searchForCases() {}
}
