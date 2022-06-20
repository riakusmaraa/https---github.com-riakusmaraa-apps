$(document).ready(function() {
  $.ajaxSetup({ cache: false });
  var dbPromise = idb.open("em_ub", 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("mahasiswa")) {
      // upgradeDb.createObjectStore("events");
      var mahasiswaLogin = upgradeDb.createObjectStore("mahasiswa", {
        keyPath: "nim",
        autoIncrement: true
      });
      mahasiswaLogin.createIndex("nim", "nim", { unique: true });
    }
  });
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  if (idParam === null) {
    window.location.replace("../oprec.html");
  }

  getData();

  function getData() {
    dbPromise
      .then(function(db) {
        var tx = db.transaction("mahasiswa", "readwrite");
        var store = tx.objectStore("mahasiswa");
        return store.getAll();
      })
      .then(function(object) {
        if (
          object.length > 0 &&
          object[0].nim != null &&
          object[0].auth != null
        ) {
          nim = object[0].nim;
          nama = object[0].nama;
          fak = object[0].fak;
          jurusan = object[0].jurusan;
          prodi = object[0].prodi;
          foto = object[0].foto;
          auth = object[0].auth;
          $("#nim").text("" + nim);
          $("#nama").text(nama);
          $("#fak").text(fak + " / " + jurusan + " / " + prodi);
          $("#foto").attr("src", foto);
          getAnnounce();
        } else {
          logout();
        }
      });
  }
  function logout() {
    dbPromise.then(function(db) {
      var tx = db.transaction("mahasiswa", "readwrite");
      var store = tx.objectStore("mahasiswa");
      let object = store.getAll();

      store.delete(nim);
      window.location.replace("../login.html");
    });
  }
  function getAnnounce() {
    $.ajax({
      url: `https://em.ub.ac.id/em-event/getDaf/${nim}/${idParam}`,
      type: "GET",
      dataType: "json",
      success: function(response) {
        $(".pengumuman").append(
              '<p class="text-center">Pengumuman dapat dicek pada link drive dibawah ini<br>' +
              '<a style="color: rgb(8, 8, 250);" href="https://bit.ly/PanitiaRAJA2021">https://bit.ly/PanitiaRAJA2021</a>'
        );
        // if (response.data.DAFTAR[0].STATUS === "DITERIMA") {
        //   $(".pengumuman").append(
        //     '<p class="text-center">Selamat<br>' +
        //       nama +
        //       " <br />Kamu diterima di " +
        //       response.data.AGENDA[0].AGENDA +
        //       "</p>" +
        //       "<br>" +
        //       '<img src="https://stickershop.line-scdn.net/stickershop/v1/sticker/174711670/iPhone/sticker_animation@2x.png" alt=""/><br /><br /><pre class="text-center text-white overflow-hidden h5" style="font-family:segoe UI; white-space:normal">' +
        //       response.data.AGENDA[0].JARKOMAN +
        //       "</pre><br>"
        //   );
        // } else {
        //   $(".pengumuman").append(
        //     '<p style="font-weight: 400" class="text-center">Mohon maaf, Kamu belum diterima di ' +
        //       response.data.AGENDA[0].AGENDA +
        //       '<br /></p><img src="https://stickershop.line-scdn.net/stickershop/v1/sticker/4019813/iPhone/sticker_animation@2x.png" alt=""/>'
        //   );
        //   $(".kata-mutiara").append(
        //     "<p>Kegagalan adalah awal dari keberhasilan. <br />-Anonim</p>"
        //   );
        // }
      }
    });
  }
});
