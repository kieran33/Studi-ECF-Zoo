# studi-ecf-zoo

Lien vers logiciel de gestion de projet Trello : https://trello.com/b/VNy4du8F/projet-ecf-zoo-kanban

Lien vers l'application déployée : https://arcadia-zoo-jose-aae84af1a94a.herokuapp.com/

Démarche à suivre pour déployer l'application en local avec Heroku :


Prérequis : 


- Télécharger un IDE (VScode par exemple) 

- Télécharger MySQL WorkBench 

- Avoir un compte Heroku 

- Avoir installé Git sur son pc 

- Avoir installé NodeJS sur son pc 


Lien git hub : https://github.com/kieran33/studi-ecf-zoo 

Télécharger le fichier .zip sur git hub puis l'extraire sur le bureau par exemple 


Faire glisser le dossier extrait sur VScode, dans le terminal et se positionner dans le dossier frontend et faire : 


- npm install react-scripts --save	 

- npm install heroku cli (si pas dispo sur le pc) 

- node –v (pour vérifier que node est bien installé sur le pc)	 

- heroku –v (pour vérifier que heroku est bien installé sur le pc) 

- heroku login 


Puis initialiser un repo git, toujours dans le terminal de VScode : 


- git init 

- git add . (cela peut prendre quelques minutes) 

- git commit -m "first commit" 


Puis réutiliser Heroku :  

- heroku create "choisir le nom de l'appli" 


Ensuite aller sur le site Heroku pour installer et déployer la base de données MySQL via leur dashboard : 


Une fois connecté on est à l'accueil, toutes les applis que l'on a créées seront affichés ici, cliquer sur l'appli précédemment créer ou sur celle qui nous intéresse 


- puis sur "Ressources" 

- dans l'onglet de recherche "Add-ons" écrire "jawsdb" puis le sélectionner (c'est le logo bleu) 

- choisir la formule qu'on souhaite (ici "free")  

- puis cliquer sur "Submit Order Form" 

- ensuite "JawsDB" est choisi il devrait apparaître en dessous de l'onglet de recherche, cliquer dessus 

- sur ce nouvel onglet de "JawsDB" plusieurs infos sont à copier/coller : 

- le lien en dessous 'Connection String', copiez-le 

- puis dans VScode dans le fichier .env du projet (dans le dossier backend) 

- écrire => JAWSDB_URL =  “Lien connection string précédemment copier” 

- ensuite ouvrir WorkBench MySQL : 

- cliquer sur le petit "+" à côté de "MySQL Connections" 

- choisissez un nom pour cette nouvelle connexion 

- sur le lien jawsdb copier la valeur de Host puis coller le dans Hostname sur workbench 

 - sur le lien jawsdb copier la valeur de username puis coller le dans Username sur workbench 

 - sur le lien jawsdb copier la valeur de password puis coller le dans Password "Store in Vault...." sur workbench 

 - sur le lien jawsdb copier la valeur de database puis coller le dans Default Schema sur workbench 

- vérifier que les ports sur MySQL WorkBench et sur le lien jawsdb sont bien les mêmes  

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


Ensuite faire : 


- git add . 

- git commit -m "configuration déploiement projet avec heroku et JAWSDB" 

 - git push heroku master 

 - git heroku open 


 Se positionner dans le dossier Backend : 

    npm run server 


Et voilà l'application est désormais déployée en local. 