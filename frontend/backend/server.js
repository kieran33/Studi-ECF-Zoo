const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const path = require("path");
const multer = require("multer");

const app = express();

const port = 3002;

app.use(cors());
app.use(bodyParser.json());

app.use("/image", express.static(path.join(__dirname, "image")));

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' http://localhost:5000;");
    return next();
});

const repertoireImage = path.join(__dirname, "image");

const stockage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, repertoireImage);
    },
    filename: function (req, file, cb) {
        const nom_fichier = `image-${file.originalname.replace(/[^a-zA-Z0-9.]/g, "_")}`;
        cb(null, nom_fichier);
    }
});

const filtreFichier = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new Error("Seuls les fichiers image sont autorisés."), false);
    }
};

const exporter = multer({ storage: stockage, fileFilter: filtreFichier });

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
        habitat VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL
    )`;

    const creerTableHabitats = `
    CREATE TABLE IF NOT EXISTS habitats(
        id INT AUTO_INCREMENT PRIMARY KEY,
        nom VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL
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
        description VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL
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

app.get("/habitats", (req, res) => {
    const request = "SELECT * FROM habitats"
    db.query(request, (error, result) => {
        res.send(result);
    });
});

app.get("/services", (req, res) => {
    const request = "SELECT * FROM services"
    db.query(request, (error, result) => {
        res.send(result);
    });
});

app.get("/personnels", (req, res) => {
    const request = "SELECT * FROM personnels"
    db.query(request, (error, result) => {
        res.send(result);
    });
});

app.post("/connexion", (req, res) => {
    const { nom_utilisateur, mot_de_passe } = req.body;
    console.log("nom utilisateur", nom_utilisateur)
    console.log('mot de passe', mot_de_passe)

    db.query("SELECT * FROM personnels WHERE nom_utilisateur = ?", [nom_utilisateur], (err, results) => {
        if (err) {
            res.status(500).send("Erreur dans la recherche du compte du personnel");
        }
        if (results.length === 0) {
            res.status(401).send("Utilisateur non trouvé");
        } else {
            console.log('result', results)
        }

        if (mot_de_passe.includes("admin")) {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(mot_de_passe, salt, (err, hash) => {
                    console.log("mot de passe salt", mot_de_passe)
                    console.log("hash", hash)
                    const utilisateur = results[0];
                    bcrypt.compare(utilisateur.mot_de_passe, hash, (err, result) => {
                        console.log('result bcrypt compare2', result)
                        if (result) {
                            res.status(200).json({ success: true, message: "connexion réussis", role: utilisateur.role });
                        } else {
                            console.log(result)
                            console.log('erreur bcrypt else', err)
                            res.status(401).json({ success: false, message: "Mot de passe incorrect", role: utilisateur.role });
                        }
                    })
                })
            })
        }
        else {
            console.log("je suis dans else")
            const utilisateur = results[0];
            console.log("mot de passe", mot_de_passe)
            console.log("utilisateur . mot de passe", utilisateur.mot_de_passe)
            bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe, (err, result) => {
                console.log('result bcrypt compare2', result)
                if (result) {
                    res.status(200).json({ success: true, message: "connexion réussis", role: utilisateur.role });
                } else {
                    console.log(result)
                    console.log('erreur bcrypt else', err)
                    res.status(401).json({ success: false, message: "Mot de passe incorrect", role: utilisateur.role });
                }
            })
        }


        //const utilisateur = results[0];

        //console.log('utilisateur nom_utilisateur', utilisateur.nom_utilisateur)
        //console.log('utilisateur mot de passe', utilisateur.mot_de_passe)

        /*bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe).then(function (result) {
            console.log('result autre bcrypt', result)
        });*/

        /*bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe, (err, result) => {
            console.log('je suis dans bcrypt', bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe))
            if (result) {
                res.status(200).json({ success: true, message: "connexion réussis" });
            } else {
                console.log(result)
                console.log('erreur bcrypt else', err)
                res.status(401).json({ success: false, message: "Mot de passe incorrect" });
            }
        });*/
    });
});

app.post("/creer-personnels", (req, res) => {
    const { nom_utilisateur, mot_de_passe, role } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(mot_de_passe, salt, (err, hash) => {
            if (err) {
                return res.status(500).send("Erreur lors du hashage");
            }

            const request = "INSERT INTO personnels (nom_utilisateur, mot_de_passe, role) VALUES (?, ?, ?)";

            db.query(request, [nom_utilisateur, hash, role], (err, result) => {
                if (err) {
                    res.status(500).send("Erreur lors de la création du personnel");
                }
                else {
                    console.log("Personnel créer avec succès");
                    res.status(201).send("Personnel créer avec succès");
                }
            });
        });
    });
});

app.post("/ajout-animaux", exporter.single("image"), (req, res) => {
    const { prenom, race, habitat, description } = req.body;
    const nom_image = req.file ? req.file.filename : null;

    console.log('prenom animaux', prenom);
    console.log('race animaux', race);
    console.log('habitat animaux', habitat);
    console.log('description animaux', description);
    console.log('nom image', nom_image);

    db.query("INSERT INTO animaux (prenom, race, habitat, image, description) VALUES (?, ?, ?, ?, ?)",
        [prenom, race, habitat, nom_image, description], (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).send("Erreur lors de l'ajout de l'animal");
            }
            else {
                res.status(201).send("Animal ajouté avec succès");
            }
        });
});

app.delete("/animaux/supprimer/:id", (req, res) => {
    const { id } = req.params;
    const request = "DELETE FROM animaux WHERE id = ?";

    db.query(request, id, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.listen(port, () => {
    console.log('Serveur connecté au port ' + port);
});