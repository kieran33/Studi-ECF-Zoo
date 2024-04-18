const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const port = 3002;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'zoo'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connecté à la base de données Zoo');

    const creerTableAnimaux = `
    CREATE TABLE IF NOT EXISTS animaux(
        id INT AUTO_INCREMENT PRIMARY KEY,
        prenom VARCHAR(255) NOT NULL,
        race VARCHAR(255) NOT NULL,
        habitat VARCHAR(255) NOT NULL
    )`;

    const creerTableHabitats = `
    CREATE TABLE IF NOT EXISTS habitats(
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        listeAnimaux VARCHAR(255) NOT NULL
    )`;

    const creerTablePersonnels = `
    CREATE TABLE IF NOT EXISTS personnels(
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom_utilisateur VARCHAR(255) NOT NULL,
        mot_de_passe VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL
    )`;

    const creerTableServices = `
    CREATE TABLE IF NOT EXISTS services(
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL
    )`;

    const creerTableAvisNonVerif = `
    CREATE TABLE IF NOT EXISTS avis_non_verif(
        id INT AUTO_INCREMENT PRIMARY KEY,
        pseudo VARCHAR(255) NOT NULL,
        message VARCHAR(255) NOT NULL
    )`;

    const creerTableAvisVerif = `
    CREATE TABLE IF NOT EXISTS avis_verif(
        id INT AUTO_INCREMENT PRIMARY KEY,
        pseudo VARCHAR(255) NOT NULL,
        message VARCHAR(255) NOT NULL
    )`;

    db.query((creerTableAnimaux, creerTableHabitats,
        creerTablePersonnels, creerTableServices,
        creerTableAvisNonVerif, creerTableAvisVerif), err => {
            if (err) throw err;
            console.log("Les tables 'animaux', 'habitats', 'personnels', 'services', 'avis_non_verif' et 'avis_verif' sont prêtes");
        });
});

app.get("/animaux", (req, res) => {
    const request = "SELECT * FROM animaux"
    db.query(request, (error, result) => {
        res.send(result);
    });
});


app.listen(port, () => {
    console.log('Serveur connecté au port ' + port);
});