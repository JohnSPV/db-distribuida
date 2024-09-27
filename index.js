require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env
const firebase = require('firebase/app');
require('firebase/firestore');

// Configuración de Firebase (obtenida de las variables de entorno)
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Función de sincronización de datos
async function syncData() {
  const docRef = db.collection('replica').doc('exampleDoc');

  // Escribir datos en Firestore
  await docRef.set({
    fragment: 'data from this VM',
    timestamp: new Date(),
  });

  console.log('Datos sincronizados con Firebase.');

  // Leer datos desde Firestore
  const doc = await docRef.get();
  if (doc.exists) {
    console.log('Datos leídos:', doc.data());
  } else {
    console.log('No se encontró el documento.');
  }
}

// Llamar a la función de sincronización
syncData().catch(console.error);
