$(document).ready(function () {
	$.ajaxSetup({ cache: false });
	var dbPromise = idb.open("em_ub", 1, function (upgradeDb) {
		if (!upgradeDb.objectStoreNames.contains("mahasiswa")) {
			// upgradeDb.createObjectStore("events");
			var mahasiswaLogin = upgradeDb.createObjectStore("mahasiswa", {
				keyPath: "nim",
				autoIncrement: true,
			});
			mahasiswaLogin.createIndex("nim", "nim", { unique: true });
		}
	});

	var nim;
	var nama_lengkap;
	var fak;
	var jurusan;
	var prodi;
	var foto;
	var auth;
	getData();

	function getData() {
		dbPromise
			.then(function (db) {
				var tx = db.transaction("mahasiswa", "readwrite");
				var store = tx.objectStore("mahasiswa");
				return store.getAll();
			})
			.then(function (object) {
				if (
					object.length > 0 &&
					object[0].nim != null &&
					object[0].auth != null
				) {
					console.log("data udah ada");
					nim = object[0].nim;
					nama_lengkap = object[0].nama;
					fak = object[0].fak;
					jurusan = object[0].jurusan;
					prodi = object[0].prodi;
					foto = object[0].foto;
					auth = object[0].auth;
					$("#nim").text("" + nim);
					$("#nama").text("" + nama_lengkap);
					$("#fak").text(fak + " / " + jurusan + " / " + prodi);
					$("#foto").attr("src", foto);
				} else {
					logout();
				}
			});
	}
	function logout() {
		dbPromise.then(function (db) {
			var tx = db.transaction("mahasiswa", "readwrite");
			var store = tx.objectStore("mahasiswa");
			let object = store.getAll();

			store.delete(nim);
			window.location.replace("login.html?page?" + window.location.href);
		});
	}
	$("#submit").on("click", function () {
		var data = $("#url_data").val();
		var custom = $("#url_custom").val();

		let http = data.substr(0, 4);
		if (http != "http") {
			Swal.fire({
				title: "Hai!",
				text: "Link yang akan dipendekkan harus mengandung http:// atau https:// di depannya",
				allowOutsideClick: false,
				confirmButtonColor: "#5d4b75",
				confirmButtonText: "OK!",
			}).then((result) => {
				if (result.value) {
					reload();
				}
			});
		} else {
			$.ajax({
				method: "POST",
				url: `https://em.ub.ac.id/to/add/add?url_data=${data}&url_custom=${custom}&nim=${nim}`,
				data: {
					url_data: data,
					url_custom: custom,
					nim: nim,
					auth: auth,
				},
				dataType: "json",
				success: function (obj) {
					if (data === "" && custom === "") {
						$("#login").html(
							"<p>Maaf, Link belum anda masukkan.</p>" +
								"<button class='loginbutton' type='button' onclick='reload()'>Refresh Page</button>"
						);
					} else if (custom === "") {
						$("#login").html(
							"<strong><h5>Link berhasil dikustomisasi.</h5><br>" +
								'<input id="my_links" type="text" readonly="true" value="' +
								obj.data.url +
								'">' +
								"<button class='loginbutton' type='button' onclick='copy()'>Copy Link</button><a href='index.html'><p class='text-center mt-3 text-white'>&#8592; back to menu</p></a>"
						);
					} else {
						if (obj.message === "Url custom already exist") {
							$("#login").html(
								"<p>Maaf, Link sudah pernah dikustomisasi.</p><br><br>" +
									"<button class='loginbutton' type='button' onclick='reload()'>Refresh Page</button>"
							);
						} else {
							$("#login").html(
								"<strong><p>Link berhasil dikustomisasi.</p><br>" +
									'<input id="my_links" type="text" readonly="true" value="' +
									obj.data.url +
									'">' +
									"<button class='loginbutton' type='button' onclick='copy()'>Copy Link</button><a href='index.html'><p class='text-center mt-3 text-white'>&#8592; back to menu</p></a>"
							);
						}
					}
				},
				error: function () {
					Swal.fire({
						type: "error",
						title: "Maaf",
						text: "Terdapat kesalahan, silahkan coba lagi",
					});
				},
			});
		}
	});
});
