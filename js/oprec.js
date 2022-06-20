$(document).ready(function() {
  $.ajaxSetup({
    cache: false,
    timeout: 10000,
    error: function(jqXHR, textStatus, errorThrown) {
      if (jqXHR.status == 404) {
        $("#refreshbtn").html(
          '<button class="refreshbtn" onclick="window.location.reload()">⟲ Refresh</button>'
        );
      } else {
        $("#refreshbtn").html(
          '<button class="refreshbtn" onclick="window.location.reload()">⟲ Refresh</button>'
        );
      }
    }
  });
  $(document)
    .ajaxStart(function() {
      $("#loader").css("display", "block");
    })
    .ajaxStop(function() {
      $("#loader").fadeOut();
    });
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
  var nim;
  var nama_lengkap;
  var fak;
  var jurusan;
  var prodi;
  var foto;
  var auth;
  getData();
  getAgenda();
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
          $("#nim").text("" + nim);
          $("#nama").text(nama);
          $("#fak").text(fak + " / " + jurusan + " / " + prodi);
          $("#foto").attr("src", foto);
        }
      });
  }
  function logout() {
    dbPromise.then(function(db) {
      var tx = db.transaction("mahasiswa", "readwrite");
      var store = tx.objectStore("mahasiswa");
      let object = store.getAll();

      store.delete(nim);
      window.location.replace("login.html");
    });
  }
  function getAgenda() {
    $.ajax({
      url: `https://em.ub.ac.id/em-event/getAllAgend`,
      method: "get",
      dataType: "json",
      success: function(obj) {
        let response = obj.data;
        var months = [
          "Januari",
          "Februari",
          "Maret",
          "April",
          "Mei",
          "Juni",
          "Juli",
          "Agustus",
          "September",
          "Oktober",
          "November",
          "Desember"
        ];
        response = response.reverse();
        response.forEach(data => {
          if (
            data.STATUS === "PUBLISH" &&
            new Date(data.TGL_BUKA) < new Date()
          ) {
            let datestart = data.TGL_BUKA;
            let dateend = data.TGL_TUTUP;
            let datestartfix = new Date(
              Date.parse(datestart.replace("-", "/", "g"))
            );
            let dateendfix = new Date(
              Date.parse(dateend.replace("-", "/", "g"))
            );

            let announcedate = new Date(data.TGL_PENGUMUMAN);
            let closedate = new Date(data.TGL_TUTUP);
            console.log("Sekarang " + new Date());
            console.log("pengumuman " + announcedate);
            console.log("tutup " + closedate);
            let go = "Daftar";

            if (new Date() > announcedate && new Date() > closedate) {
              go = "Pengumuman";
            } else if (new Date() < announcedate && new Date() > closedate) {
              go = "Tunggu pengumuman";
            }
            let daystartobj = datestartfix.getUTCDate();
            let monthstartobj = months[datestartfix.getUTCMonth()];
            let dayendobj = dateendfix.getUTCDate();
            let monthendobj = months[dateendfix.getUTCMonth()];
            let date =
              "" +
              daystartobj +
              " " +
              monthstartobj +
              " - " +
              dayendobj +
              " " +
              monthendobj;

            $(".agendawrap").append(
              '<div class="col-lg-4 col-md-6 no-gutters"><div class="agendacard"><div class="agendaimg"><img src="' +
                data.FOTO +
                '" alt="" /></div><div class="agendacardcontent"><h3 class="agendatitle">' +
                data.TB_AGENDA +
                "</h3><p>" +
                data.DESKRIPSI +
                '</p><div class="row"><div class="col-6"><p>' +
                date +
                '</p></div><div id="' +
                data.ID_AGENDA +
                '" class="col-6"><a href="' +
                data.HALAMAN +
                "?id=" +
                data.ID_AGENDA +
                "&page=" +
                data.HALAMAN +
                '"><span class="agendago">' +
                go +
                '<i class="fas fa-paper-plane"></i></span></a></div></div></div></div></div>'
            );
          }
          if (nim == null) {
            $(".agendago").wrap(
              '<a href="login.html?page=' + window.location.href + '"></a>'
            );
          }
        });
      }
    });
  }

  $("#edit").on("click", function() {
    window.location.replace("../form/formulir.html?id=" + idParam + "");
  });

  $(".proker").on("click", function() {
    let result = $(this).attr("id");

    let result2 = (result += "s");
    for (let i = 1; i <= 3; i++) {
      if ($(".childcontent").is(":visible")) {
        $(".childcontent").slideUp();
      }
    }
    if ($("#" + result2).is(":visible")) {
      $("#" + result2).slideUp();
    } else {
      $("#" + result2).slideToggle();
    }
  });
  // $("a[id=daftarbtn]").attr(
  //   "href",
  //   "../form/formulir.html?id=" + sessionStorage.getItem("idparam")
  // );
});
