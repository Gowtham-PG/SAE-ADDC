document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetchButton');
    const saveButton = document.getElementById('saveButton');
    const latitudeInput = document.getElementById('latitudeInput');
    const longitudeInput = document.getElementById('longitudeInput');
    const messageInput = document.getElementById('messageInput');  // New line

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

    fetchButton.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    latitudeInput.value = latitude;
                    longitudeInput.value = longitude;

                    console.log('Location fetched:', latitude, longitude);
                },
                (error) => {
                    console.error('Error fetching location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    });

    saveButton.addEventListener('click', async () => {
        const latitude = latitudeInput.value;
        const longitude = longitudeInput.value;
        const message = messageInput.value;  // New line

        try {
            // Save the data to Firestore
            await db.collection('locations').add({
                latitude: latitude,
                longitude: longitude,
                message: message  // Include the message in the data
            });

            console.log('Data saved to Firestore');
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
