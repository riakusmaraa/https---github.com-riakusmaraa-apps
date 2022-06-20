<?php 
require "konek.php";
			$result = mysqli_query($conn,"SELECT * FROM `db_brawijayaAward` ");
			var_dump($result);
			// while ($mhs = mysqli_fetch_assoc($result)){
			// 	var_dump($mhs["nim"]);
			// }
 ?>
 <html>
 <table border="1" cellpadding="10" cellspacing="0">
 	 <?php  while ($mhs = mysqli_fetch_assoc($result)) :?>
 	 <tr>
 	 	<td><?= $mhs["nama"]; ?></td>
 	 	<td><?= $mhs["bem_inspiratif"]; ?></td>
 	 </tr>
 	 <?php  endwhile;?>
 </table>
 </html>