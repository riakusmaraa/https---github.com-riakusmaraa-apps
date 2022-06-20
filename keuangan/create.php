<?php
include 'func.php';
$pdo = pdo_connect_mysql();
$msg = '';
//check apakah ada data yang dikirimkan melalui method POST
if (!empty($_POST)) {
    //kirim data melalui method post untuk diinsert ke database
    //set up variabel yang akan dimasukkan
    $id = isset($_POST['id']) && !empty($_POST['id']) && $_POST['id'] != 'auto' ? $_POST['id'] : NULL;
    //cek variabel pada metod post apakah telah diisi, jika tidak isi otomatis dengan blank
    $nama = isset($_POST['nama']) ? $_POST['nama'] : '';
    $pj = isset($_POST['pj']) ? $_POST['pj'] : '';
    $rab_diajukan = isset($_POST['rab_diajukan']) ? $_POST['rab_diajukan'] : '';
    $rab_acc = isset($_POST['rab_acc']) ? $_POST['rab_acc'] : '';
    $realisasi = isset($_POST['realisasi']) ? $_POST['realisasi'] : '';
    $pencairan = isset($_POST['pencairan']) ? $_POST['pencairan'] : '';
    $keterangan = isset($_POST['keterangan']) ? $_POST['keterangan'] : '';
    //insert Ke database
    $stmt = $pdo->prepare('INSERT INTO keuangan VALUES (?,?,?,?,?,?,?,?)');
    $stmt->execute([$id, $nama, $pj, $rab_diajukan, $rab_acc, $realisasi, $pencairan, $keterangan]);
    $msg = '<script>alert("Data Berhasil dibuat!");</script>';
}
?>
<?= template_header('Create') ?>
<div class="container update">
    <h2>Buat LOG</h2>
    <a href="read.php" class="btn btn-success">Lihat Data Keseluruhan</a>
    <form action="create.php" method="post">
        <div class="form-group">
            <label for="id">ID</label>
            <input type="number" name="id" class="form-control" placeholder="otomatis diisi sistem" value="auto" id="id" disabled>
            <label for="nama">Nama</label>
            <input type="text" class="form-control" name="nama" id="nama" required>
            <label for="pj">Penanggung Jawab</label>
            <input type="text" class="form-control" name="pj" id="pj" required>
            <label for="rab_diajukan">RAB yang Diajukan</label>
            <input type="number" class="form-control" name="rab_diajukan" id="rab_diajukan" required>
            <label for="rab_acc">RAB ACC</label>
            <input type="number" class="form-control" name="rab_acc" id="rab_acc" required>
            <label for="realisasi">Realisasi Penggunaan Anggaran</label>
            <input type="number" class="form-control" name="realisasi" id="realisasi" required>
            <label for="pencairan">Pencairan Dana</label>
            <input type="number" class="form-control" id="pencairan" name="pencairan" required>
            <label for="keterangan">Keterangan</label>
            <input type="text" class="form-control" id="keterangan" name="keterangan" required>
        </div>
        <input type="submit" class="btn btn-primary" value="Buat log catatan">
    </form>
    <?php if ($msg) : ?>
        <p><?= $msg ?></p>
    <?php endif; ?>
</div>
<?= template_footer() ?>