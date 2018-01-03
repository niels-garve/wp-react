<!doctype html>
<html lang="de">
<head>
	<meta charset="<?php echo get_bloginfo( 'charset' ) ?>">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="icon" href="<?php echo get_asset_by_name_and_extension( 'icon_16x16', 'png' ) ?>" type="image/png">
	<link rel="manifest" href="<?php echo get_asset_by_name_and_extension( 'manifest', 'json' ) ?>">
	<meta name="mobile-web-app-capable" content="yes">
	<!-- TODO adjust to your needs -->
	<meta name="theme-color" content="#5a3a3b">
	<link rel="apple-touch-icon" sizes="48x48"
	      href="<?php echo get_asset_by_name_and_extension( 'icon_48x48', 'png' ) ?>">
	<link rel="apple-touch-icon" sizes="72x72"
	      href="<?php echo get_asset_by_name_and_extension( 'icon_72x72', 'png' ) ?>">
	<link rel="apple-touch-icon" sizes="96x96"
	      href="<?php echo get_asset_by_name_and_extension( 'icon_96x96', 'png' ) ?>">
	<link rel="apple-touch-icon" sizes="144x144"
	      href="<?php echo get_asset_by_name_and_extension( 'icon_144x144', 'png' ) ?>">
	<link rel="apple-touch-icon" sizes="168x168"
	      href="<?php echo get_asset_by_name_and_extension( 'icon_168x168', 'png' ) ?>">
	<link rel="apple-touch-icon" sizes="192x192"
	      href="<?php echo get_asset_by_name_and_extension( 'icon_192x192', 'png' ) ?>">
	<link rel="apple-touch-icon" sizes="512x512"
	      href="<?php echo get_asset_by_name_and_extension( 'icon_512x512', 'png' ) ?>">

	<script>
		/*! loadCSS. [c]2017 Filament Group, Inc. MIT License */
		!function(a){"use strict";var b=function(b,c,d){function e(a){return h.body?a():void setTimeout(function(){e(a)})}function f(){i.addEventListener&&i.removeEventListener("load",f),i.media=d||"all"}var g,h=a.document,i=h.createElement("link");if(c)g=c;else{var j=(h.body||h.getElementsByTagName("head")[0]).childNodes;g=j[j.length-1]}var k=h.styleSheets;i.rel="stylesheet",i.href=b,i.media="only x",e(function(){g.parentNode.insertBefore(i,c?g:g.nextSibling)});var l=function(a){for(var b=i.href,c=k.length;c--;)if(k[c].href===b)return a();setTimeout(function(){l(a)})};return i.addEventListener&&i.addEventListener("load",f),i.onloadcssdefined=l,l(f),i};"undefined"!=typeof exports?exports.loadCSS=b:a.loadCSS=b}("undefined"!=typeof global?global:this);
	</script>
	<script>
		// Picture element HTML5 shiv
		document.createElement("picture");
	</script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/picturefill/3.0.3/picturefill.min.js" async="async"></script>
	<noscript>
		<link rel="stylesheet" href="<?php echo get_asset_by_name_and_extension( 'bundle', 'css' ) ?>">
	</noscript>
	<?php wp_head(); ?>
</head>
<body>
<div id="app">
	<noscript>
		<div class="l-container">
			<div class="default-error">
				<h1 class="default-error__headline">Please turn Javascript on</h1>
				<span class="default-error__text">Javascript is required for this website. Please turn it on in your browser and reload the page.</span>
			</div>
		</div>
	</noscript>
</div>
<?php wp_footer(); ?>
</body>
</html>
