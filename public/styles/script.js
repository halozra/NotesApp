function updateNote(element) {
    const noteId = element.getAttribute("id");
    const updatedContent = element.innerText;

    fetch(`/newNotes/${noteId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ content: updatedContent })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("Note updated successfully!");
        } else {
            console.error("Failed to update note.");
        }
    })
    .catch(error => console.error("Error:", error));
}
