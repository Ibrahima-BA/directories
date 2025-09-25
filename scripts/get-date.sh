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
