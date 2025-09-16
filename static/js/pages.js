console.log("pages.js running!");

const Pages = (() => {
    async function loadPage(event, page) {
        if (event) {
            event.preventDefault();
        }
        console.log("[Pages] loadPage:", page);
        const content = document.getElementById("content");
        try {
            const response = await fetch(`/pages/${page}`);
            if (!response.ok) throw new Error("Page not found");

            content.innerHTML = await response.text();

            // Highlight active nav item
            const links = document.querySelectorAll(".links li");
            links.forEach(li => li.classList.remove("active"));

            if (event) {
                const link = event.target.closest("a");
                if (link) {
                    const li = link.closest("li");
                    if (li) li.classList.add("active");
                }
            }
        
            const userList = document.getElementById("user-list");
            if (userList && window.Users?.loadUsers) {
                Users.loadUsers(userList);
            }
        } catch (err) {
            console.error("[Pages] Failed to load page:", err);
            content.innerHTML = `<p style="color:red">Failed to load page: ${err.message}</p>`;
        }
    }

    function clearContent() {
        const content = document.getElementById("content");
        if (content) {
            content.innerHTML = "";
            console.log("[Pages] Content cleared");
        }
    }

    return { 
        loadPage,
        clearContent
    };
})();
