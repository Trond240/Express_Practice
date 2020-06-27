const express = require('express');
const app = express();
const cors = require('cors');

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Pet Box';
app.locals.pets = [
    { id: 'a1', name: 'Rover', type: 'dog' },
    { id: 'b2', name: 'Marcus Aurelius', type: 'parakeet' },
    { id: 'c3', name: 'Craisins', type: 'cat' }
];

app.use(express.json());

app.use(cors());

app.use(express.static('public'));


app.get('/', (request, response) => {
    response.send('Oh hey Pet Box');
});

app.get('/api/v1/pets', (request, response) => {
    const pets = app.locals.pets;

    response.json({ pets });
});

app.get('/api/v1/pets/:id', (request, response) => {
    const { id } = request.params;
    const pet = app.locals.pets.find(pet => pet.id === id);
    if (!pet) {
        return response.sendStatus(404);
    }
    response.status(200).json(pet);
});

app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

app.post('/api/v1/pets', (request, response) => {
    const id = Date.now();
    const pet = request.body;

    for (let requiredParameter of ['name', 'type']) {
        if (!pet[requiredParameter]) {
        return response
            .status(422)
            .send({ error: `Expected format: { name: <String>, type: <String> }. You're missing a "${requiredParameter}" property.` });
        }
    }
    const { name, type } = pet;
    app.locals.pets.push({ name, type, id });
    response.status(201).json({ name, type, id });
});

app.delete('/api/v1/pets/:id', (request, response) => {
    pets.findOneAndRemove({
        id: req.params.id
    }, (err, pets) => {
        if(err) {
        res.send('error removing')
        } else {
        console.log(pets);
        res.status(204);
    }})
});




// app.patch('/api/v1/pets/:id', function(req, res) {
//     if (req.body.id && req.body.id != req.params.id) return res.status(400).json({error: 'ID in the body is not matching ID in the URL'})
//     delete req.body.id
//     req.collection.updateById(req.params.id, {$set: req.body}, function(e, results) {
//   // console.log('boo', e, results)
//     res.json(results)
//     })
// })
