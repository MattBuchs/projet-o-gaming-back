
## Équipes
- Yoann : aime : dev front - react - intégration / aime pas : bdd
- Matt : dev back - Express - Postgres
- Raphaël burnier : dev front -react - (node.js)  -intégration aime pas les token
- Zachary Blundell:  aime: dev back - express -  des routes  - Jest 
- Anais : 

## Les élément principaux du projet o’Gaming
- Plateforme de feedback pour les jeux vidéo
- 2 Cibles : les développeurs, les joueurs
- Besoin : avoir une plateforme qui centralise les retours utilisateurs
- Objectif développeur : l'objectif principal étant de simplifier la vie aux développeurs pour avoir de la visibilité sur les bugs et les suggestions des joueurs.
- objectif joueur :  l'objectif principal étant de donner des suggestion ou des retours a des bug 


## Fonctionnalités 
#### Devs :
- Créer une section pour un jeu avec des infos de base (description, images, créateurs, logo…)
- Ajouter des tags pour trouver leurs jeux (fps, mmo…)
- Optionnellement, ils peuvent créer des informations supplémentaires pour les joueurs et ainsi mieux catégoriser les bugs (interfaces, personnages, cartes…)
- Les dev peuvent activer ou désactiver certaines options du formulaire de déclaration d’un bug si nécessaire (ex: le bug se produit online/offline)
- Pour chaque retour les dév pourront lui donner un statut (lu, accepté, doublon avec lien, working on it, refusé, terminé)
- Pour chaque retour ils pourront le classifier selon son importance
- Assigner un bug à une personne
- Les retours pourront être configurés pour être Publiques ou Invisibles aux public afin d’éviter de rendre public un bug majeur
- Joueurs :
- S'identifier sur la plateforme pour participer
- Choisir un jeu parmi les jeux disponibles (spa)
- Le joueur choisit s’il s’agit d’un bug ou d’une suggestion
- les utilisateurs peuvent mettre des filtres pour être le trier et être le plus précis possible
- les joueur peuvent mettre des issue avec un modèle prédéfinie ou il peuvent mettre (text, image, video) avec des tags
```
L’utilisateur clique sur un bouton “signaler un bug” qui l’envoie vers un questionnaire avec les questions guidées suggérées par florent:
    	dans le questionnaire d'un signalement de bug
        	description générale
        	ou est le bug ? (plusieurs choix possibles)
            	dans une interface utilisateur
            	en jeu
            	autre ...
        	le bug intervient t-il en ligne et/ou en local ? (plusieurs choix possibles)
            	en ligne
            	en local
        	le bug concerne quoi ? (plusieurs choix possibles)
            	personnage,
            	carte,
            	arme,
            	sort,
		autre
            	...
                	par exemple si le bug concerne un personnage sur toutes les cartes :
                    	l'utilisateur cochera le personnage et
                    	cochera ensuite toutes les cartes
        	le bug intervient quand ?
            	tout le temps
            	parfois
            	...
        	le bug arrive comment ?
            	description de comment reproduire le bug
```
## Idées / bonus / évolutions
- Un dev peut ajouter un commentaire sur un bug
- les joueurs peuvent liker un bug ou une suggestion pour lui donner de l’importance

## Questions / Interrogations :
- Comment différencier les joueurs des devs lors de l’inscription ? 
- Un compte dev par organisation ? 
- Comment assigner à une personne un bug ? ( via un compte utilisateur, un champ texte libre, un envoi par mail ?)
