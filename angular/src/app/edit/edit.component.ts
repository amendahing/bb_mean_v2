import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
    pet_id: any;
    current_pet: any;
    name: any;
    animal_type: any;
    description: any;
    skill_1: any;
    skill_2: any;
    skill_3: any;
    skills: any;
    errors: any;

    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

    ngOnInit() {
      this._route.params.subscribe( params => {
          this.pet_id = params['id'];
      });
      this.getPetEdit(this.pet_id);
    }

    getPetEdit(pet_id) {
      let observable = this._httpService.findPet(this.pet_id);
      observable.subscribe(data => {
          console.log('getting pet info', data);
          this.current_pet= data['data']
          this.name= data['data']['name']
          this.animal_type= data['data']['animal_type']
          this.description= data['data']['description']
          this.skill_1 = data['data']['skills'][0]
          this.skill_2 = data['data']['skills'][1]
          this.skill_3 = data['data']['skills'][2]
          // console.log(data['data'])
      })
    }

    submitEdit() {
    this.skills = [];
    this.skills.push(this.skill_1)
    this.skills.push(this.skill_2)
    this.skills.push(this.skill_3)
      console.log("about to submit the edit...")
      let observable = this._httpService.submitEdit(this.pet_id, this.name, this.animal_type, this.description, this.skills);
      observable.subscribe(data => {
          console.log(data);
            if (data['errors']) {
                console.log(data['errors']);
                this.errors = data['errors'];
                // this.errors.push(data['errors'])
            }
            else {
                console.log("Author successfully updated", data)
                this._router.navigate(['/'])
            }
      })
    }
}
