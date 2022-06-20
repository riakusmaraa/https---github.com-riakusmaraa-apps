<?php
include 'func.php';
$pdo = pdo_connect_mysql();
$msg = '';
//cek apakah id di request GET
if (isset($_GET['id'])) {
    if (!empty($_POST)) {
        $id = isset($_POST['id']) ? $_POST['id'] : NULL;
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
    $msg = '<script>alert("Data telah diubah!");</script>';
    }
    //Get data dari tabel
    $stmt = $pdo->prepare('SELECT * FROM keuangan WHERE id =?');
    $stmt->execute([$_GET['id']]);
    $logKeuangan = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$logKeuangan) {
        exit("Record dengan id yang dirujuk tidak ada di database");
    }
} else {
    exit('Tidak ada ID yang spesifik');
}
?>

<?= template_header('Read') ?>
<div class="container">
    <h2>Update Data</h2>
    <a href="read.php" class="btn btn-success">Lihat Data Keseluruhan</a>
    <form action="update.php?id=<?= $logKeuangan['id'] ?>" method="post">
        <div class="form-group">
            <label for="id">ID</label>
            <input type="number" name="id" class="form-control" placeholder="otomatis diisi sistem" value="<?=$logKeuangan['id']?>" id="id" disabled>
            <label for="nama">Nama</label>
            <input type="text" class="form-control" name="nama" id="nama" value="<?=$logKeuangan['nama']?>">
            <label for="pj">Penanggung Jawab</label>
            <input type="text" class="form-control" name="pj" id="pj" value="<?=$logKeuangan['pj']?>" required>
            <label for="rab_diajukan">RAB yang Diajukan</label>
            <input type="number" class="form-control" name="rab_diajukan" id="rab_diajukan" value="<?=$logKeuangan['rab_diajukan']?>" required>
            <label for="rab_acc">RAB ACC</label>
            <input type="number" class="form-control" name="rab_acc" id="rab_acc" value="<?=$logKeuangan['rab_acc']?>" required>
            <label for="realisasi">Realisasi Penggunaan Anggaran</label>
            <input type="number" class="form-control" name="realisasi" id="realisasi" value="<?=$logKeuangan['realisasi']?>" required>
            <label for="pencairan">Pencairan Dana</label>
            <input type="number" class="form-control" id="pencairan" name="pencairan" value="<?=$logKeuangan['pencairan']?>" required>
            <label for="keterangan">Keterangan</label>
            <input type="text" class="form-control" id="keterangan" name="keterangan" value="<?=$logKeuangan['keterangan']?>" required>
        </div>
        <input type="submit" class="btn btn-primary" value="Update">
    </form>
    <?php if ($msg) : ?>
        <p><?= $msg ?></p>
    <?php endif; ?>
</div>

<?= template_footer() ?>