import admin from 'firebase-admin';
import serviceAccount from '../sm/coelba-checklist-firebase-adminsdk-udhl1-92c0afca0e.json' assert { type: 'json' };
import { control } from '../controller/firebaseController.js';
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  
const db = admin.firestore();
//Realizar o cadastro do firestore para o mysql automaticamente
db.collection("inspections").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      const data = change.doc.data();
      console.log("Esses foram os ultimos dados adicionados: ", data);
      control(data);
    }
  });
});
export default admin;