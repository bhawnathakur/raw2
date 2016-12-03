import { Component, OnInit }                from '@angular/core';
import { Router }                           from '@angular/router';
import { Http, Response, Headers }          from '@angular/http';
import { Auth }                             from './../services/auth.service';
import { Personal }    			            from '../models/personal';
import { Address }    			            from '../models/address';
import {FormGroup, Validators, FormControl} from "@angular/forms";

@Component({
    providers: [ Auth ],
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    constructor( private router: Router, private auth: Auth, private http: Http  ) { }

    //Personal Form Control
    public personalSubmitted : Boolean = false;
    personalForm: FormGroup;
    personal = new Personal(this.auth.user.email, this.auth.user.first_name, this.auth.user.middle_name, this.auth.user.last_name, '', '', '', '', '', '');

  private personalSubmit() {
      this.personalSubmitted = true;
      console.log('Personal Form Has Been Submitted');
      if (!this.personalForm.valid) {
          console.log('Personal Form Has Been Submitted but is not valid');
      } else {
        const user = new Personal(
            this.personalForm.value.email,
            this.personalForm.value.first_name,
            this.personalForm.value.middle_name,
            this.personalForm.value.last_name,
            this.personalForm.value.dob,
            this.personalForm.value.mobile_phone,
            this.personalForm.value.home_phone,
            this.personalForm.value.business_phone,
            this.personalForm.value.fax_number,
            this.personalForm.value.ssn
        )
          let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http
      .post('http://localhost:4200/api/updateProfile',
        this.personal,
        { headers: headers })
      .map((res:Response) => res.json())
      .subscribe((res)=>{
            //do something with the response here
            console.log(res);
        });
      }
    }

    personalActive = true;

// Address form
	address = new Address(this.auth.user.email, '', '', '', '');

  addressSubmitted = false;

     addressSubmit() {
      this.addressSubmitted = true;
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http
      .post('http://localhost:4200/api/addAddress',
        this.address,
        { headers: headers })
      .subscribe();
    }

  	addressActive = true;
  	states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
    
    ngOnInit() {
        this.personalForm = new FormGroup({
            email : new FormControl(null,[
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")

            ]),
            first_name : new FormControl (null,Validators.required,Validators.pattern("/^[a-z0-9]+$/i")),
            middle_name : new FormControl (null,Validators.required,Validators.pattern("/^[a-z0-9]+$/i")),
            last_name : new FormControl (null,Validators.required,Validators.pattern("/^[a-z0-9]+$/i")),
            dob : new FormControl (null,Validators.required),
            mobile_phone : new FormControl (null,Validators.required,Validators.pattern("/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/"")),
            home_phone : new FormControl (null,Validators.required,Validators.pattern("/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/"")),
            business_phone : new FormControl (null,Validators.required,Validators.pattern("/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/"")),
            fax_number : new FormControl (null,Validators.required,Validators.pattern("/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/"")),
            ssn : new FormControl (null,Validators.required,Validators.pattern("/^\d{3}-?\d{2}-?\d{4}$/"")),
        })

    }
}

// zip : new FormControl (null,Validators.required,Validators.pattern("/^\d{5}$/")),
