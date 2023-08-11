# projet-o-gaming-back
# O'Gaming
"O'Gaming" : une application Web a destination des éditeurs/développeurs de jeux vidéo et des joueurs.

L’idée de base d' "O'gaming", et donc son MVP (Minimum Viable Product), serait de créer une plateforme de feedback pour les jeux vidéo :

    les éditeurs/développeurs ajouterons leurs jeux et
    les joueurs pourront alors :
        signaler des bugs et
        réaliser des suggestions.

L'objectif principal étant de simplifier la vie aux développeurs qui aujourd’hui peuvent parfois utiliser des solutions pas du tout adaptées.
Par exemple pour VALORANT, développé par Riot Games, ils utilisent une page Reddit :
https://reddit.com/r/VALORANT/comments/14z8lsd/valorant_701_bug_megathread/
C'est absolument pas adapté et doit être une horreur a gérer je pense.
Description

Les éditeurs/développeurs créeront la fiche de leur jeu en indiquant ce qu'il contient. Il y aura des champs pour ajouter :

    les interfaces utilisateurs présentes (menus, etc.),
    les personnages,
    les cartes,
    les armes,
    les sorts,
    les utilitaires,
    les cosmétiques,
    etc.

Les joueurs inscrits auront alors une interface similaire aux issues/pull requests de GitHub sur laquelle :

    ils commenceront par choisir le type de retour
        signalement de bug ou
        suggestion
        dans le cadre d'un signalement de bug
            description générale
            ou est le bug ? (plusieurs choix possibles)
                dans une interface utilisateur
                en jeu
                ...
            le bug intervient t-il en ligne et/ou en local ? (plusieurs choix possibles)
                en ligne
                en local
            le bug concerne quoi ? (plusieurs choix possibles)
                personnage,
                carte,
                arme,
                sort,
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
            capture d’écran (optionnelle / obligatoire ?)
            vidéo (optionnelle / obligatoire ?)
            tags
        dans le cadre d'une suggestion
            quelle type de suggestion ?
                modification de quelque chose qui existe déjà dans le jeu ou
                ajout de quelque chose de totalement nouveau
            concernant quoi ?
                personnage,
                carte,
                arme,
                sort,
                ...
            description
            image (optionnelle)
            vidéo (optionnelle)
            tags

Les développeurs pourront choisir quelles options proposer. Par exemple pour un jeu qui se joue uniquement en ligne l'option "le bug intervient t-il en ligne et/ou en local ?" n'est pas utile et pourra être désactivée.

Pour chaque retour les développeurs pourront :

    le marquer en tant que
        "lu",
        "accepté",
        "doublon"
            un message l'indiquera sur la page et renverra vers le feedback qui existait déjà
        "working on it"
        "refusé"
        "terminé"
        ...
    classifier le retour selon son importance avec une échelle,
    ajouter des tags,
    assigner des personnes a ce feedback

Les retours pourront être configurés pour être Publiques ou Invisibles aux public. Les étiquettes "accepté", "refusé", etc. et l’importance également.
C'est important afin d’éviter que le public ne sache que par exemple un bug existe et serait "Très important" ; des personnes malintentionnées pourraient l’exploiter.

Si le temps nous le permet on peut aussi imaginer mettre en place un système de sondages qui pourront être créés par les éditeurs/développeurs et/ou par les joueurs selon la configuration optée par les éditeurs/développeurs.

Si ce MVP est réalisé rapidement on pourrait imaginer ajouter d'autres fonctionnalités pour faire d' "O'Gaming" un vrai mini réseau-social pour les jeux vidéo. N'hésitez-pas a ajouter un commentaire pour proposer une fonctionnalité.
Opportunités

    Gestion de projet
    Maquetter une application,
    Réaliser une interface utilisateur web dynamique et adaptable,
    Créer une base de données interne,
    Utiliser des APIs externes (pour récupérer les affiches des jeux, etc.)
    Créer une API interne,
    Mise en place d'une solution d'inscription et de connexion sécurisée,
    Gestion de rôles dans la BdD

Quelles seront/pourraient être les technologies utilisées ?

Les technologies qui pourraient être utilisées d'après moi sont :

Back :

    NodeJS,
    ExpressJS,
    PostgreSQL + SQL,
    Tests unitaires avec Jest,
    Migrations avec Sqitch,
    Validation de données avec Joi,
    Documentation d'API avec Swagger,
    Journalisation avec Winston

Front :

    React,
    Tailwind,
    DaisyUi,
    ???
    (Désolé mais je ne suis pas en spé React. Si vous êtes intéressé par le projet n'hésitez-pas a ajouter un commentaire pour proposer une technologie)

Avez-vous une idée de l'équipe qui conviendrait à ce projet ?

Je ne sais

pas. Peut-être :

    3 back et 2 front ? ou
    2 back, 1 full stack et 2 front ?

