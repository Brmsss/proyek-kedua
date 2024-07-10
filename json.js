async function getData() {
      const currentUrl = window.location.href;
      const pathname = new URL(currentUrl).pathname;
      const hash = window.location.hash;
      const queryString = window.location.search;

      let isIndexPage = pathname === "/proyek-akhir/index.html";
      let isPesanPage = pathname === "/proyek-akhir/pesan.html";

      if (isIndexPage || queryString !== "" || hash !== "") {
        const menuUrl = "menu.json";
        try {
          const response = await fetch(menuUrl);
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }

          const json = await response.json();
          const container = document.getElementById("menu-container");
          json.forEach((menu) => {
            let rupiah = new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            });
            container.innerHTML += `
              <div class="col-sm-6 col-lg-4">
                <a class="portfolio-box">
                  <img class="img-fluid" src="${menu.foto}">
                  <div class="portfolio-box-caption">
                    <div class="portfolio-box-caption-content">
                      <div class="project-category text-faded"><span>${menu.nama}</span></div>
                      <div class="project-name"><span>${menu.desk}</span></div>
                      <div class="project-name"><span>${rupiah.format(menu.harga)}</span></div>
                    </div>
                  </div>
                </a>
              </div>
            `;
          });
        } catch (error) {
          console.error(error.message);
        }
      } else if (isPesanPage) {
        const mentahUrl = "mentah.json";
        try {
          const response = await fetch(mentahUrl);
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }

          const json = await response.json();
          const container = document.getElementById("menu-container");
          json.forEach((mentah) => {
            container.innerHTML += `
              <div>
                <input
                  class="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  id="${mentah.jenis}"
                  value="${mentah.jenis}"
                />
                <label class="form-check-label" for="${mentah.jenis}">
                  ${mentah.jenis}
                </label>
              </div>
            `;
          });
        } catch (error) {
          console.error(error.message);
        }
      }
    }

    getData();

    async function tabel(ev) {
      const mentahUrl = "mentah.json";
      try {
        const response = await fetch(mentahUrl);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        const tableBody = json
          .map((mentah, index) => {
            return `
              <tr>
                <th scope="row">${index + 1}</th>
                <td>${mentah.jenis}</td>
                <td>${mentah.harga}</td>
                <td>${mentah.jumlah}</td>
              </tr>
            `;
          })
          .join("");

        Swal.fire({
          showCloseButton: true,
          html: `
            <h3>Daftar Harga dan Stock Bakso</h3>
            <br>
            <table class="table table-sm">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Jenis Bakso</th>
                  <th scope="col">Harga</th>
                  <th scope="col">Stock</th>
                </tr>
              </thead>
              <tbody id="tabel-body">
                ${tableBody}
              </tbody>
            </table>
          `,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error(error.message);
      }
    }

    document.addEventListener("DOMContentLoaded", () => {
      const button = document.getElementById("tabel-button");
      if (button) {
        button.addEventListener("click", tabel);
      }
    });
