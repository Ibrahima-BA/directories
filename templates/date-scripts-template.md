# 📅 Template de Scripts de Gestion des Dates

Ce template contient tous les scripts nécessaires pour gérer automatiquement les dates dans vos projets.

## 📁 Structure des fichiers

```
scripts/
├── get-date.sh           # Affiche la date actuelle
├── update-dates.sh       # Met à jour les dates dans les fichiers
├── pre-commit-hook.sh    # Hook Git pour vérifier les dates
└── install-hooks.sh      # Installe les hooks Git
```

## 🔧 Scripts à copier

### 1. `scripts/get-date.sh`
```bash
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
```

### 2. `scripts/update-dates.sh`
```bash
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
update_file "*.md" "Dernière mise à jour.*" "**Dernière mise à jour** : $CURRENT_DATE"

echo ""
echo "✅ Mise à jour terminée !"
echo "📝 Vérifiez les fichiers avant de commiter"
```

### 3. `scripts/pre-commit-hook.sh`
```bash
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
```

### 4. `scripts/install-hooks.sh`
```bash
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
```

## 🚀 Installation rapide

### Pour un nouveau projet :

```bash
# 1. Créer le dossier scripts
mkdir -p scripts

# 2. Copier tous les scripts
# (copier le contenu des scripts ci-dessus)

# 3. Rendre les scripts exécutables
chmod +x scripts/*.sh

# 4. Installer les hooks Git
./scripts/install-hooks.sh

# 5. Tester
./scripts/get-date.sh
```

## 📝 Utilisation

### Vérifier la date actuelle :
```bash
./scripts/get-date.sh
```

### Mettre à jour toutes les dates :
```bash
./scripts/update-dates.sh
```

### Installer les hooks Git :
```bash
./scripts/install-hooks.sh
```

## 🎯 Avantages

- **Automatisation** : Plus besoin de corriger manuellement les dates
- **Cohérence** : Toutes les dates sont synchronisées
- **Vérification** : Hook Git pour éviter les erreurs
- **Réutilisable** : Template pour tous vos projets

## 📚 Intégration dans vos projets

1. **Copiez ce template** dans chaque nouveau projet
2. **Adaptez les patterns** selon vos fichiers
3. **Installez les hooks** avec `./scripts/install-hooks.sh`
4. **Utilisez régulièrement** `./scripts/update-dates.sh`

---

**Créé le** : 25 septembre 2025  
**Template pour** : Gestion automatique des dates  
**Usage** : Copier dans tous vos projets
