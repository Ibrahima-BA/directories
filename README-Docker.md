# 🐳 Docker Setup pour Directories

Ce guide vous explique comment utiliser Docker pour lancer l'application Directories.

## 📋 Prérequis

- Docker installé sur votre système
- Docker Compose installé
- Au moins 4GB de RAM disponible

## 🚀 Démarrage rapide

### 1. Construction des images

```bash
./docker-scripts.sh build
```

### 2. Démarrage de l'application Cursor

```bash
./docker-scripts.sh up
```

L'application sera accessible sur : **http://localhost:3000**

## 🔧 Options avancées

### Démarrer tous les services (Cursor + Windsurf + Redis)

```bash
./docker-scripts.sh up-all
```

- **Cursor** : http://localhost:3000
- **Windsurf** : http://localhost:3001

### Démarrer avec Nginx reverse proxy

```bash
./docker-scripts.sh up-nginx
```

- **Application** : http://localhost

### Mode développement avec hot reload

```bash
./docker-scripts.sh dev
```

## 📊 Gestion des services

### Voir les logs

```bash
./docker-scripts.sh logs
```

### Arrêter les services

```bash
./docker-scripts.sh down
```

### Tester l'application

```bash
./docker-scripts.sh test
```

### Nettoyer Docker

```bash
./docker-scripts.sh clean
```

## 🏗️ Architecture Docker

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Nginx Proxy   │    │   Cursor App     │    │  Windsurf App   │
│   (Port 80)     │◄───┤   (Port 3000)    │    │   (Port 3001)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                       ┌─────────────────┐
                       │     Redis       │
                       │   (Port 6379)   │
                       └─────────────────┘
```

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

## 🐛 Dépannage

### Problème de ports

Si les ports 3000, 3001, ou 80 sont déjà utilisés :

```bash
# Modifier les ports dans docker-compose.yml
ports:
  - "3002:3000"  # Changer 3000 vers 3002
```

### Problème de mémoire

```bash
# Augmenter la limite de mémoire Docker
docker-compose up --scale cursor-app=1
```

### Logs détaillés

```bash
# Voir les logs d'un service spécifique
docker-compose logs -f cursor-app
```

## 📝 Commandes Docker utiles

```bash
# Voir les conteneurs en cours
docker ps

# Entrer dans un conteneur
docker exec -it directories-cursor-app-1 sh

# Reconstruire une image spécifique
docker-compose build cursor-app

# Redémarrer un service
docker-compose restart cursor-app
```

## 🎯 Profils disponibles

- **Par défaut** : Cursor + Redis
- **windsurf** : + Windsurf
- **nginx** : + Nginx reverse proxy

```bash
# Utiliser un profil spécifique
docker-compose --profile windsurf up -d
```

## 🔄 Mise à jour

```bash
# Mettre à jour les images
docker-compose pull
docker-compose up -d
```

## 📈 Monitoring

```bash
# Voir l'utilisation des ressources
docker stats

# Voir les volumes
docker volume ls
```
