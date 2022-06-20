$(document).ready(function() {
  var seputar = "";
  var apresiasi = "";
  var beasiswa = "";

  $.ajax({
    url: `https://em.ub.ac.id/siem/api/get/info`,
    type: "get",
    dataType: "json",
    success: function(response) {
      response.data.forEach(element => {
        console.log(element);
        if (element.category == "Seputar Brawijaya") {
          if (element.gambar != "-") {
            seputar +=
              '<div  class= "col-md-6 "><div class="infocard"><h3 class="titleinfo">' +
              element.title +
              '</h3><h6 class="category">Seputar Brawijaya</h6><img class="img-fluid" src="' +
              element.gambar +
              '" alt="gambar"><a href="' +
              element.url +
              '"<button class="buttoninfo">Baca Selengkapnya</button></a></div></div>';
          } else {
            seputar +=
              '<div  class= "col-md-6 "><div class="infocard"><h3 class="titleinfo">' +
              element.title +
              '</h3><h6 class="category">Seputar Brawijaya</h6><a target="_blank" href="' +
              element.url +
              '"<button class="buttoninfo">Baca Selengkapnya</button></a></div></div>';
          }
        }

        if (element.category == "UB Juara") {
          if (element.gambar != "-") {
            apresiasi +=
              '<div  class= "col-md-6 "><div class="infocard"><h3 class="titleinfo">' +
              element.title +
              '</h3><h6 class="category">Apresiasi Prestasi</h6><img class="img-fluid" src="' +
              element.gambar +
              '" alt="gambar"><a href="' +
              element.url +
              '"<button class="buttoninfo">Baca Selengkapnya</button></a></div></div>';
          } else {
            apresiasi +=
              '<div  class= "col-md-6 "><div class="infocard"><h3 class="titleinfo">' +
              element.title +
              '</h3><h6 class="category">Apresiasi Prestasi</h6><a target="_blank" href="' +
              element.url +
              '"<button class="buttoninfo">Baca Selengkapnya</button></a></div></div>';
          }
        }

        if (element.category == "Beasiswa") {
          if (element.gambar != "-") {
            beasiswa +=
              '<div  class= "col-md-6 "><div class="infocard"><h3 class="titleinfo">' +
              element.title +
              '</h3><h6 class="category">Beasiswa</h6><img class="img-fluid" src="' +
              element.gambar +
              '" alt="gambar"><a href="' +
              element.url +
              '"<button class="buttoninfo">Baca Selengkapnya</button></a></div></div>';
          } else {
            beasiswa +=
              '<div  class= "col-md-6 "><div class="infocard"><h3 class="titleinfo">' +
              element.title +
              '</h3><h6 class="category">Beasiswa</h6><a target="_blank" href="' +
              element.url +
              '"<button class="buttoninfo">Baca Selengkapnya</button></a></div></div>';
          }
        }
      });
      console.log(response);
      tampilan_awal();
    }
  });

  function tampilan_awal() {
    $("#infocontent").html("");
    $("#infocontent").append(seputar);
  }

  $("#seputar").on("click", function() {
    $(".indicatortabs").css("left", "0%");
    $(".indicatortabs").css("right", "66%");
    $("#infocontent").html("");
    $("#infocontent").append(seputar);
  });
  $("#beasiswa").on("click", function() {
    $(".indicatortabs").css("left", "33%");
    $(".indicatortabs").css("right", "33%");
    $("#infocontent").html("");
    $("#infocontent").append(beasiswa);
  });
  $("#apresiasi").on("click", function() {
    $(".indicatortabs").css("left", "66%");
    $(".indicatortabs").css("right", "0%");
    $("#infocontent").html("");
    $("#infocontent").append(apresiasi);
  });
});
