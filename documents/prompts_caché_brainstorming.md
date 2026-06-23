**PROMPT 1**



Nous allons consolider mon Cahier des Charges (CDC) pour mon projet PAC//SHIFT (un Pac-Man moderne façon Rogue-lite). 



Pour que ce document soit impeccable et prêt pour un jury académique sérieux, je dois répondre de manière ultra-précise aux 5 questions stratégiques que tu m'as posées. 



Aide-moi à rédiger des réponses structurées, techniques et professionnelles pour chacune d'elles. Procédons question par question. Donne-moi tes propositions pour la Question 1, et attends ma validation/mes ajustements avant de passer à la suivante.



\---



\### Question 1 : Pourquoi un·e joueur·euse abandonnerait-il·elle un rogue-lite existant pour PAC//SHIFT ?

\-> Objectif pour toi (Copilot) : Rédige un paragraphe percutant sur la "Proposition de Valeur Unique" (USP). Mets en avant l'accessibilité immédiate de l'arcade combinée à la profondeur d'un rogue-lite, pour des sessions de jeu rapides (5-10 min) adaptées au jeu moderne.



\---



\### Question 2 : Quels sont au moins 3 jeux similaires à PAC//SHIFT (même partiellement) et en quoi fait-on vraiment mieux/différemment ?

\-> Objectif pour toi (Copilot) : Présente un tableau comparatif "Benchmark Concurrentiel". Utilise des références solides (ex: Crypt of the NecroDancer pour la grille/tension, Vampire Survivors pour la survie aux vagues, ou Pac-Man CE). Pour chaque jeu, liste 1 similarité et 1 différence technique ou de game design majeure qui fait la force de PAC//SHIFT.



\---



\### Question 3 : Quelle est la sensation clé (Game Feel) que l'on veut provoquer chez la personne qui joue pendant 30 secondes ?

\-> Objectif pour toi (Copilot) : Décris la boucle de gameplay (Core Loop) sous l'angle de l'expérience utilisateur (UX). Découpe ces 30 secondes de manière chronologique (ex: 20s de tension/calcul de trajectoire en mode "proie", 10s de puissance absolue après un "SHIFT" ou bonus en mode "prédateur"). Utilise des termes de Game Design (tension, release, feedback visuel).



\---



\### Question 4 : Si on doit supprimer 50% du projet demain, que garde-t-on absolument (Le MVP absolu) ?

\-> Objectif pour toi (Copilot) : Applique un filtre MoSCoW radical. Rédige la liste technique stricte du "Minimum Viable Product". Ce MVP doit se concentrer sur les piliers : 1 joueur sur une grille, 1 seul type d'ennemi fonctionnel, et la mécanique principale du "SHIFT". Tout le reste doit être explicitement classé en "Should/Could/Won't" pour prouver au jury qu'on sait gérer le scope.



\---



\### Question 5 : Comment va-t-on organiser le travail concrètement, semaine par semaine ?

\-> Objectif pour toi (Copilot) : Génère un planning de développement de type "Méthode Agile / Sprints". Structure-le sous forme de tableau par blocs de semaines (ex: Phase 1 Prototype moche/Greybox, Phase 2 Architecture/Data, Phase 3 Habillage/UI, Phase 4 Polish/Debug). Pour chaque phase, indique un "Livrable Concret et Testable".



\---



Commençons par la \*\*Question 1\*\*. Propose-moi une rédaction percutante et professionnelle pour mon document. J'attends ton retour.



**PROMPT 2**



L'agent/le jury pousse la réflexion plus loin avec 5 questions de crash-test. Nous devons y répondre avec un maximum de précision technique et de clarté en Game Design. 



Aide-moi à rédiger les réponses pour mon Cahier des Charges. Procédons à nouveau question par question en commençant par la Question 1. Attends ma validation avant de passer à la suite.



\---



\### Question 1 : Différence fondamentale de temps réel (vs Baba Is You)

\-> Objectif pour toi (Copilot) : Explique l'action précise. Dans Baba Is You, le gameplay est au tour par tour synchrone (le monde est figé tant que le joueur ne bouge pas). Dans PAC//SHIFT, le joueur doit exécuter son "SHIFT" (changement de règle ou modification du labyrinthe) sous la pression du temps réel continu. Les fantômes continuent de traquer Pac-Man pendant qu'il prend sa décision. Rédige une explication technique sur cette gestion de la tension et de la réactivité.



\---



\### Question 2 : Le concurrent le plus dangereux

\-> Objectif pour toi (Copilot) : Identifie le concurrent le plus menaçant (par exemple, "Pac-Man 256" ou "Crypt of the NecroDancer") en termes de positionnement. Explique pourquoi il est dangereux (ex: il possède déjà une boucle de scoring addictive sur grille) et formule notre stratégie de rechange/différenciation (notre système de build rogue-lite permanent et évolutif).



\---



\### Question 3 : Chronologie des 10 premières secondes (Le Onboarding)

\-> Objectif pour toi (Copilot) : Décris précisément, seconde par seconde, l'expérience de jeu initiale. 

\- Seconde 0-3 : Apparition sur la grille, identification visuelle immédiate du danger (le fantôme fonce sur le joueur).

\- Seconde 4-7 : Prise en main des contrôles directionnels basiques, le joueur réalise qu'il est coincé dans une impasse.

\- Seconde 8-10 : Le joueur panique, appuie sur la touche de "SHIFT", l'impasse s'ouvre (changement de structure) et il comprend instantanément la mécanique centrale du jeu.



\---



\### Question 4 : Outil de gestion de projet concret

\-> Objectif pour toi (Copilot) : Propose un choix d'outil simple, réaliste et adapté à un étudiant (comme un tableau Kanban sur Trello, Notion, ou directement GitHub Projects intégré au dépôt). Rédige une justification de ce choix (centralisation des tâches, suivi du MVP, gestion des bugs) qui prouve au jury que le projet est piloté rigoureusement.



\---



\### Question 5 : Le livrable "Crash Test" à J+7

\-> Objectif pour toi (Copilot) : Définis le scope exact d'une démo technique fonctionnelle dans 7 jours. Exclus tout ce qui est cosmétique. Établis la liste de ce qui doit tourner (ex: déplace d'un sprite sur une grille 2D avec détection des collisions des murs, une IA de fantôme qui se déplace de manière prévisible, et le script brut du "SHIFT" qui change un paramètre en base de données ou en local).



\---



Commençons par la \*\*Question 1\*\* : pose les bases de cette distinction technique et de gameplay avec Baba Is You. J'attends ta proposition.

