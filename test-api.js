// Script para probar la API localmente
const fetch = require('node-fetch');

async function testAPI() {
  const testData = {
    formularioBusquedaNotas: 'formularioBusquedaNotas',
    'formularioBusquedaNotas:nifnie': '12345678A',
    'formularioBusquedaNotas:fechaExamen': '01/01/2024',
    'formularioBusquedaNotas:clasepermiso': 'B',
    'formularioBusquedaNotas:fechaNacimiento': '01/01/1990',
    'formularioBusquedaNotas:honeypot': '',
    'formularioBusquedaNotas:j_id51': 'Buscar',
    'javax.faces.ViewState': 'test'
  };

  try {
    console.log('Probando API local...');
    const response = await fetch('http://localhost:3001/api/check-note', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(testData)
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ API funcionando:', data);
    } else {
      console.log('❌ Error en API:', response.status);
    }
  } catch (error) {
    console.log('❌ Error de conexión:', error.message);
  }
}

testAPI();