$(document).ready(function () {
	
    function showNotification(message) {
      $('#notification').text(message).fadeIn().delay(2000).fadeOut();
    }
	
	$(document).on("click","#drop_mb",function(){
		$('.header_nav_mob').toggleClass('shown');
	});
	
	var adContainerHeight = $('.dat').height();
	if(adContainerHeight === 0) {
		$('.dat').css({
		  'margin': '0',
		  'height': '0',
		});
	}
	
	var adContainerHeight = $('.mat').height();
	if(adContainerHeight === 0) {
		$('.mat').css({
		  'margin': '0',
		  'height': '0',
		});
	}
	
	$(document).on("click", "#drop_dt", function(event) {
		event.stopPropagation(); // Prevent the click event from reaching the document level
		$(".hd_left").toggle();
		
		// Toggle the chevron icon
		var icon = $(this).find('i');
		icon.toggleClass('fa-chevron-up fa-chevron-down');
	});
	
	
	$(document).on("click","#c_gallery_id",function(){
		var gallery_id = $(this).find('.gallery_id').text();
		copyToClipboard(gallery_id);
		showNotification('Copied "#'+gallery_id+'" to your clipboard');
	});
	
	function copyToClipboard(text) {
		var dummy = document.createElement("textarea");
		document.body.appendChild(dummy);
		dummy.value = text;
		dummy.select();
		document.execCommand("copy");
		document.body.removeChild(dummy);
    }
	
	$(document).on("click","#alert_close",function(){
		$(this).parent().alert("close");
	});
	
	var fav_nl = $('#fav_nl');
	var tooltip = $('<div class="tooltip"></div>').appendTo('.g_buttons');
	fav_nl.hover(
		function () {
			tooltip.text(fav_nl.data('tooltip')).css({
				'display': 'block',
				'top': -50,
				'left': 0,
				'width': 60,
				'text-align': 'center'
			});
		},
		function () {
			tooltip.css('display', 'none');
		}
	);
	
	var dl_nl = $('#dl_nl');
	var tooltip = $('<div class="tooltip"></div>').appendTo('.g_buttons');
	dl_nl.hover(
		function () {
			tooltip.text(dl_nl.data('tooltip')).css({
				'display': 'block',
				'top': -50,
				'left': 125,
				'width': 60,
				'text-align': 'center'
			});
		},
		function () {
			tooltip.css('display', 'none');
		}
	);
	
	$("#show_more").click(function(e) {
		var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
		$.ajax({	
			type: 'POST',
			url : '/modules/thumbs_loader.php',
			data: { 
				_token: CSRF_TOKEN,
				server: $("#load_server").val(),
				u_id: $("#gallery_id").val(),
				g_id: $("#load_id").val(),
				img_dir: $("#load_dir").val(),
				visible_pages: $(".gt_th:visible").length,
				total_pages: $("#load_pages").val(),
				type: 1
			},
				beforeSend: function() {
					$("#csm").css('display','inline-block');
					$("#show_more").prop('disabled', true);
					$("#show_all").prop('disabled', true);
				},
				success:function(response){
					
					$("#thumbs_append").append(response);

					if($(".gt_th:visible").length == $("#load_pages").val()) {
						$("#show_more").remove();
						$("#show_all").remove();
					}
					
					(function () {
						
						function logElementEvent(eventName, element) {
						  console.log(Date.now(), eventName, element.getAttribute("data-src"));
						}
						var callback_error = function (element) {
						  element.src =
							"/images/load_error.png";
						};
						var ll = new LazyLoad({
							threshold: 100,
							callback_error: callback_error
						});
					})();
					
				},
				complete: function() {
					$("#csm").css('display','none');
					$("#show_more").prop('disabled', false);
					$("#show_all").prop('disabled', false);
				}
			});
		return false;
	});

	$("#show_all").click(function(e) {
		var CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
		$.ajax({	
			type: 'POST',
			url : '/modules/thumbs_loader.php',
			data: { 
				_token: CSRF_TOKEN,
				server: $("#load_server").val(),
				u_id: $("#gallery_id").val(),
				g_id: $("#load_id").val(),
				img_dir: $("#load_dir").val(),
				visible_pages: $(".gt_th:visible").length,
				total_pages: $("#load_pages").val(),
				type: 2
			},
				beforeSend: function() {
					$("#csa").css('display','inline-block');
					$("#show_more").prop('disabled', true);
					$("#show_all").prop('disabled', true);
				},
				success:function(response){
					
					$("#thumbs_append").append(response);

					if($(".gt_th:visible").length == $("#load_pages").val()) {
						$("#show_more").remove();
						$("#show_all").remove();
					}
					
					(function () {
						
						function logElementEvent(eventName, element) {
						  console.log(Date.now(), eventName, element.getAttribute("data-src"));
						}
						var callback_error = function (element) {
						  element.src =
							"/images/load_error.png";
						};
						var ll = new LazyLoad({
							threshold: 0,
							callback_error: callback_error
						});
					})();
					
				},
				complete: function() {
					$("#csa").css('display','none');
					$("#show_more").prop('disabled', false);
					$("#show_all").prop('disabled', false);
				}
			});
		return false;
	});
	
	var pathname = window.location.pathname; 
	var url      = window.location.href;
	var origin   = window.location.origin;

	split_res = pathname.split("/");
	var id = split_res[2];
	var current_page = split_res[3];
	var Pages = parseInt($("#pages").val());
	var image_dir = $("#image_dir").val();
	var server_id = $("#server_id").val();
	var gallery_id = $("#gallery_id").val();
	if(server_id == 1) { media_server = 'i1.nhentaimg.com'; }
	if(server_id == 2) { media_server = 'i2.nhentaimg.com'; }
	if(server_id == 3) { media_server = 'i3.nhentaimg.com'; }
	if(server_id == 4) { media_server = 'i4.nhentaimg.com'; }
	var start_one = parseInt(current_page)+1;
	var start_two = parseInt(current_page)+2;
	var start_three = parseInt(current_page)+3;

	$.fn.preload = function() {
		
		this.each(function(){
			$('<img/>')[0].src = this;
		});
		console.log("Preloading " + this[0]);
		
	};

	function g_thumb(x) {
		
		gt_inf = g_th['fl'][x];
		var gt_inf_split = gt_inf.split(",");
		var gt_inf_iext = gt_inf_split[0];
		if(gt_inf_iext == 'j') { var gt_iext = 'jpg'; }
		if(gt_inf_iext == 'p') { var gt_iext = 'png'; }
		if(gt_inf_iext == 'b') { var gt_iext = 'bmp'; }
		if(gt_inf_iext == 'g') { var gt_iext = 'gif'; }
		return gt_iext;
		
	}

	window.jumpPage = function(x) {
		
		var entered_Page = prompt("Please enter a page between 1 and "+x);

		var numeric = $.isNumeric(entered_Page);
		if(numeric == true) {

			if(entered_Page == 0) {
				var entered_Page = 1;
			}
			else if(entered_Page > x) {
				var entered_Page = x;
			}
			else if(entered_Page == null) {
				
			}

			var title = document.getElementsByTagName("title")[0].innerHTML;
			var regex = /(.+?)(?=\s-\s)/;
			var match = title.match(regex);
			var g_title = match ? match[1].trim() : inputText.trim();
			
			document.title = g_title+" - Page "+entered_Page+" » nhentai";

			var CurrentImage = $('#fimg').attr('c_page');
			var CurImg = CurrentImage.split("_");
			var CurImg = CurImg[1];

			ginfc = g_th['fl'][entered_Page];
			var ginfc_split = ginfc.split(",");
			var iext_c = ginfc_split[0];
			var iwidth = ginfc_split[1];
			var iheight = ginfc_split[2];
			if(iext_c == 'j') { var iext_nx = 'jpg'; }
			if(iext_c == 'p') { var iext_nx = 'png'; }
			if(iext_c == 'b') { var iext_nx = 'bmp'; }
			if(iext_c == 'g') { var iext_nx = 'gif'; }

			$('.rd_fimg ').css({ "opacity": "0" });
			if(!Modernizr.touch) {
				// $('#fimg').css({ "width": iwidth+'px', "height": iheight+'px' });
				// $('.rd_fimg').css({ "width": iwidth+'px', "height": iheight+'px' });
			}
			$('#fimg').attr('c_page','image_'+ entered_Page +'');
			$('#fimg').attr('src','//'+media_server+'/'+image_dir+'/'+gallery_id+'/'+entered_Page+"."+iext_nx+"");
			
			$("#fimg").on('load', function() { 
					$('.rd_fimg ').css({ "opacity": "1" });
			}).on('error', function() { console.log("error loading image"); });

			var entered_one = parseInt(entered_Page)+1;
			var entered_two = parseInt(entered_Page)+2;
			var entered_three = parseInt(entered_Page)+3;

			if(entered_Page == 1) {

				if(Pages >= 2) {
					var iext_two = g_thumb('2');
					$(['//'+media_server+'/'+image_dir+'/'+gallery_id+'/2.'+iext_two+'']).preload();
				}
				if(Pages >= 3) {
					var iext_three = g_thumb('3');
					$(['//'+media_server+'/'+image_dir+'/'+gallery_id+'/3.'+iext_three+'']).preload();
				}
				if(Pages >= 4) {
					var iext_four = g_thumb('4');
					$(['//'+media_server+'/'+image_dir+'/'+gallery_id+'/4.'+iext_four+'']).preload();
				}
			}
			else
			{

				if(entered_one <= Pages) {
					var iext_sone = g_thumb(entered_one);
					$(['//'+media_server+'/'+image_dir+'/'+gallery_id+'/'+entered_one+'.'+iext_sone+'']).preload();
				}
				if(entered_two <= Pages) {
					var iext_stwo = g_thumb(entered_two);
					$(['//'+media_server+'/'+image_dir+'/'+gallery_id+'/'+entered_two+'.'+iext_stwo+'']).preload();
				}
				if(entered_three <= Pages) {
					var iext_sthree = g_thumb(entered_three);
					$(['//'+media_server+'/'+image_dir+'/'+gallery_id+'/'+entered_three+'.'+iext_sthree+'']).preload();
				}
			}

			if(entered_Page == 1) {
				$('.rd_first').addClass('invisible');
				$('.rd_prev').addClass('invisible');
				$('.rd_next').removeClass('invisible');
				$('.rd_last').removeClass('invisible');
			}
			if(entered_Page > 1 && entered_Page < Pages) {
				$('.rd_first').removeClass('invisible');
				$('.rd_prev').removeClass('invisible');
				$('.rd_next').removeClass('invisible');
				$('.rd_last').removeClass('invisible');
			}
			if(entered_Page == Pages) {
				$('.rd_first').removeClass('invisible');
				$('.rd_prev').removeClass('invisible');
				$('.rd_next').addClass('invisible');
				$('.rd_last').addClass('invisible');
			}

			$(".rd_pg .cr").text(entered_Page);
			
			window.history.pushState('Title', 'Title', '/g/'+id+'/'+entered_Page+'/');
			
			if ("ga" in window) {
			tracker = ga.getAll()[0];
				if(tracker)
				tracker.send("pageview", "/g/"+ id +"/"+ entered_Page +"/");
			}

		}
	}

	$(function(next_img){
		
		var next_img_c = function(next_img){
			
			var $self = $(this);
			
			var fwImgElements = document.getElementsByClassName('reader_overlay');
			if (fwImgElements.length > 0) {
			  var offsetTop = fwImgElements[0].offsetTop;
			  window.scrollTo(0, offsetTop);
			}
			
			var CurrentImage = $('#fimg').attr('c_page');
			
			var CurImg = CurrentImage.split("_");
			var CurImg = CurImg[1];
			var PrevImg = parseInt(CurImg) - 1;
			var NextImg = parseInt(CurImg) + 1;

			var ChangePrev = parseInt(CurImg);
			var ChangeNext = parseInt(CurImg) + 2;

			var NextOne = parseInt(CurImg) + 1;
			var NextTwo = parseInt(CurImg) + 2;
			var PreloadNext = parseInt(CurImg) + 4;

			var title = document.getElementsByTagName("title")[0].innerHTML;
			var regex = /(.+?)(?=\s-\s)/;
			var match = title.match(regex);
			var g_title = match ? match[1].trim() : inputText.trim();

			if(CurImg == Pages) {
				var NextOne = Pages;
			}
			document.title = g_title+" - Page "+NextOne+" » nhentai";
			if(CurImg == Pages) {
				window.location.href = '//nhentai.xxx/g/'+id+'/';
			}
			else {
				
				if(PreloadNext <= Pages) {
					
					ginf = g_th['fl'][PreloadNext];
					
					var ginf_split = ginf.split(",");
					var iext = ginf_split[0];
					var iwidth = ginf_split[1];
					var iheight = ginf_split[2];
					if(iext == 'j') { var iext_pr = 'jpg'; }
					if(iext == 'p') { var iext_pr = 'png'; }
					if(iext == 'b') { var iext_pr = 'bmp'; }
					if(iext == 'g') { var iext_pr = 'gif'; }
				}

				$("iframe").attr("src", function ( i, val ) { return val; });	
				$(".tracker").attr("src", function ( i, val ) { return val; });
				if ("ga" in window) {
				tracker = ga.getAll()[0];
					if(tracker)
					tracker.send("pageview", "/g/"+ id +"/"+ NextImg +"/");
				}

				$('.rd_first').removeClass('invisible');
				$('.rd_prev').removeClass('invisible');

				if(NextOne == Pages) {
					$('.rd_last').addClass('invisible');
					$('.rd_next').addClass('invisible');
				}
				
				ginfc = g_th['fl'][NextImg];
				var ginfc_split = ginfc.split(",");
				var iext_c = ginfc_split[0];
				var iwidth = ginfc_split[1];
				var iheight = ginfc_split[2];
				if(iext_c == 'j') { var iext_nx = 'jpg'; }
				if(iext_c == 'p') { var iext_nx = 'png'; }
				if(iext_c == 'b') { var iext_nx = 'bmp'; }
				if(iext_c == 'g') { var iext_nx = 'gif'; }
				
				var handler = function() {
					
				};
				
				$('.rd_fimg ').css({ "opacity": "0" });
				if(!Modernizr.touch) {
					// $('#fimg').css({ "width": iwidth+'px', "height": iheight+'px' });
					// $('.rd_fimg').css({ "width": iwidth+'px', "height": iheight+'px' });
				}
				$('#fimg').attr('c_page','image_'+ NextImg +'');
				$('#fimg').attr('src','//'+media_server+'/'+image_dir+'/'+gallery_id+'/'+NextImg+"."+iext_nx+"");
				
				$("#fimg").on('load', function() { 
						$('.rd_fimg ').css({ "opacity": "1" });
				}).on('error', function() { console.log("error loading image"); });

				if(NextOne == Pages) { }
				else {
					if(PreloadNext <= Pages) {
						$(['//'+media_server+'/'+image_dir+'/'+gallery_id+'/'+PreloadNext+'.'+iext_pr+'']).preload();
					}
				}
				
				$(".rd_pg .cr").text(NextOne);
				
				window.history.pushState('Title', 'Title', '/g/'+id+'/'+NextOne+'/');
				
			}

			$self.unbind("click");

			setTimeout(function(){
			  $self.click(next_img_c);
			}, 500);

		};

		$(".fw_img").click(next_img_c); 
		
	});


	$(function(prev_nav){
		
		var prev_nav_c = function(prev_nav){
			
			var $self = $(this);

			var fwImgElements = document.getElementsByClassName('reader_overlay');
			if (fwImgElements.length > 0) {
			  var offsetTop = fwImgElements[0].offsetTop;
			  window.scrollTo(0, offsetTop);
			}

			var CurrentImage = $('#fimg').attr('c_page');
			var CurImg = CurrentImage.split("_");
			var CurImg = CurImg[1];
			var PrevImg = parseInt(CurImg) - 1;

			var ChangePrev = parseInt(CurImg) - 2;
			var ChangeNext = parseInt(CurImg);

			var PrevOne = parseInt(CurImg) - 1;
			var PrevTwo = parseInt(CurImg) - 2;
			var PrevThree = parseInt(CurImg) - 3;
			var PrevFour = parseInt(CurImg) - 4;

			var title = document.getElementsByTagName("title")[0].innerHTML;
			var regex = /(.+?)(?=\s-\s)/;
			var match = title.match(regex);
			var g_title = match ? match[1].trim() : inputText.trim();
			
			if(PrevOne == '0') {
				var PrevOne = '1';
			}
			document.title = g_title+" - Page "+PrevOne+" » nhentai";

			if(CurImg == 1) {

			}
			else {

				if(CurImg <= 3) {

				}
				$("iframe").attr("src", function ( i, val ) { return val; });	
				$(".tracker").attr("src", function ( i, val ) { return val; });
				if ("ga" in window) {
				tracker = ga.getAll()[0];
					if(tracker)
					tracker.send("pageview", "/g/"+ id +"/"+ PrevImg +"/");
				}

				if(PrevImg == 1) {
					$('.rd_first').addClass('invisible');
					$('.rd_prev').addClass('invisible');
				}

				$('.rd_next').removeClass('invisible');
				$('.rd_last').removeClass('invisible');
				
				ginfc = g_th['fl'][PrevImg];
				var ginfc_split = ginfc.split(",");
				var iext_c = ginfc_split[0];
				var iwidth = ginfc_split[1];
				var iheight = ginfc_split[2];
				if(iext_c == 'j') { var iext_nx = 'jpg'; }
				if(iext_c == 'p') { var iext_nx = 'png'; }
				if(iext_c == 'b') { var iext_nx = 'bmp'; }
				if(iext_c == 'g') { var iext_nx = 'gif'; }
				
				$('.rd_fimg ').css({ "opacity": "0" });
				if(!Modernizr.touch) {
					// $('#fimg').css({ "width": iwidth+'px', "height": iheight+'px' });
					// $('.rd_fimg').css({ "width": iwidth+'px', "height": iheight+'px' });
				}
				$('#fimg').attr('c_page','image_'+ PrevImg +'');
				$('#fimg').attr('src','//'+media_server+'/'+image_dir+'/'+gallery_id+'/'+PrevImg+"."+iext_nx+"");
				
				$("#fimg").on('load', function() { 
						$('.rd_fimg ').css({ "opacity": "1" });
				}).on('error', function() { console.log("error loading image"); });

				if(PrevTwo > 0) {
					var iext_prevtwo = g_thumb(PrevTwo);
					$(['//'+media_server+'/'+image_dir+'/'+gallery_id+'/'+PrevTwo+'.'+iext_prevtwo+'']).preload();
				}
				if(PrevThree > 0) {
					var iext_prevthree = g_thumb(PrevThree);
					$(['//'+media_server+'/'+image_dir+'/'+gallery_id+'/'+PrevThree+'.'+iext_prevthree+'']).preload();
				}
				if(PrevFour > 0) {
					var iext_prevfour = g_thumb(PrevFour);
					$(['//'+media_server+'/'+image_dir+'/'+gallery_id+'/'+PrevFour+'.'+iext_prevfour+'']).preload();
				}

				
				if(PrevImg == 0) {
					var PrevImg = 1;
				}
				$(".rd_pg .cr").text(PrevImg);

				if(PrevOne == 0) {
					var PrevOne = 1;
				}
				
				window.history.pushState('Title', 'Title', '/g/'+id+'/'+PrevOne+'/');
				
			}

			$self.unbind("click");
			setTimeout(function(){
			  $self.click(prev_nav_c);
			}, 500);

		};

		$(".rd_prev").click(prev_nav_c);
		$(".pr_nv").click(prev_nav_c);
		
	});


	$(function(next_nav){
		
		var next_nav_c = function(next_nav){
			
			var $self = $(this);
			
			var CurrentImage = $('#fimg').attr('c_page');
			var CurImg = CurrentImage.split("_");
			var CurImg = CurImg[1];
			var PrevImg = parseInt(CurImg) - 1;
			var NextImg = parseInt(CurImg) + 1;

			var ChangePrev = parseInt(CurImg);
			var ChangeNext = parseInt(CurImg) + 2;

			var NextOne = parseInt(CurImg) + 1;
			var NextTwo = parseInt(CurImg) + 2;
			var PreloadNext = parseInt(CurImg) + 4;

			var title = document.getElementsByTagName("title")[0].innerHTML;
			var regex = /(.+?)(?=\s-\s)/;
			var match = title.match(regex);
			var g_title = match ? match[1].trim() : inputText.trim();
			
			if(CurImg == Pages) {
				var NextOne = Pages;
			}
			document.title = g_title+" - Page "+NextOne+" » nhentai";

			if(CurImg == Pages) {
				window.location.href = '//nhentai.xxx/g/'+id+'/';
			}
			else {

				if(PreloadNext <= Pages) {
					ginf = g_th['fl'][PreloadNext];
					var ginf_split = ginf.split(",");
					var iext = ginf_split[0];
					var iwidth = ginf_split[1];
					var iheight = ginf_split[2];
					if(iext == 'j') { var iext_pr = 'jpg'; }
					if(iext == 'p') { var iext_pr = 'png'; }
					if(iext == 'b') { var iext_pr = 'bmp'; }
					if(iext == 'g') { var iext_pr = 'gif'; }
				}

				$("iframe").attr("src", function ( i, val ) { return val; });	
				$(".tracker").attr("src", function ( i, val ) { return val; });
				if ("ga" in window) {
				tracker = ga.getAll()[0];
					if(tracker)
					tracker.send("pageview", "/g/"+ id +"/"+ NextImg +"/");
				}

				$('.rd_first').removeClass('invisible');
				$('.rd_prev').removeClass('invisible');

				if(NextOne == Pages) {
					$('.rd_next').addClass('invisible');
					$('.rd_last').addClass('invisible');
				}
				
				ginfc = g_th['fl'][NextImg];
				var ginfc_split = ginfc.split(",");
				var iext_c = ginfc_split[0];
				var iwidth = ginfc_split[1];
				var iheight = ginfc_split[2];
				if(iext_c == 'j') { var iext_nx = 'jpg'; }
				if(iext_c == 'p') { var iext_nx = 'png'; }
				if(iext_c == 'b') { var iext_nx = 'bmp'; }
				if(iext_c == 'g') { var iext_nx = 'gif'; }	
				
				$('.rd_fimg ').css({ "opacity": "0" });
				if(!Modernizr.touch) {
					// $('#fimg').css({ "width": iwidth+'px', "height": iheight+'px' });
					// $('.rd_fimg').css({ "width": iwidth+'px', "height": iheight+'px' });
				}
				$('#fimg').attr('c_page','image_'+ NextImg +'');
				$('#fimg').attr('src','//'+media_server+'/'+image_dir+'/'+gallery_id+'/'+NextImg+"."+iext_nx+"");
				
				$("#fimg").on('load', function() { 
						$('.rd_fimg ').css({ "opacity": "1" });
				}).on('error', function() { console.log("error loading image"); });

				if(NextOne == Pages) { }
				else {
					if(PreloadNext <= Pages) {
						$(['//'+media_server+'/'+image_dir+'/'+gallery_id+'/'+PreloadNext+'.'+iext_pr+'']).preload();
					}
				}
				
				$(".rd_pg .cr").text(NextOne);
				
				window.history.pushState('Title', 'Title', '/g/'+id+'/'+NextOne+'/');
				
			}

			$self.unbind("click");
			setTimeout(function(){
			  $self.click(next_nav_c);
			}, 500);

		};

		$(".rd_next").click(next_nav_c);
		$(".nx_nv").click(next_nav_c); 
		
	});


	$(function(first_nav){
		
		var first_nav_c = function(first_nav){
			
			var $self = $(this);

			var fwImgElements = document.getElementsByClassName('reader_overlay');
			if (fwImgElements.length > 0) {
			  var offsetTop = fwImgElements[0].offsetTop;
			  window.scrollTo(0, offsetTop);
			}
				
			var CurrentImage = $('#fimg').attr('c_page');
			var CurImg = CurrentImage.split("_");
			var CurImg = CurImg[1];
			var PrevImg = parseInt(CurImg) - 1;

			var ChangePrev = parseInt(CurImg) - 2;
			var ChangeNext = parseInt(CurImg);

			var PrevOne = parseInt(CurImg) - 1;
			var PrevTwo = parseInt(CurImg) - 2;
			var PrevThree = parseInt(CurImg) - 3;
			var PrevFour = parseInt(CurImg) - 4;

			var title = document.getElementsByTagName("title")[0].innerHTML;
			var regex = /(.+?)(?=\s-\s)/;
			var match = title.match(regex);
			var g_title = match ? match[1].trim() : inputText.trim();
			
			document.title = g_title+" - Page 1 » nhentai";

			if(CurImg == 1) {
				
			}
			else {

				$("iframe").attr("src", function ( i, val ) { return val; });	
				$(".tracker").attr("src", function ( i, val ) { return val; });
				if ("ga" in window) {
				tracker = ga.getAll()[0];
					if(tracker)
					tracker.send("pageview", "/g/"+ id +"/1/");
				}
				
				ginfc = g_th['fl']['1'];
				var ginfc_split = ginfc.split(",");
				var iext_c = ginfc_split[0];
				var iwidth = ginfc_split[1];
				var iheight = ginfc_split[2];
				if(iext_c == 'j') { var iext_nx = 'jpg'; }
				if(iext_c == 'p') { var iext_nx = 'png'; }
				if(iext_c == 'b') { var iext_nx = 'bmp'; }
				if(iext_c == 'g') { var iext_nx = 'gif'; }
				
				$('.rd_fimg ').css({ "opacity": "0" });
				if(!Modernizr.touch) {
					// $('#fimg').css({ "width": iwidth+'px', "height": iheight+'px' });
					// $('.rd_fimg').css({ "width": iwidth+'px', "height": iheight+'px' });
				}
				$('#fimg').attr('c_page','image_1');
				$('#fimg').attr('src','//'+media_server+'/'+image_dir+'/'+gallery_id+'/1.'+iext_nx+'');
				
				$("#fimg").on('load', function() { 
						$('.rd_fimg ').css({ "opacity": "1" });
				}).on('error', function() { console.log("error loading image"); });

				$('.rd_first').addClass('invisible');
				$('.rd_prev').addClass('invisible');
				$('.rd_next').removeClass('invisible');
				$('.rd_last').removeClass('invisible');
				
				$(".rd_pg .cr").text('1');

				window.history.pushState('Title', 'Title', '/g/'+id+'/1/');
				
			}

			$self.unbind("click");
			setTimeout(function(){
			  $self.click(first_nav_c);
			}, 500);

		};

		$(".rd_first").click(first_nav_c);
		
	});


	$(function(last_nav){
		
		var last_nav_c = function(last_nav){
			
			var $self = $(this);

			var fwImgElements = document.getElementsByClassName('reader_overlay');
			if (fwImgElements.length > 0) {
			  var offsetTop = fwImgElements[0].offsetTop;
			  window.scrollTo(0, offsetTop);
			}
				
			var CurrentImage = $('#fimg').attr('c_page');
			var CurImg = CurrentImage.split("_");
			var CurImg = CurImg[1];

			var title = document.getElementsByTagName("title")[0].innerHTML;
			var regex = /(.+?)(?=\s-\s)/;
			var match = title.match(regex);
			var g_title = match ? match[1].trim() : inputText.trim();
			
			document.title = g_title+" - Page "+Pages+" » nhentai";

			if(CurImg == Pages) {
				
			}
			else {

				$("iframe").attr("src", function ( i, val ) { return val; });	
				$(".tracker").attr("src", function ( i, val ) { return val; });
				if ("ga" in window) {
				tracker = ga.getAll()[0];
					if(tracker)
					tracker.send("pageview", "/g/"+ id +"/"+ Pages +"/");
				}
				
				ginfc = g_th['fl'][Pages];
				var ginfc_split = ginfc.split(",");
				var iext_c = ginfc_split[0];
				var iwidth = ginfc_split[1];
				var iheight = ginfc_split[2];
				if(iext_c == 'j') { var iext_nx = 'jpg'; }
				if(iext_c == 'p') { var iext_nx = 'png'; }
				if(iext_c == 'b') { var iext_nx = 'bmp'; }
				if(iext_c == 'g') { var iext_nx = 'gif'; }
				
				$('.rd_fimg ').css({ "opacity": "0" });
				if(!Modernizr.touch) {
					// $('#fimg').css({ "width": iwidth+'px', "height": iheight+'px' });
					// $('.rd_fimg').css({ "width": iwidth+'px', "height": iheight+'px' });
				}
				$('#fimg').attr('c_page','image_'+Pages+'');
				$('#fimg').attr('src','//'+media_server+'/'+image_dir+'/'+gallery_id+'/'+Pages+'.'+iext_nx+'');
				
				$("#fimg").on('load', function() { 
						$('.rd_fimg ').css({ "opacity": "1" });
				}).on('error', function() { console.log("error loading image"); });

				$('.rd_first').removeClass('invisible');
				$('.rd_prev').removeClass('invisible');
				$('.rd_next').addClass('invisible');
				$('.rd_last').addClass('invisible');
				
				$(".rd_pg .cr").text(Pages);

				window.history.pushState('Title', 'Title', '/g/'+id+'/'+Pages+'/');
				
			}

			$self.unbind("click");
			setTimeout(function(){
			  $self.click(last_nav_c);
			}, 500);

		};

		$(".rd_last").click(last_nav_c);
		
	});

	function left_arrow() {

		var fwImgElements = document.getElementsByClassName('reader_overlay');
		if (fwImgElements.length > 0) {
		  var offsetTop = fwImgElements[0].offsetTop;
		  window.scrollTo(0, offsetTop);
		}
			
		var CurrentImage = $('#fimg').attr('c_page');
		var CurImg = CurrentImage.split("_");
		var CurImg = CurImg[1];
		var PrevImg = parseInt(CurImg) - 1;

		var ChangePrev = parseInt(CurImg) - 2;
		var ChangeNext = parseInt(CurImg);

		var PrevOne = parseInt(CurImg) - 1;
		var PrevTwo = parseInt(CurImg) - 2;
		var PrevThree = parseInt(CurImg) - 3;
		var PrevFour = parseInt(CurImg) - 4;

		var title = document.getElementsByTagName("title")[0].innerHTML;
		var regex = /(.+?)(?=\s-\s)/;
		var match = title.match(regex);
		var g_title = match ? match[1].trim() : inputText.trim();
			
		if(PrevOne == '0') {
			var PrevOne = '1';
		}
		document.title = g_title+" - Page "+PrevOne+" » nhentai";

		if(CurImg == 1) {

		}
		else {

			if(CurImg <= 3) {

			}
			$("iframe").attr("src", function ( i, val ) { return val; });	
			$(".tracker").attr("src", function ( i, val ) { return val; });
			if ("ga" in window) {
			tracker = ga.getAll()[0];
				if(tracker)
				tracker.send("pageview", "/g/"+ id +"/"+ PrevOne +"/");
			}

			if(PrevImg == 1) {
				$('.rd_first').addClass('invisible');
				$('.rd_prev').addClass('invisible');
			}

			$('.rd_next').removeClass('invisible');
			$('.rd_last').removeClass('invisible');
			
			ginfc = g_th['fl'][PrevImg];
			var ginfc_split = ginfc.split(",");
			var iext_c = ginfc_split[0];
			var iwidth = ginfc_split[1];
			var iheight = ginfc_split[2];
			if(iext_c == 'j') { var iext_nx = 'jpg'; }
			if(iext_c == 'p') { var iext_nx = 'png'; }
			if(iext_c == 'b') { var iext_nx = 'bmp'; }
			if(iext_c == 'g') { var iext_nx = 'gif'; }
			
			$('.rd_fimg ').css({ "opacity": "0" });
			if(!Modernizr.touch) {
				// $('#fimg').css({ "width": iwidth+'px', "height": iheight+'px' });
				// $('.rd_fimg').css({ "width": iwidth+'px', "height": iheight+'px' });
			}
			$('#fimg').attr('c_page','image_'+ PrevImg +'');
			$('#fimg').attr('src','//'+media_server+'/'+image_dir+'/'+gallery_id+'/'+PrevImg+"."+iext_nx+"");
			
			$("#fimg").on('load', function() { 
					$('.rd_fimg ').css({ "opacity": "1" });
			}).on('error', function() { console.log("error loading image"); });

			if(PrevTwo > 0) {
				var iext_prevtwo = g_thumb(PrevTwo);
				$(['//'+media_server+'/'+image_dir+'/'+gallery_id+'/'+PrevTwo+'.'+iext_prevtwo+'']).preload();
			}
			if(PrevThree > 0) {
				var iext_prevthree = g_thumb(PrevThree);
				$(['//'+media_server+'/'+image_dir+'/'+gallery_id+'/'+PrevThree+'.'+iext_prevthree+'']).preload();
			}
			if(PrevFour > 0) {
				var iext_prevfour = g_thumb(PrevFour);
				$(['//'+media_server+'/'+image_dir+'/'+gallery_id+'/'+PrevFour+'.'+iext_prevfour+'']).preload();
			}

			
			if(PrevImg == 0) {
				var PrevImg = 1;
			}
			$(".rd_pg .cr").text(PrevImg);

			if(PrevOne == 0) {
				var PrevOne = 1;
			}
			
			window.history.pushState('Title', 'Title', '/g/'+id+'/'+PrevOne+'/');

		}

	}


	function right_arrow() {
		
		var fwImgElements = document.getElementsByClassName('reader_overlay');
		if (fwImgElements.length > 0) {
		  var offsetTop = fwImgElements[0].offsetTop;
		  window.scrollTo(0, offsetTop);
		}
		
		var CurrentImage = $('#fimg').attr('c_page');
		var CurImg = CurrentImage.split("_");
		var CurImg = CurImg[1];
		var PrevImg = parseInt(CurImg) - 1;
		var NextImg = parseInt(CurImg) + 1;

		var ChangePrev = parseInt(CurImg);
		var ChangeNext = parseInt(CurImg) + 2;

		var NextOne = parseInt(CurImg) + 1;
		var NextTwo = parseInt(CurImg) + 2;
		var PreloadNext = parseInt(CurImg) + 4;

		var title = document.getElementsByTagName("title")[0].innerHTML;
		var regex = /(.+?)(?=\s-\s)/;
		var match = title.match(regex);
		var g_title = match ? match[1].trim() : inputText.trim();
			
		if(CurImg == Pages) {
			var NextOne = Pages;
		}
		document.title = g_title+" - Page "+NextOne+" » nhentai";

		if(CurImg == Pages) {
			window.location.href = '//nhentai.xxx/g/'+id+'/';
		}
		else {

			if(PreloadNext <= Pages) {

				ginf = g_th['fl'][PreloadNext];
				var ginf_split = ginf.split(",");
				var iext = ginf_split[0];
				var iwidth = ginf_split[1];
				var iheight = ginf_split[2];
				if(iext == 'j') { var iext_pr = 'jpg'; }
				if(iext == 'p') { var iext_pr = 'png'; }
				if(iext == 'b') { var iext_pr = 'bmp'; }
				if(iext == 'g') { var iext_pr = 'gif'; }

			}

			$("iframe").attr("src", function ( i, val ) { return val; });	
			$(".tracker").attr("src", function ( i, val ) { return val; });
			if ("ga" in window) {
			tracker = ga.getAll()[0];
				if(tracker)
				tracker.send("pageview", "/g/"+ id +"/"+ NextOne +"/");
			}

			$('.rd_first').removeClass('invisible');
			$('.rd_prev').removeClass('invisible');

			if(NextOne == Pages) {
				$('.rd_next').addClass('invisible');
				$('.rd_last').addClass('invisible');
			}
			
			ginfc = g_th['fl'][NextImg];
			var ginfc_split = ginfc.split(",");
			var iext_c = ginfc_split[0];
			var iwidth = ginfc_split[1];
			var iheight = ginfc_split[2];
			if(iext_c == 'j') { var iext_nx = 'jpg'; }
			if(iext_c == 'p') { var iext_nx = 'png'; }
			if(iext_c == 'b') { var iext_nx = 'bmp'; }
			if(iext_c == 'g') { var iext_nx = 'gif'; }
			
			$('.rd_fimg ').css({ "opacity": "0" });
			if(!Modernizr.touch) {
				// $('#fimg').css({ "width": iwidth+'px', "height": iheight+'px' });
				// $('.rd_fimg').css({ "width": iwidth+'px', "height": iheight+'px' });
			}
			$('#fimg').attr('c_page','image_'+ NextImg +'');
			$('#fimg').attr('src','//'+media_server+'/'+image_dir+'/'+gallery_id+'/'+NextImg+"."+iext_nx+"");
			
			$("#fimg").on('load', function() { 
					$('.rd_fimg ').css({ "opacity": "1" });
			}).on('error', function() { console.log("error loading image"); });

			if(NextOne == Pages) { }
			else {
				if(PreloadNext <= Pages) {
					$(['//'+media_server+'/'+image_dir+'/'+gallery_id+'/'+PreloadNext+'.'+iext_pr+'']).preload();
				}
			}
			
			$(".rd_pg .cr").text(NextOne);
			
			window.history.pushState('Title', 'Title', '/g/'+id+'/'+NextOne+'/');

		}

	}

	if($('div.reader_outer').length) {

		var self = this;
		var keyHold = false;
		var keyHoldCode = false;
		$(document).keydown(function(e) {
			if ($(e.target).is('input')) {
				return;
			}
			if (!keyHold && !e.ctrlKey && !e.altKey) {
				if (e.keyCode == 37 || e.keyCode == 65) {
					e.preventDefault();
					left_arrow();
				} else if (e.keyCode == 39 || e.keyCode == 68) {
					e.preventDefault();
					right_arrow();
				} else if (e.keyCode == 38 || e.keyCode == 87) {
					e.preventDefault();
					if ($(window).scrollTop() > 0) {
						keyHold = true;
						keyHoldCode = setInterval(function() {
							window.scrollBy(0 * 5, -1 * 5);
						}, 5);
					}
					return false;
				} else if (e.keyCode == 40 || e.keyCode == 83) {
					e.preventDefault();
					keyHold = true;
					keyHoldCode = setInterval(function() {
						window.scrollBy(0 * 5, 1 * 5);
					}, 5);
					return false;
				}
			}
		});

	}
	
	$(document).keyup(function(e) {
		if ($.inArray(e.keyCode, [37, 38, 39, 40, 65, 68, 83, 87])) {
			keyHoldCode = window.clearInterval(keyHoldCode);
			keyHold = false;
		}
	});
	
});