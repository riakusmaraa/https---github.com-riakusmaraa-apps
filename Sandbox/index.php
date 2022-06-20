<!DOCTYPE html>
<html>
<head>
	<title>Input Data</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>
<body>
<div class="container" align="center">
	<h1>FOKUS WAKTU ISI YAKK!!!</h1>
	<form action="process.php" method="post">
		<div class="form-group center">
		<p>
			<div class="input-group mb-3">
  				<div class="input-group-prepend">
    			<span class="input-group-text" id="basic-addon1">ID : </span>
  			</div>
  				<input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" name="id" id="id" required>
			</div>
			
		</p>

		<p>
			<div class="input-group mb-3">
  				<div class="input-group-prepend">
    			<span class="input-group-text" id="basic-addon1">Nama Lengkap : </span>
  			</div>
  				<input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" name="nama_lengkap" id="namaLengkap" required>
			</div>
			<!-- <label for="namaLengkap">
				
			</label>
			<input type="text" > -->
		</p>
		<p>
			<label for="kementerian">Kementerian/Unit/Biro : </label>
			<select class="custom-select custom-select sm" name="kementerian">
			  <option selected>Pilih Kementerian/Unit/Biro</option>
			  <option value="Badan Jaminan Mutu">Badan Jaminan Mutu</option>
			  <option value="Biro Pusat Komunikasi dan Informasi">Biro Puskominfo</option>
			  <option value="Biro Administrasi">Biro Administrasi</option>
			  <option value="Biro Keuangan">Biro Keuangan</option>
			  <option value="Kementerian Sosial Masyarakat">Kementerian Sosial Masyarakat</option>
			  <option value="Kementerian Lingkungan Hidup">Kementerian Lingkungan Hidup</option>
			  <option value="Unit Brawijaya Mengajar">Unit Brawijaya Mengajar</option>
			  <option value="Kementerian Gerakan Kebijakan Eksternal">Kementerian Gerakan Kebijakan Eksternal</option>
			  <option value="Kementerian Gerakan Kebijakan Internal">Kementerian Gerakan Kebijakan Internal</option>
			  <option value="Unit Pemberdayaan Perempuan Progresif">Unit Pemberdayaan Perempuan Progresif</option>
			  <option value="Kementerian Keilmuan dan Inovasi">Kementerian Keilmuan dan Inovasi</option>
			  <option value="Kementerian Pemuda dan Olahraga">Kementerian Pemuda dan Olahraga</option>
			  <option value="Kementerian Pengembangan Sumber Daya Mahasiswa">Kementerian Pengembangan Sumber Daya Mahasiswa</option>
			  <option value="Kementerian Sosial Masyarakat">Kementerian Sosial Masyarakat</option>
			  <option value="Kementerian Diplomasi Internal">Kementerian Diplomasi Internal</option>
			  <option value="Kementerian Diplomasi Eksternal">Kementerian Diplomasi Eksternal</option>
			  <option value="Kementerian Advokasi Kesejahteraan Mahasiswa ">Kementerian Advokasi Kesejahteraan Mahasiswa </option>
			  <option value="Unit Badan Usaha Milik Mahasiswa">Unit Badan Usaha Milik Mahasiswa</option>

			</select>
			<!-- <input type="text" name="jabatan" id="jabatan"> -->
		</p>
			<!-- <input type="text" name="kementerian" id="kementerian"> -->
		</p>
		<p>
			<label for="jabatan">Jabatan : </label>
			<select class="custom-select custom-select sm" name="jabatan">
			  <option selected>Pilih Jabatan</option>
			  <option value="Presiden">Presiden</option>
			  <option value="Wakil Presiden">Wakil Presiden</option>
			  <option value="Kepala Badan Jaminan Mutu">Kepala Badan Jaminan Mutu</option>
			  <option value="Menteri Koordinator Pengembangan">Menteri Koordinator Pengembangan</option>
			  <option value="Menteri Koordinator Pelayanan">Menteri Koordinator Pelayanan</option>
			  <option value="Menteri Koordinator Pengabdian">Menteri Koordinator Pengabdian</option>
			  <option value="Menteri Koordinator Pergerakan">Menteri Koordinator Pergerakan</option>
			  <option value="Kepala Biro">Kepala Biro</option>
			  <option value="Wakil Kepala Biro">Wakil Kepala Biro</option>
			  <option value="Kepala Bagian">Kepala Bagian</option>
			  <option value="Kepala Unit">Kepala Unit</option>
			  <option value="Wakil Kepala Unit">Wakil Kepala Unit</option>
			  <option value="Menteri">Menteri</option>
			  <option value="Wakil Menteri">Wakil Menteri</option>
			  <option value="Direktorat Jenderal">Direktorat Jenderal</option>
			  <option value="Staff Ahli">Staff Ahli</option>
			</select>
			<!-- <input type="text" name="jabatan" id="jabatan"> -->
		</p>
		<p>
			<label for="fakultas">Fakultas : </label>
			<select class="custom-select custom-select sm" name="fakultas">
			  <option selected>Pilih Fakultas</option>
			  <option value="Pendidikan Vokasi">Pendidikan Vokasi</option>
			  <option value="Kedokteran">Kedokteran</option>
			  <option value="Kedokteran Hewan">Kedokteran Hewan</option>
			  <option value="Kedokteran Gigi">Kedokteran Gigi</option>
			  <option value="Ilmu Komputer">Ilmu Komputer</option>
			  <option value="Pertanian">Pertanian</option>
			  <option value="Peternakan">Peternakan</option>
			  <option value="Perikanan dan Ilmu Kelautan">Perikanan dan Ilmu Kelautan</option>
			  <option value="Matematika dan Ilmu Pengetahuan Alam">Matematika dan Ilmu Pengetahuan Alam</option>
			  <option value="Teknologi Pertanian">Teknologi Pertanian</option>
			  <option value="Teknik">Teknik</option>
			  <option value="Ilmu Budaya">Ilmu Budaya</option>
			  <option value="Hukum">Hukum</option>
			  <option value="Ilmu Administrasi">Ilmu Administrasi</option>
			  <option value="Ekonomi Bisnis">Ekonomi Bisnis</option>
			  <option value="Ilmu Sosial dan Ilmu Politik">Ilmu Sosial dan Ilmu Politik</option>
			</select>
			
		</p>
		<p>
			<label for="angkatan">Angkatan : </label>
			<select class="custom-select custom-select sm" name="angkatan">
			  <option selected>Pilih Angkatan</option>
			  <option value=2016>2016</option>
			  <option value=2017>2017</option>
			  <option value=2018>2018</option>
			  <option value=2019>2019</option>
			</select>
		</p>
		<p>
			<div class="input-group mb-3">
  				<div class="input-group-prepend">
    			<span class="input-group-text" id="basic-addon1">Email : </span>
  				</div>
  				<input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" name="email" id="email" required>
			</div>
			
		</p>
		<p>
			<div class="input-group mb-3">
  				<div class="input-group-prepend">
    			<span class="input-group-text" id="basic-addon1">Line : </span>
  			</div>
  				<input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" name="line" id="line" required>
			</div>
			
		</p>
		<p>
			<div class="input-group mb-3">
  				<div class="input-group-prepend">
    			<span class="input-group-text" id="basic-addon1">Instagram : </span>
  			</div>
  				<input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" name="instagram" id="instagram" required>
			</div>
			
		</p>
		<p>
			<div class="input-group mb-3">
  				<div class="input-group-prepend">
    			<span class="input-group-text" id="basic-addon1">Foto : </span>
  			</div>
  				<input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" name="foto" id="foto" value="menyusul" placeholder="menyusul ukuran 150x150" required>
			</div>
			
		</p>
		</div>
		<button type="submit" class="btn btn-info">Submit</button>

		<br>
		<br>

	</form>
	</div>
	<!-- Button trigger modal -->


<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
</body>
</html>
