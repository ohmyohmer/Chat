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
  messages: any = [];
  public now: Date = new Date();

  constructor() {
  }

  onSubmit(data) {
    this.dataLists.push({id: Math.random().toString(36).substr(2, 9), message: data.message, date: new Date()});
    localStorage.setItem('messages', JSON.stringify(this.dataLists));
    this.formData.reset();
    this.displayMessages()
  }

  ngOnInit() {
    this.displayMessages()
    this.formData = new FormGroup({
      message: new FormControl('', Validators.required)
    });
  }

  displayMessages() {
    this.messages = JSON.parse(localStorage.getItem('messages'));
  }

}
