<?php
session_start();
ini_set('display_errors', 1);
// if (!isset($_SESSION["nim"])){
//   // header('Location: /tp/login');
//   exit;
//   // UJICOBA
// }
// session_start();
// require "./konek/konek.php";
$nim = $_GET["nim"];
$_SESSION["pagenumber"]='{PAGENO}'."";
$sql = file_get_contents('https://em.ub.ac.id/apps/api/biodata/'.$nim);
$sql = json_decode($sql);
// var_dump($sql);
// var_dump(json_decode($sql));
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
	global $sql;
	// echo $nim.$tabel;
	// $sql = "SELECT * FROM `oprecstaff` where nim = $nim";
	$result = $sql;
	if ($result > 0) {
    // output data of each row
		foreach ($result as $key => $object) {
    return $object->$tabel;
}
	} else {
		return "0 results";
	}

}

function split ($str){//input string contoh cetak(jenjang),nama,;
	$result = explode("~",$str);
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

function tanggal(){
	$tgl=date('d F Y');
	return $tgl;
}
//<td class="barcodecell"><barcode code=';$html.=$nim;$html.=' type="C128A" class="barcode" /></td>
//<td class="barcodecell"><barcode code="Your message here" type="QR" class="barcode" size="0.8" error="M" disableborder="1" /></td>
cetak("nim");
$header = '<img src="./asset/header.png" alt="">';
$footer = '<img src="./asset/footer.PNG" alt="">'.'{PAGENO}';
$html=
'<body><div class="isi">
<p >[FORM 3/3] </p>
<h4 align="center">SURAT PERNYATAAN</h4>

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
	<td>';$html.=cetak("pilihan")."[1]"."  /  ".cetak("pilihan2")."[2]";$html.='</td>
</tr>
<tr>
<td width=50px>&emsp;</td>
	<td>alamat</td>
	<td>:</td>
	<td>';$html.=cetak("alamat_malang");$html.='</td>
</tr>
</table>
<p  align="justify">Dengan ini menyatakan kesanggupan untuk :
<ol>
	<li>Menempatkan EM UB 2019 sebagai prioritas dan menjaga nama baik seluruh elemen yang ada di dalamnya.</li>
	<li>Melaksanakan dan menjalankan amanah selama satu periode kepengurusan dengan penuh tanggung jawab.</li>
	<li>Mematuhi segala bentuk peraturan yang ditetapkan pada SOP EM UB 2019.</li>
	<li>Bersedia untuk aktif, kontibutif, dan mau belajar pada seluruh program kerja atau kegiatan Kementerian maupun Kementerian lain.</li>
	<li>Apabila saya tidak mematuhi peraturan dan kesepakatan semestinya, maka saya siap menerima segala konsekuensi yang diberikan.</li>
</ol>
<br>
Demikian surat pernyataan ini saya buat dengan penuh kesadaran, bersungguh-sungguh, dan tanpa ada paksaan dari pihak manapun dan dapat digunakan sebagaimana mestinya. 

</p>


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
// $mpdf->setFooter($footer);
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