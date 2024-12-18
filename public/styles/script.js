// Jika diperlukan untuk interaktivitas lebih lanjut, misalnya untuk menyimpan perubahan catatan di klien
document.querySelectorAll('.note-text').forEach(note => {
    note.addEventListener('blur', function() {
        // Logika untuk menangani penyimpanan perubahan catatan bisa ditambahkan di sini
        console.log('Catatan diperbarui:', note.innerText);
    });
});

document.querySelectorAll(".note-text").forEach(note => {
    note.addEventListener("focusout", async (event) => {
        const noteContent = event.target.innerHTML;
        const noteId = event.target.closest(".note-card").getAttribute("data-id");

        try {
            const response = await fetch(`/update/${noteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: noteContent }),
            });

            if (response.ok) {
                console.log("Note updated successfully");
                // Tambahkan indikator sukses (opsional)
                event.target.classList.add("updated");
                setTimeout(() => {
                    event.target.classList.remove("updated");
                }, 1000);

            } else {
                alert("Failed to update note");
            }
        } catch (error) {
            console.error("Error updating note:", error);
        }
    });
});
