const isLoggedIn = sessionStorage.getItem("token");

// Jika sudah login, redirect ke halaman lain
if (isLoggedIn) {
  window.location.href = "index.html"; // Ganti dengan halaman index
}

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Mengambil username & password pada form
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const data = JSON.stringify({
      username: username,
      password: password,
    });
    // Mengirim data ke server
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => {
        console.log("Response received:", response);
        return response.json();
      })
      .then((response_data) => {
        console.log("Response data:", response_data);
        if (response_data.token) {
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("token", response_data.token);

          // Validasi Token
          fetch("https://dummyjson.com/auth/me", {
            method: "GET",
            headers: {
              Authorization: "Bearer " + response_data.token,
            },
          })
            .then((res) => res.json())
            .then((user_data) => {
              console.log("User data:", user_data);
              // Jika data benar
              if (user_data.id) {
                Swal.fire({
                  icon: "success",
                  title: "Berhasil Login",
                  showConfirmButton: false,
                  timer: 1500,
                }).then(() => {
                  window.location.href = "index.html";
                });
              }
            })
            .catch((error) => {
              console.error("Error validating token:", error);
              Swal.fire({
                title: "Terjadi Kesalahan!",
                text: "Tidak dapat memvalidasi token.",
                icon: "error",
                confirmButtonText: "Coba Lagi",
              });
            });
          // Jika data salah
        } else {
          Swal.fire({
            title: "Username atau Password Salah!",
            icon: "warning",
            confirmButtonText: "Login Ulang",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          title: "Terjadi Kesalahan!",
          text: "Tidak dapat terhubung ke server.",
          icon: "error",
          confirmButtonText: "Coba Lagi",
        });
      });
  });
