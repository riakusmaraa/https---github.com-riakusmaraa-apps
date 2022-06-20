<?php

$servername = "db.rajabrawijaya.ub.ac.id";
$database = "db_em";
$username = "em";
$password = "kawrjzofwu";

$conn = mysqli_connect($servername, $username, $password, $database);

if(!$conn){
	die("Gagal ey : ".mysqli_connect_error());
}
$id = mysqli_real_escape_string($conn,$_REQUEST['id']);
$nama_lengkap = mysqli_real_escape_string($conn,$_REQUEST['nama_lengkap']);
$kementerian = mysqli_real_escape_string($conn,$_REQUEST['kementerian']);
$jabatan = mysqli_real_escape_string($conn,$_REQUEST['jabatan']);
$fakultas = mysqli_real_escape_string($conn,$_REQUEST['fakultas']);
$angkatan = mysqli_real_escape_string($conn,$_REQUEST['angkatan']);
$email = mysqli_real_escape_string($conn,$_REQUEST['email']);
$line = mysqli_real_escape_string($conn,$_REQUEST['line']);
$instagram = mysqli_real_escape_string($conn,$_REQUEST['instagram']);
$foto = mysqli_real_escape_string($conn,$_REQUEST['foto']);
//Insert ke database dengan query berikut

$sql = "INSERT INTO pengurus_2020(id,nama,kementerian,jabatan,fakultas,email,line,instagram,angkatan,foto) VALUES ('$id','$nama_lengkap','$kementerian','$jabatan','$fakultas','$email','$line','$instagram','$angkatan','$foto')";

if(mysqli_query($conn, $sql)){
	echo '<script>

  alert("Data Berhasil Ditambahkan");

</script>';
}else{
	echo "ERROR ey : $sql. ".mysqli_error($conn);
}
mysqli_close($conn);

echo '<a href="index.php"><h1>KEMBALI</h1></a>';

 ?> 
 