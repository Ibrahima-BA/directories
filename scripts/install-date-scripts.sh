#!/bin/bash

# Script pour installer les scripts de gestion des dates dans n'importe quel projet
# Usage: ./scripts/install-date-scripts.sh [chemin-du-projet]

PROJECT_PATH="${1:-.}"

echo "📅 Installation des scripts de gestion des dates..."
echo "Projet cible: $PROJECT_PATH"
echo "======================================="

# Vérifier que le chemin existe
if [ ! -d "$PROJECT_PATH" ]; then
    echo "❌ Erreur: Le chemin $PROJECT_PATH n'existe pas"
    exit 1
fi

# Créer le dossier scripts dans le projet
mkdir -p "$PROJECT_PATH/scripts"

# Copier get-date.sh
cat > "$PROJECT_PATH/scripts/get-date.sh" << 'EOF'
#!/bin/bash

# Script pour obtenir la date actuelle dans différents formats
# Usage: ./scripts/get-date.sh

echo "📅 Date actuelle du système :"
echo "================================"

# Date complète
echo "Date complète: $(date)"
echo ""

# Format ISO (YYYY-MM-DD)
echo "Format ISO: $(date +%Y-%m-%d)"
echo ""

# Format français
echo "Format français: $(date '+%d %B %Y')"
echo ""

# Format pour Git
echo "Format Git: $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

# Timestamp Unix
echo "Timestamp Unix: $(date +%s)"
echo ""

# Date pour documentation
echo "Pour documentation: $(date '+%d %B %Y')"
EOF

# Copier update-dates.sh
cat > "$PROJECT_PATH/scripts/update-dates.sh" << 'EOF'
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

# README.md
update_file "README.md" "Dernière mise à jour.*" "**Dernière mise à jour** : $CURRENT_DATE"

# CHANGELOG.md - toutes les versions
update_file "CHANGELOG.md" "## \[.*\] - [0-9]{4}-[0-9]{2}-[0-9]{2}" "## [1.0.0] - $ISO_DATE"

# Documentation
for file in *.md; do
    if [ -f "$file" ]; then
        update_file "$file" "Dernière mise à jour.*" "**Dernière mise à jour** : $CURRENT_DATE"
    fi
done

echo ""
echo "✅ Mise à jour terminée !"
echo "📝 Vérifiez les fichiers avant de commiter"
EOF

# Copier pre-commit-hook.sh
cat > "$PROJECT_PATH/scripts/pre-commit-hook.sh" << 'EOF'
#!/bin/bash

# Git pre-commit hook pour vérifier les dates
# Usage: cp scripts/pre-commit-hook.sh .git/hooks/pre-commit

echo "🔍 Vérification des dates avant commit..."

# Obtenir la date actuelle
CURRENT_DATE=$(date '+%d %B %Y')
ISO_DATE=$(date '+%Y-%m-%d')

# Vérifier si des fichiers Markdown ont des dates incorrectes
FILES_TO_CHECK=$(git diff --cached --name-only | grep '\.md$')

if [ -n "$FILES_TO_CHECK" ]; then
    echo "📝 Fichiers Markdown modifiés:"
    echo "$FILES_TO_CHECK"
    echo ""
    echo "⚠️  Vérifiez que les dates sont correctes:"
    echo "   Date actuelle: $CURRENT_DATE"
    echo "   Date ISO: $ISO_DATE"
    echo ""
    echo "💡 Pour corriger automatiquement:"
    echo "   ./scripts/update-dates.sh"
    echo ""
fi

echo "✅ Vérification terminée"
exit 0
EOF

# Copier install-hooks.sh
cat > "$PROJECT_PATH/scripts/install-hooks.sh" << 'EOF'
#!/bin/bash

# Script pour installer les hooks Git
# Usage: ./scripts/install-hooks.sh

echo "🔧 Installation des hooks Git..."

# Créer le dossier hooks s'il n'existe pas
mkdir -p .git/hooks

# Copier le hook pre-commit
cp scripts/pre-commit-hook.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

echo "✅ Hook pre-commit installé"
echo "📝 Le hook vérifiera les dates avant chaque commit"
EOF

# Rendre tous les scripts exécutables
chmod +x "$PROJECT_PATH/scripts"/*.sh

echo ""
echo "✅ Scripts installés avec succès !"
echo ""
echo "📝 Utilisation :"
echo "   ./scripts/get-date.sh          # Vérifier la date actuelle"
echo "   ./scripts/update-dates.sh      # Mettre à jour toutes les dates"
echo "   ./scripts/install-hooks.sh     # Installer les hooks Git"
echo ""
echo "🎯 Prochaines étapes :"
echo "   1. cd $PROJECT_PATH"
echo "   2. ./scripts/install-hooks.sh"
echo "   3. ./scripts/get-date.sh"
