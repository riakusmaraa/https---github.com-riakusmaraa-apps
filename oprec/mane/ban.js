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

  var nim;
  var nama;
  var fak;
  var jurusan;
  var prodi;
  var foto;
  var auth;
  getData();
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
  // var urlParams = new URLSearchParams(window.location.search);
  // var idParam = urlParams.get("id");
  // var pageParam = urlParams.get("page");
  // if (idParam === null || pageParam === null) {
  //   window.location.replace("../oprec.html");
  // }

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

          getMenu(true);
        } else {
          getMenu(false);
        }
      });
  }

  function getMenu(isLogin) {
    if (isLogin) {
      let voteStatus =
        '<img src="img/check-mark.svg" class="d-block ml-auto mr-auto mt-4 w-25" /><p class="text-white">Great you already vote!</p>';
      let unvoteStatus = '<button class="ban-btn">Vote now</button>';
      let mawapresStatus =
        '<a href="vote.html?q=mawapres">' + unvoteStatus + "</a>";
      let bemStatus = '<a href="vote.html?q=bem">' + unvoteStatus + "</a>";
      let dpmStatus = '<a href="vote.html?q=dpm">' + unvoteStatus + "</a>";
      let ukmStatus = '<a href="vote.html?q=ukm">' + unvoteStatus + "</a>";
      let chairmanStatus =
        '<a href="vote.html?q=chairman">' + unvoteStatus + "</a>";
      $.ajax({
        url: `https://em.ub.ac.id/siem/awarding/rekap`,
        type: `POST`,
        data: {
          nim: nim,
          password: auth
        },
        dataType: `JSON`,
        success: r => {
          if (r.error) {
            console.log(r.message);
          } else {
            if (r.data.vote != false) {
              r.data.vote.forEach(element => {
                if (element.kategori == "bem") {
                  bemStatus = voteStatus;
                }
                if (element.kategori == "dpm") {
                  dpmStatus = voteStatus;
                }
                if (element.kategori == "ukm") {
                  ukmStatus = voteStatus;
                }

                if (element.kategori == "chairman") {
                  chairmanStatus = voteStatus;
                }
                if (element.kategori == "mawapres") {
                  mawapresStatus = voteStatus;
                }
              });
            }
            $(".menu-wrap").html(
              '<div class="row justify-content-center"><div class="col-md-4"><div class="bancard purple-primary"><h5 class="mb-3 font-weight-bold">Mawapres</h5><img src="img/chairman.svg" alt="" />' +
                mawapresStatus +
                "</div></div></div>"
            );
          }
        }
      });
    } else {
      $(".menu-wrap").html(
        '<div class="row justify-content-center"><div class="col-md-4"><div class="bancard cyan-primary"><h5 class="mb-3">Silahkan login terlebih dahulu untuk melakukan voting</h5><img src="img/bem.svg" alt="" /><a href="../login.html?page=' +
          window.location.href +
          '"><button class="ban-btn">Login</button></a></div></div></div>'
      );
    }
  }

  var countDownDate = new Date(2019, 11, 02, 12, 00).getTime();
  var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    $(".countdowntime").text(
      days +
        " hari " +
        hours +
        " jam " +
        minutes +
        " menit " +
        seconds +
        " detik "
    );
  });
});
