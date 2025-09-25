#!/usr/bin/env node

const http = require('http');

console.log('🧪 Test de l\'application Directories...\n');

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

// Test des différents ports
async function runTests() {
  const ports = [3000, 3001, 3002, 3003, 3004];
  let workingPort = null;
  
  console.log('🔍 Recherche du port actif...');
  
  for (const port of ports) {
    const result = await testUrl(`http://localhost:${port}`, `Port ${port}`);
    if (result.success && result.status === 200) {
      workingPort = port;
      break;
    }
  }
  
  if (workingPort) {
    console.log(`\n🎉 Application trouvée sur le port ${workingPort}!`);
    console.log(`🌐 URL: http://localhost:${workingPort}`);
    
    // Test des routes principales
    console.log('\n📋 Test des routes principales...');
    const routes = [
      { path: '/', name: 'Page d\'accueil' },
      { path: '/about', name: 'Page À propos' },
      { path: '/rules', name: 'Page Règles' },
      { path: '/mcp', name: 'Page MCP' },
      { path: '/jobs', name: 'Page Jobs' }
    ];
    
    for (const route of routes) {
      await testUrl(`http://localhost:${workingPort}${route.path}`, route.name);
    }
    
    console.log('\n✨ Tests terminés!');
    console.log(`🚀 Votre application est accessible sur: http://localhost:${workingPort}`);
    
  } else {
    console.log('\n❌ Aucune instance de l\'application trouvée.');
    console.log('💡 Assurez-vous que le serveur de développement est démarré avec:');
    console.log('   cd apps/cursor && bun run dev');
  }
}

runTests().catch(console.error);
