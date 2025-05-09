// ഫയർബേസ് കോൺഫിഗറേഷൻ
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// ഫയർബേസ് ഇനിഷ്യലൈസ് ചെയ്യുക
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ഡാറ്റാബേസ് ഒബ്ജക്റ്റ്
const ഡാറ്റാബേസ് = {
    // ഉൽപ്പന്നങ്ങൾ ലോഡ് ചെയ്യുക
    ഉൽപ്പന്നങ്ങൾ_ലോഡ്_ചെയ്യുക(callback) {
        db.collection("ഉൽപ്പന്നങ്ങൾ").onSnapshot((snapshot) => {
            const ഡാറ്റ = [];
            snapshot.forEach((doc) => {
                ഡാറ്റ.push({ id: doc.id, ...doc.data() });
            });
            callback(ഡാറ്റ);
        });
    },

    // വിൽപ്പന ലോഡ് ചെയ്യുക
    വിൽപ്പന_ലോഡ്_ചെയ്യുക(callback) {
        db.collection("വിൽപ്പന").orderBy("തീയതി", "desc").limit(10).onSnapshot((snapshot) => {
            const ഡാറ്റ = [];
            snapshot.forEach((doc) => {
                ഡാറ്റ.push({ id: doc.id, ...doc.data() });
            });
            callback(ഡാറ്റ);
        });
    },

    // പുതിയ ഉൽപ്പന്നം ചേർക്കുക
    ഉൽപ്പന്നം_ചേർക്കുക(പേര്, അളവ്, വില) {
        return db.collection("ഉൽപ്പന്നങ്ങൾ").add({
            പേര്,
            അളവ്: Number(അളവ്),
            വില: Number(വില)
        });
    },

    // വിൽപ്പന രേഖപ്പെടുത്തുക
    വിൽപ്പന_രേഖപ്പെടുത്തുക(ഉൽപ്പന്നം, അളവ്, മൊത്തം_വില, തീയതി) {
        // ഉൽപ്പന്ന അളവ് അപ്ഡേറ്റ് ചെയ്യുക
        db.collection("ഉൽപ്പന്നങ്ങൾ").doc(ഉൽപ്പന്നം.id).update({
            അളവ്: firebase.firestore.FieldValue.increment(-Number(അളവ്))
        });
        
        // വിൽപ്പന രേഖ ചേർക്കുക
        return db.collection("വിൽപ്പന").add({
            ഉൽപ്പന്നം: ഉൽപ്പന്നം.പേര്,
            അളവ്: Number(അളവ്),
            മൊത്തം_വില: Number(മൊത്തം_വില),
            തീയതി: തീയതി || new Date().toISOString().split('T')[0]
        });
    }
};