<?php
// Include config file
require_once "config.php";
 
// Define variables and initialize with empty values
$nama = $kementerian = $jam = $tanggal = $cp = "";
$nama_err = $kementerian_err = $jam_err = $tanggal_err = $cp_err= "";
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
    // Validate name
    $input_nama = trim($_POST["nama"]);
    if(empty($input_name)){
        $name_err = "Bidang harus diisi";
    // } elseif(!filter_var($input_name, FILTER_VALIDATE_REGEXP, array("options"=>array("regexp"=>"/^[a-zA-Z\s]+$/")))){
    //     $name_err = "Input tidak Valid/ pastikan angka ditulis dengan huruf misal 3 = tiga";
    } else{
        $nama = $input_nama;
    }
    
    // Validate address
    $input_kementerian = trim($_POST["kementerian"]);
    if(empty($input_kementerian)){
        $kementerian_err = "Bidang Harus Diisi";     
    } else{
        $kementerian = $input_kementerian;
    }
    
    // Validate salary
    $input_jam = trim($_POST["jam"]);
    if(empty($input_jam)){
        $jam_err = "Pilh Jam";     
    // } elseif(!ctype_digit($input_salary)){
    //     $salary_err = "Please enter a positive integer value.";
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
        $jam_err = "Isi bidang Ini";     
    // } elseif(!ctype_digit($input_salary)){
    //     $salary_err = "Please enter a positive integer value.";
    } else{
        $cp = $cp;
    }
    
    // Check input errors before inserting in database
    if(empty($nama_err) && empty($kementerian_err) && empty($jam_err) && empty($tanggal_err) && empty($cp_err)){
        // Prepare an insert statement
        $sql = "INSERT INTO jadwal_publikasi (nama, kementerian, jam, tanggal, cp) VALUES (?, ?, ?,?,?)";
         
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt,'sssss',$param_nama, $param_kementerian, $param_jam, $param_tanggal, $param_cp);
            
            // Set parameters
            $param_nama = $nama;
            $param_kementerian = $kementerian;
            $param_jam = $jam;
            $param_tanggal = $tanggal;
            $param_cp = $cp;
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Records created successfully. Redirect to landing page
                header("location: index.php");
                exit();
            } else{
                echo "Something went wrong. Please try again later.";
            }
        }
         
        // Close statement
        mysqli_stmt_close($stmt);
    }
    
    // Close connection
    mysqli_close($link);
}
?>
 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Create Record</title>
   <!--  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css"> -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <style type="text/css">
        .wrapper{
            width: 500px;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="page-header">
                        <h2>Create Record</h2>
                    </div>
                    <p>Please fill this form and submit to add employee record to the database.</p>
                    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
                        <div class="form-group <?php echo (!empty($nama_err)) ? 'has-error' : ''; ?>">
                            <label>Nama</label>
                            <input type="text" name="nama" class="form-control">
                            <span class="help-block"><?php echo $nama_err;?></span>
                        </div>
                        <div class="form-group <?php echo (!empty($kementerian_err)) ? 'has-error' : ''; ?>">
                           <!--  <label>Kementerian</label> -->
                           <!--  <textarea name="address" class="form-control"></textarea> -->
                                <div class="form-group"> 
                                    <label for="exampleInputEmail1">Kementerian</label>
                                    <select class="custom-select" name="kementerian">
                                      <option selected>Kementerian</option>
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
                                      <?php echo $kementerian; ?>

                                    </select>
                                    <!-- <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"> -->
                                    
                                     </div>
                            <span class="help-block"><?php echo $kementerian;?></span>
                        </div>
                        <div class="form-group <?php echo (!empty($jam_err)) ? 'has-error' : ''; ?>">
                            <label>Jam</label>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Jam Postingan</label>
                                    <select class="custom-select" name="jam">
                                      <option selected>Pilih Waktu Postingan</option>
                                      <!-- <option value="Insidental Pagi">Insidental Pagi</option> -->
                                      <option value="09.30">09.30</option>
                                      <option value="12.00">13.00</option>
                                      <option value="18.00">18.00</option>
                                      <option value="21.00">21.00</option>
                                      <!-- <option value="Insidental Malam">Insidental Malam</option> -->
                                    </select>
                                    <!-- <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"> -->
                                    
                                  </div>
                            <!-- <input type="text" name="jam" class="form-control" value="<?php echo $jam; ?>"> -->
                            <span class="help-block"><?php echo $jam_err;?></span>
                        </div>
                        <div class="form-group <?php echo (!empty($tanggal_err)) ? 'has-error' : ''; ?>">
                            <label>Tanggal</label>
                            <input type="date" name="tanggal" class="form-control" value="<?php echo $tanggal; ?>">
                            <span class="help-block"><?php echo $tanggal_err;?></span>
                        </div>
                        <div class="form-group <?php echo (!empty($cp_err)) ? 'has-error' : ''; ?>">
                            <label>CP :</label>
                            <input type="text" name="cp" class="form-control" value="<?php echo $cp; ?>">
                            <span class="help-block"><?php echo $cp_err;?></span>
                        </div>
                        <input type="submit" class="btn btn-primary" value="Submit">
                        <a href="index.php" class="btn btn-secondary">Cancel</a>
                    </form>
                </div>
            </div>        
        </div>
    </div>
</body>
</html>