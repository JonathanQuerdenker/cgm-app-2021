import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-contact-form',
  templateUrl: './add-contact-form.component.html',
  styleUrls: ['./add-contact-form.component.scss']
})
export class AddContactFormComponent {
  contactForm = this.fb.group({
    company: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    country: [null, Validators.required],
    phoneNumber:[ null, Validators.compose([
      Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(6)])
    ],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(5), Validators.maxLength(5)])
    ],
    pronoun: null,
  });

  countries = [
    {name:'The Moon'},
    {name:'Death Star'},
    {name:'Pangea'},
    {name:'Alabama'},
    {name:'Nirvana'},
    {name:'Schlaraffenland'},
    {name:'Marianna Trench'},
    {name:'The great Roman Empire'},
    {name:'Bunte Republik Neustadt'},
    {name:'Home is where the wifi is'},
    {name:'Falcon X'},
  ];

  constructor(private fb: FormBuilder) {}

  // const formData = new FormData()

  onSubmit() {
    alert('Thanks!');
    console.log(this.contactForm.value);
  }
}
