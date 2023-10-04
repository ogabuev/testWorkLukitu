const express = require('express');
const jsonParser = require('jsonparser');
const PORT = 65000;
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

const todoItems = require('./characters.json');
app.get('/api/characters', (req, res) => {
    res.json({ data: todoItems });
});

app.post('/api/character', jsonParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);

    let characterId = req.body.id;
    let characterName = req.body.name;
    let characterValue = req.body.value;
    let characterAddSkills = req.body.addSkills;
    let character = {id: req.body.id, name: characterName, value: characterValue, addSkills: characterAddSkills};

    var data = fs.readFileSync('characters.json', 'utf8');
    var characters = JSON.parse(data);
    characters.push(character);
    var data = JSON.stringify(characters);

    fs.writeFileSync('characters.json', data);
    res.send(character);
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
