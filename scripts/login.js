function handleCredentialResponse(response) {
    const data = jwt_decode(response.credential);
    console.log(data);

    const profileDiv = document.getElementById('profile');
    profileDiv.innerHTML = `
        <p><strong>ID:</strong> ${data.sub}</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><img src="${data.picture}" alt="Profile Picture"></p>
    `;
}

(function() {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/@auth0/auth0-spa-js@1.14.0/build/auth0-spa-js.production.js";
    script.onload = function() {
        console.log('Auth0 script loaded');
    };
    document.head.appendChild(script);
})();
