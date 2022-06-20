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
  var nama_lengkap;
  var fak;
  var jurusan;
  var prodi;
  var foto;
  var auth;
  getData();
  $("#mylink").on("click", ".copyicon", function() {
    let copytext = $("#" + this.id + "s");

    copytext.select();
    document.execCommand("copy");
    Swal.fire({
      type: "success",
      title: "Selamat!",
      text: "Link berhasil dicopy"
    });
  });
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
          $("#logout").text("Logout");
          getLink();
        }
      });
  }

  function logout() {
    dbPromise.then(function(db) {
      var tx = db.transaction("mahasiswa", "readwrite");
      var store = tx.objectStore("mahasiswa");
      let object = store.getAll();

      store.delete(nim);
      window.location.replace("index.html");
    });
  }

  $("#logout").on("click", function() {
    if (nim != null) {
      logout();
    } else {
      let url = window.location.href;
      window.location.replace("login.html?page=" + url);
    }
  });
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
        loop: true
      },
      600: {
        items: 1,
        nav: false,
        loop: true
      },
      1000: {
        items: 1,
        nav: false,
        loop: true
      }
    },
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true
  });
  let tempresult;
  $(".menubox").on("click", function() {
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
  $("#refresh").on("click", function() {
    location.reload(true);
  });
  $("a[id=daftarbtn]").attr(
    "href",
    "../form/formulir.html?id=" + sessionStorage.getItem("idparam")
  );
  $("#oprecbtn").on("click", function() {
    sessionStorage.setItem("idparam", "3");
  });
  $("#backicon").on("click", function() {
    sessionStorage.removeItem("idparam");
  });

  $(".comingsoon").on("click", function() {
    let resulth4 = $(this)
      .children("h4")
      .html();
    let resultimg = $(this)
      .children("img")
      .attr("src");
    Swal.fire({
      title: "Coming Soon!",
      html:
        "<strong>" +
        resulth4 +
        "</strong><br><br>Pantau terus lini masa kami ya!",
      // text: "! Pantau terus lini masa kami ya!",
      imageUrl: resultimg,
      imageWidth: 150,
      imageHeight: 150,
      imageAlt: "Custom image",
      animation: true
    });
  });
  function getLink() {
    if (nim != null) {
      $.ajax({
        url: `https://em.ub.ac.id/to/getLink/${nim}`,
        method: "get",
        dataType: "json",
        success: function(obj) {
          let response = obj["data"];
          $("#linktitle").text("EM-Link");
          for (
            let index = response.length - 1;
            index > response.length - 6;
            index--
          ) {
            $(".linkwrap").append(
              '<div class="col-9"><textarea id="link' +
                index +
                's" class="linktext" col="" row="" readonly value="https://em.ub.ac.id/linkin/to/' +
                response[index].redirect +
                '">https://em.ub.ac.id/to/' +
                response[index].redirect +
                '</textarea></div><div id="link' +
                index +
                '" class="col-3 copyicon"><i class="far fa-copy"></i></div>'
            );
          }
        }
      });
    }
  }
});
