// proses-registrasi.js
// Cek apakah pengguna sudah login
const isLoggedIn = sessionStorage.getItem("token");

// Jika sudah login, redirect ke halaman lain
if (isLoggedIn) {
  window.location.href = "index.html"; // Ganti dengan halaman index
}
// Menangkap form registrasi dari halaman HTML
const formRegistrasi = document.getElementById("form-registrasi");

// Menangani event submit pada form
formRegistrasi.addEventListener("submit", async function (event) {
  event.preventDefault(); // Menghentikan pengiriman form default

  // Mengambil nilai dari form input
  const username = formRegistrasi.elements["username"].value;
  const password = formRegistrasi.elements["password"].value;
  const confirmPassword = formRegistrasi.elements["confirmPassword"].value;

  // Buat objek data yang akan dikirimkan
  const data = {
    username: username,
    password: password,
    // tambahkan data lain dari form jika diperlukan
  };

  // Validasi konfirmasi kata sandi
  if (password !== confirmPassword) {
    Swal.fire({
      title: "Registrasi Gagal!",
      text: "Konfirmasi kata sandi tidak sesuai",
      icon: "warning",
      confirmButtonText: "Registrasi Ulang",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    });
    return; // Menghentikan eksekusi lebih lanjut jika kata sandi tidak cocok
  }

  // Kirim permintaan POST ke endpoint
  try {
    const response = await fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Terjadi kesalahan saat mengirim data");
    }

    const responseData = await response.json();
    console.log(responseData); // Tampilkan response dari server

    // Redirect ke halaman login jika registrasi berhasil
    Swal.fire({
      title: "Registrasi Berhasil!",
      text: "Silakan login untuk melanjutkan",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      window.location.href = "login.html"; // Ganti halaman-login.html dengan halaman login yang sesuai
    });

  } catch (error) {
    console.error("Error:", error.message);
    // Tampilkan pesan error ke pengguna jika perlu
  }
});
