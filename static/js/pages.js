console.log("pages.js running!");

const Pages = (() => {
    async function loadPage(event, page) {
        if (event) event.preventDefault();
        console.log("[Pages] loadPage called for:", page);

        const content = document.getElementById("content");
        try {
            const res = await fetch(`/pages/${page}`);
            if (!res.ok) throw new Error("Page not found");

            // Insert the fetched HTML
            content.innerHTML = await res.text();
            console.log(`[Pages] Inserted HTML for page: ${page}`);

            // If a #user-list exists on the loaded page, load users
            const userList = document.getElementById("user-list");
            if (userList) {
                console.log("[Pages] Found #user-list element:", userList);
                if (window.Users?.loadUsers) {
                    console.log("[Pages] Calling Users.loadUsers...");
                    Users.loadUsers(userList);
                } else {
                    console.warn("[Pages] Users object or loadUsers method not found");
                }
            }
        } catch (err) {
            console.error("[Pages] Failed to load page:", err);
            content.innerHTML = `<p style="color:red">Failed to load page: ${err.message}</p>`;
        }
    }

    return { 
        loadPage 
    };
})();
