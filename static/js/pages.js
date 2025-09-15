console.log("pages.js running!");

const Pages = (() => {
    async function loadPage(event, page) {
        if (event) event.preventDefault();
        console.log("[Pages] loadPage:", page);

        const content = document.getElementById("content");
        try {
            const res = await fetch(`/pages/${page}`);
            if (!res.ok) throw new Error("Page not found");

            content.innerHTML = await res.text();

            const userList = document.getElementById("user-list");
            if (userList && window.Users?.loadUsers) {
                Users.loadUsers(userList);
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
