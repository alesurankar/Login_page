console.log("api.js loaded");


const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const API = (() => {

    async function login(username) {
        const res = await fetch("/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ username })
        });
        if (!res.ok) {
            const err = await res.json(); // FastAPI sends JSON error
            throw new Error(err.detail?.[0]?.msg || "Login failed");
        }
        return await res.json();
    }

    async function signup(username) {
        const res = await fetch("/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username })
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.detail?.[0]?.msg || "Signup failed");
        }
        return await login(username);
    }

    async function getUsers() {
        const res = await fetch("/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        return await res.json();
    }

    return { 
        login, 
        signup, 
        getUsers 
    };
})();


// Login form
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = loginForm.querySelector('input[name="username"]').value;
    try {
        const result = await API.login(username);
        hidePopupBtn.click();
        await Pages.loadPage(null, "home.html"); 
        Session.setUsername(username);
    } catch (err) {
        console.error("Login failed:", err);
    }
});

// Signup form
signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = signupForm.querySelector('input[name="username"]').value;
    try {
        const result = await API.signup(username);
        hidePopupBtn.click();       
        await Pages.loadPage(null, "home.html");
        Session.setUsername(username);   
    } catch (err) {
        console.error("Signup failed:", err);
    }
});