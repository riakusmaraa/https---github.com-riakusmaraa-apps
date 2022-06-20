// Indexed DB
var dbPromise = idb.open("em_ub", 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("mahasiswa")) {
      // upgradeDb.createObjectStore("events");
      var mahasiswaLogin = upgradeDb.createObjectStore("mahasiswa", {
        keyPath: "nim",
        autoIncrement: true
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
  $("#mylink").on("click", ".copyicon", function() {
    let copytext = $("#" + this.id + "s");

    copytext.select();
    document.execCommand("copy");
    Swal.fire({
      type: "success",
      title: "Selamat!",
      text: "Link berhasil dicopy"
    });
  });
  function getData() {
    dbPromise
      .then(function(db) {
        var tx = db.transaction("mahasiswa", "readwrite");
        var store = tx.objectStore("mahasiswa");
        return store.getAll();
      })
      .then(function(object) {
        if (
          object.length > 0 &&
          object[0].nim != null &&
          object[0].auth != null
        ) {
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
          $("#logout").text("Logout");
          
        }
      });
  }
//
/**
 * ========================================================================
 * JavaScript Fetch API
 * ========================================================================
 */

const BASEURL = 'https://em.ub.ac.id/rest-api/api/'

const cards = document.querySelectorAll('.card')
let nominies = []

function fetchNominies() {
    //Salahmu tadi disini ini ngerefer ke master vote yang master bukan ke master vote Kepuasan publik
    //Kodemu before
    // axios.get(BASEURL + 'vote/vote/nomini/06b43018-6b2f-4aeb-aa48-972bbd68b819')
    //     .then(({ data }) => {
    //         nominies = data.data
    //         renderNominies(nominies)
    //     })
    
    axios.get(BASEURL + 'vote/vote/nomini/8ac942e0-05f5-4f8b-aaf4-aa5c33a9b2b3')
        .then(({ data }) => {
            nominies = data.data
            renderNominies(nominies)
        })
}

function renderNominies(nominies) {
    const nominiesBox = document.getElementById('nominies-box')

    var filteredNominies = nominies.filter(nomini => {
        return nomini.description == 'TOP5_UKM_Teradaptif dan Inovatif'
    })
    
    filteredNominies.forEach(nomini => {
        nominiesBox.insertAdjacentHTML('beforeend', `
            <div class="col-md-4" data-nomini="${nomini.id}" data-master_vote="${nomini.vote_master_id}">
                <div class="card text-center">
                <img src="${nomini.picture}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h4 class="card-text">${nomini.name}</h4>
                    <p class="hidden" hidden>${nomini.id}</p>
                    <p class="masterHidden" hidden>${nomini.vote_master_id}</p> 
                </div>
                </div>
            </div>
        `)
    })

    // Initiate Select Function
    function selectCards() {
        const cards = document.querySelectorAll('.card')
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const cardText = card.querySelector('.card-text').textContent
                let nominiId = card.querySelector('.hidden').textContent
                let masterId = card.querySelector('.masterHidden').textContent
                const cardNomini = card.parentElement.dataset.nomini;
                const cardMaster = card.parentElement.dataset.master_vote;
                console.log(filteredNominies);
                console.log(cardMaster);
                console.log('Nomini Id',nominiId);
                console.log('masterId',masterId);
                const cardMasterVote = card.parentElement.dataset.master_vote
                console.log(typeof(cardMasterVote));
                console.log(typeof(nominiId));
                console.log(card.parentElement.dataset);
                console.log(auth);
                console.log(nim);
                console.log(cardNomini);
                formData = new FormData();
                formData.append('nim', nim);
                formData.append("auth", auth);
                formData.append('master_vote',`${masterId}`);
                formData.append('nomini', `${nominiId}`);
                Swal.fire({
                    title: `Apakah kamu yakin ingin memilih ${cardText}?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Iya',
                    cancelButtonText: 'Tidak'
                }).then((result) => {
                  if (result.isConfirmed) {
                      axios({
                          method: 'POST',
                          url: BASEURL + 'vote/vote/create',
                          data:formData
                      })
                      .then(res => {
                        Swal.fire(
                            'Berhasil!',
                            `${res.data.message}`,
                            'success'
                        )
                        if(`${res.data.message}` == 'kamu sudah melakukan voting TOP5_UKM_Teradaptif dan Inovatif'){
                          Swal.fire(
                            'Maaf!',
                            `${res.data.message}`,
                            'error'
                        )
                        }if(`${res.data.message}` == 'kamu bukan mahasiswa ub ya?'){
                          Swal.fire(
                            'Maaf!',
                            'Silahkan login pada EM APPS terlebih dahulu',
                            'warning'
                        )
                        }if(`${res.data.message}` == 'voting TOP5_UKM_Teradaptif dan Inovatif telah ditutup pada 2020-11-21 09:59:00'){
                          Swal.fire(
                            'Maaf!',
                            `${res.data.message}`,
                            'error'
                          )
                        }
                      

                    })
                  }else if (
                    /* Read more about handling dismissals below */
                    `${res.data.message}` == 'kamu bukan mahasiswa ub ya?'
                  ) {
                    Swal.fire(
                      'Cancelled',
                      'Your imaginary file is safe :)',
                      'error'
                    )
                  }
              })
            })
        })
    }
    selectCards()
}

document.addEventListener('DOMContentLoaded', fetchNominies)
