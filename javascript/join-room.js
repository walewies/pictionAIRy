const form = document.getElementById("join-room-form");
const roomCodeInput = form.roomCode;

roomCodeInput.addEventListener("input", () => {
    roomCodeInput.value = roomCodeInput.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const displayName = form.displayName.value.trim();
    const roomCode = form.roomCode.value.trim();

    // Placeholder until room joining is implemented.
    console.log("Join room requested:", { displayName, roomCode });
});
