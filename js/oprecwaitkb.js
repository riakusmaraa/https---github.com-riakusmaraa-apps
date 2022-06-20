$(document).ready(function() {
  $.ajaxSetup({
    cache: false,
    timeout: 10000,
    error: function(jqXHR, textStatus, errorThrown) {
      if (jqXHR.status == 404) {
        $("#refreshbtn").html(
          '<button class="refreshbtn" onclick="window.location.reload(true)">⟲ Refresh</button>'
        );
      } else {
        $("#refreshbtn").html(
          '<button class="refreshbtn" onclick="window.location.reload(true)">⟲ Refresh</button>'
        );
      }
    }
  });
  $(document)
    .ajaxStart(function() {
      $("#waitingcontent").css("display", "block");
      $("#loader").css("display", "block");
    })
    .ajaxStop(function() {
      $("#edit").removeClass("d-none");
      $("#waitingcontent").css("display", "block");
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
  var pageParam = urlParams.get("page");
  if (idParam === null || pageParam === null) {
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
          getKonten();
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
      window.location.replace("../login.html?page=" + window.location.href);
    });
  }
  var bioresponse;
  var dafresponse;
  function getKonten() {
    $.ajax({
      url: `https://em.ub.ac.id/em-event/getDaf/${nim}/${idParam}`,
      method: "get",
      dataType: "json",
      success: function(response) {
        dafresponse = response.data;

        if (dafresponse.BIODATA.AGAMA == null) {
          $("#guide").text("Silahkan mengisi biodata terlebih dahulu");
          $("#pilihan").css("display", "none");
          $("#formulir").css("display", "none");
          $("#twibbon").css("display", "none");
          $("#pengumuman").css("display", "none");
        } else {
          $("#editbtn").removeClass("ripple");
          $("#pilihan").html(
            '<img src="../img/3Proker/icon/ICON EDIT.svg" alt="" /><button id="pilihanbtn" type="button" class="btnactive ripple">PILIHAN</button>'
          );
          $("#guide").text(
            "Silahkan mengisi pilihan untuk mendaftarkan diri"
          );
        }
      }
    })
      .done(function() {
        if (dafresponse.AGENDA[0].TWIBBON != "" && dafresponse.DAFTAR != null) {
          $("#twibbon").html("");
          $("#formulir").html("");
          $("#pengumuman").html("");
          $('select[name="pilihan1"]').html("");
          $("#textarea1").html("");

          $('select[name="pilihan2"]').html("");

          $("#textarea2").html("");
          $("#textarea3").html("");
          $("#textarea4").html("");
          $("#textarea5").html("");
          $('select[name="tiket"]').html("");
          $("#twibbon").append(
            '<img src="../img/3Proker/icon/IKON TWIBBON.svg" alt="" /><button type="button" class="btnactive">TWIBBON</button></a>'
          );
          $("#twibbon button").wrap(
            '<a href="https://em.ub.ac.id/apps/style/' +
              dafresponse.AGENDA[0].TWIBBON +
              '"target="_blank"></a> '
          );
        } else {
          $("#twibbon").html("");
          $("#formulir").html("");
          $("#pengumuman").html("");
          $('select[name="pilihan1"]').html("");
          $("#textarea1").html("");

          $('select[name="pilihan2"]').html("");

          $("#textarea2").html("");
          $("#textarea3").html("");
          $("#textarea4").html("");
          $("#textarea5").html("");
          $('select[name="tiket"]').html("");
          $("#editbtn").removeClass("ripple");
          $("#pilihan").html(
            '<img src="../img/3Proker/icon/ICON EDIT.svg" alt="" /><button id="pilihanbtn" type="button" class="btnactive ripple">PILIHAN</button>'
          );
          $("#guide").text(
            "Silahkan mengisi pilihan untuk mendaftarkan diri"
          );
        }
        if (dafresponse.DAFTAR != null) {
          $("#pilihanbtn").removeClass("ripple");
          $("#formulir").append(
            '<img src="../img/3Proker/icon/IKON PRINT.svg" alt="" /><button type="button" class="btnactive">CETAK FORMULIR</button>'
          );
          let announcedate = new Date(dafresponse.AGENDA[0].TGL_PENGUMUMAN);
          $("#guide").text("Pastikan kamu mengisi semua datamu dengan benar");

          $("#pengumuman").append(
            '<img src="../img/3Proker/icon/IKON PENGUMUMAN.svg" alt="" /><button type="button" class="btnactive">PENGUMUMAN<h6 class="countdowntime" class="text-center"></h6></button>'
          );

          var countDownDate = new Date(
            dafresponse.AGENDA[0].TGL_PENGUMUMAN
          ).getTime();
          var x = setInterval(function() {
            var now = new Date().getTime();
            var distance = countDownDate - now;
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor(
              (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            var minutes = Math.floor(
              (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
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

            if (distance < 0) {
              clearInterval(x);
              $("#pengumuman button").addClass("countdown");
              $(".countdowntime").html("");
              $(".countdowntime").append(
                '<p class="announcement" >Cek Disini!</p>'
              );
            }
          }, 1000);
        }
        $("#agenda").text("Di " + dafresponse.AGENDA[0].AGENDA);
      })
      .done(function() {
        dafresponse.PILIHAN.forEach(data => {
          $('select[name="pilihan1"]').append(
            '<option value="' +
              data.ID_PILIHAN +
              '">' +
              data.TB_PILIHAN +
              "</option>"
          );
          $('select[name="pilihan2"]').append(
            '<option value="' +
              data.ID_PILIHAN +
              '">' +
              data.TB_PILIHAN +
              "</option>"
          );
        });
      })
      .done(function() {
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
        dafresponse.JADWAL.forEach(data => {
          if (
            data.BATASAN >= 1 &&
            new Date(data.JADWAL).setHours(24) > new Date()
          ) {
            let currentdate = new Date();

            let datestart = data.JADWAL;

            let datestartfix = new Date(
              Date.parse(datestart.replace("-", "/", "g"))
            );

            let daystartobj = datestartfix.getUTCDate() + 1;

            let monthstartobj = months[datestartfix.getUTCMonth()];

            let date = "" + daystartobj + " " + monthstartobj + " 2021";

            $('select[name="tiket"]').append(
              '<option value="' +
                data.ID_JADWAL +
                '">' +
                date +
                " (" +
                data.BATASAN +
                ")</option>"
            );
          } else {
            let datestart = data.JADWAL;

            let datestartfix = new Date(
              Date.parse(datestart.replace("-", "/", "g"))
            );

            let daystartobj = datestartfix.getUTCDate() + 1;

            let monthstartobj = months[datestartfix.getUTCMonth()];

            let date = "" + daystartobj + " " + monthstartobj + " 2021";

            $('select[name="tiket"]').append(
              '<option disabled value="' +
                data.ID_JADWAL +
                '">' +
                date +
                " (" +
                data.BATASAN +
                ")</option>"
            );
          }
        });
      })
      .done(function() {
        if (dafresponse.DAFTAR != null) {
          getDaftar(bioresponse, dafresponse);
        }
      });
  }
  function getDaftar(response, dafresponse) {
    $("textarea[name=portofolio]").val(dafresponse.DAFTAR[0].PORTOFOLIO);

    $("#exampleModalLongTitle")
      .promise()
      .done(function() {
        let id_pilihan = dafresponse.DAFTAR[0].ID_PILIHAN;

        $('select[name="pilihan1"] option[value="' + id_pilihan + '"]').attr(
          "selected",
          true
        );
        $("#textarea1").val(dafresponse.DAFTAR[0].ALASAN);
        let id_pilihan2 = dafresponse.DAFTAR[0].ID_PILIHAN2;

        $('select[name="pilihan2"] option[value="' + id_pilihan2 + '"]').attr(
          "selected",
          true
        );
        $("#textarea2").val(dafresponse.DAFTAR[0].ALASAN2);
        $("#textarea3").val(dafresponse.DAFTAR[0].ALASAN_UMUM);
        $("#textarea4").val(dafresponse.DAFTAR[0].TARGET);
        $("#textarea5").val(dafresponse.DAFTAR[0].IDE_KREATIF);
        let tiket = dafresponse.DAFTAR[0].ID_C_JADWAL;
        $("option[value=" + tiket + "]").attr("selected", true);
      });

    screening(dafresponse);
  }
  function screening(response) {
    $('select[name="pilihan1"]')
      .promise()
      .done(function() {
        if (response.DAFTAR[0].STATUS != "DAFTAR") {
          $('select[name="pilihan1"]').attr("disabled", true);
          $("#textarea1").attr("disabled", true);

          $('select[name="pilihan2"').attr("disabled", true);
          $("#textarea2").attr("disabled", true);
          $("#textarea3").attr("disabled", true);
          $("#textarea4").attr("disabled", true);
          $("#textarea5").attr("disabled", true);
          $('select[name="tiket"]').attr("disabled", true);
        }
      });
  }

  $("#pilihan").on("click", function() {
    if (new Date() > new Date(dafresponse.AGENDA.TGL_TUTUP)) {
      Swal.fire({
        type: "error",
        title: "Maaf!",
        text: "Pendaftaran sudah ditutup"
      });
    } else {
      $("#exampleModalCenter").modal("show");
    }
  });
  $("#edit").on("click", function() {
    window.location.replace(
      "../form/formulir.html?id=" + idParam + "&page=" + pageParam
    );
  });
  $("#pengumuman").on("click", ".countdown", function() {
    // window.location.replace("../pengumuman/selamat.html?id=" + idParam);
    $.ajax({
      url: `https://em.ub.ac.id/em-event/getDaf/${nim}/${idParam}`,
      type: "GET",
      dataType: "json",
      success: function(response) {
        if (response.data.DAFTAR[0].STATUS === "DITERIMA") {
          window.location.replace("../pengumuman/selamat.html?id=" + idParam);
        } else {
          window.location.replace("../pengumuman/semangat.html?id=" + idParam);
        }
      }
    });
  });
  $("#formulir").on("click", function() {
    nim = window.btoa("apps" + nim);
    let reversed = "";
    for (var i = nim.length - 1; i >= 0; i--) {
      reversed += nim[i];
    }

    let url1 = `https://em.ub.ac.id/apps/exportpdf/form1.php?id=${idParam}&&key=${reversed}`;
    let url2 = `https://em.ub.ac.id/apps/exportpdf/form2.php?id=${idParam}&&key=${reversed}`;
    let url3 = `https://line.me/R/ti/g/9xGAgsWVwF`;
    Swal.fire({
      title: "Download Formulir",
      html:
        '<a id="formpop" href="' +
        url1 +
        '"><button type="button" class="prokerbtn form1">Form 1</button></a>' +
        "<br><br>" +
        '<a href="' +
        url2 +
        '"><button type="button" class="prokerbtn form2">Form 2</button></a>' +
        "<br><br>" +'<p class:"m-auto" style:"font-weight: 300">Silahkan bergabung pada grup menggunakan tautan berikut <a style="color: #007bff;" href="' +
				url3 +
				'" target="_blank">klik disini</a></p>',
      animation: true
    });
  });

  $("#daftarclick").on("click", function() {
    let id_pilihan = $("select[name=pilihan1]").val();

    let alasan = $("textarea[name=alasan1]").val();

    let id_pilihan2 = $("select[name=pilihan2]").val();
    let alasan2 = $("textarea[name=alasan2]").val();

    let portofolio = $("textarea[name=portofolio]").val();
    let target = $("textarea[name=target]").val();

    let ide_kreatif = $("textarea[name=ide_kreatif]").val();

    let id_c_jadwal = $("select[name=tiket]").val();
    let id_pilihan_diterima = id_pilihan;

    let alasan_umum = $("textarea[name=alasan_umum]").val();

    $.ajax({
      url: `https://em.ub.ac.id/em-event/daftar`,
      type: "POST",
      dataType: "json",
      data: {
        id_agenda: idParam,
        nim: nim,
        auth: auth,
        id_pilihan: id_pilihan,
        alasan: alasan,
        id_pilihan2: id_pilihan2,
        alasan2: alasan2,
        id_pilihan_diterima: id_pilihan_diterima,
        alasan_umum: alasan_umum,
        target: target,
        ide_kreatif: ide_kreatif,
        id_c_jadwal: id_c_jadwal,
        portofolio: portofolio
      },

      success: function(response) {
        Swal.fire({
          type: "success",
          title: "Selamat!",
          text: "Data berhasil dirubah"
        }).then(result => {
          if (result.value) {
            getKonten();
            $("#exampleModalCenter").modal("hide");
          }
        });
      },
      error: function() {
        Swal.fire({
          type: "error",
          title: "Oops!",
          text: "Pastikan kamu mengisi semua data dengan benar!"
        }).then(result => {
          if (result.value) {
          }
        });
      }
    });
  });
});
