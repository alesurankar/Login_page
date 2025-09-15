console.log("api.js loaded");

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