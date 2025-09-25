# 🐳 Configuration Docker pour Directories

## ⚠️ État actuel

Docker est installé mais le daemon n'est pas en cours d'exécution. Voici comment procéder :

## 🔧 Étapes pour démarrer Docker

### 1. Démarrer Docker Desktop

```bash
# Sur macOS
open -a Docker

# Ou via Spotlight : Cmd+Space, tapez "Docker", appuyez sur Entrée
```

### 2. Vérifier que Docker fonctionne

```bash
docker --version
docker ps
```

### 3. Une fois Docker démarré, construire les images

```bash
./docker-scripts.sh build
```

## 🚀 Utilisation une fois Docker configuré

### Démarrage rapide

```bash
# 1. Construire les images
./docker-scripts.sh build

# 2. Démarrer l'application
./docker-scripts.sh up

# 3. Accéder à l'application
open http://localhost:3000
```

### Options avancées

```bash
# Démarrer tous les services (Cursor + Windsurf)
./docker-scripts.sh up-all

# Démarrer avec Nginx
./docker-scripts.sh up-nginx

# Voir les logs
./docker-scripts.sh logs

# Arrêter les services
./docker-scripts.sh down
```

## 📁 Fichiers Docker créés

- `Dockerfile` - Image pour l'application Cursor
- `Dockerfile.windsurf` - Image pour l'application Windsurf  
- `docker-compose.yml` - Orchestration des services
- `.dockerignore` - Fichiers à ignorer lors du build
- `nginx.conf` - Configuration du reverse proxy
- `docker-scripts.sh` - Scripts d'aide
- `README-Docker.md` - Documentation complète

## 🔐 Variables d'environnement

Créez un fichier `.env` avec vos vraies valeurs :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Redis
UPSTASH_REDIS_REST_URL=https://your-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-redis-token

# Autres services
RESEND_API_KEY=your-resend-key
LUMA_API_KEY=your-luma-key
```

## 🎯 Services disponibles

- **cursor-app** : Application Cursor (port 3000)
- **windsurf-app** : Application Windsurf (port 3001) 
- **redis** : Base de données Redis (port 6379)
- **nginx** : Reverse proxy (port 80)

## 🔄 Alternative : Mode développement local

Si Docker pose des problèmes, vous pouvez toujours utiliser le mode développement local :

```bash
# Installer les dépendances
bun install

# Démarrer en mode développement
cd apps/cursor && bun run dev
```

## 📞 Support

Si vous rencontrez des problèmes avec Docker :

1. Vérifiez que Docker Desktop est bien démarré
2. Redémarrez Docker Desktop si nécessaire
3. Utilisez le mode développement local en attendant
