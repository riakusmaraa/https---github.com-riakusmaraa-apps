$(document).ready(function() {
  // $("#foto").attr("src") = sessionStorage.getItem("foto");
  let temp = sessionStorage.getItem("nim");
  $("#nim").text(sessionStorage.getItem("nim"));
  $("#nama").text(sessionStorage.getItem("nama"));
  $("#fakultas").text(sessionStorage.getItem("fak"));
  $("#foto").attr("src", sessionStorage.getItem("foto"));
  $.ajax({
    method: "GET",
    url: `https://em.ub.ac.id/redirect/getAnggota/${temp}`,
    data: {},
    dataType: "json",
    success: function(response) {
      if (response.message == "Success") {
        Swal.fire({
          title: "Maaf!",
          text: "Kamu sudah melakukan pendataan",
          type: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK!"
        }).then(result => {
          if (result.value) {
            sessionStorage.clear();
            window.location.replace("https://em.ub.ac.id/pendataan");
          }
        });
      }
    }
  });

  $("#submit").on("click", function() {
    let nim = $("#nim").text();
    let nama = $("#nama").text();
    let fakultas = $("#fakultas").text();
    let kelamin = $("input[name=jenis_kelamin]:checked").val();
    let agama = $("#agama").val();
    let hp = $("#hp").val();
    let ig = $("#ig").val();
    let line = $("#line").val();
    let kementerian = $("#kementerian").val();
    let pdh = $("#pdh").val();
    console.log(nim);
    $.ajax({
      method: "POST",
      url: `https://em.ub.ac.id/redirect/anggota?nim=${nim}&nama=${nama}&jenis_kelamin=${kelamin}&fakultas=${fakultas}&kementerian=${kementerian}&pdh=${pdh}&agama=${agama}&no_telp=${hp}&ig=${ig}&line=${line}`,
      data: {
        nim: nim,
        nama: nama,
        jenis_kelamin: kelamin,
        fakultas: fakultas,
        kementerian: kementerian,
        pdh: pdh,
        agama: agama,
        no_telp: hp,
        ig: ig,
        line: line
      },
      dataType: "json",
      success: function(response) {
        if (response.message == "Success") {
          console.log(response);
          Swal.fire({
            title: "Sukses!",
            text: "Terimakasih telah melakukan pendataan",
            type: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK!"
          }).then(result => {
            if (result.value) {
              sessionStorage.clear();
              window.location.replace("https://em.ub.ac.id/pendataan");
            }
          });
        } else {
          Swal.fire({
            type: "error",
            title: "Oops...",
            text: "Terdapat kesalahan",
            footer: "Pastikan datamu terisi lengkap"
          });
        }
      }
    });
  });
});
