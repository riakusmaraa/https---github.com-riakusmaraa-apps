$(document).ready(function() {
  var imageLoader = document.getElementById("imageLoader");
  imageLoader.addEventListener("change", handleImage, false);
  var canvas = document.getElementById("imageCanvas");
  canvas.width = 1080;
  canvas.height = 1080;
  var ctx = canvas.getContext("2d");

  function popupResult(result) {
    var html;
    if (result.html) {
      html = result.html;
    }
    if (result.src) {
      html =
        '<img src="' +
        result.src +
        '" />' +
        '<a href="' +
        result.src +
        '" id="downloadlink" class="button" download="HBD.png">Download</a>' +
        '<button class="confirm button" tabindex="1">Cancel</button>';
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
    let name = $("#twibname").val() + "";
    var img = new Image();
    img.crossOrigin = "Anonymous";
    //#14b3af

    img.src = "./img/ultah.png";
    img.onload = function() {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#0a5e5c";
      ctx.font = "64px RubikBI";
      ctx.textAlign = "center";
      ctx.fillText(name, canvas.width / 2, 1020);
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
          maxHeight: 1800,
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
    console.log(canvasId);
    console.log(filename);
    link.href = document.getElementById(canvasId).toDataURL("image/jpeg");
    link.download = filename;
  }

  $("#downloadlink").on("click", ".sweet-alert", function() {
    console.log(this);
    downloadCanvas(this, "imageCanvas", "Ultah.jpg");
  });

  $("#twibname").on("keyup",function(){
    $("#twibcapt").text() = $("#twibname").val();
  })
  var basic = $("#demo-basic").croppie({
    viewport: {
      width: Math.min(300, window.innerWidth - 50),
      height: Math.min(300, window.innerWidth - 50)
    },
    boundary: {
      width: Math.min(300, window.innerWidth - 50),
      height: Math.min(300, window.innerWidth - 50)
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
