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
        image VARCHAR(255) NOT NULL,
        nourriture VARCHAR(255) NOT NULL,
        quantite_nourriture VARCHAR(255) NOT NULL,
        etat VARCHAR(255) NOT NULL,
    )`;

    /*nourriture VARCHAR(255) NOT NULL,
    quantite_nourriture VARCHAR(255),
    etat VARCHAR(255),
    date_nourriture DATETIME*/

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

app.delete("/animaux/supprimer/:id", (req, res) => {
    const { id } = req.params;
    const request = "DELETE FROM animaux WHERE id = ?";

    db.query(request, id, (error, result) => {
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

app.put("/animaux/modifier/:id", exporter.single("image"), (req, res) => {
    const { id } = req.params;
    const nom_image = req.file ? req.file.filename : null;

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

app.put("/ajout-nourriture/:id", exporter.single("image"), (req, res) => {
    const { id } = req.params;
    console.log('id', id)
    console.log('nourriture animal', req.body.nourriture)
    console.log('quantité nourriture animal', req.body.quantite_nourriture)
    console.log('etat animal', req.body.etat)
    console.log('date nourriture animal', req.body.date_nourriture)

    const request = "UPDATE animaux SET `nourriture`=?, `quantite_nourriture`=?, `etat`=?, `date_nourriture`=? WHERE id=?";

    db.query(request, [req.body.nourriture, req.body.quantite_nourriture, req.body.etat, req.body.date_nourriture, id], (error, result) => {
        if (error) {
            console.log(error);
            console.log('ok ça marche pas')
        }
        else {
            console.log(result);
            console.log('ok ça marche')
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

app.listen(port, () => {
    console.log('Serveur connecté au port ' + port);
});