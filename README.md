# CisLunar — Site statique en six pages

Site éducatif en français sur les communications Terre–Lune et le futur logiciel CisLunar, conçu par Zacharie Robitaille-Jean et Thierry Marcoux.

## Ouvrir le site

Extraire toute l’archive et ouvrir `index.html` dans un navigateur. Aucun outil de compilation, dépendance, compte ou connexion n’est requis pour le contenu local. Les références externes nécessitent une connexion. Garder les fichiers HTML au même niveau et le dossier `assets/` à côté.

## Organisation

- `index.html` : accueil court, objectif et trois portes d’entrée.
- `comprendre.html` : démonstration interactive et quatre explications à déplier.
- `lieux.html` : quatre exemples concrets et conséquences à ouvrir au choix.
- `solutions.html` : liaisons directes, relais démontrés (Queqiao / Chang’e 4), limites, programmes en développement et détails sur les limites à déplier.
- `telechargement.html` : futur téléchargement, état de disponibilité et documentation prévue.
- `equipe.html` : les deux développeurs et leur démarche. Aucune biographie, spécialité, photo ou coordonnée n’a été inventée.
- `styles.css`, `script.js` : styles partagés, menu mobile et schéma présent uniquement sur Solutions.
- `assets/favicon.svg`, `assets/moon.svg` : originaux conservés à l’identique.
- `assets/moon-realistic.png` : rendu artistique généré par IA, sans exactitude cartographique garantie.

## Périmètre

Le logiciel est à concevoir. Les fonctions décrites sont des objectifs, pas des fonctions vérifiées. Aucun exécutable n’est distribué ; le bouton de téléchargement reste désactivé. Le schéma de la page Comprendre utilise des positions fictives et ne calcule ni éphémérides, relief, bilan radio ou couverture opérationnelle. Aucune affiliation à la NASA.

Les programmes en développement sont séparés des systèmes déjà démontrés. Les sources NASA, ESA et CNSA sont liées près des explications ; consultation le 25 octobre 2026. Aucun calendrier de déploiement ou accès garanti à un réseau n’est annoncé.

## Publier le futur logiciel

Après validation d’une version, déposer l’archive dans `downloads/`, remplacer le bouton désactivé de `telechargement.html` par un vrai lien `download` et renseigner version, licence, systèmes pris en charge, prérequis, installation et limites connues. Mettre à jour les textes de disponibilité. Aucune date de sortie n’est annoncée.

## Accessibilité et vérification

Navigation commune avec `aria-current`, lien d’évitement, titres hiérarchisés, focus visible, menu mobile avec Échap et restauration du focus, questions natives, curseur étiqueté et réduction des animations. Sans JavaScript, navigation, contenu et questions restent accessibles. Tester les six pages sur mobile et ordinateur, zoom à 200 %, clavier, menu et curseur. Le script vérifie la présence du schéma avant de l’initialiser.

Le site ne contient ni suivi, cookies, formulaire, police distante ni dépendance externe. Aucun hébergement n’est créé par cette livraison.

## Retouches de présentation

Lune en arrière-plan décoratif avec voile de contraste et texte superposé ; suppression de l’ancienne note ; objectif compact. Les deux profils LinkedIn fournis sont liés depuis la page développeurs. Les descriptions restent limitées au rôle confirmé dans le projet, les profils n’ayant pas pu être lus.

Le schéma à curseur a été remplacé par deux situations explicites : trajet dégagé et relief bloquant. Les boutons mettent à jour la vue, son titre accessible et son explication. Sans JavaScript, le cas dégagé et une explication textuelle du cas masqué restent disponibles. Aucune géométrie réelle n’est calculée.

`assets/lunar-terrain.png` a été produit avec l’outil intégré de génération d’images. Consigne : panorama lunaire réaliste, sol gris avec régolithe et roches, ciel noir vide, horizon plat à gauche et chaîne montagneuse à droite, lumière solaire dure, sans texte, Terre, antenne ni étoiles. Ce terrain artistique sert de fond à des annotations SVG accessibles ; il ne s’agit pas d’une carte scientifique.

## Animation de l’accueil

La souris produit une parallaxe douce de la Lune et des étoiles, sans cercle ni effet autour du pointeur. Les couches décoratives ne capturent pas les clics. Le bouton Animation permet de désactiver l’effet. Les étoiles restent visibles au repos. Sur écran tactile ou avec réduction des mouvements, le décor reste fixe. Le rendu utilise une boucle limitée aux déplacements et au retour au repos ; elle s’arrête lorsque la page est cachée ou la fenêtre perd le focus. Aucun suivi du pointeur n’est enregistré ou transmis.

Chaque étoile dispose de sa propre profondeur, vitesse de retour et réaction à la proximité du pointeur : répulsion locale, léger agrandissement et éclat accru. Les étoiles éloignées ne subissent pas la répulsion ; au départ de la souris, chacune retrouve progressivement sa position.

## Parcours allégé

Accueil : présentation courte et trois chemins vers le contenu. Comprendre : démonstration interactive et explications repliables. Les lieux : quatre fiches et conséquences à ouvrir au choix. Solutions : moyens existants et réseaux en développement. Le logiciel : disponibilité et questions pratiques. Équipe : les deux développeurs et leurs liens LinkedIn.

Les étoiles ont des positions et propriétés aléatoires, indépendantes à chaque chargement. Elles se trouvent derrière la Lune, dont la silhouette opaque masque le fond étoilé, y compris lorsque les couches bougent séparément. Le fond de ciel est décoratif, sans carte céleste réelle.

Le schéma propose aussi « Rétablir le lien par satellite », désactivé tant que la Terre est visible. Après masquage, il ajoute un relais visible par l’antenne et la Terre ; revenir à Terre visible retire le satellite et désactive ce troisième choix. Les dimensions et trajectoires restent illustratives.

La section de repères est condensée en quatre phrases. Les titres Lieux et Solutions décrivent directement leur contenu. La page logiciel met CisLunar en avant, sans FAQ ; six flèches décoratives pointent vers le bouton et se courbent légèrement avec la souris. Leur mouvement est désactivé sur tactile et avec réduction des mouvements. Le téléchargement demeure désactivé tant qu’aucune version réelle n’est distribuée.

## Langues

Les six pages sont disponibles en français à la racine et en anglais dans `en/`. Le sélecteur FR / EN ouvre la même page dans l’autre langue ; les liens internes restent dans la langue choisie. Avec JavaScript, l’ancre courante est conservée. Les liens de langue et la traduction du contenu fonctionnent aussi sans JavaScript, sans stockage local ni connexion. Le même script traduit les messages interactifs selon l’attribut `lang` de la page ; les schémas, légendes SVG, descriptions accessibles et métadonnées sont également traduits. Styles, scripts et images sont partagés, sans copie des médias.

## Mise à jour du cadrage — 2 novembre 2026

Le nouveau brief recentre CisLunar sur la comparaison rapide de sites d’alunissage et de dates, en particulier au pôle Sud, pour croiser éclairement solaire et visibilité directe de la Terre. Publics visés : équipes scientifiques et techniques, enseignants, étudiants et grand public. Le cas d’usage clé est la réévaluation après changement de date ou de matériel.

Le contenu décrit des objectifs, pas un logiciel opérationnel. La page présente les pistes sites/coordonnées, dates/heures, positions Soleil/Terre, angle solaire, durée de lumière, fenêtres directes, temps avant coucher et vues temporelles. Horizons, jeux précalculés, LOLA, référentiels et libration sont des points techniques à évaluer, sans intégration annoncée. QuickMap est nommé LROC QuickMap, sans attribution erronée à un produit conçu directement par la NASA. Les liens vers les outils et leurs sources sont présents sur les pages.

Sources de contrôle : https://trek.nasa.gov/moon/jpl/config/textAbout.html ; https://ssd.jpl.nasa.gov/horizons/ ; https://quickmap.lroc.asu.edu/ ; https://pgda.gsfc.nasa.gov/products/90 ; https://science.nasa.gov/lunar-science/clps-deliveries/ ; https://science.nasa.gov/resource/shadows-near-the-moons-south-pole/ . Les anciennes descriptions d’outils comme difficiles à utiliser ne sont pas présentées comme des mesures objectives : l’amélioration visée relève de notre parcours de comparaison.
