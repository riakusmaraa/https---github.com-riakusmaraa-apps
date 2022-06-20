<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dashboard</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
    <link href = "https://code.jquery.com/ui/1.10.4/themes/ui-lightness/jquery-ui.css"
         rel = "stylesheet">
      <script src = "https://code.jquery.com/jquery-1.10.2.js"></script>
      <script src = "https://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
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
    <script type="text/javascript">
        $(function() {
            $( "#datepicker" ).datepicker();

            // $( "#datepicker" ).datepicker({
            //     dateFormat: "DD, d MM, yy"
            // });
        });
    </script>
      
      
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
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalLogin">
                                Login
                                </button>                           
                    <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#modalSOP" id="tombol">
                      SOP Puskominfo
                    </button>
                    </div>
                    <div>
                        <h2 class="text-center">Selamat Datang di Platform Jadwal Publikasi Puskominfo, Pastikan sudah membaca dan memahami SOP yang tertera ya :)</h2>
                    </div>
                    
                    
                               
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
                        
                            

                            <p><b>NB: poin 2 - 4 terkecuali konten insidental (bencana)</b></p>
                            
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
                                

                                <!-- Modal -->
                                            <div class="modal fade" id="modalLogin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog" role="document">
                                                <div class="modal-content">
                                                <div class="modal-header">
                                                    <h2 class="modal-title" id="exampleModalLabel">Masuk untuk membuat Jadwal</h2>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                <form action = "login2.php" method="post">
                                                <div class="form-group">
                                                    <label for="modalLogin">Kementerian</label>
                                                    <input type="text" class="form-control" name="username" required>
                                                </div>
                                                <div class="form-group">
                                                    <label for="modalLogin">Password</label>
                                                    <input type="password" class="form-control" name="password" required>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
                                                    <button type="submit"  name ="login" class="btn btn-primary">Login</button>
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                                    <!-- Akhir Modal -->
                    <!-- Button trigger modal -->
                            
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