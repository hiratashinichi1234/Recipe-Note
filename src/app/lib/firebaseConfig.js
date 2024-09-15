// Firebase モジュールをインポート
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBl3DuPKNedYQv4aJzSRYiSb0ZyX9Xie8Y",
  authDomain: "recipe-app-797ee.firebaseapp.com",
  projectId: "recipe-app-797ee",
  storageBucket: "recipe-app-797ee.appspot.com",
  messagingSenderId: "1011212117227",
  appId: "1:1011212117227:web:d6f691b50152459ec74aae",
  measurementId: "G-9SHZ82ZX07"
};

// Firebase アプリを初期化
const app = initializeApp(firebaseConfig);

// Firebase サービスを取得
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

// 必要なサービスをエクスポート
export { auth, firestore, storage };