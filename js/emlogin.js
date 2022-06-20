$(document).ready(function() {
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
  var pageParam = urlParams.get("page");
  $("#loginform").on("submit", function() {
    event.preventDefault();
    var nim = $("#nim").val();
    var password = $("#password").val();
    $.ajax({
      url:
        "https://em.ub.ac.id/redirect/login/loginApps/?nim=" +
        nim +
        "&password=" +
        password +
        "",
      type: "POST",
      dataType: "json",
      success: function(status) {
        if (status.status) {
          addData(status, dbPromise, password);
          if (pageParam != null) {
            window.location.replace(pageParam);
          } else {
            window.location.replace("index.html");
          }
        } else {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Username / password kamu salah, coba lagi ya"
          });
        }
      }
    });
  });

  $("#guest").on("click", function() {
    sessionStorage.setItem("nim", "guest");
    window.location.replace("index.html");
  });

  function addData(status, dbPromise, password) {
    dbPromise
      .then(function(db) {
        var tx = db.transaction("mahasiswa", "readwrite");
        var store = tx.objectStore("mahasiswa");
        var item = {
          nama: status.nama,
          nim: status.nim,
          fak: status.fak,
          jurusan: status.jurusan,
          prodi: status.prodi,
          foto: status.foto,
          auth: window.btoa(password),
          created: new Date().getTime()
        };
        store.add(item); //menambahkan key "buku"
        return tx.complete;
      })
      .then(function() {})
      .catch(function() {});
  }
});
