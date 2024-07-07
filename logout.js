document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");
  const logoutLink = document.getElementById("logout-link");

  // Cek apakah pengguna sudah login
  const isLoggedIn = sessionStorage.getItem("token");

  if (isLoggedIn) {
    loginBtn.style.display = "none";
    logoutBtn.style.display = "block";
  } else {
    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";
  }

  // Tambahkan event listener untuk tombol logout
  logoutLink.addEventListener("click", function (event) {
    event.preventDefault();
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    Swal.fire({
      icon: "success",
      title: "Berhasil Logout",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      window.location.reload();
    });
  });
});
