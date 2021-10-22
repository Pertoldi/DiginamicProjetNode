# La petite niche 

Ce site est le site d'un refuge bénévole factice qui recueille et propose à l'adoption de nombreux animaux. 
19/10/2021 - 22/10/2021

## Description du projet
 Il s'agit d'un projet dans le cadre de la formation Diginimic.  
 Pour le cour : Back - Mise en place avec HTTP et Node.JS

## Technos utilisées
Entièrement générer et fait en Node.js.  
Il s'agit d'un app express.  
Les éléments de Front sont des snippets bootstrap ou des éléments faits à partir de bootstrap.  
Utilisation de EJS pour le templating.  
Utilisation de mongoose et de mongoDB.  

## Mise en place
- npm install
- npm start
- créer un compte
- Seul les admin peuvent ajouter modifier les animaux.
- Pour passer admin changer la ligne isAdmin de 'false' à 'true' dans l'item souhaité de la collection "users"
- Bien avoir le fichier .env avec: TOKEN_SECRET=fakeTokenSecretNotOnGitignoreByPurpose
- Une image de test est mise à disposition à la racine

## Fonctionnalitées
- Création/connection d'user
- session admin
- CRUD animal
- Il n'est pas encore possible pour les simples visiteurs de proposer l'adoption 