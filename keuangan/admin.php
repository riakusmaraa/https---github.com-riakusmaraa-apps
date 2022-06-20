<?php
//Cek Session
session_start();
include 'func.php';
?>
<?= template_header('Home') ?>

<div class="container mt-3 mb-2">
    <h1 class="mb-3">Menu</h1>
    <?php
        if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true) {
            echo template_login();
        } else {
            echo <<< EOT
                        <div class="card border-warning" style="max-width: 18rem;">
                            <div class="card-header">Login</div>
                            <div class="card-body text-warning">
                                <h5 class="card-title">Belum Login</h5>
                                <p class="card-text">Masuk untuk membuat/mengedit/menghapus catatan.</p>
                                <a class="btn btn-warning" data-toggle="modal" data-target="#staticBackdrop">Masuk</a>
                            </div>
                        </div>
        EOT;
        }
        ?>        
</div>
<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Masuk</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form method="POST" action="login.php">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Username</label>
                        <input type="text" class="form-control" id="username" name="username" aria-describedby="usernameHelp" required>
                        <small id="usernameHelp" class="form-text text-muted">Username Biro Keuangan</small>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" id="password" name="password">
                    </div>
                    <input type="submit" class="btn btn-warning" name="login" value="Masuk">
                </form>
            </div>
        </div>
    </div>
</div>

<?= template_footer() ?>