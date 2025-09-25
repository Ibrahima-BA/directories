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
