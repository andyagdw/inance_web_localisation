# React Localisation 💥

This is a dummy website used to practice localisation. It
features multi-language support (currently supporting English, French, and Arabic) and
basic pages like Home, About, Services, and Contact Us.

**Note**: Firebase and Google Analytics integrations are entirely optional. You can skip these
steps if you just want to experiment with the localisation features.

## Features ✨

* **Multi-language support**: Switch between English, French, and Arabic
* **Contact Form**: (Optional) Submissions are saved to Firestore and trigger an email notification
* **Google Analytics**: (Optional) Monitors website performance

## Getting Started ✅

Follow these steps to get the project up and running on your local machine. If you only wish to test
the localisation features, you can skip steps 2 and 3.

### 1. Clone the Repository

* `git clone https://github.com/andyagdw/inance_web_localisation.git`
* `cd inance_web_localisation`

### 2. (Optional) Create a Firebase Project

* Create a new project with [Firebase](https://firebase.google.com/)
* Set up a Firestore Database
* Add a new Web App to obtain your Firebase configuration details
* Install the **Trigger Email from Firestore** extension from Firebase
* Follow the tutorial on [Sending emails using Firestore and Firebase Extensions](https://invertase.io/blog/send-email-extension). Be sure to read up to **Sending emails using Firebase Functions triggers** section for setup instructions
* Also select **mail** as the Firestore collection where you would like to process emails from

### 3. (Optional) Set Up Google Analytics

1. Create a Google Analytics Account: <br>
* If you haven't already, sign up for [Google Analytics](https://marketingplatform.google.com/about/analytics/)

2. Create a New Property: <br>
* Select 'Web' as the plaform.
3. Configure the Property: <br>
* For the Website URL, enter 'www.localhost:xxxx/' (replace xxxx with your development server's port number)
4. Obtain Your Measurement ID: <br>
* Once the property is set up, you'll see your Google Analytics Measurement ID (it typically starts with 'G-')

### 4. Set Up Environment Variables

Create an `.env` file in the root of your project from the `.env.example` file. Add your configuration variables as follows:

```
# Leave blank to disable

# Google Analytics
VITE_GOOGLE_MEASUREMENT_ID=       # your-google-measurement-id

# Firebase Configuration
VITE_API_KEY=       # your-firebase-api-key
VITE_AUTH_DOMAIN=       # your-firebase-auth-domain
VITE_PROJECT_ID=       # your-firebase-project-id
VITE_STORAGE_BUCKET=       # your-firebase-storage-bucket
VITE_MESSAGING_SENDING_ID=       # your-firebase-messaging-sender-id
VITE_APP_ID=       # your-firebase-app-id
VITE_MEASUREMENT_ID=       # your-firebase-measurement-id

# Contact email for receiving emails when contact form is submitted
VITE_CONTACT_EMAIL=       # your-email@example.com
```

### 5. (Optional) Configure Firestore Security Rules

If you skipped Firebase setup, you can ignore this. Otherwise, use these simplified rules for development:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // Allow create, update, and read operations in the 'users' collection
    match /users/{userId} {
      allow create, update, read: if true;
      allow delete: if false;
    }

    // Allow creation of documents in the 'mail' collection
    match /mail/{mailId} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

### 6. Install Dependencies

`npm install`

### 7. Start The Development Server

`npm run dev`

## Credits
### Contact

If you have any questions or just want to connect, you can reach me on [LinkedIn](https://uk.linkedin.com/in/andyagyeidwumah) 👍
