## HOOK D'EFFET UseState:
une fonct.° qui nous permet d'avoir un ÉTAT LOCAL dans un composant de type fonction sans avoir à écrire les clases.

on déclare une NOUVELLE VARIABLE D'ETAT en appellant useState,
on l'initialisa à 0 comme seul argument à UseState :

  const [count, setCount] = useState(0);

Nb: on créer deux nouvelles variables, la paire de crochet permet 
Cette syntaxe JS ci-dessus correspond à la DESTRUCTURATION POSITIONELLE

## Les PropType:
Cela permet de s'assurer que les données s'écoulent de composants en composants sans erreur.