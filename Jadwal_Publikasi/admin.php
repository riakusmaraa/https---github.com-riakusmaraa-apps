<?php
    session_start();
    
    if($_SESSION["loggedin"]){
        //echo "Selamat Datang";
        $greeting = $_SESSION["username"];
        //echo $_SESSION["username"];
        $date1 =strtotime("now")."<br>";
        
        
    }else{
        header ("location:index.php");
        die();
    }

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
   
    <link rel="stylesheet" href="/resources/demos/style.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">

    <link rel="shortcut icon" href="img/logo.png" type="image/x-icon">
   
    <style type="text/css">
        .wrapper{
            width: 650px;
            margin: 0 auto;
        }
        .page-header h2{
            margin-top: 0;
        }
        table tr td:last-child a{
            margin-right: 15px;
        }
    </style>
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    
      
      
    <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script> -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.js"></script>
    
    <script type="text/javascript">
        $(document).ready(function(){
            $('[data-toggle="tooltip"]').tooltip();   
        });
    </script>
</head>
<body>
    <div class="wrapper">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="page-header clearfix">
                        <h1 class="text-center">Jadwal Publikasi EM UB 2021</h1>

                        
                    </div>
                    <div class="text-center">
                        
                        <img src="img/logoPuskom21.png" width="300px" height="300px" class="rounded">
                    </div>
                    <div class="text-center">
                    <h2>Selamat Datang <?php echo $greeting; ?></h2>
                    <br>
                    <p><?php echo $date1; ?></p>
                    <button type="button" class="center btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" id="tombol">
                            Buat Jadwal
                            </button>
                    
                            
                    <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#modalSOP" id="tombol">
                      SOP Puskominfo
                    </button>
                    <a href="showAll.php" class="btn btn-success">Tampilkan Semua Data</a>
                   
                    </div>
                    <div class="text-center" id="tombol">
                        <form action="" method="get">
                        <label>
                            Filter Hari :
                        </label>
                        <input type="date" class="form-control"  name="tanggal_cari" required>
                        <button type="submit" class="btn btn-info" id="tombol" value="cari">Cari : </button>
                        </form>
                    </div>
                    
                    <?php
                    // Include config file
                    require_once "config.php";
                    $jumlahDataPerhalaman = 10;
                    $jumlahData = count(query("SELECT * FROM jadwal_publikasi WHERE kementerian='$greeting'"));
                    $jumlahHalaman = ceil($jumlahData/$jumlahDataPerhalaman);
                    //$halamanAktif = $_GET["halaman"];
                    if(isset($_GET["halaman"])){
                        $halamanAktif = $_GET["halaman"];
                    }else{
                        $halamanAktif = 1;
                    }
                    $awalData = ($jumlahDataPerhalaman *$halamanAktif)-$jumlahDataPerhalaman;
                    
                    // Attempt select query execution
                    //mulai pencarian berdasar tanggal
                    if(isset($_GET['tanggal_cari'])){
                        $cari = $_GET['tanggal_cari'];
                        $sql = "SELECT * FROM jadwal_publikasi WHERE tanggal like '%".$cari."%'";
                        

                        
                    if($result = mysqli_query($link, $sql)){
                        $jumlah_rows = mysqli_num_rows($result);
                        echo "Menampilkan data postingan pada tanggal '$cari'";
                        if(mysqli_num_rows($result) > 0){
                            echo "<table class='table table-bordered table-striped'>";
                                echo "<thead>";
                                    echo "<tr>";
                                        echo "<th>#</th>";
                                        echo "<th>Nama</th>";
                                        echo "<th>Kementerian</th>";
                                        echo "<th>Jam Upload</th>";
                                        echo "<th>Tanggal Upload</th>";
                                        echo "<th>CP : </th>";
                                        echo "<th>Caption : </th>";
                                        echo "<th>Action : </th>";

                                    echo "</tr>";
                                echo "</thead>";
                                echo "<tbody>";
                                while($row = mysqli_fetch_array($result)){
                                    
                                    echo "<tr>";
                                        echo "<td>" . $row['id'] . "</td>";
                                        echo "<td>" . $row['nama'] . "</td>";
                                        echo "<td>" . $row['kementerian'] . "</td>";
                                        echo "<td>" . $row['jam'] . "</td>";
                                        echo "<td>" . $row['tanggal'] . "</td>";
                                        echo "<td>" . $row['cp'] . "</td>";
                                        echo "<td>" . "<a href='read.php?id=". $row['id'] ."' title='Lihat Data' data-toggle='tooltip' class='btn btn-success'>Lihat</a>";
                                            "</td>";


                                        echo "<td>";
                                            echo "<a href='read.php?id=". $row['id'] ."' title='Lihat Data' data-toggle='tooltip'><span class='glyphicon glyphicon-eye-open'></span></a>";
                                            echo "<a href='update.php?id=". $row['id'] ."' title='Ubah Data' data-toggle='tooltip'><span class='glyphicon glyphicon-pencil'></span></a>";
                                            echo "<a href='delete.php?id=". $row['id'] ."' title='Hapus Data' data-toggle='tooltip'><span class='glyphicon glyphicon-trash'></span></a>";
                                        echo "</td>";
                                    echo "</tr>";
                                }
                                echo "</tbody>";                            
                            echo "</table>";
                            echo "<div class='text-center'><a href='index.php' class='btn btn-info' id='tombol'>Kembali</a></div>";
                            // Free result set
                            mysqli_free_result($result);
                        } else{
                            echo "<p class='lead'><em>Tidak Ada jadwal yang ditemukan pada tanggal : </em></p>";
                            echo "<p class='text-center'>".$cari."</p>";
                            echo "<div class='text-center'><a href='index.php' class='btn btn-info' id='tombol'>Kembali</a></div>";
                        }
                    } else{
                        echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
                    }
 
                    // Close connection
                    mysqli_close($link);
                    }//Jika Puskom maka ini
                    else if($greeting==="Puskominfo"){
                        $jumlahDataPerhalaman = 10;
                        $jumlahData = count(query("SELECT * FROM jadwal_publikasi"));
                        $jumlahHalaman = ceil($jumlahData/$jumlahDataPerhalaman);
                        $sql = "SELECT * FROM jadwal_publikasi ORDER BY id DESC LIMIT $awalData, $jumlahDataPerhalaman ";
                    if($result = mysqli_query($link, $sql)){
                        echo '<h4 class="text-center">Menampilkan data jadwal publikasi dari Kementerian/Unit '. $greeting.'</h4>'; 
                        if(mysqli_num_rows($result) > 0){
                            echo "<table class='table table-bordered table-striped'>";
                                echo "<thead>";
                                    echo "<tr>";
                                        echo "<th>#</th>";
                                        echo "<th>Nama</th>";
                                        echo "<th>Kementerian</th>";
                                        echo "<th>Jenis Postingan</th>";
                                        echo "<th>Jam Upload</th>";
                                        echo "<th>Tanggal Upload</th>";
                                        echo "<th>CP : </th>";
                                        echo "<th>Caption : </th>";
                                        echo "<th>Action : </th>";

                                    echo "</tr>";
                                echo "</thead>";
                                echo "<tbody>";
                                while($row = mysqli_fetch_array($result)){
                                    // $bing = capt($row["id"]->caption);
                                    echo "<tr>";
                                        echo "<td>" . $row['id'] . "</td>";
                                        echo "<td>" . $row['nama'] . "</td>";
                                        echo "<td>" . $row['kementerian'] . "</td>";
                                        echo "<td>" . $row['jenis'] . "</td>";
                                        echo "<td>" . $row['jam'] . "</td>";
                                        echo "<td>" . $row['tanggal'] . "</td>";
                                        echo "<td>" . $row['cp'] . "</td>";
                                        echo "<td>" . "<a href='read.php?id=". $row['id'] ."' title='Lihat Data' data-toggle='tooltip' class='btn btn-success'>Lihat</a>";
                                            "</td>";'</td>';


                                        echo "<td>";
                                            echo "<a href='read.php?id=". $row['id'] ."' title='Lihat Data' data-toggle='tooltip'><span class='glyphicon glyphicon-eye-open'></span></a>";
                                            // echo "<a href='update.php?id=". $row['id'] ."' title='Ubah Data' data-toggle='tooltip'><span class='glyphicon glyphicon-pencil'></span></a>";
                                            echo "<a href='delete.php?id=". $row['id'] ."' title='Hapus Data' data-toggle='tooltip'><span class='glyphicon glyphicon-trash'></span></a>";
                                        echo "</td>";
                                    echo "</tr>";
                                }
                                echo "</tbody>";                            
                            echo "</table>";
                            // Free result set
                            mysqli_free_result($result);
                        } else{
                            echo "<p class='lead'><em>Tidak Ada jadwal yang ditemukan : </em></p>";
                            
                        }
                    } else{
                        echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
                    }
 
                    // Close connection
                    mysqli_close($link);

                    }
                    //akhir Puskom
                    
                    else{
                        $sql = "SELECT * FROM jadwal_publikasi WHERE kementerian='$greeting' ORDER BY id DESC LIMIT $awalData, $jumlahDataPerhalaman ";
                        if($result = mysqli_query($link, $sql)){
                        echo '<h4 class="text-center">Menampilkan data jadwal publikasi dari Kementerian/Unit '. $greeting.'</h4>'; 
                        if(mysqli_num_rows($result) > 0){
                            echo "<table class='table table-bordered table-striped'>";
                                echo "<thead>";
                                    echo "<tr>";
                                        echo "<th>#</th>";
                                        echo "<th>Nama</th>";
                                        echo "<th>Kementerian</th>";
                                        echo "<th>Jenis Postingan</th>";
                                        echo "<th>Jam Upload</th>";
                                        echo "<th>Tanggal Upload</th>";
                                        echo "<th>CP : </th>";
                                        echo "<th>Caption : </th>";
                                        echo "<th>Action : </th>";

                                    echo "</tr>";
                                echo "</thead>";
                                echo "<tbody>";
                                while($row = mysqli_fetch_array($result)){
                                    // $bing = capt($row["id"]->caption);
                                    echo "<tr>";
                                        echo "<td>" . $row['id'] . "</td>";
                                        echo "<td>" . $row['nama'] . "</td>";
                                        echo "<td>" . $row['kementerian'] . "</td>";
                                        echo "<td>" . $row['jenis'] . "</td>";
                                        echo "<td>" . $row['jam'] . "</td>";
                                        echo "<td>" . $row['tanggal'] . "</td>";
                                        echo "<td>" . $row['cp'] . "</td>";
                                        echo "<td>" . "<a href='read.php?id=". $row['id'] ."' title='Lihat Data' data-toggle='tooltip' class='btn btn-success'>Lihat</a>";
                                            "</td>";


                                        echo "<td>";
                                            echo "<a href='read.php?id=". $row['id'] ."' title='Lihat Data' data-toggle='tooltip'><span class='glyphicon glyphicon-eye-open'></span></a>";
                                            echo "<a href='update.php?id=". $row['id'] ."' title='Ubah Data' data-toggle='tooltip'><span class='glyphicon glyphicon-pencil'></span></a>";
                                            echo "<a href='delete.php?id=". $row['id'] ."' title='Hapus Data' data-toggle='tooltip'><span class='glyphicon glyphicon-trash'></span></a>";
                                        echo "</td>";
                                    echo "</tr>";
                                }
                                echo "</tbody>";                            
                            echo "</table>";
                            // Free result set
                            mysqli_free_result($result);
                        } else{
                            echo "<p class='lead'><em>Tidak Ada jadwal yang ditemukan : </em></p>";
                            
                        }
                    } else{
                        echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
                    }
 
                    // Close connection
                    mysqli_close($link);

                    }
                    
                    ?>
                    <!-- Modal -->
                        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h2 class="modal-title" id="exampleModalCenterTitle">Buat Jadwal Publikasi</h2>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                              <form action="insert.php" method="post">
                                  <div class="form-group">
                                    <label for="exampleInputEmail1">Nama Kegiatan</label>
                                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="nama" required>
                                    
                                  </div>
                                  <div class="form-group">
                                    <label for="exampleInputEmail1">Kementerian</label>
                                    <select class="custom-select" name="kementerian">
                                      <option selected><?php echo $greeting;?></option>
                                      

                                    </select>
                                    
                                    <!-- <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"> -->
                                    
                                  </div>
                                  <!-- fIELD jENIS -->
                                  
                                  <div class="form-group">
                                    <label for="exampleInputEmail1">Jenis Postingan</label>
                                    <select class="custom-select" name="jenis">
                                      <option selected>Poster</option>
                                      <option value="Video">Video</option>
                                      </select>
                                    </div>
                                  <!-- Akhir field jenis -->
                                  <div class="form-group">
                                    <label for="exampleInputEmail1">Jam Postingan</label>
                                    <select class="custom-select" name="jam">
                                    
                                      <option value="09:30:00">09.30</option>
                                      <option value="13:00:00">13.00</option>
                                      <option value="18:00:00">18.00</option>
                                      <option value="21:00:00">21.00</option>
                                     
                                    </select>
                                   
                                    
                                  </div>
                                  <div class="form-group">
                                    <label for="exampleInputPassword1">Tanggal Upload</label>
                                    
                                    <input type="date" class="form-control" name="tanggal" required>
                                    <small id="emailHelp" class="form-text text-muted">Format Hari-Bulan-Tahun</small>
                                  </div>
                                  <div class="form-group">
                                    <label for="exampleCP">CP</label>
                                    <input type="text" class="form-control" id="exampleCP" name="cp" required>
                                    <small id="emailHelp" class="form-text text-muted">Format Nama/id Line</small>
                                  </div>
                                  <div class="form-group">
                                    <label for="exampleCP">Caption</label>
                                    <input type="text" class="form-control" id="exampleCP" name="caption" placeholder="menyusul">
                                    <small id="emailHelp" class="form-text text-muted">Jika belum ada bisa ditulis menyusul</small>
                                  </div>
                                  
                              
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
                                <button type="submit" class="btn btn-primary">Simpan</button>
                            </form>
                            </div>
                            </div>
                        </div>
                        </div>
                        <!-- Akhir Modal -->

                
                    <!-- Modal -->
                    <div class="modal fade" id="modalSOP" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h2 class="modal-title" id="exampleModalLongTitle">SOP Puskominfo</h2>
                           
                            </button>
                          </div>

                          <div class="modal-body" id="modal-SOP">
                            <ol>
                                <li>Budayakan kata tolong , maaf dan terima kasih</li>
                                <li>Mengisi jadwal publikasi maximal H-3 poster dan H-10 untuk video</li>
                                <li>Mengirim konten dan konfirmasi permintaan postingan pada grup puskom X kementrian(Untuk konten video H-10, Poster H-3)</li>
                                <li>Menyiapkan caption dan 3 hastag terkait postingan maximal H-1 posting</li>
                                <li>Konten infografis harap menyertakan poin-poin</li>
                                <li>Revisi maksimal 3 jam setelah di upload</li>
                                <li>Pastikan setiap konten telah memenuhi PUEBI dengan benar</li>
                                <li>Untuk Live Report Konfirmasi di grup puskom X kementerian J-12 jam</li>
                                <li>Batas maksimal mengirim konten live report pukul 21:00 Wib</li>
                            </ol>  
                        
                            

                            <p><b>NB: poin 2 & 4 terkecuali konten insidental (bencana)</b></p>
                            
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal">Setuju</button>
                            <a href="https://www.google.com/search?client=opera&ei=b5BbXoHUBYq75OUPiJeBgAU&q=pentingnya+sebuah+sop&oq=pentingnya+sebuah+sop&gs_l=psy-ab.3..33i160.5275.10692..11006...1.0..2.124.2943.43j2......0....1..gws-wiz.....6..0j0i7i30j0i8i30j0i8i10i30j0i8i67j0i362i308i154i357j0i131j0i67j0i22i30j33i22i29i30..26%3A59.45652173913044j27%3A1.87f50sMV_IQ&ved=0ahUKEwjBx4zFivnnAhWKHbkGHYhLAFAQ4dUDCAo&uact=5" class="btn btn-danger">Tidak Setuju</a>
                            <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Modal Login -->
                    
                    <!-- Button trigger modal -->
                     <div class="text-center">
                        <p>Navigasi</p>
                        <?php for($i = 1; $i <= $jumlahHalaman; $i++) :?>
                                <a href="?halaman=<?php echo $i;?>"><?php echo $i;?></a>
                        <?php endfor; ?>
                        <br>
                        
                        
                    </div>
                        

                        
                </div>
            </div>        
        </div>

        
    </div>
    <div class="p-3 mb-2 bg-danger text-dark">
            <h4 class="text-center">
                Made with <span style="color: #e25555;" class="glyphicon glyphicon-heart" aria-hidden="true"></span> by Puskominfo
            </h4>
    </div>
</body>
</html>