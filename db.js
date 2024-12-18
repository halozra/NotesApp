import pkg from 'pg';
const { Pool } = pkg; // Import Pool dari modul pg

const pool = new Pool({
    user: 'postgres',        // Username PostgreSQL kamu
    host: 'localhost',       // Default localhost
    database: 'nama_database', // Ganti dengan nama database kamu
    password: 'password_kamu', // Password PostgreSQL kamu
    port: 5432               // Default port PostgreSQL
});

export default pool; // Ekspor koneksi pool
