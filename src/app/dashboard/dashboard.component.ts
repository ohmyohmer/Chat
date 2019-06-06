import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dataLists: any = [];
  formData;
  persons: any = [];

  constructor() {
  }

  onSubmit(data) {
    this.dataLists.push({id: Math.random().toString(36).substr(2, 9), firstName: data.firstName, lastName: data.lastName});
    localStorage.setItem('persons', JSON.stringify(this.dataLists));
    this.formData.reset();
    this.displayPersons()
  }

  ngOnInit() {
    this.displayPersons()
    this.formData = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required)
    });
  }

  displayPersons() {
    this.persons = JSON.parse(localStorage.getItem('persons'));
  }

}
