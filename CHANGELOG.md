# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

## [1.0.0] - 2024-12-25

### 🎉 Version Initiale - "Bon Début"

Cette première version établit les fondations du projet Directories avec un mode offline fonctionnel.

#### ✅ Ajouté
- **Mode offline complet** : L'application fonctionne sans services externes
- **Données statiques** : Règles, emplois et MCPs de démonstration
- **Interface utilisateur** : Toutes les pages principales accessibles
- **Configuration Docker** : Dockerfile et docker-compose.yml complets
- **Scripts d'aide** : Scripts pour Docker et tests
- **Mocks complets** : Supabase, Redis, Luma, Loops, Resend
- **Documentation** : README, guides Docker, solution simple

#### 🔧 Modifié
- **Configuration développement** : Mode offline forcé
- **Services externes** : Tous mockés pour le développement
- **Pages principales** : Utilisation de données statiques
- **Variables d'environnement** : Configuration pour mode offline

#### 🐛 Problèmes Connus
- **Erreurs de fetch** : `TypeError: fetch failed` vers `placeholder.upstash.io`
- **Connexion base de données** : Non configurée (mode offline forcé)
- **Services externes** : Tous mockés (pas de vraies connexions)

#### 📁 Fichiers Ajoutés
- `Dockerfile` - Image Docker pour l'application
- `Dockerfile.windsurf` - Image Docker pour Windsurf
- `Dockerfile.dev` - Image Docker pour le développement
- `docker-compose.yml` - Orchestration des services
- `docker-compose.dev.yml` - Configuration de développement
- `.dockerignore` - Optimisation du build Docker
- `nginx.conf` - Configuration reverse proxy
- `docker-scripts.sh` - Scripts d'aide Docker
- `test-docker.js` - Tests de configuration Docker
- `README-Docker.md` - Documentation Docker complète
- `DOCKER-SETUP.md` - Guide de configuration Docker
- `SOLUTION-SIMPLE.md` - Solution alternative simple
- `CHANGELOG.md` - Ce fichier

#### 📁 Fichiers Modifiés
- `README.md` - Documentation mise à jour avec statut v1.0
- `apps/cursor/src/lib/config.ts` - Configuration offline
- `apps/cursor/src/data/static-data.ts` - Données statiques
- `apps/cursor/src/data/queries.ts` - Mode offline forcé
- `apps/cursor/src/components/offline-banner.tsx` - Banner offline
- `apps/cursor/src/app/page.tsx` - Page d'accueil avec données statiques
- `apps/cursor/src/app/mcp/page.tsx` - Page MCP avec données statiques
- `apps/cursor/src/app/jobs/page.tsx` - Page emplois avec données statiques
- `apps/cursor/src/utils/supabase/*.ts` - Mocks Supabase
- `apps/cursor/src/lib/kv.ts` - Mock Redis
- `apps/cursor/src/lib/luma.ts` - Mock Luma
- `apps/cursor/src/actions/subscribe-action.ts` - Mock Loops
- `packages/data/src/rules/index.ts` - Import des nouvelles règles
- `packages/data/src/rules/cairo.ts` - Règles Cairo
- `packages/data/src/rules/symfony.ts` - Règles Symfony

#### 🎯 Prochaines Versions
- **v1.1** : Configuration base de données réelle
- **v1.2** : Authentification utilisateur
- **v1.3** : Services externes fonctionnels
- **v2.0** : Version production complète

---

**Note** : Cette version est un "bon début" qui établit les fondations. Les prochaines versions se concentreront sur la connectivité réelle aux services externes et l'authentification.
