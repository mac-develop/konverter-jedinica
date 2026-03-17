const express = require('express'); // uzima express
const app = express(); // pokrece express instancu
app.use(express.static('public'));

app.set('view engine', 'ejs'); // ejs kao za prikaz stranice

app.use(express.urlencoded({extended:true}));


//RUTE - "stranice na web-sjedištu"
app.get('/', (req, res) => {
    res.render('index', {result:null});
});
app.get('/mass', (req, res) => {
    res.render('mass', {result:null});
});
app.get('/temp', (req, res) => {
    res.render('temp', {result:null});
});

app.post('/', (req, res) => {
    const value = parseFloat(req.body.value);
    const unit_from = req.body.unit_from;
    const unit_to = req.body.unit_to;

    const ratesInMeters = {
        mm: 0.001,
        cm: 0.01,
        m: 1,
        km: 1000,
        in: 0.0254,
        ft: 0.3048
    };

    const result = (value * ratesInMeters[unit_from]) / ratesInMeters[unit_to];

    res.render('index', {
        result: result.toFixed(2),
        original_value: value,
        unit_from: unit_from,
        unit_to: unit_to
    });
});

app.post('/mass', (req,res)=>{
    const value = parseFloat(req.body.value);
    const unit_from = req.body.unit_from;
    const unit_to = req.body.unit_to;

    const ratesInGrams = {
        mg: 0.001,
        g: 1,
        kg: 1000
    };

    const result = (value * ratesInGrams[unit_from]) / ratesInGrams[unit_to];

    res.render('mass', {
        result: result.toFixed(2),
        original_value: value,
        unit_from: unit_from,
        unit_to: unit_to
    });
});

app.post('/temp', (req,res)=>{
    const value = parseFloat(req.body.value);
    const unit_from = req.body.unit_from;
    const unit_to = req.body.unit_to;

    let resultInCelsius;
    switch(unit_from)
    {
        case "F":
            resultInCelsius = (value - 32) / 1.8;
            break;
        case "C":
            resultInCelsius = value;
            break;
        case "K":
            resultInCelsius = value - 273.15;
            break;
    }
    switch(unit_to)
    {
        case "K":
            result = resultInCelsius + 273.15;
            break;
        case "F":
            result = (resultInCelsius * 1.8) + 32;
            break;
        case "C":
            result = resultInCelsius;
            break;
    }

    res.render('temp', {
        result: result.toFixed(2),
        original_value: value,
        unit_from: unit_from,
        unit_to: unit_to
    });
});
app.listen(3000, ()=>{
    console.log("Server radi");
});