// Jika diperlukan untuk interaktivitas lebih lanjut, misalnya untuk menyimpan perubahan catatan di klien
document.querySelectorAll('.note-text').forEach(note => {
    note.addEventListener('blur', function() {
        // Logika untuk menangani penyimpanan perubahan catatan bisa ditambahkan di sini
        console.log('Catatan diperbarui:', note.innerText);
    });
});
