# ✍️ Akunna Writes: Tales in Four Tongues (Partial Code)

**Note:** This repository includes only selected `.jsx` components and the root files. The complete codebase is not provided here.

---

## 📖 About Akunna Writes

Akunna Writes is a multilingual blogging platform designed to celebrate storytelling and cultural expression through four languages: English, French, Igbo, and Pidgin. It serves as a creative outlet where users can share short stories, poems, and translations that highlight the beauty and diversity of language.

The app aims to foster a welcoming community for readers and writers alike—encouraging cultural exchange, promoting language literacy, and providing inspiration during challenging times. It’s both a personal journal and a space for others to connect through shared narratives.

---

## ⚙️ Setup & Firebase Integration

### Installing Firebase

```bash
npm add firebase
```

### Firebase Configuration Steps

* Create a Firebase project and navigate to project settings
* Add a new web app and copy the Firebase SDK config snippet
* In your project, create a `firebase` folder with a `config.jsx` file
* Paste the Firebase SDK config inside `config.jsx`
* Enable Firebase Authentication with Gmail sign-in
* Set up Firestore Database in Firebase Console
* Configure Firestore security rules (for development):

```plaintext
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

---

## 🔧 Key Firebase Functions Used

* **addDoc:** Adds a new document to a Firestore collection
* **getFirestore:** Initializes and returns a Firestore instance
* **collection:** References specific Firestore collections
* **getDocs:** Retrieves all documents from a Firestore collection
* **deleteDoc:** Deletes specific documents from Firestore
* **Timestamp:** Stores date and time information for documents
* **query:** Builds queries to filter or sort Firestore data
* **orderBy:** Orders query results by specified fields
* **onSnapshot:** Real-time listener for Firestore data changes

---

## 📂 Code Provided

* Selected `.jsx` components showcasing main app features
* Root `layout.jsx` and `page.jsx` files structuring the application

---

If you would like a full code version or need assistance setting up, feel free to get in touch!
