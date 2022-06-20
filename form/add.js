$(document).ready(function() {
  // pendidikan formal
  var max_fields = 10;
  var idpf = $("#pf");
  var btnpf = $("#addpf");
  var pf = 1;

  $(btnpf).click(function(e) {
    e.preventDefault();
    if (pf < max_fields) {
      pf++;
      $(idpf).append(
        '<div><div class="input-field col s4"><input id="jenjang_pf" name="jenjang_pf[]" type="text" class="validate"><label for="jenjang_pf">Jenjang</label></div><div class="input-field col s4"><input id="instansi_pf" name="instansi_pf[]" type="text" class=" validate"><label for="instansi_pf">Instansi</label></div><div class="input-field col s3"><input id="tahun_pf" name="tahun_pf[]" type="number" class=" validate"><label for="tahun_pf">Tahun</label></div><div class="col s1"><a href="#" class="remove_field btn-floating btn-small waves-effect waves-light red"><i class="material-icons">remove</i></a></div></div>'
      );
    }
  });

  $(idpf).on("click", ".remove_field", function(e) {
    e.preventDefault();
    $(this)
      .parent("div")
      .parent("div")
      .remove();
    pf--;
  });
  // pendidikan non formal
  var idpnf = $("#pnf");
  var btnpnf = $("#addpnf");
  var pnf = 1;

  $(btnpnf).click(function(e) {
    e.preventDefault();
    if (pnf < max_fields) {
      pnf++;
      $(idpnf).append(
        '<div><div class="input-field col s4"><input id="jenjang_pnf" name="jenjang_pnf[]" type="text" class="validate"><label for="jenjang_pnf">Jenjang</label></div><div class="input-field col s4"><input id="instansi_pnf" name="instansi_pnf[]" type="text" class=" validate"><label for="instansi_pnf">Instansi</label></div><div class="input-field col s3"><input id="tahun_pnf" name="tahun_pnf[]" type="number" class=" validate"><label for="tahun_pnf">Tahun</label></div><div class="col s1"><a href="#" class="remove_field btn-floating btn-small waves-effect waves-light red"><i class="material-icons">remove</i></a></div></div>'
      );
    }
  });
  $(idpnf).on("click", ".remove_field", function(e) {
    e.preventDefault();
    $(this)
      .parent("div")
      .parent("div")
      .remove();
    pnf--;
  });

  // pengalaman organisasi
  var idpo = $("#po");
  var btnpo = $("#addpo");
  var po = 1;

  $(btnpo).click(function(e) {
    e.preventDefault();
    if (po < max_fields) {
      po++;
      $(idpo).append(
        '<div><div class="input-field col s4"><input id="jabatan_po" name="jabatan_po[]" type="text" class="validate"><label for="jabatan_po">Jabatan</label></div><div class="input-field col s4"><input id="instansi_po" name="instansi_po[]" type="text" class=" validate"><label for="instansi_po">Instansi</label></div><div class="input-field col s3"><input id="tahun_po" name="tahun_po[]" type="number" class=" validate"><label for="tahun_po">Tahun</label></div><div class="col s1"><a href="#" class="remove_field btn-floating btn-small waves-effect waves-light red"><i class="material-icons">remove</i></a></div></div>'
      );
    }
  });
  $(idpo).on("click", ".remove_field", function(e) {
    e.preventDefault();
    $(this)
      .parent("div")
      .parent("div")
      .remove();
    po--;
  });

  // Organisasi yang sedang diikuti
  var idsd = $("#sd");
  var btnsd = $("#addsd");
  var sd = 1;

  $(btnsd).click(function(e) {
    e.preventDefault();
    if (sd < max_fields) {
      sd++;
      $(idsd).append(
        '<div><div class="input-field col s4"><input id="jabatan_sd" name="jabatan_sd[]" type="text" class="validate"><label for="jabatan_sd">Jabatan</label></div><div class="input-field col s4"><input id="instansi_sd" name="instansi_sd[]" type="text" class=" validate"><label for="instansi_sd">Instansi</label></div><div class="input-field col s3"><input id="tahun_sd" name="tahun_sd[]" type="number" class=" validate"><label for="tahun_sd">Tahun</label></div><div class="col s1"><a href="#" class="remove_field btn-floating btn-small waves-effect waves-light red"><i class="material-icons">remove</i></a></div></div>'
      );
    }
  });
  $(idsd).on("click", ".remove_field", function(e) {
    e.preventDefault();
    $(this)
      .parent("div")
      .parent("div")
      .remove();
    sd--;
  });

  // Pengalaman Kepanitiaan
  var idpk = $("#pk");
  var btnpk = $("#addpk");
  var pk = 1;
  $(btnpk).click(function(e) {
    e.preventDefault();
    if (pk < max_fields) {
      pk++;
      $(idpk).append(
        '<div><div class="input-field col s4"><input id="jabatan_pk" name="jabatan_pk[]" type="text" class="validate"><label for="jabatan_pk">Jabatan</label></div><div class="input-field col s4"><input id="acara_pk" name="acara_pk[]" type="text" class=" validate"><label for="acara_pk">Nama Acara</label></div><div class="input-field col s3"><input id="tahun_pk" name="tahun_pk[]" type="number" class=" validate"><label for="tahun_pk">Tahun</label></div><div class="col s1"><a href="#" class="remove_field btn-floating btn-small waves-effect waves-light red"><i class="material-icons">remove</i></a></div></div>'
      );
    }
  });
  $(idpk).on("click", ".remove_field", function(e) {
    e.preventDefault();
    $(this)
      .parent("div")
      .parent("div")
      .remove();
    pk--;
  });

  // Kepanitiaan yang akan diikuti
  var idad = $("#ad");
  var btnad = $("#addad");
  var ad = 1;
  $(btnad).click(function(e) {
    e.preventDefault();
    if (ad < max_fields) {
      ad++;
      $(idad).append(
        '<div><div class="input-field col s4"><input id="jabatan_ad" name="jabatan_ad[]" type="text" class="validate"><label for="jabatan_ad">Jabatan</label></div><div class="input-field col s4"><input id="acara_ad" name="acara_ad[]" type="text" class=" validate"><label for="acara_ad">Nama Acara</label></div><div class="input-field col s3"><input id="tahun_ad" name="tahun_ad[]" type="number" class=" validate"><label for="tahun_ad">Tahun</label></div><div class="col s1"><a href="#" class="remove_field btn-floating btn-small waves-effect waves-light red"><i class="material-icons">remove</i></a></div></div>'
      );
    }
  });
  $(idad).on("click", ".remove_field", function(e) {
    e.preventDefault();
    $(this)
      .parent("div")
      .parent("div")
      .remove();
    ad--;
  });

  // prestasi
  var idp = $("#p");
  var btnp = $("#addp");
  var p = 1;
  $(btnp).click(function(e) {
    e.preventDefault();
    if (p < max_fields) {
      p++;
      $(idp).append(
        '<div><div class="input-field col s4"><input id="tingkat_p" name="tingkat_p[]" type="text" class="validate"><label for="tingkat_p">Tingkat</label></div><div class="input-field col s4"><input id="prestasi_p" name="acara_p[]" type="text" class=" validate"><label for="prestasi_p">Prestasi</label></div><div class="input-field col s3"><input id="tahun_p" name="tahun_p[]" type="number" class=" validate"><label for="tahun_p">Tahun</label></div><div class="col s1"><a href="#" class="remove_field btn-floating btn-small waves-effect waves-light red"><i class="material-icons">remove</i></a></div></div>'
      );
    }
  });
  $(idp).on("click", ".remove_field", function(e) {
    e.preventDefault();
    $(this)
      .parent("div")
      .parent("div")
      .remove();
    p--;
  });

  // prestasi
  var idt = $("#t");
  var btnt = $("#addt");
  var t = 1;
  $(btnt).click(function(e) {
    e.preventDefault();
    if (t < max_fields) {
      t++;
      $(idt).append(
        '<div><div class="input-field col s4"><input id="tingkat_t" name="tingkat_t[]" type="text" class="validate"><label for="tingkat_t">Tingkat</label></div><div class="input-field col s4"><input id="prestasi_t" name="acara_t[]" type="text" class=" validate"><label for="prestasi_t">Selaku & Nama Acara</label></div><div class="input-field col s3"><input id="tahun_t" name="tahun_t[]" type="number" class=" validate"><label for="tahun_t">Tahun</label></div><div class="col s1"><a href="#" class="remove_field btn-floating btn-small waves-effect waves-light red"><i class="material-icons">remove</i></a></div></div>'
      );
    }
  });
  $(idt).on("click", ".remove_field", function(e) {
    e.preventDefault();
    $(this)
      .parent("div")
      .parent("div")
      .remove();
    p--;
  });
});
