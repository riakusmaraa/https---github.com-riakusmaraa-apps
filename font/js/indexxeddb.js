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
$("#add").on("click", function() {
  dbPromise
    .then(function(db) {
      var tx = db.transaction("mahasiswa", "readwrite");
      var store = tx.objectStore("mahasiswa");
      var item = {
        nama: "Fawwaz Daffa Muhammad",
        nim: "175150400111035",
        fakultas: "Fakultas Ilmu Komputer",
        created: new Date().getTime()
      };
      store.add(item); //menambahkan key "buku"
      return tx.complete;
    })
    .then(function() {
      console.log("Mahasiswa berhasil disimpan.");
    })
    .catch(function() {
      console.log("Mahasiswa gagal disimpan.");
    });
});

$("#get").on("click", function() {
  dbPromise
    .then(function(db) {
      var tx = db.transaction("mahasiswa", "readwrite");
      var store = tx.objectStore("mahasiswa");
      return store.getAll();
    })
    .then(function(object) {
      object.forEach(function(data) {
        console.log(data.nim);
        console.log(data.nama);
        console.log(data.fakultas);
      });
    });
});

$("#delete").on("click", function() {
  dbPromise
    .then(function(db) {
      var tx = db.transaction("mahasiswa", "readwrite");
      var store = tx.objectStore("mahasiswa");
      store.delete("175150400111035");
      return tx.complete;
    })
    .then(function() {
      console.log("Item Deleted");
    });
});
