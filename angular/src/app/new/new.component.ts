import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
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

  }

    addPet() {
        this.skills = [];
        this.skills.push(this.skill_1)
        this.skills.push(this.skill_2)
        this.skills.push(this.skill_3)
        console.log(this.skills);
        let observable = this._httpService.addPet(this.name, this.animal_type, this.description, this.skills)
        observable.subscribe(data => {
            console.log(data);
            if (data['message']) {
                console.log(data['message'])
                this.errors = data['message']
            }
            else {
                console.log("Success!")
                this._router.navigate(['/']);
            }
        })
    }

}
