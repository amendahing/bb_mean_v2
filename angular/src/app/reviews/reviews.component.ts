import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
    pet_id: any;
    pet_name: any;
    animal_type: any;
    description: any;
    skills: any;
    likes: any;

    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

  ngOnInit() {
    this._route.params.subscribe( params => {
        this.pet_id = params['id'];
        this.getPetDetail(this.pet_id)
    });
  }


  getPetDetail(pet_id) {
      // console.log("from reviews component", id);
      let observable = this._httpService.findPet(this.pet_id);
      observable.subscribe(data => {
          console.log("from reviews component", data)
          this.pet_name = data['data']['name'];
          this.animal_type = data['data']['animal_type'];
          this.description = data['data']['description']
          this.skills = data['data']['skills']
          this.likes = data['data']['likes']
          // console.log(data['data']['name']);
          // console.log(data['data']['description'])
      })
  }

  addLikeButton() {
    // console.log("Liked pet!")
    let observable = this._httpService.addlike(this.pet_id);
    observable.subscribe(data => {
        console.log(data);
        this.getPetDetail(this.pet_id)
    })
  }

    delete(pet_id) {
        // console.log("Pet is adopted", this.pet_id)
        let observable = this._httpService.deletePet(this.pet_id);
        observable.subscribe(data => {
            console.log("From observable, pet has been adopted")
            this._router.navigate(['/'])
        })
    }



}
