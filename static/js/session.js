window.Session = {
    username: localStorage.getItem("username") || null,

    setUsername(name) {
        this.username = name;
        localStorage.setItem("username", name);
        this.update();
    },

    clear() {
        this.username = null;
        localStorage.removeItem("username");
        this.update();
    },

    update() {
        const el = document.getElementById("username-placeholder");
        if (el) el.textContent = this.username || "";
    }
};

// On page load
document.addEventListener("DOMContentLoaded", () => Session.update());
