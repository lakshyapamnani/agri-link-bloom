import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAhG_zIb52ooGo_zN3yPpZZgPgVwPEzQLM",
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "fpfinal-477ae.firebaseapp.com",
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "fpfinal-477ae",
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "fpfinal-477ae.firebasestorage.app",
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1071654395217",
	appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1071654395217:web:00bf30a74e44b410c50770",
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-FMMKZ9CW16"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Export auth instance
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics only when supported (browser env)
void isSupported().then((supported) => {
	if (supported) {
		try {
			getAnalytics(app);
		} catch {
			// no-op if analytics cannot initialize
		}
	}
});

export default app;


