# TOP File Uploader Project

## Using :
(mainly)
- HTML/CSS/JS
- Typescript
- Passport
- Prisma ORM
- Tailwind
- Express
- PostgresSQL
- Pug

## Goal :
Creating a simple and clean multi-page app where users can authenticate, upload and manage files in a folder-based system.

This project serves as a full-stack app to train all of what we learnt so far in the NodeJS part of the course; at this point I added Tailwind, Typescript and Prisma ORM to the stack, so I'll practice that, and Passport which I've not yet put my head all around.

I'll try to make that app efficiently and cleanly, separating the front from the back, commiting regularly, and defining my tasks to know where I start and when I finish in my code sessions.

## Design

No design yet.

## About the workflow

La règle d'or est toujours la même :  
**BUILD ONE THING AT A TIME**

L'entité que tu construis doit se suffir à elle-même, *marcher* par elle-même. On doit voir un élement qu'on sait stable, fini, et composable à d'autres. On doit voir les cables et les prises clairement.

J'ai l'impression que commencer par le front est plus logique, une fois qu'on a dégagé les routes dont on allait avoir besoin. Ça semble plus logique pour visualiser notre application, et qu'on a pas assez l'habitude d'avoir la vue globale et de tout abstraire.

Mais je veux quand même tenter avec le back-end d'abord. Je pense que dans le processus, il est important de **définir les services qu'on veut proposer**, de mettre à plat la logique complète de l'application devant soit. C'est un peut créer l'architecture avant la maquette, donc c'est un peu bizarre.

En gros, là je vais devoir faire quoi ?
- Implémenter l'authentification
- Implémenter ma gestion d'erreur
- Implémenter mes validations serveur
- Implémenter mes service, et leurs équivalents CRUD.

Mais je n'ai pas le flow de l'app en tête, donc je n'arrive pas à mettre les blocs bien en place dans ma tête, dans l'ordre

### Que sont les services ?
On doit :
- Pouvoir CRUD des fichiers,

- Pouvoir CRUD des dossiers,
- Pouvoir CRUD des utilisateurs,