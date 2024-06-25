document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");

  // Handle registration form submission
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(registerForm);
    const registerData = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    fetch("../json/register.json", {
      // Updated to fetch from local JSON file
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Registration successful!");
        registerForm.reset();
      })
      .catch((error) => console.error("Error:", error));
  });

  // Handle login form submission
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const loginData = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    fetch("../json/login.json", {
      // Updated to fetch from local JSON file
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then((data) => {
        data.username;
        alert("Login successful!");
        loginForm.reset();
      });
    loginForm.addEventListener("click", function () {
      window.location.href = "../index.html";
    });
    //   .catch((error) => console.error("Error:", error));
  });
});

// Google Sign-In callback function
function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  const id_token = googleUser.getAuthResponse().id_token;

  const googleData = {
    name: profile.getName(),
    email: profile.getEmail(),
    token: id_token,
  };

  fetch("../json/google-login.json", {
    // Updated to fetch from local JSON file
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(googleData),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Google login successful!");
    })
    .catch((error) => console.error("Error:", error));
}
