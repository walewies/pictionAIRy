const form = document.getElementById("create-room-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const displayName = form.displayName.value.trim();

    // Placeholder until room creation is implemented.
    console.log("Create room requested:", { displayName });
});
