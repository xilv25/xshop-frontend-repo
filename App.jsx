// xshop-frontend-revisi/src/App.jsx
import React, { useEffect, useState } from 'react';
import './App.css'; // Pastikan file App.css ada di folder src

function App() {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- GANTI URL INI DENGAN URL PUBLIK REPL BACKEND ANDA YANG BARU ---
    // Contoh: 'https://xshop-backend-revisi-username.replit.dev' atau URL yang sudah Anda dapatkan
    const BACKEND_API_URL = 'https://788dd8fa-5b1d-4233-a1c6-3b6df907761c-00-7maocianixmv.pike.replit.dev/'; // GANTI DENGAN URL BACKEND ANDA

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                // Gunakan URL Backend yang sudah diisi di atas
                const response = await fetch(`${BACKEND_API_URL}/api/templates`);
                if (!response.ok) {
                    const errorData = await response.text(); // Ambil pesan error dari response
                    throw new Error(`HTTP error! Status: ${response.status}. Detail: ${errorData}`);
                }
                const data = await response.json();

                if (data.success) {
                    setTemplates(data.data);
                } else {
                    throw new Error(data.message || 'Gagal mengambil tema undangan');
                }
            } catch (err) {
                console.error("Error fetching templates (from App.jsx):", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTemplates();

    }, [BACKEND_API_URL]);

    if (loading) {
        return <div className="loading">Memuat tema undangan Xshop...</div>;
    }

    if (error) {
        return <div className="error">Terjadi kesalahan: {error}. Mohon periksa koneksi atau backend Anda.</div>;
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Xshop: Wujudkan Undangan Impianmu!</h1>
                <p>Pilih tema undangan online yang kamu suka, isi data, dan dapatkan undangan indahmu dalam genggaman!</p>
            </header>

            <main className="templates-gallery">
                <h2>Pilihan Tema Undangan Terbaik</h2>
                <div className="template-grid">
                    {templates.length === 0 ? (
                        <p>Belum ada tema undangan yang tersedia. Silakan tambahkan dari panel admin Anda di Supabase.</p>
                    ) : (
                        templates.map(template => (
                            <div key={template.template_id} className="template-card">
                                <img src={template.preview_image_url || 'https://via.placeholder.com/300/A0A0A0/FFFFFF?text=Xshop+Tema'} alt={template.nama_template} className="template-image" />
                                <div className="template-info">
                                    <h3>{template.nama_template}</h3>
                                    <p>{template.deskripsi}</p>
                                    <p className="template-price">Harga: Rp{parseFloat(template.harga).toLocaleString('id-ID')}</p>
                                    <button
                                        className="select-button"
                                        onClick={() => alert(`Anda memilih tema: ${template.nama_template}. Lanjutkan ke pengisian data!`)}
                                    >
                                        Pilih Tema Ini
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>

            <footer>
                <p>&copy; 2025 Xshop. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App;