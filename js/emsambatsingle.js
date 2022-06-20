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
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("q");
  if (idParam == null) {
    window.location.replace("index.html");
  } else {
    idParam = window.atob(idParam);
  }
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
            $(".addsambat").wrap(
              '<a href="../login.html?page=' + window.location.href + '"></a>'
            );
          }
        }
      });
  }
  $(document)
    .ajaxStart(function() {
      $("#loader").css("display", "block");
    })
    .ajaxStop(function() {
      $("#loader").fadeOut();
    });
  let proftpicimg = [
    '<img src="img/stikerara.png" alt="" />',
    '<img src="img/stikerbaba.png" alt="" />',
    '<img src="../img/logo2.png" alt="" />'
  ];
  $.ajax({
    url: `https://em.ub.ac.id/siem/api/post/brawijaya/sambat/${idParam}`,
    type: `GET`,
    dataType: `json`,
    success: r => {
      element = r.data;

      let komentarcount = 0;
      let ringkasan = element.RINGKASAN;
      let proftpic = "";
      if (element.NAMA_LENGKAP == "EM UB OFFICIAL") {
        proftpic = proftpicimg[2];
      } else {
        proftpic = proftpicimg[Math.round(Math.random())];
      }
      if (element.KOMENTAR != null) {
        element.KOMENTAR.forEach(element => {
          komentarcount++;
        });
      }
      let time = timeConverter(element.R_TIMESTAMP);
      $("#sambat").append(
        '<div class="sambatwrap"><div class="sambathead"><div class="sambatprofpict">' +
          proftpic +
          '</div><div class="sambatts"><h6>' +
          element.NAMA_LENGKAP +
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
          ' comment</p></a></div><div id=""class="sambatcomment-box"><div class="oldcomment"></div><div class="newcomment"></div><form id="' +
          element.ID_SAMBATAN +
          '"class="comment-form" action=""><div class="addcomment-box"><input id="' +
          element.ID_SAMBATAN +
          'r"type="text" class="addcomment" placeholder="Tambahkan komentar..."><button type="submit"><i><img src="../img/icon/paper-plane.svg" alt=""></i></button></div></form></div></div></div></div>'
      );
      if (element.KOMENTAR != null) {
        $(".sambatcomment-box").prepend(
          '<p id="morecomment" class="morecomment">more comment...</p>'
        );
        let commentParam = element.KOMENTAR.reverse();
        getComment(commentParam);
      }

      addComment();
      $("#morecomment").on("click", function() {
        $(".oldcomment").pagination("next");
      });
    }
  });
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
  function getComment(comment) {
    if (comment.length <= 5) {
      $(".morecomment").css("display", "none");
    }
    $(".oldcomment").pagination({
      dataSource: comment,
      pageSize: 5,

      callback: function(response, pagination) {
        let komentar = "";
        let proftpiccomment = "";
        response.forEach(comment => {
          if (comment.NAMA_LENGKAP == "EM UB OFFICIAL") {
            proftpiccomment = proftpicimg[2];
          } else {
            proftpiccomment = proftpicimg[Math.round(Math.random())];
          }
          let timeComment = timeConverterComment(comment.TIMESTAMP);
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
        });

        $(".oldcomment").prepend(komentar);
      }
    });
    $(".oldcomment").addHook("afterIsLastPage", function() {
      $(".morecomment").css("display", "none");
    });
  }

  async function addComment() {
    $(".comment-form").on("submit", function() {
      event.preventDefault();
      if (nim == null) {
        window.location.replace("../login.html?page=" + window.location.href);
      } else {
        let idSambat = this.id;
        let comment = $("#" + idSambat + "r").val();

        addSambatComment(idSambat, comment);
      }
    });
  }

  async function addSambatComment(idSambat, comment) {
    $.ajax({
      url: `https://em.ub.ac.id/siem/api/post/brawijaya/sambat/komentar/${idSambat}`,
      type: "POST",
      data: {
        nim: nim,
        nama_mhs: nama_lengkap,
        komentar: comment,
        auth: auth
      },
      dataType: "JSON",

      success: r => {
        console.log(r);
        if (r.message == "Success.") {
          let proftpicimg = [
            '<img src="img/stikerara.png" alt="" />',
            '<img src="img/stikerbaba.png" alt="" />',
            '<img src="../img/logo2.png" alt="" />'
          ];
          let proftpic = proftpicimg[Math.round(Math.random())];

          $(".newcomment").append(
            '<div class="sambatcomment-content"><div class="sambatcomment-content-proftpic">' +
              proftpic[Math.round(Math.random())] +
              '</div><div class="sambatcomment-content-comment"><h6>' +
              nama_lengkap +
              "</h6><p>" +
              comment +
              '</p><span class="commenttime ml-0">Beberapa menit yang lalu</span></div></div><hr class="sambatline">'
          );
          $("#" + idSambat + "r").val("");
        } else if (r.message == "Reach limit today!") {
          Swal.fire({
            type: "error",
            title: "Maaf",
            text: "Kamu telah mencapai batas komen hari ini"
          });
        } else {
          Swal.fire({
            type: "error",
            title: "Maaf",
            text:
              "Terjadi kesalahan pada sistem, silahkan hubungi CP yang tertera"
          });
        }
      }
    });
  }
});
