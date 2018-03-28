import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})

export class AllComponent implements OnInit {
    pets: any;

    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ) { }

  ngOnInit() {
      this.getPets();
  }

  getPets() {
      let observable = this._httpService.getPets()
      observable.subscribe(data => {
          console.log("List of Pets", data)
          // console.log(data['data'][0]['name'])
          this.pets = data['data'];
          // console.log(this.pets)
          // console.log(this.pets[0].name)
      })
  }

  details(id) {
      console.log("interested in pet's details", id);
      this._router.navigate(['pet_detail/'+id]);
  }

  showEdit(id) {
      console.log("about to update this bish..", id)
      this._router.navigate(['edit_pet/'+id]);
  }

  // deleteRest(id){
  //     // console.log("Deleting restaurant...", id);
  //     let observable = this._httpService.deleteRest(id);
  //     observable.subscribe(data => {
  //         console.log("restaurat has been deleted")
  //     })
  //     this.getPets()
  // }

}
