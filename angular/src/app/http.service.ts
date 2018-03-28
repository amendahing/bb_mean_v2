import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  addPet(name, animal_type, description, skills){
      console.log(name, animal_type, description);
      return this._http.post('/pets/new', {pet: name, animal_type, description, skills})
  }

  getPets(){
      return this._http.get('/pets')
  }

  deletePet(id){
      return this._http.delete('/pets/delete/'+id);
  }

  findPet(pet_id) {
      return this._http.get('/pets/'+pet_id)
  }


  addlike(id) {
      return this._http.post('/pets/likes/'+id, {data: "data"});
  }

  submitEdit(id, name, animal_type, description, skills) {
      console.log("Submitting edit soon", id)
       return this._http.put('/pets/update/'+id, {name: name, animal_type, description, skills})
  }

}
