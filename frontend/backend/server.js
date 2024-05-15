const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const path = require("path");
const multer = require("multer");

const mongoose = require("mongoose");
require("dotenv").config();
const AnimalModel = require("./models/Animaux");

mongoose.connect(process.env.MONGO_URL);

const app = express();
const port = 3002;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/vues-animaux", (req, res) => {
    AnimalModel.find()
        .then(animals => res.json(animals))
        .catch(animals => res.json(animals))
});

app.put("/augmenter-vues-animal", (req, res) => {
    const { prenom } = req.body;
    console.log(prenom)

    AnimalModel.findOneAndUpdate(
        { prenom: prenom },
        { $inc: { nombreVues: 1 } })
        .then(animals => res.json(animals))
        .catch(animals => res.json(animals))
});

app.post("/ajout-animaux-vues", (req, res) => {
    const { prenomAnimal } = req.body;
    console.log(prenomAnimal)

    AnimalModel.insertMany(
        { prenom: prenomAnimal },
        { nombreVues: 0 })
        .then(animals => res.json(animals))
        .catch(animals => res.json(animals))
});

app.delete("/supprimer-animaux-vues/:prenom", (req, res) => {
    const { prenom } = req.params;
    console.log(prenom);

    AnimalModel.findOneAndDelete({ prenom: prenom })
        .then(animals => res.json(animals))
        .catch(animals => res.json(animals))
});

app.put("/modifier-animaux-vues/:prenom", (req, res) => {
    const { prenom } = req.params;
    console.log('JE SUIS DANS MODIFIER ANIMAUX VUES MONGODB')
    console.log(prenom)

    const { nouveauPrenom } = req.body;
    console.log("nouveau prenom", nouveauPrenom)

    AnimalModel.findOneAndUpdate(
        { prenom: prenom },
        { $set: { prenom: nouveauPrenom } })
        .then(animals => res.json(animals))
        .catch(animals => res.json(animals))
    console.log('apres le model ')
});

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
        image VARCHAR(255) NOT NULL,
        nourriture VARCHAR(255) NOT NULL,
        quantite_nourriture VARCHAR(255) NOT NULL,
        etat VARCHAR(255) NOT NULL,
        date_nourriture VARCHAR(255) NOT NULL,
        date_soins VARCHAR(255) NOT NULL
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

    const creerTableHoraires = `
    CREATE TABLE IF NOT EXISTS horaires(
        id INT AUTO_INCREMENT PRIMARY KEY,
        jour VARCHAR(255) NOT NULL,
        heure_ouverture VARCHAR(255) NOT NULL,
        heure_fermeture VARCHAR(255) NOT NULL,
        ouvert_fermer VARCHAR(255) NOT NULL
    )`;

    const creerTableQuestions = `
    CREATE TABLE IF NOT EXISTS questions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        titre VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
    )`;

    const creerTableNourrirAnimaux = `
    CREATE TABLE IF NOT EXISTS nourrir_animaux (
        id INT AUTO_INCREMENT PRIMARY KEY,
        prenom VARCHAR(255) NOT NULL,
        nourriture VARCHAR(255) NOT NULL,
        quantite_nourriture VARCHAR(255) NOT NULL,
        date_nourriture VARCHAR(255) NOT NULL
    )`;

    const creerTableSoins = `
    CREATE TABLE IF NOT EXISTS soins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        prenom VARCHAR(255) NOT NULL,
        etat VARCHAR(255) NOT NULL,
        date_soins VARCHAR(255) NOT NULL
    )`;

    db.query((creerTableAnimaux, creerTableHabitats,
        creerTablePersonnels, creerTableServices,
        creerTableAvisNonVerif, creerTableAvisVerif, creerTableHoraires,
        creerTableQuestions, creerTableNourrirAnimaux, creerTableSoins), err => {
            if (err) throw err;
            console.log("Les tables 'animaux', 'habitats', 'personnels', 'services', 'avis_non_verif', 'avis_verif', 'horaires', 'questions', 'nourrir_animaux' et 'soins sont prêtes");
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

app.get("/avis-non-verif", (req, res) => {
    const request = "SELECT * FROM avis_non_verif"
    db.query(request, (error, result) => {
        res.send(result);
    });
});

app.get("/avis-verif", (req, res) => {
    const request = "SELECT * FROM avis_verif"
    db.query(request, (error, result) => {
        res.send(result);
    });
});

app.get("/horaires", (req, res) => {
    const request = "SELECT * FROM horaires"
    db.query(request, (error, result) => {
        res.send(result);
    });
});

app.get("/questions", (req, res) => {
    const request = "SELECT * FROM questions"
    db.query(request, (error, result) => {
        res.send(result);
    });
});

app.get("/nourriture-animaux", (req, res) => {
    const request = "SELECT * FROM nourrir_animaux"
    db.query(request, (error, result) => {
        res.send(result);
    });
});

app.get("/soins-animaux", (req, res) => {
    const request = "SELECT * FROM soins"
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

app.post("/ajout-services", exporter.single("image"), (req, res) => {
    const { nom, description } = req.body;
    const nom_image = req.file ? req.file.filename : null;

    db.query("INSERT INTO services (nom, description, image) VALUES (?, ?, ?)",
        [nom, description, nom_image], (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).send("Erreur lors de l'ajout du service");
            }
            else {
                console.log(result);
                res.status(201).send("Service ajouté avec succès");
            }
        });
});

app.post("/ajout-habitats", exporter.single("image"), (req, res) => {
    const { nom, description } = req.body;
    const nom_image = req.file ? req.file.filename : null;

    db.query("INSERT INTO habitats (nom, description, image) VALUES (?, ?, ?)",
        [nom, description, nom_image], (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).send("Erreur lors de l'ajout de l'habitat");
            }
            else {
                console.log(result);
                res.status(201).send("Habitat ajouté avec succès");
            }
        });
});

app.post('/ajout-avis-non-verif', (req, res) => {
    const { pseudo, message } = req.body;

    db.query("INSERT INTO avis_non_verif (pseudo, message) VALUE (?, ?)", [pseudo, message], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send('Erreur lors de l\'ajout de l\'avis');
        }
        else {
            console.log(result);
            res.status(201).send('Avis ajouté avec succès');
        }
    });
});

app.post('/ajout-avis-verif', (req, res) => {
    const { pseudo, message } = req.body;

    db.query("INSERT INTO avis_verif (pseudo, message) VALUE (?, ?)", [pseudo, message], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send('Erreur lors de l\'ajout de l\'avis');
        }
        else {
            console.log(result);
            res.status(201).send('Avis ajouté avec succès');
        }
    });
});

app.post('/envoyer-questions', (req, res) => {
    const { titre, description, email } = req.body;

    db.query("INSERT INTO questions (titre, description, email) VALUE (?, ?, ?)", [titre, description, email], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send('Erreur lors de l\'envoie de la question');
        }
        else {
            console.log(result);
            res.status(201).send('Question envoyé avec succès');
        }
    });
});

app.post("/ajout-soins/:prenom", exporter.single("image"), (req, res) => {
    const { prenom } = req.params;
    const { etat, date_soins } = req.body;

    db.query("INSERT INTO soins (prenom, etat, date_soins) VALUES (?, ?, ?)",
        [prenom, etat, date_soins], (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).send("Erreur lors de l'ajout des soins de l'animal");
            }
            else {
                res.status(201).send("Soins de l'animal ajouté avec succès");
            }
        });
});


/*app.put("/compte-rendu-animaux/:id", exporter.single(), (req, res) => {
    const { id } = req.params;
    console.log('id', id)
    console.log('etat', req.body.etat)
    console.log('date soins', req.body.date_soins)

    const request = "UPDATE animaux SET `etat`=?, `date_soins`=? WHERE id=?";

    db.query(request, [req.body.etat, req.body.date_soins, id], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(result);
        }
    });
});*/




app.delete("/animaux/supprimer/:id", (req, res) => {
    const { id } = req.params;
    const request = "DELETE FROM animaux WHERE id = ?";

    db.query(request, id, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.delete("/animaux-nourriture/supprimer/:prenom", (req, res) => {
    const { prenom } = req.params;

    const request = "DELETE FROM nourrir_animaux WHERE prenom = ?";

    db.query(request, prenom, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.delete("/animaux-soins/supprimer/:prenom", (req, res) => {
    const { prenom } = req.params;

    const request = "DELETE FROM soins WHERE prenom = ?";

    db.query(request, prenom, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.delete("/services/supprimer/:id", (req, res) => {
    const { id } = req.params;
    const request = "DELETE FROM services WHERE id = ?";

    db.query(request, id, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.delete("/habitats/supprimer/:id", (req, res) => {
    const { id } = req.params;
    const request = "DELETE FROM habitats WHERE id = ?";

    db.query(request, id, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.delete("/personnels/supprimer/:id", (req, res) => {
    const { id } = req.params;
    const request = "DELETE FROM personnels WHERE id = ?";

    db.query(request, id, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.delete("/supprimer/avis-non-verif/:id", (req, res) => {
    const { id } = req.params;
    const request = "DELETE FROM avis_non_verif WHERE id = ?";

    db.query(request, id, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.delete('/supprimer/avis-verif', (req, res) => {
    const request = "DELETE FROM avis_verif";
    db.query(request, (error, result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.put("/animaux/modifier/:id", exporter.single("image"), (req, res) => {
    const { id } = req.params;
    const nom_image = req.file ? req.file.filename : null;

    console.log('JE SUIS DANS ANIMAUX MODIFIER ID')

    if (nom_image === null) {
        const request = "UPDATE animaux SET `prenom`=?, `race`=?, `habitat`=?, `description`=? WHERE id=?";
        db.query(request, [req.body.prenom, req.body.race, req.body.habitat, req.body.description, id], (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(result);
            }
        });
    }
    else {
        const request = "UPDATE animaux SET `prenom`=?, `race`=?, `habitat`=?, `image`=?, `description`=? WHERE id=?";
        db.query(request, [req.body.prenom, req.body.race, req.body.habitat, nom_image, req.body.description, id], (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(result);
            }
        });
    }
});

app.put("/animaux-nourriture/modifier/:prenom", exporter.single("image"), (req, res) => {
    const { prenom } = req.params;
    const { nouveauPrenom } = req.body;
    console.log('JE SUIS DANS ANIMAUX NOURRITURE MODIFIER')
    console.log('ancien prenom', prenom)
    console.log("nouveau prenom nourriture modif", nouveauPrenom)

    const request = "UPDATE nourrir_animaux SET `prenom`=? WHERE prenom=?";
    db.query(request, [req.body.nouveauPrenom, prenom], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(result);
        }
    });
});

app.put("/animaux-soins/modifier/:prenom", exporter.single("image"), (req, res) => {
    const { prenom } = req.params;
    const { nouveauPrenom } = req.body;
    console.log('JE SUIS DANS ANIMAUX NOURRITURE MODIFIER')
    console.log('ancien prenom', prenom)
    console.log("nouveau prenom nourriture modif", nouveauPrenom)

    const request = "UPDATE soins SET `prenom`=? WHERE prenom=?";
    db.query(request, [req.body.nouveauPrenom, prenom], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(result);
        }
    });
});


app.put("/ajout-nourriture/:id", exporter.single(), (req, res) => {
    const { id } = req.params;
    console.log('id', id)
    console.log('nourriture animal', req.body.nourriture)
    console.log('quantité nourriture animal', req.body.quantite_nourriture)
    console.log('date nourriture animal', req.body.date_nourriture)

    const request = "UPDATE animaux SET `nourriture`=?, `quantite_nourriture`=?, `date_nourriture`=? WHERE id=?";

    db.query(request, [req.body.nourriture, req.body.quantite_nourriture, req.body.date_nourriture, id], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(result);
        }
    });
});

app.put("/ajout-nourriture2/:prenom", exporter.single(), (req, res) => {
    const { prenom } = req.params;
    const { nourriture, quantite_nourriture, date_nourriture } = req.body;
    console.log('prenom', prenom)
    console.log(nourriture)
    console.log(quantite_nourriture)
    console.log(date_nourriture)

    db.query("INSERT INTO nourrir_animaux (prenom, nourriture, quantite_nourriture, date_nourriture) VALUES (?, ?, ?, ?)",
        [prenom, nourriture, quantite_nourriture, date_nourriture], (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).send("Erreur lors de l'ajout de la nourriture de l'animal");
            }
            else {
                res.status(201).send("Nourriture de l'animal ajouté avec succès");
            }
        });
});

/*
app.put("/compte-rendu-animaux/:id", exporter.single(), (req, res) => {
    const { id } = req.params;
    console.log('id', id)
    console.log('etat', req.body.etat)
    console.log('date soins', req.body.date_soins)

    const request = "UPDATE animaux SET `etat`=?, `date_soins`=? WHERE id=?";

    db.query(request, [req.body.etat, req.body.date_soins, id], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(result);
        }
    });
});*/

app.put("/avis-habitats/:id", exporter.single(), (req, res) => {
    const { id } = req.params;
    console.log('id', id)
    console.log('etat', req.body.etat)

    const request = "UPDATE habitats SET `etat`=? WHERE id=?";

    db.query(request, [req.body.etat, id], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(result);
        }
    });
});

app.put("/services/modifier/:id", exporter.single("image"), (req, res) => {
    const { id } = req.params;
    const nom_image = req.file ? req.file.filename : null;
    console.log('nom services', req.body.nom)

    if (nom_image === null) {
        const request = "UPDATE services SET `nom`=?, `description`=? WHERE id=?";
        db.query(request, [req.body.nom, req.body.description, id], (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(result);
            }
        });
    }
    else {
        const request = "UPDATE services SET `nom`=?, `image`=?, `description`=? WHERE id=?";
        db.query(request, [req.body.nom, nom_image, req.body.description, id], (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(result);
            }
        });
    }
});

app.put("/habitats/modifier/:id", exporter.single("image"), (req, res) => {
    const { id } = req.params;
    const nom_image = req.file ? req.file.filename : null;

    if (nom_image === null) {
        const request = "UPDATE habitats SET `nom`=?, `description`=? WHERE id=?";
        db.query(request, [req.body.nom, req.body.description, id], (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(result);
            }
        });
    }
    else {
        const request = "UPDATE habitats SET `nom`=?, `image`=?, `description`=? WHERE id=?";
        db.query(request, [req.body.nom, nom_image, req.body.description, id], (error, result) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log(result);
            }
        });
    }
});

app.put("/personnels/modifier/:id", (req, res) => {
    const { id } = req.params;

    console.log('nom user', req.body.nom_utilisateur)

    const request = "UPDATE personnels SET `nom_utilisateur`=?, `mot_de_passe`=?, `role`=? WHERE id=?";
    db.query(request, [req.body.nom_utilisateur, req.body.mot_de_passe, req.body.role, id], (error, result) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(result);
        }
    });
});

app.put("/horaires/modifier/:id", (req, res) => {
    const { id } = req.params;
    console.log("id", id)
    console.log('heure ouverture', req.body.heure_ouverture);
    console.log('heure fermeture', req.body.heure_fermeture);
    console.log('ouvert ou fermer ?', req.body.ouvert_fermer)

    const request = "UPDATE horaires SET `heure_ouverture`=?, `heure_fermeture`=?, `ouvert_fermer`=? WHERE id=?";
    db.query(request, [req.body.heure_ouverture, req.body.heure_fermeture, req.body.ouvert_fermer, id], (error, result) => {
        if (error) {
            console.log(error);
            console.log('aie aie erreur')
        }
        else {
            console.log(result);
            console.log('nice c\'est ok')
        }
    });
});

app.listen(port, () => {
    console.log('Serveur connecté au port ' + port);
}); 