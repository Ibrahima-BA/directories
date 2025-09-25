#!/bin/bash

# Scripts Docker pour le projet Directories

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🐳 Scripts Docker pour Directories${NC}"

# Fonction pour afficher l'aide
show_help() {
    echo -e "${YELLOW}Usage: $0 [COMMAND]${NC}"
    echo ""
    echo "Commands:"
    echo "  build          Construire les images Docker"
    echo "  up             Démarrer les services (Cursor uniquement)"
    echo "  up-all         Démarrer tous les services (Cursor + Windsurf + Redis)"
    echo "  up-nginx       Démarrer avec Nginx reverse proxy"
    echo "  down           Arrêter tous les services"
    echo "  logs           Afficher les logs"
    echo "  clean          Nettoyer les images et volumes"
    echo "  dev            Mode développement avec hot reload"
    echo "  test           Tester l'application"
    echo "  help           Afficher cette aide"
}

# Fonction pour construire les images
build_images() {
    echo -e "${GREEN}🔨 Construction des images Docker...${NC}"
    docker-compose build
    echo -e "${GREEN}✅ Images construites avec succès${NC}"
}

# Fonction pour démarrer les services
start_services() {
    echo -e "${GREEN}🚀 Démarrage des services...${NC}"
    docker-compose up -d cursor-app redis
    echo -e "${GREEN}✅ Services démarrés${NC}"
    echo -e "${BLUE}🌐 Application accessible sur: http://localhost:3000${NC}"
}

# Fonction pour démarrer tous les services
start_all_services() {
    echo -e "${GREEN}🚀 Démarrage de tous les services...${NC}"
    docker-compose --profile windsurf up -d
    echo -e "${GREEN}✅ Tous les services démarrés${NC}"
    echo -e "${BLUE}🌐 Cursor: http://localhost:3000${NC}"
    echo -e "${BLUE}🌐 Windsurf: http://localhost:3001${NC}"
}

# Fonction pour démarrer avec Nginx
start_with_nginx() {
    echo -e "${GREEN}🚀 Démarrage avec Nginx...${NC}"
    docker-compose --profile nginx up -d
    echo -e "${GREEN}✅ Services avec Nginx démarrés${NC}"
    echo -e "${BLUE}🌐 Application accessible sur: http://localhost${NC}"
}

# Fonction pour arrêter les services
stop_services() {
    echo -e "${YELLOW}🛑 Arrêt des services...${NC}"
    docker-compose down
    echo -e "${GREEN}✅ Services arrêtés${NC}"
}

# Fonction pour afficher les logs
show_logs() {
    echo -e "${BLUE}📋 Logs des services:${NC}"
    docker-compose logs -f
}

# Fonction pour nettoyer
clean_docker() {
    echo -e "${YELLOW}🧹 Nettoyage des images et volumes...${NC}"
    docker-compose down -v --rmi all
    docker system prune -f
    echo -e "${GREEN}✅ Nettoyage terminé${NC}"
}

# Fonction pour le mode développement
dev_mode() {
    echo -e "${GREEN}🔧 Mode développement avec hot reload...${NC}"
    echo -e "${YELLOW}⚠️  Assurez-vous d'avoir installé bun localement${NC}"
    cd apps/cursor && bun run dev
}

# Fonction pour tester l'application
test_app() {
    echo -e "${GREEN}🧪 Test de l'application...${NC}"
    sleep 10
    curl -f http://localhost:3000 > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Application accessible${NC}"
    else
        echo -e "${RED}❌ Application non accessible${NC}"
    fi
}

# Gestion des arguments
case "$1" in
    build)
        build_images
        ;;
    up)
        start_services
        ;;
    up-all)
        start_all_services
        ;;
    up-nginx)
        start_with_nginx
        ;;
    down)
        stop_services
        ;;
    logs)
        show_logs
        ;;
    clean)
        clean_docker
        ;;
    dev)
        dev_mode
        ;;
    test)
        test_app
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo -e "${RED}❌ Commande inconnue: $1${NC}"
        show_help
        exit 1
        ;;
esac
