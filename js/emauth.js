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

  var nim;
  var nama_lengkap;
  var fak;
  var jurusan;
  var prodi;
  var foto;
  var auth;

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
          nama_lengkap = object[0].nama;
          fak = object[0].fak;
          jurusan = object[0].jurusan;
          prodi = object[0].prodi;
          foto = object[0].foto;
          auth = object[0].auth;
          $("#nim").text("" + nim);
          $("#nama").text("" + nama_lengkap);
          $("#fak").text(fak + " / " + jurusan + " / " + prodi);
          $("#foto").attr("src", foto);
          getLink();
        } else {
          logout(window.location.href);
        }
      });
  }
  function logout(url) {
    dbPromise.then(function(db) {
      var tx = db.transaction("mahasiswa", "readwrite");
      var store = tx.objectStore("mahasiswa");
      let object = store.getAll();

      store.delete(nim);
      window.location.replace("login.html/page=" + url);
    });
  }
});
