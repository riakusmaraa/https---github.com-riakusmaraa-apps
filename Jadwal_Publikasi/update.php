<?php
// Include config file
require_once "config.php";
 
// Define variables and initialize with empty values
$sqlCek = "SELECT * FROM jadwal_publikasi WHERE tanggal='$tanggal' AND jam='$jam'";
$rows1 = mysqli_query($link,$sqlCek);
$jumlahRow= mysqli_num_rows($rows1);
$nama = $kementerian = $jam = $tanggal = $cp = $caption = "";
$nama_err = $kementerian_err = $jam_err = $tanggal_err = $cp_err= $caption_err = "";
 
// Processing form data when form is submitted
if(isset($_POST["id"]) && !empty($_POST["id"])){
    // Get hidden input value
    $id = $_POST["id"];
    
    // Validate name
    $input_nama = trim($_POST["nama"]);
    if(empty($input_nama)){

        $nama_err = "Please enter a name.";
    
   } else{
        $nama = $input_nama;
    }
    
    // Validate address address
    $input_kementerian = trim($_POST["kementerian"]);
    if(empty($input_kementerian)){
        $kementerian_err = "Please enter an kementerian.";     
    } else{
        $kementerian = $input_kementerian;
    }
    
    // Validate salary
    $input_jam = trim($_POST["jam"]);
    if(empty($input_jam)){
        $jam_err = "Please enter the jam amount.";     
    // } elseif(!ctype_digit($input_jam)){
    //     $jam_err = "Please enter a positive integer value.";
    } else{
        $jam = $input_jam;
    }
    $input_tanggal = trim($_POST["tanggal"]);
    if(empty($input_tanggal)){
        $tanggal_err = "Tentukan Tanggal Jam";     
    // } elseif(!ctype_digit($input_salary)){
    //     $salary_err = "Please enter a positive integer value.";
    } else{
        $tanggal = $input_tanggal;
    }
    $input_cp = trim($_POST["cp"]);
    if(empty($input_cp)){
        $cp_err = "Isi bidang Ini";     
    // } elseif(!ctype_digit($input_salary)){
    //     $salary_err = "Please enter a positive integer value.";
    } else{
        $cp = $input_cp;
    }
    $input_caption = trim($_POST["caption"]);
    if(empty($input_caption)){
        $caption_err = "Isi bidang Ini(bisa tulis meyusul)";     
    // } elseif(!ctype_digit($input_salary)){
    //     $salary_err = "Please enter a positive integer value.";
    } else{
        $caption = $input_caption;
    }
    
    // Check input errors before inserting in database
    if(empty($nama_err) && empty($kementerian_err) && empty($jam_err) && empty($tanggal_err)&& empty($cp_err)&&empty($caption_err)){
        // Prepare an update statement
        $sql = "UPDATE jadwal_publikasi SET nama=?, kementerian=?, jam=?,tanggal=?,cp=?,caption=? WHERE id=?";
         
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
          	if($jumlahRow<1){

          		mysqli_stmt_bind_param($stmt, "ssssssi", $param_nama, $param_kementerian, $param_jam,$param_tanggal,$param_cp,$param_caption,$param_id);
            
            // Set parameters
		            $param_nama = $nama;
		            $param_kementerian = $kementerian;
		            $param_jam = $jam;
		            $param_tanggal = $tanggal;
		            $param_cp = $cp;
		            $param_caption = $caption;
		            $param_id = $id;
           	

           		 
            	if(mysqli_stmt_execute($stmt)){
                	// Records updated successfully. Redirect to landing page
                	header("location: admin.php?halaman=1");
                	exit();
            	}else{
                echo "Something went wrong. Please try again later.";
            	}
           	



          	}else{
           		echo "
                    <script>
                    alert('Maaf namun jadwal pada tanggal dan jam yang dipilih telah terisi, harap pilih waktu yang lain');
                    document.location.href = 'admin.php?halaman=1';
                    </script>    
                    ";
           	}
            
            
           
        }
         
        // Close statement
        mysqli_stmt_close($stmt);
    }
    
    // Close connection
    mysqli_close($link);

} else{
    // Check existence of id parameter before processing further
    if(isset($_GET["id"]) && !empty(trim($_GET["id"]))){
        // Get URL parameter
        $id =  trim($_GET["id"]);
        
        // Prepare a select statement
        $sql = "SELECT * FROM jadwal_publikasi WHERE id = ?";
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "i", $param_id);
            
            // Set parameters
            $param_id = $id;
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                $result = mysqli_stmt_get_result($stmt);
    
                if(mysqli_num_rows($result) == 1){
                    /* Fetch result row as an associative array. Since the result set
                    contains only one row, we don't need to use while loop */
                    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
                    
                    // Retrieve individual field value
                    $nama = $row["nama"];
                    $kementerian = $row["kementerian"];
                    $jam = $row["jam"];
                    $tanggal = $row["tanggal"];
                    $cp = $row["cp"];
                    $caption = $row["caption"];
                } else{
                    // URL doesn't contain valid id. Redirect to error page
                    header("location: error.php");
                    exit();
                }
                
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }
        }
        
        // Close statement
        mysqli_stmt_close($stmt);
        
        // Close connection
        mysqli_close($link);
    }  else{
        // URL doesn't contain id parameter. Redirect to error page
        header("location: error.php");
        exit();
    }
}
?>
 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Update Record</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css"> -->
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link rel="stylesheet" href="/resources/demos/style.css">
    <link rel="shortcut icon" href="img/logo.png">
    <style type="text/css">
        .wrapper{
            width: 500px;
            margin: 0 auto;
        }
    </style>
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  <script type="text/javascript">
        $( function() {

            $( "#datepicker" ).datepicker({
                dateFormat: "DD, d MM, yy"
            });

          } );
    </script>
</head>
<body>
    <div class="wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="page-header">
                        <h1 class="text-center">Ubah Data</h1>
                    </div>
                    <p class="text-center">Pastikan Mengisikan data dengan benar dan jangan mengubah isi tanpa izin orang terkait</p>
                    <form action="<?php echo htmlspecialchars(basename($_SERVER['REQUEST_URI'])); ?>" method="post">
                        <div class="form-group <?php echo (!empty($name_err)) ? 'has-error' : ''; ?>">
                            <label>Nama</label>
                            <input type="text" name="nama" class="form-control" value="<?php echo $nama; ?>">
                            <span class="help-block"><?php echo $nama_err;?></span>
                        </div>
                        <div class="form-group <?php echo (!empty($kementerian_err)) ? 'has-error' : ''; ?>">
                            
                                    <label for="exampleInputEmail1">Kementerian</label>
                                    <select class="custom-select" name="kementerian">
                                      <option selected><?php echo $kementerian?></option>
                                      <option value="Advokesma">Advokesma</option>
                                      <option value="Keilmuan dan Inovasi">Keilmuan dan Inovasi</option>
                                      <option value="Lingkungan Hidup">Lingkungan Hidup</option>
                                      <option value="PORA">Pemuda dan Olahraga</option>
                                      <option value="PSDM">Pengembangan Sumber Daya Mahasiswa</option>
                                      <option value="Diplomasi Internal">Diplomasi Internal</option>
                                      <option value="Diplomasi Eksternal">Diplomasi Eksternal</option>
                                      <option value="Unit Badan Usaha Milik Mahasiswa">Unit Badan Usaha Milik Mahasiswa</option>
                                      <option value="Unit Brawijaya Mengajar">Unit Brawijaya Mengajar</option>
                                      <option value="Gerakan Kebijakan Internal">Gerakan Kebijakan Internal</option>
                                      <option value="Gerakan Kebijakan Eksternal">Gerakan Kebijakan Eksternal</option>
                                      <option value="Unit Pemberdayaan Perempuan Progresif">Gerakan Kebijakan Internal</option>

                                    </select>
                                    <!-- <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"> -->
                                    
                                  
                            <!-- <textarea name="kementerian" class="form-control"><?php echo $kementerian; ?></textarea> -->
                            <span class="help-block"><?php echo $kementerian_err;?></span>
                        </div>
                        <div class="form-group <?php echo (!empty($jam_err)) ? 'has-error' : ''; ?>">
                            
                                    <label for="exampleInputEmail1">Jam Postingan</label>
                                    <select class="custom-select" name="jam">
                                      <option selected><?php echo $jam?></option>
                                      <!-- <option value="Insidental Pagi">Insidental Pagi</option> -->
                                      <option value="09:30:00">09:30:00</option>
                                      <option value="12:00:00">13:00:00</option>
                                      <option value="18:00:00">18:00:00</option>
                                      <option value="21:00:00">21:00:00</option>
                                      <!-- <option value="Insidental Malam">Insidental Malam</option> -->
                                    </select>
                                    <!-- <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"> -->
                                    
                                
                            <!-- <label>Jam</label>
                            <input type="text" name="jam" class="form-control" value="<?php echo $jam; ?>"> -->
                            <span class="help-block"><?php echo $jam_err;?></span>
                        </div>
                        <div class="form-group <?php echo (!empty($tanggal_err)) ? 'has-error' : ''; ?>">
                            <label>Tanggal</label>
                            <input type="date"  name="tanggal" class="form-control" value="<?php echo $tanggal; ?>">
                            <span class="help-block"><?php echo $tanggal_err;?></span>
                        </div>
                        <div class="form-group <?php echo (!empty($cp_err)) ? 'has-error' : ''; ?>">
                            <label>CP :</label>
                            <input type="text" name="cp" class="form-control" value="<?php echo $cp; ?>">
                            <span class="help-block"><?php echo $cp_err;?></span>
                        </div>
                        <div class="form-group <?php echo (!empty($cp_err)) ? 'has-error' : ''; ?>">
                            <label>Caption :</label>
                            <input type="textarea" name="caption" class="form-control" value="<?php echo $caption; ?>">
                            <span class="help-block"><?php echo $caption_err;?></span>
                        </div>
                        <input type="hidden" name="id" value="<?php echo $id; ?>"/>
                        <input type="submit" class="btn btn-primary" value="Submit">
                        <a href="admin.php?halaman=1" class="btn btn-default">Cancel</a>
                    </form>
                </div>
            </div>        
        </div>
    </div>
</body>
</html>