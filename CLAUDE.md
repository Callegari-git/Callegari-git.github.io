# Portfolio — AI Engineer (SF Bay Area)

## Objectif
Portfolio personnel professionnel pour décrocher un poste d'AI engineer dans la Bay Area.
Lecteur cible : recruteur ou ingénieur qui passe **moins de 60 secondes** sur le site.
Priorité absolue : **clarté et crédibilité d'abord, effet "wow" ensuite.**

## Stack (ne pas en changer sans me demander)
- Astro 6 + TypeScript
- Tailwind CSS (ou CSS simple, pas de librairie de composants UI)
- Content Collections en Markdown pour les projets et l'expérience
- Svelte uniquement pour les îles interactives (animation IA, chatbot)
- GSAP uniquement dans l'île d'animation
- Adaptateur Cloudflare (ou Vercel) ; toutes les pages en `prerender = true`, seule `/api/chat` en `prerender = false`
- Ne pas ajouter de dépendance sans justification écrite dans la PR / le message

## Références de design — ce qu'on prend, ce qu'on laisse
On s'inspire des **principes** de ces sites. Ne jamais copier leur code, leurs textes, leurs images ou leur identité visuelle exacte.

### 1. ashwingupta.dev → base du site (structure + ton)
À reprendre :
- Mise en page éditoriale type "revue technique" : fond clair chaud, grands titres serif, corps sans-serif, petites étiquettes en monospace capitales (ROLE, COMPANY, ABOUT…)
- En-tête : nom en grand + rôle + entreprise actuelle, liens email / GitHub / LinkedIn et bouton **Download CV** visibles sans scroller
- Une phrase d'accroche qui affirme un point de vue technique
- Sections "expertise" en 2–3 blocs courts (titre serif + paragraphe)
- **Résultats chiffrés** dans chaque projet (latence, coût, gain, échelle)
- Un bloc "What I don't do" / principes de travail
À ne PAS reprendre :
- Paragraphes justifiés (espacements irréguliers) → texte aligné à gauche
- Longs paragraphes biographiques → max 3–4 lignes par paragraphe

### 2. elliott.mangham.dev → compacité + crédentials
À reprendre :
- Tout l'essentiel compréhensible en un écran
- Panneau **Credentials** repliable (`<details>`, zéro JS) : diplômes, certifications, prix, publications, chiffres clés
- Rangée de projets en aperçu (cartes horizontales) qui mène aux études de cas
- Bloc CONNECT clair en fin de page + CTA "Book a call" / email
À ne PAS reprendre :
- Thème sombre complet (on reste sur la base claire d'Ashwin ; un mode sombre est optionnel)
- Mentions de tarifs / budgets de projets (je ne suis pas une agence)

### 3. justus-john.com → UNE animation signature IA
À reprendre :
- Une seule section animée au scroll qui visualise le fonctionnement d'un LLM : phrase → tokens (avec IDs) → embeddings → self-attention couche par couche → token suivant
- Style minimal, beaucoup d'espace blanc, cohérent avec la typo du site
À ne PAS reprendre :
- Narration "agence / vente de services" et maquettes de sites clients
- Mascotte, multiples sections scroll-jacking : **une seule** section animée, le reste du site défile normalement

### Interdits globaux (vus sur d'autres sites Awwwards)
- Pas d'écran d'entrée "Click to enter", pas de loader, pas de hero WebGL plein écran
- Pas de scroll-jacking hors de la section animation
- Pas de curseur custom, pas de son
- Le contenu ne doit jamais attendre une animation pour être lisible

## Design system
- Couleurs : fond crème clair (~#F3F0E8), texte encre (~#1E2430), gris secondaire, **un seul** accent (bleu profond ou orange brûlé — me proposer 2 options)
- Typo : serif display pour les titres (ex. Fraunces ou Playfair Display), sans-serif pour le texte (ex. Inter ou DM Sans), mono pour les étiquettes (ex. JetBrains Mono). Charger via l'API Fonts d'Astro.
- Grille : colonne de contenu max ~720px pour le texte, ~1100px pour les grilles de projets
- Mouvement : transitions discrètes (opacity/translate ≤ 300ms) ; respecter `prefers-reduced-motion` partout

## Structure du site
- `/` : hero (nom, rôle, accroche, liens, CV) → expertise (3 blocs) → projets phares (3) → animation LLM → expérience (timeline courte) → credentials (`<details>`) → principes → contact
- `/projects/[slug]` : étude de cas = problème → approche → architecture (schéma) → résultats chiffrés → stack → liens (repo, démo, papier)
- `/cv.pdf` dans `public/`
- Contenu dans `src/content/projects/*.md` et `src/content/experience/*.md` avec schéma Zod (title, date, role, stack[], metrics[], links, featured)

## Chatbot (phase 2, pas avant que le site soit fini)
- Route `src/pages/api/chat.ts` (`prerender = false`), réponse en streaming
- Clé API uniquement en variable d'environnement côté serveur
- Contexte : prompt système construit à partir des Content Collections + CV (pas de RAG au départ)
- Ne répond qu'aux questions sur moi et mon travail ; sinon renvoie vers l'email
- Garde-fous : limite par IP, longueur max des messages, max tokens par réponse
- UI : bouton discret en bas à droite, fermé par défaut — le site doit être 100 % utilisable sans

## Critères de qualité (vérifier avant de dire "fini")
- Lighthouse ≥ 95 en Performance, Accessibilité, Best Practices, SEO
- JS envoyé sur `/` hors île d'animation : quasi nul
- Responsive testé à 375px, 768px, 1280px
- Navigation clavier complète, contrastes AA, `alt` sur toutes les images
- Ajouter un projet = créer un fichier Markdown, rien d'autre

## Méthode de travail
- Avancer **par phase**, et s'arrêter à la fin de chacune pour que je valide :
  1. Squelette Astro + design system (couleurs, typo, layout) + page d'accueil avec contenu factice
  2. Content Collections + pages projets
  3. Panneau credentials + timeline + contact
  4. Animation LLM
  5. Chatbot
- Avant chaque phase : expliquer le plan en quelques lignes, puis coder
- En cas de doute entre "plus beau" et "plus clair" : choisir **plus clair**
