console.log("users.js running!");

window.Users = (() => {
    async function loadUsers(container) {
        try {
            const res = await fetch("/users");
            const data = await res.json();
            container.innerHTML = "";
            if (data.users?.length) {
                const ul = document.createElement("ul");
                data.users.forEach(user => {
                    const li = document.createElement("li");
                    li.textContent = user;
                    ul.appendChild(li);
                });
                container.appendChild(ul);
            } else {
                container.textContent = "No users found";
            }
        } catch (err) {
            console.error("Failed to load users:", err);
            container.textContent = "Failed to load users";
        }
    }
    return { 
        loadUsers 
    };
})();

