import admin from 'firebase-admin';
const serviceAccount = require('../../../serviceAccountKey.json');
admin.initializeApp({  credential: admin.credential.cert(serviceAccount),  projectId: "invitation-84db5",});
const db = admin.firestore();
export { db };

