import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ag-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  constructor() {}

  rowData = [
    {
      name: 'Ireland',
      continent: 'Europe',
      language: 'English',
      code: 'ie',
      population: 4000000,
      summary: 'Master Drinkers',
    },
    {
      name: 'Spain',
      continent: 'Europe',
      language: 'Spanish',
      code: 'es',
      population: 4000000,
      summary: 'Bull Fighters',
    },
    {
      name: 'United Kingdom',
      continent: 'Europe',
      language: 'English',
      code: 'gb',
      population: 4000000,
      summary: 'Center of the World',
    },
    {
      name: 'France',
      continent: 'Europe',
      language: 'French',
      code: 'fr',
      population: 4000000,
      summary: 'Best Lovers',
    },
    {
      name: 'Germany',
      continent: 'Europe',
      language: 'German',
      code: 'de',
      population: 4000000,
      summary: 'Always on Time',
    },
    {
      name: 'Sweden',
      continent: 'Europe',
      language: 'Swedish',
      code: 'se',
      population: 4000000,
      summary: 'Home of Vikings',
    },
    {
      name: 'Norway',
      continent: 'Europe',
      language: 'Norwegian',
      code: 'no',
      population: 4000000,
      summary: 'Best Vikings',
    },
    {
      name: 'Italy',
      continent: 'Europe',
      language: 'Italian',
      code: 'it',
      population: 4000000,
      summary: 'Pizza Pizza',
    },
  ];
  columnDefs = [
    {
      field: 'name',
      headerName: 'Name',
      cellRenderer: this.countryCellRenderer,
    },
    { field: 'continent', headerName: 'Continent' },
    { field: 'language', headerName: 'Language' },
  ];

  countryCellRenderer(params) {
    var flag =
      '<img border="0" width="15" height="10" src="https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/images/flags/' +
      params.data.code +
      '.png">';
    return (
      '<span style="cursor: default;">' + flag + ' ' + params.value + '</span>'
    );
  }

}
