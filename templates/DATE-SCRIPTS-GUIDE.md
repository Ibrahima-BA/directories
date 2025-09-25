# 📅 Guide des Scripts de Gestion des Dates

Ce guide vous explique comment utiliser les scripts de gestion des dates dans tous vos projets.

## 🚀 Installation rapide

### Pour un nouveau projet :

```bash
# 1. Aller dans votre nouveau projet
cd mon-nouveau-projet

# 2. Copier le script d'installation depuis ce projet
cp /Users/ibrahimaba/Documents/GitHub/directories/scripts/install-date-scripts.sh .

# 3. Exécuter l'installation
./install-date-scripts.sh

# 4. Installer les hooks Git
./scripts/install-hooks.sh

# 5. Tester
./scripts/get-date.sh
```

### Pour un projet existant :

```bash
# 1. Aller dans votre projet existant
cd mon-projet-existant

# 2. Copier et exécuter le script d'installation
cp /Users/ibrahimaba/Documents/GitHub/directories/scripts/install-date-scripts.sh .
./install-date-scripts.sh

# 3. Installer les hooks Git
./scripts/install-hooks.sh
```

## 📝 Utilisation quotidienne

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

## 🔧 Personnalisation

### Adapter les patterns de recherche

Modifiez `scripts/update-dates.sh` pour vos fichiers spécifiques :

```bash
# Exemple pour un projet React
update_file "package.json" '"version": "[^"]*"' '"version": "1.0.0"'

# Exemple pour un projet Python
update_file "setup.py" "version='[^']*'" "version='1.0.0'"

# Exemple pour un projet Node.js
update_file "package.json" '"date": "[^"]*"' '"date": "'$CURRENT_DATE'"'
```

### Ajouter de nouveaux formats de date

Modifiez `scripts/get-date.sh` pour ajouter vos formats :

```bash
# Format personnalisé
echo "Format personnalisé: $(date '+%Y-%m-%d %H:%M')"
```

## 🎯 Intégration dans votre workflow

### 1. Avant de commiter :
```bash
./scripts/update-dates.sh
git add .
git commit -m "📅 Mise à jour des dates"
```

### 2. Dans vos scripts de build :
```bash
#!/bin/bash
# build.sh

# Mettre à jour les dates
./scripts/update-dates.sh

# Construire le projet
npm run build
```

### 3. Dans vos scripts de déploiement :
```bash
#!/bin/bash
# deploy.sh

# Mettre à jour les dates
./scripts/update-dates.sh

# Déployer
git add .
git commit -m "🚀 Déploiement - $(date '+%Y-%m-%d')"
git push
```

## 📚 Exemples d'utilisation

### Projet React/Next.js :
```bash
# Mettre à jour package.json et README.md
./scripts/update-dates.sh
```

### Projet Python :
```bash
# Mettre à jour setup.py et README.md
./scripts/update-dates.sh
```

### Projet Node.js :
```bash
# Mettre à jour package.json et documentation
./scripts/update-dates.sh
```

## 🔍 Dépannage

### Le script ne fonctionne pas :
```bash
# Vérifier les permissions
chmod +x scripts/*.sh

# Vérifier la syntaxe
bash -n scripts/update-dates.sh
```

### Les dates ne se mettent pas à jour :
```bash
# Vérifier les patterns
grep -n "Dernière mise à jour" *.md

# Tester manuellement
sed -n 's/.*Dernière mise à jour.*/TEST/p' README.md
```

### Les hooks Git ne fonctionnent pas :
```bash
# Vérifier l'installation
ls -la .git/hooks/pre-commit

# Réinstaller
./scripts/install-hooks.sh
```

## 🎉 Avantages

- **Automatisation** : Plus besoin de corriger manuellement les dates
- **Cohérence** : Toutes les dates sont synchronisées
- **Vérification** : Hook Git pour éviter les erreurs
- **Réutilisable** : Template pour tous vos projets
- **Flexible** : Adaptable à tous types de projets

## 📞 Support

Si vous rencontrez des problèmes :

1. **Vérifiez les permissions** : `chmod +x scripts/*.sh`
2. **Testez individuellement** : `./scripts/get-date.sh`
3. **Vérifiez les patterns** : Adaptez selon vos fichiers
4. **Consultez les logs** : Les scripts affichent des messages détaillés

---

**Créé le** : 25 septembre 2025  
**Template pour** : Gestion automatique des dates  
**Usage** : Copier dans tous vos projets
