$(document).ready(function() {
  $.ajaxSetup({
    cache: false,
    timeout: 10000,
    cache: false,
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

          $('input[name="name"]').val(nama_lengkap);
        } else {
          if (nim == null) {
            $(".addsambatwrap").append(
              '<a href="../login.html?page=' +
                window.location.href +
                '"><button type="button" data-toggle="modal" data-target="#" class="addsambat"><i class="fas fa-plus"></i></button></a>'
            );
          } else {
            $(".addsambatwrap").append(
              '<button type="button" data-toggle="modal" data-target="#modalSambat" class="addsambat"><i class="fas fa-plus"></i></button>'
            );
          }
        }
      });
  }

  function logout() {
    dbPromise.then(function(db) {
      var tx = db.transaction("mahasiswa", "readwrite");
      var store = tx.objectStore("mahasiswa");
      let object = store.getAll();

      store.delete(nim);
      window.location.replace("login.html?page=" + window.location.href);
    });
  }
  $(document)
    .ajaxStart(function() {
      $("#loader").css("display", "block");
    })
    .ajaxStop(function() {
      $("#loader").fadeOut();
    });
  $.ajax({
    url: `https://em.ub.ac.id/siem/api/post/brawijaya/sambat`,
    type: `GET`,
    dataType: `json`,
    success: response => {
      loadsambat(response);
      $(".comment-form").on("submit", function() {
        event.preventDefault();

        let idSambat = this.id;
        let comment = $("#" + idSambat + "r").val();

        addSambatComment(idSambat, comment);
      });
    }
  })
    .promise()
    .done(function() {
      $(".sambatan").on("click", function() {
        let idSambat = this.id;
      });
    });
  // .promise()
  // .done(function() {
  //   $(".readmore").on("click", function() {
  //     let ringkasanid = this.id + "s";
  //     let ringkasanfull = this.id + "d";

  //     $("#" + ringkasanid).css("display", "none");
  //     $("#" + ringkasanfull).css("display", "block");
  //   });
  // });
  $("#sambat").addHook("afterIsLastPage", function() {
    $(".loadsambat").html("");
    $(".loadsambat").css("display", "none");
  });
  function loadsambat(sambat) {
    let proftpicimg = [
      '<img src="img/stikerara.png" alt="">',
      '<img src="img/stikerbaba.png" alt="">',
      '<img src="../img/logo2.png" alt="">'
    ];

    $("#sambat").pagination({
      dataSource: sambat,
      pageSize: 10,
      locator: "data",
      callback: function(response, pagination) {
        response.forEach(element => {
          let nama_lengkap = "";
          if (element.STATUS === "PUBLIC") {
            nama_lengkap = element.NAMA_LENGKAP;
          } else {
            nama_lengkap = "Mahasiswa Brawijaya";
          }
          let komentar = "";
          let komentarcount = 0;
          let ringkasan = element.RINGKASAN;
          let proftpic = "";
          if (element.NAMA_LENGKAP == "EM UB OFFICIAL") {
            proftpic = proftpicimg[2];
          } else {
            proftpic = proftpicimg[Math.round(Math.random())];
          }
          if (element.RINGKASAN.length > 100) {
            let ringkasanpiece = element.RINGKASAN.slice(0, 100);

            ringkasan =
              '<p class="sambatan" id="' +
              element.ID_SAMBATAN +
              's">' +
              ringkasanpiece +
              '...<span class="readmore" id="' +
              element.ID_SAMBATAN +
              '"> read more</span></p><p id="' +
              element.ID_SAMBATAN +
              'd"style="display:none">' +
              element.RINGKASAN +
              "</p>";
          }
          if (element.KOMENTAR != null) {
            let komentarInnerCount = 0;
            let comment = element.KOMENTAR.reverse();
            let proftpiccomment = "";
            comment.forEach(comment => {
              if (comment.NAMA_LENGKAP == "EM UB OFFICIAL") {
                proftpiccomment = proftpicimg[2];
              } else {
                proftpiccomment = proftpicimg[Math.round(Math.random())];
              }
              let timeComment = timeConverterComment(comment.TIMESTAMP);
              if (komentarInnerCount < 2) {
                komentar =
                  '<div class="sambatcomment-content"><div class="sambatcomment-content-proftpic">' +
                  proftpiccomment +
                  '</div><div class="sambatcomment-content-comment"><h6>' +
                  comment.NAMA_LENGKAP +
                  "</h6><p>" +
                  comment.KOMENTAR +
                  '</p><span class="commenttime ml-0">' +
                  timeComment +
                  '</span></div></div><hr class="sambatline">' +
                  komentar;
                komentarInnerCount++;
              }

              komentarcount++;
            });
          } else {
            komentar +=
              '<a href="single.html?q=' +
              window.btoa(element.ID_SAMBATAN) +
              '"> <div class="sambatcomment-content" style="justify-content:start"><div class="sambatcomment-content-comment" style="width:100%;"><p class="text-muted">Jadi yang pertama untuk komentar...</p></div></div></a><hr class="sambatline">';
          }
          let time = timeConverter(element.R_TIMESTAMP);
          $("#sambat").append(
            '<div class="sambatwrap"><div class="sambathead"><div class="sambatprofpict">' +
              proftpic +
              '</div><div class="sambatts"><h6>' +
              nama_lengkap +
              '</h6><span class="sambatcategory">' +
              element.R_KATEGORI +
              '</span></div></div><div class="sambatcontent"><a href="single.html?q=' +
              window.btoa(element.ID_SAMBATAN) +
              '"><p class="text-grey morecomment ml-0 mb-2 text-lowercase">Status:' +
              element.PROGRES +
              '</p><p id="">' +
              ringkasan +
              '</p><span class="morecomment ml-0">' +
              time +
              '</span></a></div><div class="sambatcomment"><div class="sambatcomment-count"><a href="single.html?q=' +
              window.btoa(element.ID_SAMBATAN) +
              '"><img src="../img/icon/chat.svg" alt=""><p>' +
              komentarcount +
              ' comment</p></a></div><div id=""class="sambatcomment-box"><div id="' +
              element.ID_SAMBATAN +
              'b"class="">' +
              komentar +
              "</div></div></div></div>"
          );
        });
      }
    });
  }
  function timeConverter(timestamp) {
    let now = new Date();
    var date = new Date(timestamp);
    let difference = now - date;
    difference = difference / (1000 * 60);

    if (difference < 5) {
      return "Beberapa menit yang lalu";
    } else if (difference >= 5 && difference < 60) {
      let minuteDifferent = now - date;
      minuteDifferent =
        Math.round(minuteDifferent / (1000 * 60)) + " menit yang lalu";
      return minuteDifferent;
    } else if (difference >= 60 && difference < 1440) {
      let hourDifferent = now - date;
      hourDifferent =
        Math.round(hourDifferent / (1000 * 3600)) + " jam yang lalu";
      return hourDifferent;
    } else if (difference >= 1440 && difference < 10080) {
      let daysDifferent = now - date;
      daysDifferent =
        Math.round(daysDifferent / (1000 * 3600 * 24)) + " hari yang lalu";
      return daysDifferent;
    } else {
      let time = date.toLocaleString("en-GB", {
        hour12: false,
        day: "2-digit",
        month: "long",
        year: "2-digit"
        // hour: "2-digit",
        // minute: "2-digit"
      });

      return time;
    }
  }

  function timeConverterComment(timestamp) {
    let now = new Date();
    var date = new Date(timestamp);
    let difference = now - date;
    difference = difference / (1000 * 60);

    if (difference < 5) {
      return "Beberapa menit yang lalu";
    } else if (difference >= 5 && difference < 60) {
      let minuteDifferent = now - date;
      minuteDifferent = Math.round(minuteDifferent / (1000 * 60)) + " menit";
      return minuteDifferent;
    } else if (difference >= 60 && difference < 1440) {
      let hourDifferent = now - date;
      hourDifferent = Math.round(hourDifferent / (1000 * 3600)) + " jam";
      return hourDifferent;
    } else if (difference >= 1440 && difference < 10080) {
      let daysDifferent = now - date;
      daysDifferent = Math.round(daysDifferent / (1000 * 3600 * 24)) + " hari";
      return daysDifferent;
    } else {
      let time = date.toLocaleString("en-GB", {
        hour12: false,
        day: "2-digit",
        month: "long",
        year: "2-digit"
        // hour: "2-digit",
        // minute: "2-digit"
      });

      return time;
    }
  }
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  $(".loadsambat").on("click", function() {
    $(".loadsambat").css("border", "1px solid white");
    $("#circle1").addClass("bounce1");
    $("#circle2").addClass("bounce2");
    $("#circle3").addClass("bounce3");
    setTimeout(function() {
      $("#sambat").pagination("next");
      $(".loadsambat").css("border", "1px solid #dd370c");
      $("#circle1").removeClass("bounce1");
      $("#circle2").removeClass("bounce2");
      $("#circle3").removeClass("bounce3");
    }, 1500);
  });
  $(".addsambat").on("click", function() {
    // $(".addsambat").css("display", "none");
    $(".overlaycard").css("display", "block");
    // $(".sambatcard").css("display", "block");
    // $(".sambatcard").css("height", "90vh");
  });
  $(".close-modal").on("click", function() {
    // $(".addsambat").css("display", "block");
    // $(".sambatcard").css("height", "0px");
    // $(".sambatcard").css("display", "none");
    $(".overlaycard").css("display", "none");
  });
  $("#sambatform").on("submit", function() {
    event.preventDefault();
    let contact = $('input[name="kontak"]').val();
    let category = $('select[name="kategorisambat"]').val();
    let privacy = $('select[name="privasi"]').val();

    let sambatan = $('textarea[name="isisambat"]').val();
    let file = $('input[name="filesambat"]').val();

    $.ajax({
      url: `https://em.ub.ac.id/siem/api/post/brawijaya/sambat/posting`,
      type: "post",
      data: {
        nim: nim,
        kontak: contact,
        komentar: sambatan,
        kategori: category,
        status: privacy,
        auth: auth
      },
      dataType: "JSON",
      success: response => {
        if (response.message === "Reach limit today!") {
          Swal.fire({
            type: "error",
            title: "Maaf",
            text: "Kamu sudah mencapai limit hari ini, kembali lagi besok ya!"
          });
        }
        if (response.message === "Success.") {
          Swal.fire({
            type: "success",
            title: "Berhasil!",
            text: "Terimakasih buat sambatanmu!"
          }).then(result => {
            if (result.value) {
              location.reload();
            }
          });
        }
        if (response.message === "Internal server error!") {
          Swal.fire({
            type: "error",
            title: "Maaf",
            text:
              "Terjadi kesalahan pada sistem, silahkan hubungi CP yang tertera"
          });
        }
      }
    });
  });
});
