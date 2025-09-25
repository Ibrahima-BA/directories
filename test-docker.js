#!/usr/bin/env node

const http = require('http');
const { exec } = require('child_process');

console.log('🐳 Test de la configuration Docker pour Directories...\n');

// Fonction pour tester une URL
function testUrl(url, description) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      console.log(`✅ ${description}: ${res.statusCode} - ${url}`);
      resolve({ success: true, status: res.statusCode });
    });
    
    req.on('error', (err) => {
      console.log(`❌ ${description}: Erreur - ${err.message}`);
      resolve({ success: false, error: err.message });
    });
    
    req.setTimeout(5000, () => {
      console.log(`⏰ ${description}: Timeout`);
      req.destroy();
      resolve({ success: false, error: 'Timeout' });
    });
  });
}

// Fonction pour vérifier Docker
function checkDocker() {
  return new Promise((resolve) => {
    exec('docker --version', (error, stdout, stderr) => {
      if (error) {
        console.log('❌ Docker n\'est pas installé ou accessible');
        resolve(false);
      } else {
        console.log(`✅ Docker installé: ${stdout.trim()}`);
        resolve(true);
      }
    });
  });
}

// Fonction pour vérifier Docker Compose
function checkDockerCompose() {
  return new Promise((resolve) => {
    exec('docker-compose --version', (error, stdout, stderr) => {
      if (error) {
        console.log('❌ Docker Compose n\'est pas installé');
        resolve(false);
      } else {
        console.log(`✅ Docker Compose installé: ${stdout.trim()}`);
        resolve(true);
      }
    });
  });
}

// Fonction pour vérifier les conteneurs
function checkContainers() {
  return new Promise((resolve) => {
    exec('docker ps', (error, stdout, stderr) => {
      if (error) {
        console.log('❌ Impossible de lister les conteneurs');
        console.log('💡 Assurez-vous que Docker Desktop est démarré');
        resolve(false);
      } else {
        const lines = stdout.split('\n').filter(line => line.trim());
        const containerCount = lines.length - 1; // -1 pour l'en-tête
        
        if (containerCount > 0) {
          console.log(`✅ ${containerCount} conteneur(s) en cours d'exécution`);
        } else {
          console.log('ℹ️  Aucun conteneur en cours d\'exécution');
        }
        resolve(true);
      }
    });
  });
}

// Fonction principale
async function runTests() {
  console.log('🔍 Vérification de l\'environnement Docker...\n');
  
  // 1. Vérifier Docker
  const dockerOk = await checkDocker();
  if (!dockerOk) {
    console.log('\n❌ Docker n\'est pas disponible');
    console.log('💡 Installez Docker Desktop et redémarrez-le');
    return;
  }
  
  // 2. Vérifier Docker Compose
  const composeOk = await checkDockerCompose();
  if (!composeOk) {
    console.log('\n❌ Docker Compose n\'est pas disponible');
    console.log('💡 Installez Docker Compose');
    return;
  }
  
  // 3. Vérifier les conteneurs
  const containersOk = await checkContainers();
  if (!containersOk) {
    console.log('\n❌ Problème avec Docker');
    console.log('💡 Redémarrez Docker Desktop');
    return;
  }
  
  console.log('\n🧪 Test des services...');
  
  // 4. Tester les ports
  const ports = [3000, 3001, 80];
  let servicesFound = 0;
  
  for (const port of ports) {
    const result = await testUrl(`http://localhost:${port}`, `Port ${port}`);
    if (result.success) {
      servicesFound++;
    }
  }
  
  console.log('\n📊 Résumé:');
  console.log(`   • Docker: ${dockerOk ? '✅' : '❌'}`);
  console.log(`   • Docker Compose: ${composeOk ? '✅' : '❌'}`);
  console.log(`   • Conteneurs: ${containersOk ? '✅' : '❌'}`);
  console.log(`   • Services actifs: ${servicesFound}/${ports.length}`);
  
  if (servicesFound === 0) {
    console.log('\n💡 Pour démarrer les services:');
    console.log('   ./docker-scripts.sh build');
    console.log('   ./docker-scripts.sh up');
  } else {
    console.log('\n🎉 Configuration Docker prête!');
  }
  
  console.log('\n📚 Documentation:');
  console.log('   • README-Docker.md - Guide complet');
  console.log('   • DOCKER-SETUP.md - Configuration');
  console.log('   • ./docker-scripts.sh help - Commandes disponibles');
}

runTests().catch(console.error);
