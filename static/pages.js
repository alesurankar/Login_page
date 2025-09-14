const Pages = (() => {
    async function loadPage(event, page) {
        if (event) event.preventDefault();

        const content = document.getElementById("content");
        try {
            const res = await fetch(`/pages/${page}`);
            if (!res.ok) throw new Error("Page not found");
            content.innerHTML = await res.text();

            const userList = document.getElementById("user-list");
            if (userList && window.Users) Users.loadUsers(userList);

        } catch (err) {
            console.error(err);
            content.innerHTML = `<p style="color:red">Failed to load page: ${err.message}</p>`;
        }
    }

    return { loadPage };
})();
