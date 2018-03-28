var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

var app = express();
mongoose.Promise = global.Promise
app.use(bodyParser.json());

// static content
app.use(express.static( __dirname + '/angular/dist' ));
mongoose.connect('mongodb://localhost/bb_mean_v2');

var PetSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        minlength: [3, "Pet name must be at least 3 letters"]
    },
    animal_type: {
        type: String,
        required: true,
        minlength: [3, "Animal type must be at least 3 letters"]
    },
    description: {
        type: String,
        required: true,
        minlength: [3, "Description must be at least 3 letters"]
    },
    likes: {
        type: Number,
        default: 0
    },
    // skills: [{cont: {type: String}}]
    skills: [{type: String}]


})


mongoose.model('Pet', PetSchema);
var Pet = mongoose.model('Pet')

// RETRIEVE ALL
app.get('/pets', function(req, res){
    // Pet.find({}, function(err, data){
    Pet.find({}, null, {sort: {animal_type: 1}}, function(err, data){
        if(err){
            console.log("Error hit", err);
            res.json({message: "Error", data: err})
        }else{
            // console.log("Success!", data);
            res.json({message: "Success", data: data})
        }
    });
})


// LIKE PET
app.post("/pets/likes/:id", function(req,res){
    // console.log("server liked pet", req.params.id)
    Pet.update({_id: req.params.id}, {$inc: {likes: 1}}, function(err, data) {
        if (err) {
            console.log("Could not like pet");
            res.json({message: "Error", error: err})
        }
        else {
            // console.log("Pet has been liked")
            res.json({message: "Liked!"})
        }
    })
})

// CREATE NEW PET
app.post('/pets/new', function(req, res){
    console.log("hit the server! new pet:", req.body);
    console.log(req.body.pet + ":", req.body.animal_type)


    var pet = new Pet ({name: req.body.pet, animal_type: req.body.animal_type, description: req.body.description, skills: req.body.skills});
    pet.save(function(err, data){
        if(err){
            console.log("New pet was not added.");

            res.json({message: "Pet Name, animal type, and description must be at least 3 characters", error: err})

        }
        else {
            console.log("Successfully added pet", req.body.pet)
            res.json(data);
        }
    })
})


// RETRIEVE ONE PET
app.get("/pets/:id", function(req, res){
    Pet.findOne({_id: req.params.id}, function(err, data){
        if (err) {
            console.log("Returned error", err);
            res.json({message: "Error", error: err})
        }
        else {
            res.json({message:"Display", data: data})
        }
    })
})

// UPDATE PET DETAILS
app.put('/pets/update/:id', function(req, res) {
    console.log("ABOUT TO EDIT +++++++++", req.params.id)
    console.log(req.body.name);
    console.log(req.body.animal_type);

    Pet.find({_id: req.params.id}, function(err, data) {
        if (err) {
            res.json({message: "Error", error: err})
        }
        else {
            if (req.body.name.length < 3) {
                console.log("Pet's name must be at least 3 chars to edit");
                res.json({errors: "Name needs to be at least 3 characters."});
            }
            else if (req.body.animal_type.length < 3) {
                console.log("Pet type must be at least 3 chars to edit");
                res.json({errors: "Pet type needs to be at least 3 characters."});
            }
            else if (req.body.description.length < 3) {
                console.log("Description must be at least 3 chars to edit");
                res.json({errors: "Description needs to be at least 3 characters."});
            }
            else {
                Pet.update({_id: req.params.id}, {name: req.body.name, animal_type: req.body.animal_type, description: req.body.description, skills: req.body.skills}, function(err, data){
                    if (err) {
                        console.log('something went wrong');
                        res.json({message: "Error", error: err})
                    }
                    else {
                        console.log(data);
                        res.json({message: "Updated", name: req.body.name})
                    }
                })
            }
        }
    })
})


app.delete('/pets/delete/:id', function(req, res) {
    // console.log("deleting..", req.params.id);
    Pet.remove({_id: req.params.id}, function(err, data) {
        if (err) {
            console.log('something went wrong');
            res.json({message: "Error", error: err});
        }
        else {
            console.log('removed', req.params.id);
            res.json({message:"Removed"})
        }
    })
})


app.put("/pet_review/new/:id", function(req, res){
    console.log("+++++++MADE IT TO THE SERVER++++++++++++")
    console.log(req.params.id, req.body.customer, req.body.star, req.body.cont)
    Pet.findOne({_id: req.params.id}, function (err, data) {
        if(err){
            console.log(err)
            res.status(500).send(err)
        }
        else {
            console.log(data.reviews)
            data.reviews.push({cont: req.body.cont, customer: req.body.customer, star: req.body.star})
            data.save()
            res.json(data);
        }
    })
})



app.all("*", (req, res, next) => { res.sendFile(path.resolve("./client/dist/index.html"))});

// listen on this port
app.listen(8000, function(){
    console.log("you are browsin' on port 8000");
})
