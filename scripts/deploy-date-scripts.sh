#!/bin/bash

# Script pour déployer les scripts de gestion des dates dans tous vos projets
# Usage: ./scripts/deploy-date-scripts.sh [chemin-vers-vos-projets]

PROJECTS_DIR="${1:-$HOME/Documents/GitHub}"

echo "🚀 Déploiement des scripts de gestion des dates..."
echo "Répertoire des projets: $PROJECTS_DIR"
echo "======================================="

# Vérifier que le répertoire existe
if [ ! -d "$PROJECTS_DIR" ]; then
    echo "❌ Erreur: Le répertoire $PROJECTS_DIR n'existe pas"
    exit 1
fi

# Compter les projets
PROJECT_COUNT=$(find "$PROJECTS_DIR" -maxdepth 2 -name ".git" -type d | wc -l)
echo "📁 Projets trouvés: $PROJECT_COUNT"
echo ""

# Fonction pour déployer dans un projet
deploy_to_project() {
    local project_path="$1"
    local project_name=$(basename "$project_path")
    
    echo "🔄 Déploiement dans: $project_name"
    
    # Vérifier que c'est un projet Git
    if [ ! -d "$project_path/.git" ]; then
        echo "   ⚠️  Pas un projet Git, ignoré"
        return
    fi
    
    # Déployer les scripts
    ./scripts/install-date-scripts.sh "$project_path"
    
    # Installer les hooks Git
    cd "$project_path"
    ./scripts/install-hooks.sh 2>/dev/null || echo "   ⚠️  Hooks Git non installés (pas de .git/hooks)"
    cd - > /dev/null
    
    echo "   ✅ Scripts déployés"
    echo ""
}

# Déployer dans tous les projets
echo "🔄 Déploiement en cours..."
echo ""

find "$PROJECTS_DIR" -maxdepth 2 -name ".git" -type d | while read git_dir; do
    project_path=$(dirname "$git_dir")
    deploy_to_project "$project_path"
done

echo "🎉 Déploiement terminé !"
echo ""
echo "📝 Résumé :"
echo "   - Scripts déployés dans tous vos projets Git"
echo "   - Hooks Git installés automatiquement"
echo "   - Prêt à utiliser dans tous vos projets"
echo ""
echo "💡 Utilisation dans vos projets :"
echo "   ./scripts/get-date.sh          # Vérifier la date actuelle"
echo "   ./scripts/update-dates.sh      # Mettre à jour toutes les dates"
echo "   ./scripts/install-hooks.sh     # Installer les hooks Git"
