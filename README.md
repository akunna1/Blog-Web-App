#### Complete code not provided...

**Terminal commands:**
- npm add firebase

  **Firebase Configuration**
  - Project settings
  - click on webapp icon
  - Add firebase sdk (copy)
  - create firebase folder and config.jsx file in it
  - Add firebase sdk to config.jsx
  - add firebase authentication using gmail account
  - go to firestore database
  - add more things to config.jsx
 
  rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}

**Firebase functions**
- addDoc: Adds a new document to a Firestore collection
- getFirestore: Initializes and returns a Firestore instance
- collection: Refers to a specific Firestore collection where documents are stored
- getDocs: Retrieves all documents from a specified Firestore collection
- deleteDoc: Deletes a specific document from a Firestore collection
- Timestamp: Represents a point in time, used for recording dates and times in Firestore
- query: Creates a query object to filter or sort data from a Firestore collection
- orderBy: Specifies a field to order the results of a query in Firestore
- onSnapshot: Sets up a real-time listener for changes in a Firestore collection or document
