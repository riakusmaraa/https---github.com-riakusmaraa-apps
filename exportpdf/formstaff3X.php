<?php
session_start();
if (!isset($_SESSION["nim"])||($_SESSION['timeout'] < time())){
	header('Location: /tp/login');
	exit;
  // UJICOBA
}
// session_start();
require "./konek/konek.php";
$nim = $_SESSION["nim1"];
$_SESSION["pagenumber"]='{PAGENO}'."";

function tanggal(){
	$tgl=date('d F Y');
	return $tgl;
}

function cetak ($tabel){
	global $nim,$conn;
	echo $nim.$tabel;
	$sql = "SELECT * FROM `oprecstaff` where nim = $nim";
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
		<td>'.$c.'</td>
		<td>'.$sa[$i].'</td>';
		if ($b!=0){
			$html.=
			'<td>'.$sb[$i].'</td>
			<td>'.$sc[$i].'</td></tr>';
		}
		$i++;
		$c++;
	}
}
//<td class="barcodecell"><barcode code=';$html.=$nim;$html.=' type="C128A" class="barcode" /></td>
//<td class="barcodecell"><barcode code="Your message here" type="QR" class="barcode" size="0.8" error="M" disableborder="1" /></td>
cetak("nim");
$header = '<img src="./asset/header.png" alt="">';
$footer = '<img src="./asset/footer.PNG" alt="">'.'{PAGENO}';
$html=
'<body><div class="isi">
<p >[FORM 3/3] </p>
<h4 align="center">SURAT PERNYATAAN PENCALONAN DIRI</h4>
<h4 align="center">KEPANITIAAN ';$html.=strtoupper(cetak("pilihan"));$html.='</h4>
<p>Yang bertandatangan di bawah ini:</p>
<table>
<tr>
<td width=50px>&emsp;</td>
	<td>Nama</td>
	<td>:</td>
	<td>';$html.=cetak("nama_lengkap");$html.='</td>
</tr>
<tr>
<td width=50px>&emsp;</td>
	<td>NIM</td>
	<td>:</td>
	<td>';$html.=cetak("nim");$html.='</td>
</tr>
<tr>
<td width=50px>&emsp;</td>
	<td>Posisi yang dipilih</td>
	<td>:</td>
	<td>';$html.=cetak("divisi1")."[1]"."  /  ".cetak("divisi2")."[2]";$html.='</td>
</tr>
<tr>
<td width=50px>&emsp;</td>
	<td>alamat</td>
	<td>:</td>
	<td>';$html.=cetak("alamat_malang");$html.='</td>
</tr>
</table>
<p  align="justify">Dengan ini menyatakan, bersedia dan sanggup melaksanakan dengan sungguh-sungguh tugas dan fungsi Sebagai panitia ';$html.=strtoupper(cetak("pilihan"));$html.=' , berjanji untuk bersungguh-sungguh secara aktif mengikuti dan bertanggung jawab dalam seluruh rangkaian kegiatan ';$html.=strtoupper(cetak("pilihan"));$html.=' dan menjaga nama baik ';$html.=strtoupper(cetak("pilihan"));$html.=' serta bertanggung kepada Ketua Pelaksana ';$html.=strtoupper(cetak("pilihan"));$html.='. Apabila terjadi pelanggaran, maka siap menerima sanksi apabila dikemudian hari saya mengingkarinya.  

</p>

<p align="justify">Demikian surat pernyataan ini saya tandatangani dengan penuh kesadaran dan tanpa paksaan dan/atau tekanan dari siapapun. </p>
<p width=100% align="right">Malang,';$html.=tanggal();$html.='&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</p>
<br><p width=100% align="right">(MATERAI 6000) &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</p>
<br>
<p width=100% align="right">( ';$html.=strtoupper(cetak("nama_lengkap"));$html.=' )&emsp;&emsp;&emsp;&emsp;&emsp;</p>
</div>
</body>';
// echo $html;
require_once __DIR__ . '/vendor/autoload.php';
// ini_set('memory_limit', '256M');
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
	'margin_footer' => 0
]);
$mpdf->setFooter($footer);
$mpdf->SetWatermarkText('FORM STAFF 3/3');
$mpdf->simpleTables = true;
$mpdf->useSubstitutions = false;
$mpdf->SetHeader($header);
$mpdf->SetProtection(array('print'));
$mpdf->SetTitle("FORM PENDAFTARAN");
$mpdf->SetAuthor("@danang_tp");
$mpdf->showWatermarkText = true;
$mpdf->watermark_font = 'DejaVuSansCondensed';
$mpdf->watermarkTextAlpha = 0.1;
$mpdf->SetDisplayMode('fullpage');
$mpdf->WriteHTML($stylesheet,1);
$mpdf->WriteHTML($html,2);

$mpdf->Output('form_KE_3 '.cetak("nama_lengkap").'.pdf', \Mpdf\Output\Destination::DOWNLOAD);
?>