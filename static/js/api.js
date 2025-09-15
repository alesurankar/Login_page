console.log("api.js loaded");


const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const API = (() => {

    async function login(username) {
        try {
            const res = await fetch("/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ username })
            });
            return await res.json();
        } catch (err) {
            console.error("Login failed:", err);
            throw err;
        }
    }

    async function signup(username) {
        try {
            const res = await fetch("/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ username })
            });
            return await res.json();
        } catch (err) {
            console.error("Signup failed:", err);
            throw err;
        }
    }

    async function getUsers() {
        try {
            const res = await fetch("/users");
            if (!res.ok) throw new Error("Failed to fetch users");
            return await res.json();
        } catch (err) {
            console.error("Error fetching users:", err);
            throw err;
        }
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
        console.log("Login success:", result);
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
        console.log("Signup success:", result);
    } catch (err) {
        console.error("Signup failed:", err);
    }
});