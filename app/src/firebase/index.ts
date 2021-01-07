import firebase from 'firebase';
import { ModelDocument, ModelDocumentStored } from '../data/types';

var config = {
    apiKey: "AIzaSyDlZyIHxy-c8Cd9QEAMwrzep_UoN_x6BEw",
    authDomain: "klima-187d1.firebaseapp.com",
    databaseURL: "https://klima-187d1.firebaseio.com/",
    storageBucket: "gs://klima-187d1.appspot.com"
  };

export function FirebaseInit() {
    firebase.initializeApp(config);
}

export async function Login() {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
        var email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
            // User opened the link on a different device. To prevent session fixation
            // attacks, ask the user to provide the associated email again. For example:
            email = window.prompt('Please provide your email for confirmation');
        }
        // The client SDK will parse the code from the link for you.
        await firebase.auth().signInWithEmailLink(email || '', window.location.href)
        window.localStorage.removeItem('emailForSignIn');
    }
}

export function DbId(): string {
    return firebase.database().ref('/').push().key || ''
}

export async function DbStore(userId: string, model: ModelDocument) {
    const stored: ModelDocumentStored = {
        ...model,
        richText: JSON.stringify(model.richText)
    }
    await firebase.database().ref(`users/${userId}/public/models/${model.id}`).set(stored)
}

export async function DbList(userId: string): Promise<Array<ModelDocument>> {
    const v = await firebase.database().ref(`users/${userId}/public/models`).get()
    console.log(`get got ${v} which is ${v.val()}`)

    const stored: [ModelDocumentStored] = await v.val()
    console.log(`list got ${stored}`)
    return stored.map((v) => {return {...v, richText: JSON.parse(v.richText)}})
}