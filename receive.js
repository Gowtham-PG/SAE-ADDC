document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.getElementById('downloadButton');
    const downloadLink = document.createElement('a');  // Create a single download link

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyAwRASxBkclwu2roYuw3CB3Fi92B7ntVUo",
        authDomain: "sae-login-cb56d.firebaseapp.com",
        projectId: "sae-login-cb56d",
        storageBucket: "sae-login-cb56d.appspot.com",
        messagingSenderId: "628867893351",
        appId: "1:628867893351:web:e114cc32bc1c2ef4b6ecc2",
        measurementId: "G-7DHTT7PBVY"  // Optional, only if you're using Firebase Analytics
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // Initialize Firestore
    const db = firebase.firestore();

    downloadButton.addEventListener('click', async () => {
        try {
            const querySnapshot = await db.collection('locations').get();

            // Convert data to JSON format
            const jsonData = [];
            querySnapshot.forEach((doc) => {
                jsonData.push(doc.data());
            });

            // Create a Blob containing the JSON data
            const blob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });

            // Create a new URL for the Blob
            const blobUrl = URL.createObjectURL(blob);

            // Update the existing download link attributes
            downloadLink.href = blobUrl;
            downloadLink.download = 'location_data.json';
            downloadLink.textContent = 'Download JSON';

            // Trigger a click event on the download link
            downloadLink.click();

            // Clean up the Blob URL after download
            URL.revokeObjectURL(blobUrl);

            // Clear the data from Firestore after downloading
            querySnapshot.forEach(async (doc) => {
                await db.collection('locations').doc(doc.id).delete();
            });

            console.log('Data downloaded and cleared from Firestore');
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
