# studi-ecf-zoo

Lien vers logiciel de gestion de projet Trello : https://trello.com/b/VNy4du8F/projet-ecf-zoo-kanban

Lien vers l'application déployée : https://arcadia-zoo-jose-aae84af1a94a.herokuapp.com/

Démarche à suivre pour déployer l'application en local avec Heroku :


Prérequis :

- Télécharger un IDE (VScode par exemple) 

- Télécharger MySQL WorkBench 

- Avoir installé Git sur son pc 

- Avoir installé NodeJS sur son pc 


Lien git hub : https://github.com/kieran33/studi-ecf-zoo 

Télécharger le fichier .zip sur git hub puis l'extraire sur le bureau par exemple


Faire glisser le dossier extrait sur VScode
	

Dans le fichier .env du projet (dans le dossier backend)

- écrire => JAWSDB_URL = mysql://v2gjixwu85awpd8v:no4p18xz8yabme6a@kavfu5f7pido12mr.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/ouo09zifdb5a4zu1

	- ensuite ouvrir WorkBench MySQL :

		- cliquer sur le petit "+" à côté de "MySQL Connections"
		
		- choisissez un nom pour cette nouvelle connexion

		- coller kavfu5f7pido12mr.cbetxkdyhwsb.us-east-1.rds.amazonaws.com dans Hostname sur workbench

		- coller v2gjixwu85awpd8v dans Username sur workbench

		- coller no4p18xz8yabme6a dans Password "Store in Vault...." sur workbench

		- coller ouo09zifdb5a4zu1 dans Default Schema sur workbench

		- vérifier que le port sur MySQL WorkBench soit bien le 3306

		- cliquer sur "Test Connection" si tout fonctionne, cliquer sur "Ok"


Pour importer les données :
	
	- aller sur la page d'accueil de mysql workbench sélectionner la nouvelle connexion que l'on vient juste de créer

	- puis cliquer "Administration" en bas à droite

	- puis dans "Management" sélectionner "Data Import" 

	- puis cocher "Import from self-contained file" 

	- choisissez le dossier ou votre fichier sql est positionné  

	- dans l'onglet "default target schema" choisissez l'élément database de JawsDB que l'on a précédemment copier/coller

	- enfin cliquer sur "Start import"


Puis dans VScode dans le dossier du backend, dans le fichier server.js 

	- écrire >>> 

	let db;

	if (process.env.JAWSDB_URL) {
    		db = mysql.createConnection(process.env.JAWSDB_URL)
    		console.log("connexion mysql avec process.env.JAWSDB_URL");
	} else {
    		console.log("connexion avec mysql en local");
    		db = mysql.createConnection({
        		host: 'localhost',
        		user: 'root', // remplacez par votre utilisateur
        		password: '', // remplacez par votre mot de passe
        		database: 'zoo' // remplacez par le nom de votre base de données
        		// Paramètres de connexion MySQL
    		});
	}

Dans le terminal se positionner dans le dossier backend et lancer le serveur :

    - npm run server

Puis aller sur le lien de l'application déployée : https://arcadia-zoo-jose-aae84af1a94a.herokuapp.com/
Les infos avec la base de donnée fonctionnent maintenant correctement