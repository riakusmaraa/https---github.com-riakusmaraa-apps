<?php
session_start();
if (!isset($_SESSION["nim"])||($_SESSION['timeout'] < time())){
  header('Location: /tp/login');
  exit;
  // UJICOBA
}
// session_start();
require "./konek/konek.php";
$nim = $_SESSION["nim"];
// echo $nim;

//catatan
// $sql = "SELECT * FROM `opreckapel` where nim = $nim";
// $result = $conn->query($sql);
// if ($result->num_rows > 0) {
//     // output data of each row
// 	while($row = $result->fetch_assoc()) {
// 		echo "<br> id: ". $row["nim"]. " - Name: ". $row["nama_lengkap"]. " " . $row["nama_panggilan"] . "<br>";
// 	}
// } else {
// 	echo "0 results";
// }


function cetak ($tabel){
	global $nim,$conn;
	echo $nim.$tabel;
	$sql = "SELECT * FROM `opreckapel` where nim = $nim";
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
    // output data of each row
		while($row = $result->fetch_assoc()) {
			return  $row["$tabel"];
		}
	} else {
		return "0 results";
	}

}

function split ($str){//input string contoh cetak(jenjang),nama,;
	$result = explode(",",$str);
	return $result;
}
function cetakpendidikan ($a,$b,$c){//input array hasil split
	global $html;
	// $html.="ooo";
	$sa = split("$a");
	$sb = split("$b");
	$sc = split("$c");
	// var_dump("$sa");
	$i=0;$c=1;
	foreach ($sa as $key=>$value) {
		$html.= '<tr>
		<td align="center">'.$c.'</td>
		<td>&nbsp;'.$sa[$i].'</td>
		<td>&nbsp;'.$sb[$i].'</td>
		<td>&nbsp;'.$sc[$i].'</td>
		</tr>';
		$i++;
		$c++;
	}
}
function cetakpendidikan ($a){//input array hasil split
	global $html;
	// $html.="ooo";
	$sa = split("$a");
	// var_dump("$sa");
	$i=0;$c=1;
	foreach ($sa as $key=>$value) {
		$html.= '<tr>
		<td>'.$c.'</td>
		<td>'.$sa[$i].'</td>
		</tr>';
		$i++;
		$c++;
	}
}
cetak("nim");
$header = '<img src="./asset/header.png" alt="">';
$html=
'<body><div class="isi">
<h2>IDENTITAS DIRI</h2>
<table style="width:95%">
<tr>
<td>Nama Lengkap</td>
<td>:</td>
<td>';
$html.=cetak("nama_lengkap")."   [".cetak("jenis_kelamin")."]";
$html.='</td>
</tr>
<tr>
<td>Nama Panggilan</td>
<td>:</td>
<td>';
$html.=cetak("nama_panggilan");
$html.='</td>
</tr>
<tr>
<td>NIM</td>
<td>:</td>
<td>';
$html.=cetak("nim");
$html.='</td>
</tr>
<tr>
<td>Fakultas</td>
<td>:</td>
<td>';
$html.=cetak("fakultas");
$html.='</td>
</tr>
<tr>
<td>IPK</td>
<td>:</td>
<td>';
$html.=cetak("ipk");
$html.='</td>
</tr>

<tr>
<td>TTL</td>
<td>:</td>
<td>';
$html.=cetak("ttl");
$html.='</td>
</tr>
<tr>
<td>Alamat Asal</td>
<td>:</td>
<td>';
$html.=cetak("alamat_asal");
$html.='</td>
</tr>
<tr>
<td>Alamat di Malang</td>
<td>:</td>
<td>';
$html.=cetak("alamat_malang");
$html.='</td>
</tr>
<tr>
<td>No HP</td>
<td>:</td>
<td>';
$html.=cetak("telp");
$html.='</td>
</tr>
<tr>
<td>Email</td>
<td>:</td>
<td>';
$html.=cetak("email");
$html.='</td>
</tr>
<tr>
<td>Instagram/Line</td>
<td>:</td>
<td>';
$html.=cetak("sosmed");
$html.='</td>
</tr>
<tr>
<td>Hobi</td>
<td>:</td>
<td>';
$html.=cetak("hobi");
$html.='</td>
</tr>
<tr>
<td>Motto Hidup</td>
<td>:</td>
<td>';
$html.=cetak("motto");
$html.='</td>
</tr>
</table>
<h2>Riwayat Pendidikan</h2>

<h4>1. Formal</h4>
<table style="width:100% " class="kotak">';
$html.= '<tr>
		<th >No</th>
		<th >Jenjang Pendidikan</th>
		<th>Nama Institusi</th>
		<th>Tahun   </th>
		</tr>';
cetakpendidikan (cetak("jenjang_formal"),cetak("namainstitusi_formal"),cetak("tahun_formal"));
$html.='</table>

<h4>2. Non Formal</h4>
<table style="width:100% " class="kotak">';
$html.= '<tr>
		<th >No</th>
		<th >Jenjang Pendidikan</th>
		<th>Nama Institusi</th>
		<th>Tahun   </th>
		</tr>';
cetakpendidikan (cetak("jenjang_non"),cetak("namainstitusi_non"),cetak("tahun_non"));
$html.='</table>

<h2>KEORGANISASIAN</h2>
<h4>1. Pengalaman Organisasi</h4>
<table style="width:100% " class="kotak">';
$html.= '<tr>
		<th >No</th>
		<th >Nama Organisasi</th>
		<th>Jabatan</th>
		<th>Tahun   </th>
		</tr>';
cetakpendidikan (cetak("namaorg_pengalaman"),cetak("jabatanorg_pengalaman"),cetak("tahunorg_pengalaman"));
$html.='</table>

<h4>2. Organisasi yang diikuti sekarang</h4>
<table style="width:100% " class="kotak">';
$html.= '<tr>
		<th >No</th>
		<th >Nama Organisasi</th>
		<th>Jabatan</th>
		<th>Tahun   </th>
		</tr>';
cetakpendidikan (cetak("namaorg_ikut"),cetak("jabatanorg_ikut"),cetak("tahunorg_ikut"));
$html.='</table>

<h4>3. Pengalaman Kepanitiaan</h4>
<table style="width:100% " class="kotak">';
$html.= '<tr>
		<th >No</th>
		<th >Nama Kepanitiaan</th>
		<th>Jabatan</th>
		<th>Tahun   </th>
		</tr>';
cetakpendidikan (cetak("namakep_pengalaman"),cetak("jabatankep_pengalaman"),cetak("tahunkep_pengalaman"));
$html.='</table>

<h4>4. Kepanitiaan yang sedang dan akan diikuti (6 bulan kedepan)</h4>
<table style="width:100% " class="kotak">';
$html.= '<tr>
		<th >No</th>
		<th >Nama Kepanitiaan</th>
		<th>Jabatan</th>
		<th>Tahun   </th>
		</tr>';
cetakpendidikan (cetak("namakep_ikut"),cetak("jabatankep_ikut"),cetak("tahunkep_ikut"));
$html.='</table>

<h2>KEAHLIAN KHUSUS</h2>
<h4>1. Prestasi</h4>
<tr>
<td>Prestasi</td>
<td>:</td>
<td>';
$html.=cetak("prestasi");
$html.='</td>
</tr>

<h4>2. Fasilitas yang dimiliki</h4>
<tr>
<td>Fasilitas</td>
<td>:</td>
<td>';
$html.=cetak("fasilitas");
$html.='</td>
</tr>

<h4>3. Jaringan yang dimiliki</h4>
<tr>
<td>Jaringan</td>
<td>:</td>
<td>';
$html.=cetak("jaringan");
$html.='</td>
</tr>

<h4>4. Keahlian Khusus</h4>
<tr>
<td>Keahlian</td>
<td>:</td>
<td>';
$html.=cetak("keahlian");
$html.='</td>
</tr>

</div></body>';
// echo $html;
require_once __DIR__ . '/vendor/autoload.php';
$setAutoTopMargin = false;
$mpdf = new \Mpdf\Mpdf();
$stylesheet = file_get_contents('./css/style1.css');


// $mpdf->WriteHTML($html);
// $mpdf->Output();


$mpdf = new \Mpdf\Mpdf([
	'margin_left' => 20,
	'margin_right' => 15,
	'margin_top' => 40,
	'margin_bottom' => 25,
	'margin_header' => 0,
	'margin_footer' => 10
]);
$mpdf->SetHeader($header);
$mpdf->SetProtection(array('print'));
$mpdf->SetTitle("FORM PENDAFTARAN");
$mpdf->SetAuthor("@danang_tp");
// $mpdf->SetWatermarkText("PUSKOMINFO EM UB");
$mpdf->showWatermarkText = true;
$mpdf->watermark_font = 'DejaVuSansCondensed';
$mpdf->watermarkTextAlpha = 0.1;
$mpdf->SetDisplayMode('fullpage');
$mpdf->WriteHTML($stylesheet,1);
$mpdf->WriteHTML($html,2);
$mpdf->Output('formonline '.cetak("nama_lengkap").'.pdf', 'I');
?>

