$(document).ready(function() {
    var imageLoader = document.getElementById("imageLoader");
    imageLoader.addEventListener("change", handleImage, false);
    var canvas = document.getElementById("imageCanvas");
    canvas.width = 1080;
    canvas.height = 1920;
    var ctx = canvas.getContext("2d");
  
    function popupResult(result) {
      var html;
      console.log(result);
      if (result.html) {
        html = result.html;
      }
      if (result.src) {
        html =
          '<img src="' +
          result.src +
          '" />' +
          '<p class="text-center font-weight-bold">Silahkan tekan lama pada gambar lalu bagikan gambar untuk langsung upload pada instastory</p>'+'<button class="confirm button" tabindex="1">Cancel</button>';
      }
      swal({
        title: "",
        html: true,
        text: html,
        animation: "slide-from-top",
        confirmButtonColor: "#f39c12"
      });
    }
  
    function drawFrame() {
      var img = new Image();
      img.crossOrigin = "Anonymous";
  
      img.src = "./img/HUT_RI.png";
      img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        popupResult({
          src: document.getElementById("imageCanvas").toDataURL("image/png")
        });
      };
    }
  
    function drawProfPict(src) {
      var img = new Image();
      img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        drawFrame();
      };
  
      img.src = src;
    }
  
    function handleImage(e) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      var img_url = e.target.files[0];
      loadImage.parseMetaData(img_url, function(data) {
        var ori = 0;
        if (data.exif) {
          ori = data.exif.get("Orientation");
        }
  
        var loadingImage = loadImage(
          img_url,
          function(canvas) {
            $(".cr-slider").css("visibility", "visible");
            $(".loader").remove();
  
            var dataUrl = canvas.toDataURL("image/jpeg");
            basic.croppie("bind", {
              url: dataUrl
            });
          },
          {
            maxWidth: 1800,
            maxHeight: 1920,
            orientation: ori,
            canvas: true
          }
        );
  
        loadingImage.onloadstart = function(event) {
          $(".cr-viewport").append('<div class="loader"></div>');
        };
      });
    }
  
    function downloadCanvas(link, canvasId, filename) {
      console.log(link);
      link.href = document.getElementById(canvasId).toDataURL("image/jpeg");
      link.download = filename;
    }
  
    $("#downloadlink").on("click", ".sweet-alert", function() {
      console.log("downloadlink clicked");
      downloadCanvas(this, "imageCanvas", "17Agustus.png");
    });
  
    $("#twibname").on("keyup",function(){
      $("#twibcapt").text() = $("#twibname").val();
    })
    // var basic = $("#demo-basic").croppie({
    //   viewport: {
    //     width: Math.min(300, window.innerWidth - 50),
    //     height: Math.min(300, window.innerWidth - 50)
    //   },
    //   boundary: {
    //     width: Math.min(300, window.innerWidth - 50),
    //     height: Math.min(300, window.innerWidth - 50)
    //   }
    // });
  
    var basic = $("#demo-basic").croppie({
      viewport: {
        width: 270,
        height:480
      },
      boundary: {
        width: 270,
        height:480
      }
    });
  
    $(".basic-result").on("click", function(e) {
      e.preventDefault();
  
      var downloadButton = this;
      basic
        .croppie("result", {
          type: "canvas"
        })
        .then(function(resp) {
          drawProfPict(resp);
        });
    });
    $("#caption").on("click", function() {
      let copytext = $(".linktext");
  
      copytext.select();
      document.execCommand("copy");
      $(".alert").removeClass("d-none");
      $(".alert").addClass("show");
    });
    $(".close").on("click", function() {
      $(".alert").removeClass("show");
      $(".alert").addClass("d-none");
    });
  });
  