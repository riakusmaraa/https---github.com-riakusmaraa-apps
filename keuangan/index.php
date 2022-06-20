<?php
//Cek Session
session_start();
include 'func.php';
$pdo = pdo_connect_mysql();
$sql = " SELECT * FROM keuangan ORDER BY id DESC";
$stmt = $pdo->prepare($sql);
$stmt->execute();
$sql_rab_diajukan = "SELECT SUM(rab_diajukan) FROM keuangan";
$sql_rab_acc = "SELECT SUM(rab_acc) FROM keuangan";
$sql_realisasi = "SELECT SUM(realisasi) FROM keuangan";
$sql_pencairan = "SELECT SUM(pencairan) FROM keuangan";
$fetch_rab_diajukan  = mysqli_query($link, $sql_rab_diajukan);
$fetch_rab_acc  = mysqli_query($link, $sql_rab_acc);
$fetch_realisasi  = mysqli_query($link, $sql_realisasi);
$fetch_pencairan  = mysqli_query($link, $sql_pencairan);

$total_rab_acc = mysqli_fetch_array($fetch_rab_acc);
$total_rab_diajukan = mysqli_fetch_array($fetch_rab_diajukan);
$total_realisasi = mysqli_fetch_array($fetch_realisasi);
$total_pencairan = mysqli_fetch_array($fetch_pencairan);
// $pengeluaran = mysqli_fetch_array($fetchPengeluran);
$dataKeuangan = $stmt->fetchAll(PDO::FETCH_ASSOC);
//$angka_format = number_format($angka,2,",",".");
?>

<?= template_header('Home') ?>

<div class="container mt-3 mb-2">
    <h1 class="mb-3">Menu</h1>
    <h3>Ringkasan Keuangan</h3>
    <div class="table-responsive">
        <table class="table table-bordered text-center">
            <thead>
                <tr class="table-primary">
                    <td scope="col">Nama Kegiatan</td>
                    <td scope="col">Penanggung Jawab</td>
                    <td scope="col">RAB yang Diajukan</td>
                    <td scope="col">Jumlah RAB ACC</td>
                    <td scope="col">Realisasi Penggunaan Anggaran</td>
                    <td scope="col">Pencairan Dana</td>
                    <td scope="col">Keterangan</td>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($dataKeuangan as $log) : ?>

                    <tr class="table-secondary">
                        <td><?= $log['nama'] ?></td>
                        <td><?= $log['pj'] ?></td>
                        <td>Rp. <?= number_format($log['rab_diajukan'],0,",","."); ?></td>
                        <td>Rp. <?= number_format($log['rab_acc'],0,",","."); ?></td>
                        <td>Rp. <?= number_format($log['realisasi'],0,",",".");?></td>
                        <td><?= number_format(($log['realisasi']/$log['rab_acc']*100),2,",","."); ?>%</td>
                        <td><?= $log['keterangan'] ?></td>
                    </tr>
                <?php endforeach; ?>
                <tr class="table-warning">
                        <td colspan="2"><h5><b>Total</b></h5></td>
                        <td><b>Rp. <?= number_format($total_rab_diajukan[0],0,",",".");?></b></td>
                        <td><b>Rp. <?= number_format($total_rab_acc[0],0,",",".");?></b></td>
                        <td><b>Rp. <?= number_format($total_realisasi[0],0,",",".");?></b></td>
                        <td><b><?= number_format(($total_realisasi[0]/$total_rab_acc[0]*100),2,",",".");?>%</b></td>
                        <td></td>
                    </tr>
            </tbody>
        </table>
</div>
<?= template_footer() ?>