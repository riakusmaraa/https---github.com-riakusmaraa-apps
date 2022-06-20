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
      console.log("loader show");
      $("#waitingcontent").hide();
      $("#loader").css("display", "block");
    })
    .ajaxStop(function() {
      console.log("loader hide");
      $("#waitingcontent").show();
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
  if(idParam === null || pageParam===null){
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
      window.location.replace("../login.html");
    });
  }
  function getKonten() {
    $.ajax({
      url: `https://em.ub.ac.id/redirect/getBio/${nim}`,
      method: "get",
      dataType: "json",
      success: function(response) {
        if (response.data[0] != null) {
          $("#editbtn").removeClass("ripple");
          $("#pilihan").html(
            '<img src="../img/3Proker/icon/ICON EDIT.svg" alt="" /><button id="pilihanbtn" type="button" class="btnactive ripple">PILIHAN</button>'
          );
          $("#guide").text(
            "Silahkan mengisi pilihan untuk mendaftarkan diri pada proker ini"
          );
        } else {
          $("#guide").text("Silahkan mengisi biodata terlebih dahulu");
        }
      }
    }).done(function() {
      var dafresponse;
      $.ajax({
        url: `https://em.ub.ac.id/redirect/getDaf/${idParam}/${nim}`,
        type: "GET",
        dataType: "json",
        success: function(obj) {
          dafresponse = obj;
        }
      }).done(function(){      
      $.ajax({
        url: `https://em.ub.ac.id/redirect/getAgend/${idParam}`,
        method: "get",
        dataType: "json",
        success: function(response) {
          if (response.data.length == 0) {
            window.location.replace("../oprec.html");
          } else {
            
            if (response.data[0].TWIBBON != null && dafresponse.data.length !=0) {
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
                '<a href="' +
                  response.data[0].TWIBBON +
                  '" download="twibbon" target="_blank"></a> '
              );
            }
            if (dafresponse.data.length !=0) {
              
              $("#pilihanbtn").removeClass("ripple");
              $("#formulir").append(
                '<img src="../img/3Proker/icon/IKON PRINT.svg" alt="" /><button type="button" class="btnactive">CETAK FORMULIR</button>'
              );
              let announcedate = new Date(response.data[0].TGL_PENGUMUMAN);
              $("#guide").text("Pastikan kamu mengisi semua datamu dengan benar");

              $("#pengumuman").append(
                '<img src="../img/3Proker/icon/IKON PENGUMUMAN.svg" alt="" /><button type="button" class="btnactive">PENGUMUMAN<h6 class="countdowntime" class="text-center"></h6></button>'
              );

              var countDownDate = new Date(
                response.data[0].TGL_PENGUMUMAN
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
                $(".countdowntime").text(days+" hari "+
                  hours + " jam " + minutes + " menit " + seconds + " detik "
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
            $("#agenda").text("DI " + response.data[0].TB_AGENDA);
          }
        }
      }).done(function() {
        $.ajax({
          url: `https://em.ub.ac.id/redirect/getPil/${idParam}`,
          method: "get",
          dataType: "json",
          success: function(response) {
            response.data.forEach(data => {
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
          }
        }).done(function() {
          $.ajax({
            url: `https://em.ub.ac.id/redirect/getTik/${idParam}`,
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
              response.forEach(data => {
                if (data.SISA != 0 && new Date(data.JADWAL).setHours(24) > new Date()) {
                  let currentdate = new Date();
                  
                  let datestart = data.JADWAL;

                  let datestartfix = new Date(
                    Date.parse(datestart.replace("-", "/", "g"))
                  );

                  let daystartobj = datestartfix.getUTCDate() + 1;

                  let monthstartobj = months[datestartfix.getUTCMonth()];

                  let date = "" + daystartobj + " " + monthstartobj + " 2019";

                  $('select[name="tiket"]').append(
                    '<option value="' +
                      data.ID_C_JADWAL +
                      '">' +
                      date +
                      " (" +
                      data.SISA +
                      ")</option>"
                  );
                }                  
                 else {
                  let datestart = data.JADWAL;

                  let datestartfix = new Date(
                    Date.parse(datestart.replace("-", "/", "g"))
                  );

                  let daystartobj = datestartfix.getUTCDate() + 1;

                  let monthstartobj = months[datestartfix.getUTCMonth()];

                  let date = "" + daystartobj + " " + monthstartobj + " 2019";

                  $('select[name="tiket"]').append(
                    '<option disabled value="' +
                      data.ID_C_JADWAL +
                      '">' +
                      date +
                      " (" +
                      data.SISA +
                      ")</option>"
                  );
                }
              });
            }
          }).done(function() {
            $.ajax({
              url: `https://em.ub.ac.id/redirect/getPortofolio/${nim}`,
              type: "get",
              dataType: "json",
              success: function(response) {
                $("textarea[name=portofolio]").val(response.data[0].PORTOFOLIO);
              }
            }).done(function() {
              $.ajax({
                url: `https://em.ub.ac.id/redirect/getDaf/${idParam}/${nim}`,
                type: "GET",
                dataType: "json",

                success: function(response) {
                  $("#exampleModalLongTitle")
                    .promise()
                    .done(function() {
                      
                      let id_pilihan = response.data[0]["ID_PILIHAN"];
                      
                      $('select[name="pilihan1"] option[value="' + id_pilihan + '"]').attr(
                        "selected",
                        true
                      );
                      $("#textarea1").val(response.data[0]["ALASAN"]);
                      let id_pilihan2 = response.data[0]["ID_PILIHAN2"];
                      
                      $('select[name="pilihan2"] option[value="' + id_pilihan2 + '"]').attr(
                        "selected",
                        true
                      );
                      $("#textarea2").val(response.data[0]["ALASAN2"]);
                      $("#textarea3").val(response.data[0]["ALASAN_UMUM"]);
                      $("#textarea4").val(response.data[0]["TARGET"]);
                      $("#textarea5").val(response.data[0]["IDE_KREATIF"]);
                      let tiket = response.data[0]["ID_C_JADWAL"];
                      $("option[value=" + tiket + "]").attr("selected", true);
                      
                    });
                }
              }).done(function() {
                $.ajax({
                  url: `https://em.ub.ac.id/redirect/getDaf/${idParam}/${nim}`,
                  type: "GET",
                  dataType: "json",
                  success: function(response) {
                    screening(response);                   
                    
                  }
                });
              });
            });
          });
        });
      });
    });
    });
  }

  function screening(response) {
    $('select[name="pilihan1"]')
      .promise()
      .done(function() {
        if (response.data[0]["STATUS"] != "DAFTAR") {
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
    $.ajax({
      url: `https://em.ub.ac.id/redirect/getAgend/${idParam}`,
      method: "get",
      dataType: "json",
      success: function(obj) {
        if (new Date() > new Date(obj.data[0].TGL_TUTUP)) {
          $.ajax({
            url: `https://em.ub.ac.id/redirect/getDaf/${idParam}/${nim}`,
            method: "get",
            dataType: "json",
            success: function(response) {
              if (response.data === null) {
                Swal.fire({
                  type: "error",
                  title: "Maaf!",
                  text: "Pendaftaran sudah ditutup"
                });
              } else {
                $("#exampleModalCenter").modal("show");
              }
            }
          });
        } else {
          $("#exampleModalCenter").modal("show");
        }
      }
    });
  });
  $("#edit").on("click", function() {
    window.location.replace("../form/formulir.html?id=" + idParam+"&page="+pageParam);
  });  
  $("#pengumuman").on("click",".countdown", function() {                       
      window.location.replace("../pengumuman/?id=" + idParam);                          
  });
  $("#formulir").on("click", function() {
    nim = window.btoa("apps" + nim);
    let reversed = "";
    for (var i = nim.length - 1; i >= 0; i--) {
      reversed += nim[i];
    }

    let url1 = `http://kampungbudaya.com/exportpdf/form1.php?id=${idParam}&&key=${reversed}`;
    let url2 = `http://kampungbudaya.com/exportpdf/form2.php?id=${idParam}&&key=${reversed}`;
    Swal.fire({
      title: "Download Formulir",
      html:
        "<a href='" +
        url1 +
        "'><button type='button' class='prokerbtn'>Form 1</button></a>" +
        "<br><br>" +
        "<a href='" +
        url2 +
        "'><button type='button' class='prokerbtn'>Form 2</button></a>" +
        "<br><br>" +
        "<p class:'m-auto' style:'font-weight: 300'>*Semua form dicetak dan dibawa saat screening</p>",
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
      url: `https://em.ub.ac.id/redirect/biodata/addDataDaftar`,
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
        id_c_jadwal: id_c_jadwal
      },

      success: function(response) {}
    });

    $.ajax({
      url: `https://em.ub.ac.id/redirect/biodata/updatePortofolio`,
      type: "POST",
      dataType: "json",
      data: {
        nim: nim,
        auth: auth,
        portofolio: portofolio
      },

      success: function(response) {}
    });
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
  });
});
