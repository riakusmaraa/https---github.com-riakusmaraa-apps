$(document).ready(async function() {
  let dataBem;
  let dataDpm;
  let dataUkm;
  let dataChairman;
  let dataMawapres;
  await $.ajax({
    url: `https://em.ub.ac.id/siem/awarding/rekap`,
    type: `POST`,
    data: {
      nim: null,
      password: null
    },
    dataType: `JSON`,
    success: r => {
      if (r.data.error) {
        console.log(r.data.message);
      } else {
        console.log(r.data);
        dataBem = r.data.rekap.bem;
        dataDpm = r.data.rekap.dpm;
        dataUkm = r.data.rekap.ukm;
        dataChairman = r.data.rekap.chairman;
        dataMawapres = r.data.rekap.mawapres;
      }
    }
  });
  $("#resulttable").DataTable({
    data: dataMawapres,
    columns: [{ data: "nama" }, { data: "jumlah" }]
  });
  //   $("#resulttable-dpm").DataTable({
  //     data: dataDpm,
  //     columns: [{ data: "nama" }, { data: "jumlah" }]
  //   });
  //   $("#resulttable-ukm").DataTable({
  //     data: dataUkm,
  //     columns: [{ data: "nama" }, { data: "jumlah" }]
  //   });
  //   $("#resulttable-chairman").DataTable({
  //     data: dataChairman,
  //     columns: [{ data: "nama" }, { data: "jumlah" }]
  //   });

  $("#BEM").on("click", function() {
    $(".indicatortabs").css("left", "0%");
    $(".indicatortabs").css("right", "75%");
    $("#infocontent").html("");
    $("#resulttable")
      .DataTable()
      .destroy();
    $("#resulttable").DataTable({
      data: dataBem,
      columns: [{ data: "nama" }, { data: "jumlah" }]
    });
  });
  $("#DPM").on("click", function() {
    $(".indicatortabs").css("left", "25%");
    $(".indicatortabs").css("right", "50%");
    $("#infocontent").html("");
    $("#resulttable")
      .DataTable()
      .destroy();
    $("#resulttable").DataTable({
      data: dataDpm,
      columns: [{ data: "nama" }, { data: "jumlah" }]
    });
  });
  $("#UKM").on("click", function() {
    $(".indicatortabs").css("left", "50%");
    $(".indicatortabs").css("right", "25%");
    $("#infocontent").html("");
    $("#resulttable")
      .DataTable()
      .destroy();
    $("#resulttable").DataTable({
      data: dataUkm,
      columns: [{ data: "nama" }, { data: "jumlah" }]
    });
  });
  $("#MAWAPRES").on("click", function() {
    $(".indicatortabs").css("left", "50%");
    $(".indicatortabs").css("right", "25%");
    $("#infocontent").html("");
    $("#resulttable")
      .DataTable()
      .destroy();
    $("#resulttable").DataTable({
      data: dataMawapres,
      columns: [{ data: "nama" }, { data: "jumlah" }]
    });
  });
  $("#CHAIRMAN").on("click", function() {
    $(".indicatortabs").css("left", "75%");
    $(".indicatortabs").css("right", "0%");
    $("#infocontent").html("");
    $("#resulttable")
      .DataTable()
      .destroy();
    $("#resulttable").DataTable({
      data: dataChairman,
      columns: [{ data: "nama" }, { data: "jumlah" }]
    });
  });
});
