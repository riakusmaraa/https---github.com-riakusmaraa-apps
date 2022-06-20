<?php
 session_start();
    if(isset($_SESSION["loggedin"])&& $_SESSION["loggedin"]===true){
        header("admin.php");
        exit;
    }
    require_once "config.php";
    //define veriables and initialize with empty values
    $username = $password = "";
    $username_err = $password_err ="";

    //proses data
    if($_SERVER["REQUEST_METHOD"]== "POST"){
        $username = trim($_POST["username"]);
        $password = trim($_POST["password"]);
    //validate
        $sql = "SELECT id, username, password FROM user WHERE username = ?";
        if($stmt = mysqli_prepare($link, $sql)){
            //Siapkan variabel bind
            mysqli_stmt_bind($stmt, "s", $param_username);

            //set parameter
            $param_username = $username;
            //Atempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                mysqli_stmt_store_result($stmt);

                //cek apakah username ada di database.
                if(mysqli_stmt_num_rows($stmt)==1){
                    //hasil bind
                    mysqli_stmt_bind_result($stmt,$id,$username,$hashed_password);
                    if(mysqli_stmt_fetch($stmt)){
                        if(password_verify($password, $hashed_password)){
                            //password lolos buat session
                            session_start();
                            //data sesssion
                            $_SESSION["loggedin"] = true;
                            $_SESSION["id"] = $id;
                            $_SESSION["username"] = $username;
                            //redirect halaman admin
                            header ("location:admin.php");
                        }else{
                            $password_err = "Password yang dimasukkan salah";
                        }
                    }
                }else{
                    //jika username tidak ada
                    $username_err = "Username tidak ditemukan";
                }
            }else{
                echo "Opps ada kesalahan";
            }
            mysqli_stmt_close($stmt);
        }
        mysqli_close($link);
    }
?>