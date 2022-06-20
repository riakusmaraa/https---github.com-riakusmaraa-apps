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

$nim = $_GET["key"];
$idparam = $_GET["id"];
$nim = strrev($nim);
$nim = base64_decode($nim);
$nim = str_replace('apps','',$nim);
// $nim = "175150400111035";

// $_SESSION["pagenumber"]='{PAGENO}'."";

$sql = file_get_contents('https://em.ub.ac.id/em-event/getBio/'.$nim.'/'.$idparam);

$sql = json_decode($sql);
if($sql->data == null){
	header('https://em.ub.ac.id/apps');
}


// echo "<br><br>";
$data = $sql->data;
// var_dump($data);
$datapf = $sql->data->PENDIDIKAN_FORMAL;
$datapnf = $sql->data->PENDIDIKAN_NON_FORMAL;
$datapo = $sql->data->PENGALAMAN_ORGANISASI;
$dataod = $sql->data->ORGANISASI_DIIKUTI;
$datapk = $sql->data->PENGALAMAN_KEPANITIAAN;
$dataad = $sql->data->KEPANITIAAN_DIIKUTI;
$dataprestasi = $sql->data->PRESTASI;
$dataperform = $sql->data->PERFORM;
$datafasil = $data->FASILITAS;
$datajaringan = $data->JARINGAN;
$datakeahlian = $data->KEAHLIAN;

$sqldaf = file_get_contents('https://em.ub.ac.id/em-event/getDaf/'.$nim.'/'.$idparam);
$sqldaf = json_decode($sqldaf);

$daftar = $sqldaf->data;



// var_dump($data->Pendidikan_Formal);
// var_dump(json_decode($sql));

// echo $nim;




// function split ($str){//input string contoh cetak(jenjang),nama,;

// 	$result = explode("~",$str);

// 	return $result;

// }


function cetakprestasi ($a){//input array hasil split

	global $html;	

	$i=0;$c=1;

	foreach ($a as $data) {

		$html.= '<tr>

		<td>'.$c.'</td>

		<td>'.$data->TINGKAT.'</td>

		<td>'.$data->ACARA.'</td>

		<td>'.$data->TAHUN.'</td>

		</tr>';

		$i++;

		$c++;

	}

}

function cetakperform ($a){//input array hasil split

	global $html;	

	$i=0;$c=1;

	foreach ($a as $data) {

		$html.= '<tr>

		<td>'.$c.'</td>

		<td>'.$data->PERFORMER.'</td>

		<td>'.$data->ACARA.'</td>

		<td>'.$data->TAHUN.'</td>

		</tr>';

		$i++;

		$c++;

	}

}

function cetaksplit($a){
	global $html;
	$sa = explode("~",$a);
	$i=0;$c=1;
	
	foreach ($sa as $data) {
		
		$html.= '<tr>

		<td>'.$c.'</td>

		<td>'.$data.'</td>		

		</tr>';

		$i++;

		$c++;

	}
}

//<td class="barcodecell"><barcode code=';$html.=$nim;$html.=' type="C128A" class="barcode" /></td>

//<td class="barcodecell"><barcode code="Your message here" type="QR" class="barcode" size="0.8" error="M" disableborder="1" /></td>

// cetak($data->NIM);




$html=

'<body><div class="isi">

<p ></p>';$html.='

<h2>D.	KEAHLIAN KHUSUS</h2>



<h4>1. Prestasi</h4>

<table style="width:100% " class="kotak">';

$html.= '<tr>

<th width=50px>No</th>

<th width=350px>Prestasi</th>

<th>Tingkat</th>

<th width=100px>Tahun</th>

</tr>';

cetakprestasi ($dataprestasi);

$html.='</table>



<h4>2. Pengalaman Pembicara / Narasumber / Trainer</h4>

<table style="width:100% " class="kotak">';

$html.= '<tr>

<th width=50px>No</th>

<th width=350px>Prestasi</th>

<th>Tingkat</th>

<th width=100px>Tahun</th>

</tr>';

cetakperform ($dataperform);

$html.='</table>



<h4>3. Fasilitas yang dimiliki</h4>

<table style="width:100% " class="kotak">';

$html.= '<tr>

<th width=50px>No</th>

<th align="left">Fasilitas</th>

</tr>';

cetaksplit($datafasil);

$html.='</table>





<h4>4. Jaringan yang dimiliki </h4>

<table style="width:100% " class="kotak">';

$html.= '<tr>

<th width=50px>No</th>

<th align="left">Jaringan</th>

</tr>';

cetaksplit($datajaringan);

$html.='</table>





<h4>5. Keahlian Lain</h4>

<table style="width:100% " class="kotak">';

$html.= '<tr>

<th width=50px>No</th>

<th align="left">Keahlian Khusus</th>

</tr>';

cetaksplit($datakeahlian);

$html.='</table>



<table style="width:95%">

<tr>

<td colspan="3">&nbsp;</td>

</tr>

<tr>

<th align="left" width=150px>Pilihan 1</th align="left">

<td width=5px>:</td>

<td>';

$html.=$daftar->DAFTAR{0}->PILIHAN;

$html.='</td>

</tr>

<tr>

<th align="left"  width=150px>Alasan</th align="left">

<td width=5px>:</td>

<tr>

<td align = "justify" colspan="3">';

$html.="<p>".$daftar->DAFTAR{0}->ALASAN."</p>";

$html.='</td></tr>

</tr>

<tr>

<td colspan="3">&nbsp;</td>

</tr>

<tr>

<th align="left" width=150px>Pilihan 2</th align="left">

<td width=5px>:</td>

<td>';

$html.=$daftar->DAFTAR{0}->PILIHAN2;

$html.='</td>

</tr>

<tr>

<th align="left"  width=150px>Alasan</th align="left">

<td width=5px>:</td>

<tr>

<td align = "justify" colspan="3">';

$html.="<p>".$daftar->DAFTAR{0}->ALASAN2."</p>";

$html.='</td></tr>

</tr>

<tr>

<td colspan="3">&nbsp;</td>

</tr>

<tr>

<th align="left"  width=150px colspan="3">Alasan ';$html.=' : </th align="left">

<tr>

<td align = "justify" colspan="3">';

$html.='<p align="justify">'.$daftar->DAFTAR{0}->ALASAN_UMUM."</p>";

$html.='</td></tr>

</tr>



<tr>

<td colspan="3">&nbsp;</td>

</tr>

<tr>

<th align="left"  width=150px colspan="3">Target';$html.=' : </th align="left">

<tr>

<td align = "justify" colspan="3">';

$html.='<p align="justify">'.$daftar->DAFTAR{0}->TARGET."</p>";

$html.='</td></tr>

</tr>



<tr>

<td colspan="3">&nbsp;</td>

</tr>

<tr>

<th align="left"  width=150px colspan="3">Ide Kreatif';$html.=' : </th align="left">

<tr>

<td align = "justify" colspan="3">';

$html.='<p align="justify">'.$daftar->DAFTAR{0}->IDE_KREATIF."</p>";

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

// $mpdf->setFooter($footer);

$mpdf->SetWatermarkText('EM-EVENT FORM 2');

$mpdf->simpleTables = true;

$mpdf->useSubstitutions = false;

// $mpdf->SetHeader($header);

$mpdf->SetProtection(array('print'));

$mpdf->SetTitle("FORM PENDAFTARAN");

$mpdf->SetAuthor("@danang_tp");

$mpdf->showWatermarkText = true;

$mpdf->watermark_font = 'DejaVuSansCondensed';

$mpdf->watermarkTextAlpha = 0.1;

$mpdf->SetDisplayMode('fullpage');

$mpdf->WriteHTML($stylesheet,1);

$mpdf->WriteHTML($html,2);

// var_dump($html);
ob_clean();
$mpdf->Output('form_KE_2 '.$data->NAMA_LENGKAP.'.pdf', \Mpdf\Output\Destination::DOWNLOAD);

?>