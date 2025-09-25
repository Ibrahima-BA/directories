#!/bin/bash

# Script pour sauvegarder les scripts de gestion des dates
# Usage: ./scripts/backup-date-scripts.sh

BACKUP_DIR="$HOME/.date-scripts-backup"
BACKUP_DATE=$(date '+%Y-%m-%d_%H-%M-%S')

echo "💾 Sauvegarde des scripts de gestion des dates..."
echo "Répertoire de sauvegarde: $BACKUP_DIR"
echo "Date de sauvegarde: $BACKUP_DATE"
echo "======================================="

# Créer le répertoire de sauvegarde
mkdir -p "$BACKUP_DIR"

# Sauvegarder les scripts
echo "🔄 Sauvegarde en cours..."

# Copier tous les scripts
cp -r scripts/ "$BACKUP_DIR/scripts-$BACKUP_DATE/"

# Copier les templates
cp -r templates/ "$BACKUP_DIR/templates-$BACKUP_DATE/"

# Créer un script de restauration
cat > "$BACKUP_DIR/restore-date-scripts.sh" << EOF
#!/bin/bash

# Script de restauration des scripts de gestion des dates
# Usage: ./restore-date-scripts.sh [chemin-du-projet]

PROJECT_PATH="\${1:-.}"

echo "🔄 Restauration des scripts de gestion des dates..."
echo "Projet cible: \$PROJECT_PATH"
echo "======================================="

# Créer le dossier scripts dans le projet
mkdir -p "\$PROJECT_PATH/scripts"

# Restaurer les scripts
cp -r scripts-$BACKUP_DATE/* "\$PROJECT_PATH/scripts/"

# Rendre les scripts exécutables
chmod +x "\$PROJECT_PATH/scripts"/*.sh

echo "✅ Scripts restaurés avec succès !"
echo "📝 Utilisation :"
echo "   ./scripts/get-date.sh          # Vérifier la date actuelle"
echo "   ./scripts/update-dates.sh      # Mettre à jour toutes les dates"
echo "   ./scripts/install-hooks.sh     # Installer les hooks Git"
EOF

chmod +x "$BACKUP_DIR/restore-date-scripts.sh"

# Créer un fichier de version
cat > "$BACKUP_DIR/version.txt" << EOF
Date de sauvegarde: $BACKUP_DATE
Version: 1.0.0
Scripts inclus:
- get-date.sh
- update-dates.sh
- pre-commit-hook.sh
- install-hooks.sh
- install-date-scripts.sh
- deploy-date-scripts.sh
- backup-date-scripts.sh

Templates inclus:
- date-scripts-template.md
- DATE-SCRIPTS-GUIDE.md
EOF

echo "✅ Sauvegarde terminée !"
echo ""
echo "📁 Fichiers sauvegardés :"
echo "   - Scripts: $BACKUP_DIR/scripts-$BACKUP_DATE/"
echo "   - Templates: $BACKUP_DIR/templates-$BACKUP_DATE/"
echo "   - Script de restauration: $BACKUP_DIR/restore-date-scripts.sh"
echo "   - Version: $BACKUP_DIR/version.txt"
echo ""
echo "💡 Pour restaurer dans un projet :"
echo "   cd $BACKUP_DIR"
echo "   ./restore-date-scripts.sh /chemin/vers/votre/projet"
echo ""
echo "🎯 Pour déployer dans tous vos projets :"
echo "   ./scripts/deploy-date-scripts.sh"
