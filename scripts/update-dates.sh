#!/bin/bash

# Script pour mettre à jour automatiquement les dates dans tous les fichiers Markdown
# Usage: ./scripts/update-dates.sh

echo "📅 Mise à jour automatique des dates..."
echo "======================================="

# Obtenir la date actuelle
CURRENT_DATE=$(date '+%d %B %Y')
ISO_DATE=$(date '+%Y-%m-%d')

echo "Date actuelle: $CURRENT_DATE"
echo "Date ISO: $ISO_DATE"
echo ""

# Fonction pour mettre à jour un fichier
update_file() {
    local file="$1"
    local pattern="$2"
    local replacement="$3"
    
    if [ -f "$file" ]; then
        echo "Mise à jour de $file..."
        sed -i.bak "s/$pattern/$replacement/g" "$file"
        rm -f "$file.bak"
    else
        echo "Fichier $file non trouvé"
    fi
}

# Mettre à jour les fichiers Markdown
echo "🔄 Mise à jour des fichiers..."

# PROJECT-WIKI.md
update_file "PROJECT-WIKI.md" "Dernière mise à jour.*" "**Dernière mise à jour** : $CURRENT_DATE"

# CHANGELOG.md - toutes les versions
update_file "CHANGELOG.md" "## \[.*\] - [0-9]{4}-[0-9]{2}-[0-9]{2}" "## [1.1.1] - $ISO_DATE"

# GIT-COMMANDS.md
update_file "GIT-COMMANDS.md" "Dernière mise à jour.*" "**Dernière mise à jour** : $CURRENT_DATE"

echo ""
echo "✅ Mise à jour terminée !"
echo "📝 Vérifiez les fichiers avant de commiter"
