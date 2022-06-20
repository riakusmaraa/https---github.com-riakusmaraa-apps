<?php
    //koneksi database
    $conn = mysqli_connect("db.rajabrawijaya.ub.ac.id","em","kawrjzofwu") or die("cannot connect");
    mysqli_select_db($conn,"db_em") or die("database tidak ditemukan");
    // $_SESSION["loggedin"] = false;


    if(isset($_POST['login'])){
        $user = $_POST['username'];
        $pass = $_POST['password'];

        if($user && $pass){
            $cek_db = "SELECT * FROM user WHERE username='$user'";
            $query = mysqli_query($conn,$cek_db);
            if(mysqli_num_rows($query) !=0){
                $row= mysqli_fetch_assoc($query);
                $db_user = $row['username'];
                $db_pass = $row['password'];

                if($user == $db_user &&$pass==$db_pass){
                    session_start();
                    $_SESSION["loggedin"]=true;
                    //$_SESSION["id"] = $id;
                    $_SESSION["username"] = $user;
                    
                    echo "
                    <script>
                    alert('Login Berhasil!');
                    document.location.href = 'admin.php?';
                    </script>    
                ";
                }else{
                    echo "
                    <script>
                    alert('Login gagal Username atau password salah!');
                    document.location.href = 'index.php?halaman=1';
                    </script>    
                ";
                }
            }else{
                    echo "
                    <script>
                    alert('username tidak ada didatabase!');
                    document.location.href = 'index.php?halaman=1';
                    </script>    
                ";
            }
        }
        
    }
    else{
        echo "
        <script>
        alert('data gagal ditambahkan!');
        document.location.href = 'index.php?halaman=1';
        </script>    
    ";
    }

?>