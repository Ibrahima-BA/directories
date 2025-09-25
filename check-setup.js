#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Vérification de la configuration du projet Directories...\n');

// 1. Vérifier la version de Next.js
console.log('1️⃣ Vérification de la version Next.js...');
try {
  const packageJsonPath = path.join(__dirname, 'apps/cursor/package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const nextVersion = packageJson.dependencies.next;
  console.log(`   ✅ Version Next.js: ${nextVersion}`);
  
  if (nextVersion.includes('15.3.1')) {
    console.log('   ⚠️  Version potentiellement obsolète. Mise à jour recommandée.');
  }
} catch (error) {
  console.log('   ❌ Erreur lors de la lecture du package.json');
}

// 2. Vérifier les variables d'environnement
console.log('\n2️⃣ Vérification des variables d\'environnement...');
const envPath = path.join(__dirname, 'apps/cursor/.env.local');
if (fs.existsSync(envPath)) {
  console.log('   ✅ Fichier .env.local trouvé');
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  if (envContent.includes('placeholder')) {
    console.log('   ✅ Variables de démonstration configurées');
  } else {
    console.log('   ⚠️  Variables d\'environnement personnalisées détectées');
  }
} else {
  console.log('   ❌ Fichier .env.local manquant');
}

// 3. Vérifier les mocks
console.log('\n3️⃣ Vérification des mocks de développement...');
const mockFiles = [
  'apps/cursor/src/lib/kv.ts',
  'apps/cursor/src/utils/supabase/client.ts',
  'apps/cursor/src/utils/supabase/server.ts',
  'apps/cursor/src/lib/luma.ts',
  'apps/cursor/src/actions/subscribe-action.ts'
];

let mockStatus = true;
mockFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('isDevelopment') || content.includes('mock')) {
      console.log(`   ✅ Mock configuré: ${file}`);
    } else {
      console.log(`   ⚠️  Mock manquant: ${file}`);
      mockStatus = false;
    }
  } else {
    console.log(`   ❌ Fichier manquant: ${file}`);
    mockStatus = false;
  }
});

// 4. Vérifier les dépendances
console.log('\n4️⃣ Vérification des dépendances...');
try {
  const nodeModulesPath = path.join(__dirname, 'node_modules');
  if (fs.existsSync(nodeModulesPath)) {
    console.log('   ✅ node_modules trouvé');
  } else {
    console.log('   ❌ node_modules manquant - exécutez "bun install"');
  }
} catch (error) {
  console.log('   ❌ Erreur lors de la vérification des dépendances');
}

// 5. Test de connectivité
console.log('\n5️⃣ Test de connectivité...');
try {
  const { execSync } = require('child_process');
  execSync('curl -s --connect-timeout 5 https://httpbin.org/status/200 > /dev/null', { stdio: 'ignore' });
  console.log('   ✅ Connectivité internet OK');
} catch (error) {
  console.log('   ⚠️  Problème de connectivité internet');
}

// 6. Recommandations
console.log('\n📋 Recommandations:');
console.log('   • Mettre à jour Next.js: bun add next@latest');
console.log('   • Vérifier que le serveur fonctionne sur http://localhost:3003');
console.log('   • Les mocks sont configurés pour le développement local');
console.log('   • Pour la production, remplacer les variables placeholder par de vraies valeurs');

// 7. Statut final
console.log('\n🎯 Statut final:');
if (mockStatus) {
  console.log('   ✅ Configuration de développement OK');
  console.log('   🚀 L\'application devrait fonctionner en mode développement');
} else {
  console.log('   ❌ Problèmes détectés dans la configuration');
  console.log('   🔧 Vérifiez les fichiers manquants ou mal configurés');
}

console.log('\n✨ Vérification terminée!');
