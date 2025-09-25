# 📅 Scripts de Gestion des Dates

Collection complète de scripts pour gérer automatiquement les dates dans tous vos projets.

## 🚀 Installation rapide

### Pour un nouveau projet :
```bash
# 1. Copier le script d'installation
cp /Users/ibrahimaba/Documents/GitHub/directories/scripts/install-date-scripts.sh .

# 2. Exécuter l'installation
./install-date-scripts.sh

# 3. Installer les hooks Git
./scripts/install-hooks.sh
```

### Pour tous vos projets existants :
```bash
# Déployer dans tous vos projets GitHub
./scripts/deploy-date-scripts.sh ~/Documents/GitHub
```

## 📝 Scripts disponibles

### 1. `get-date.sh` - Vérifier la date actuelle
```bash
./scripts/get-date.sh
```
**Fonction** : Affiche la date actuelle dans tous les formats utiles

### 2. `update-dates.sh` - Mettre à jour toutes les dates
```bash
./scripts/update-dates.sh
```
**Fonction** : Met à jour automatiquement les dates dans tous les fichiers Markdown

### 3. `install-hooks.sh` - Installer les hooks Git
```bash
./scripts/install-hooks.sh
```
**Fonction** : Installe un hook Git pour vérifier les dates avant chaque commit

### 4. `install-date-scripts.sh` - Installer dans un projet
```bash
./scripts/install-date-scripts.sh [chemin-du-projet]
```
**Fonction** : Installe tous les scripts dans un projet spécifique

### 5. `deploy-date-scripts.sh` - Déployer dans tous vos projets
```bash
./scripts/deploy-date-scripts.sh [répertoire-des-projets]
```
**Fonction** : Déploie automatiquement les scripts dans tous vos projets Git

### 6. `backup-date-scripts.sh` - Sauvegarder les scripts
```bash
./scripts/backup-date-scripts.sh
```
**Fonction** : Sauvegarde tous les scripts dans `~/.date-scripts-backup/`

## 🎯 Utilisation quotidienne

### Workflow recommandé :
```bash
# 1. Vérifier la date actuelle
./scripts/get-date.sh

# 2. Mettre à jour toutes les dates
./scripts/update-dates.sh

# 3. Commiter les changements
git add .
git commit -m "📅 Mise à jour des dates - $(date '+%Y-%m-%d')"
```

### Intégration dans vos scripts :
```bash
#!/bin/bash
# build.sh

# Mettre à jour les dates
./scripts/update-dates.sh

# Construire le projet
npm run build
```

## 🔧 Personnalisation

### Adapter les patterns de recherche

Modifiez `scripts/update-dates.sh` pour vos fichiers spécifiques :

```bash
# Exemple pour un projet React
update_file "package.json" '"version": "[^"]*"' '"version": "1.0.0"'

# Exemple pour un projet Python
update_file "setup.py" "version='[^']*'" "version='1.0.0'"
```

### Ajouter de nouveaux formats de date

Modifiez `scripts/get-date.sh` pour ajouter vos formats :

```bash
# Format personnalisé
echo "Format personnalisé: $(date '+%Y-%m-%d %H:%M')"
```

## 📚 Templates disponibles

### 1. `templates/date-scripts-template.md`
Template complet avec tous les scripts à copier

### 2. `templates/DATE-SCRIPTS-GUIDE.md`
Guide détaillé d'utilisation et de personnalisation

## 🎉 Avantages

- **Automatisation** : Plus besoin de corriger manuellement les dates
- **Cohérence** : Toutes les dates sont synchronisées
- **Vérification** : Hook Git pour éviter les erreurs
- **Réutilisable** : Template pour tous vos projets
- **Flexible** : Adaptable à tous types de projets
- **Sauvegarde** : Scripts sauvegardés automatiquement

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

## 📞 Support

Si vous rencontrez des problèmes :

1. **Vérifiez les permissions** : `chmod +x scripts/*.sh`
2. **Testez individuellement** : `./scripts/get-date.sh`
3. **Vérifiez les patterns** : Adaptez selon vos fichiers
4. **Consultez les logs** : Les scripts affichent des messages détaillés

## 🚀 Déploiement rapide

### Pour déployer dans tous vos projets :
```bash
# 1. Sauvegarder les scripts
./scripts/backup-date-scripts.sh

# 2. Déployer dans tous vos projets
./scripts/deploy-date-scripts.sh ~/Documents/GitHub

# 3. Vérifier l'installation
cd ~/Documents/GitHub/mon-projet
./scripts/get-date.sh
```

---

**Créé le** : 25 septembre 2025  
**Version** : 1.0.0  
**Usage** : Gestion automatique des dates dans tous vos projets
