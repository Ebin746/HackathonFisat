document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    const logoutButton = document.getElementById('logout-button');
    const signupContainer = document.getElementById('signup-container');
    const welcomeContainer = document.getElementById('welcome-container');

    signupForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const phone = document.getElementById('phone').value;

        try {
            let response = await fetch("/user/signup", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ name: username, password, phoneNumber: phone })
            });

            let data = await response.json();

            if (response.ok) {
                console.log(data);

                // Store the user data in local storage
                localStorage.setItem('user', JSON.stringify(data.user));

                // Show welcome message and hide signup form
                signupContainer.style.display = 'none';
                welcomeContainer.style.display = 'block';
                document.getElementById('user-name').textContent = username;
            } else {
                console.error(data.message);
                alert(data.message);  // Display error message to the user
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
        }
    });

    logoutButton.addEventListener('click', function() {
        // Remove user data from local storage on logout
        localStorage.removeItem('user');
        
        signupContainer.style.display = 'block';
        welcomeContainer.style.display = 'none';
        signupForm.reset();
    });
});
