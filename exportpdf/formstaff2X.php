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
	$result = explode("/",$str);
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
		if($sa[$i]!=null&&$sa[$i]!=" "&&$sa[$i]!="  "){
			$html.= '<tr>
			<td align="center">'.$c.'</td>';
			$html.='<td>'.$sa[$i].'</td>';
			if ($b!="0"){
				$html.=
				'<td>'.$sb[$i].'</td>
				<td>'.$sc[$i].'</td></tr>';
			}
		$c++;
		}
	$i++;
	}
}
//<td class="barcodecell"><barcode code=';$html.=$nim;$html.=' type="C128A" class="barcode" /></td>
//<td class="barcodecell"><barcode code="Your message here" type="QR" class="barcode" size="0.8" error="M" disableborder="1" /></td>
cetak("nim");
$header = '<img src="./asset/header.png" alt="">';
$footer = '<img src="./asset/footer.PNG" alt="">'.'{PAGENO}';
$html=
'<body><div class="isi">
<p >[FORM 2/3] </p>';$html.='
<h2>D.	KEAHLIAN KHUSUS</h2>
<h4>1. Prestasi</h4>
<table style="width:100% " class="kotak">';
$html.= '<tr>
<th width=50px>No</th>
<th width=350px>Prestasi</th>
<th>Tingkat</th>
<th width=100px>Tahun</th>
</tr>';
cetakpendidikan (cetak("prestasi"),cetak("tingkatP"),cetak("tahunP"));
$html.='</table>

<h4>2. Fasilitas yang dimiliki</h4>
<table style="width:100% " class="kotak">';
$html.= '<tr>
<th width=50px>No</th>
<th align="left">Fasilitas</th>
</tr>';
cetakpendidikan (cetak("fasilitas"),"0","0");
$html.='</table>


<h4>3. Jaringan yang dimiliki </h4>
<table style="width:100% " class="kotak">';
$html.= '<tr>
<th width=50px>No</th>
<th align="left">Jaringan</th>
</tr>';
cetakpendidikan (cetak("jaringan"),"0","0");
$html.='</table>


<h4>4. Keahlian Khusus</h4>
<table style="width:100% " class="kotak">';
$html.= '<tr>
<th width=50px>No</th>
<th align="left">Keahlian Khusus</th>
</tr>';
cetakpendidikan (cetak("keahlian"),"0","0");
$html.='</table>

<table style="width:95%">
<tr>
<td colspan="3">&nbsp;</td>
</tr>
<tr>
<th align="left" width=150px>Pilihan Divisi  1</th align="left">
<td width=5px>:</td>
<td>';
$html.=cetak("divisi1");
$html.='</td>
</tr>
<tr>
<th align="left"  width=150px>Alasan</th align="left">
<td width=5px>:</td>
<tr>
<td align = "justify" colspan="3">';
$html.="<p>".cetak("alasan1")."</p>";
$html.='</td></tr>
</tr>
<tr>
<td colspan="3">&nbsp;</td>
</tr>
<tr>
<th align="left" width=150px>Pilihan Divisi  2</th align="left">
<td width=5px>:</td>
<td>';
$html.=cetak("divisi2");
$html.='</td>
</tr>
<tr>
<th align="left"  width=150px>Alasan</th align="left">
<td width=5px>:</td>
<tr>
<td align = "justify" colspan="3">';
$html.="<p>".cetak("alasan2")."</p>";
$html.='</td></tr>
</tr>
<tr>
<td colspan="3">&nbsp;</td>
</tr>
<tr>
<th align="left"  width=150px colspan="3">Apa motivasi kamu bergabung dalam kepanitiaan ';$html.=cetak("pilihan");$html.=' ? : </th align="left">
<tr>
<td align = "justify" colspan="3">';
$html.='<p align="justify">'.cetak("motivasi")."</p>";
$html.='</td></tr>
</tr>
<tr>
<td colspan="3">&nbsp;</td>
</tr>
<tr>
<th align="left"  width=150px colspan="3">Apa inovasi kamu dalam kepanitiaan ';$html.=cetak("pilihan");$html.=' ? : </th align="left">
<tr>
<td align = "justify" colspan="3">';
$html.='<p align="justify">'.cetak("inovasi")."</p>";
$html.='</td></tr>
</tr>
</table>

</div></body>';
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
$mpdf->SetWatermarkText('FORM STAFF 2/3');
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

$mpdf->Output('form_KE_2 '.cetak("nama_lengkap").'.pdf', \Mpdf\Output\Destination::DOWNLOAD);
?>

