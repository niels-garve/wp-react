<?php
/**
 * WordPress React's functions and definitions
 *
 * @package wp-react
 * @since wp-react 1.0
 */

/**
 * First, let's set the maximum content width based on the theme's design and stylesheet.
 * This will limit the width of all uploaded images and embeds.
 */
if ( ! isset( $content_width ) ) {
	$content_width = 640; /* pixels */
}

if ( ! function_exists( 'ng_after_setup_theme' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which runs
	 * before the init hook. The init hook is too late for some features, such as indicating
	 * support post thumbnails.
	 */
	function ng_after_setup_theme() {
		$editor_css = get_asset_by_name_and_extension( 'editor', 'css' );

		/**
		 * Make theme available for translation.
		 * Translations can be placed in the /languages/ directory.
		 */
		// load_theme_textdomain('wp-react-theme', get_template_directory() . '/languages');
		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );
		set_post_thumbnail_size( 148, 148, true );
		add_theme_support( 'html5', array( 'gallery', 'caption' ) );
		/**
		 * Enable support for the following post formats:
		 * aside, gallery, quote, image, and video
		 */
		//add_theme_support('post-formats', array('aside', 'gallery', 'quote', 'image', 'video'));

		add_image_size( 'large_2x', 1280, 9999 );
		add_image_size( 'gallery_small', 148, 148, true );
		add_image_size( 'gallery_small_2x', 296, 296, true );
		add_image_size( 'gallery', 312, 208, true );
		add_image_size( 'gallery_2x', 624, 416, true );

		add_editor_style( $editor_css );
	}
endif; // ng_after_setup_theme
add_action( 'after_setup_theme', 'ng_after_setup_theme' );

/**
 * In development mode: returns Webpack`s publicPath to {$name}.{$extension} - which enables hot reloading.
 * In production mode: returns the path to the last modified, dynamically hashed asset with name $name
 * and extension $extension. Returns null if it could not be found.
 * @see https://css-tricks.com/hashes-in-wordpress-assets-with-enqueue/
 * @see https://stackoverflow.com/questions/7642191/php-directoryiterator-sort-files-by-date
 * @see https://github.com/webpack/webpack-dev-server/issues/400
 *
 * @param $name string
 * @param $extension string
 *
 * @return null|string
 */
function get_asset_by_name_and_extension( $name, $extension ) {
	if ( getenv( 'ENVIRONMENT' ) == 'development' ) {
		return "http://localhost:3000/wp-content/themes/wp-react-theme/build/{$name}.{$extension}";
	}

	$base_url         = get_template_directory_uri();
	$sorted_file_keys = array();
	$dir              = new DirectoryIterator( get_stylesheet_directory() . '/build' );

	// sort files by time modified
	foreach ( $dir as $file ) {
		if ( ! $file->isFile() ) {
			continue;
		}

		$mtime            = $file->getMTime();
		$same_mtime_order = 0;

		while ( true ) {
			$mtime_key = "{$mtime}.{$same_mtime_order}";

			// break condition
			if ( ! array_key_exists( $mtime_key, $sorted_file_keys ) ) {
				$sorted_file_keys[ $mtime_key ] = $file->key();
				break;
			}

			// iterate
			$same_mtime_order += 1;
		}
	}

	krsort( $sorted_file_keys ); // descending order

	// iterate `DirectoryIterator` as a sorted array
	foreach ( $sorted_file_keys as $key ) {
		$dir->seek( $key );
		$file = $dir->current();

		if ( pathinfo( $file, PATHINFO_EXTENSION ) === $extension ) {
			$full_name = basename( $file ); // e.g. bundle.983706a1a9c44d864635.js
			$file_name = substr( basename( $full_name ), 0, strpos( basename( $full_name ), '.' ) ); // bundle

			if ( $name === $file_name ) {
				return "{$base_url}/build/{$full_name}";
			}
		}
	}

	return null;
}

/**
 * Add custom image sizes attribute to enhance responsive image functionality
 * for content images
 *
 * @see https://www.smashingmagazine.com/2015/12/responsive-images-in-wordpress-core/
 *
 * @param string $sizes A source size value for use in a 'sizes' attribute.
 * @param (array|string) $size Requested size. Image size or array of width and height
 *        values in pixels (in that order).
 *
 * @return string A valid source size value for use in a 'sizes' attribute.
 */
function ng_calculate_image_sizes( $sizes, $size ) {
	$width = $size[0];

	if ( $width == 148 ) {
		$sizes = '9.25em';
	}

	if ( $width == 312 ) {
		$sizes = '(min-width: 21.5em) 19.5em, calc(100vw - 2em)';
	}

	if ( $width == 320 ) {
		$sizes = '(min-width: 22em) 20em, calc(100vw - 2em)';
	}

	if ( $width >= 640 ) {
		$sizes = '(min-width: 42em) 40em, calc(100vw - 2em)';
	}

	return $sizes;
}

add_filter( 'wp_calculate_image_sizes', 'ng_calculate_image_sizes', 10, 2 );

/**
 * Filters WordPress` default image sizes to set custom sizes
 * @see https://10up.com/blog/2012/enforcing-wordpress-image-sizes-within-your-theme/
 * @see https://gist.github.com/bradyvercher/4343518
 *
 * @param $value
 *
 * @return bool|int
 */
function ng_default_image_options( $value ) {
	$option = str_replace( 'pre_option_', '', current_filter() );

	switch ( $option ) {
		case 'thumbnail_size_h' :
		case 'thumbnail_size_w' :
			$value = 148;
			break;
		case 'thumbnail_crop' :
			$value = true;
			break;
		case 'medium_size_h' :
			$value = 9999;
			break;
		case 'medium_size_w' :
			$value = 320;
			break;
		case 'large_size_h' :
			$value = 9999;
			break;
		case 'large_size_w' :
			$value = 640;
			break;
	}

	return $value;
}

add_filter( 'pre_option_thumbnail_crop', 'ng_default_image_options' );
add_filter( 'pre_option_thumbnail_size_h', 'ng_default_image_options' );
add_filter( 'pre_option_thumbnail_size_w', 'ng_default_image_options' );
add_filter( 'pre_option_medium_size_h', 'ng_default_image_options' );
add_filter( 'pre_option_medium_size_w', 'ng_default_image_options' );
add_filter( 'pre_option_large_size_h', 'ng_default_image_options' );
add_filter( 'pre_option_large_size_w', 'ng_default_image_options' );

/**
 * You can also make your custom sizes selectable from your WordPress admin. To do so,
 * you have to use the image_size_names_choose hook to assign them a normal, human-readable name.
 *
 * @see https://developer.wordpress.org/reference/functions/add_image_size/
 *
 * @param $size_names (array) Array of image sizes and their names.
 *        Default values include 'Thumbnail', 'Medium', 'Large', 'Full Size'.
 *
 * @return array
 */
function ng_image_size_names_choose( $size_names ) {
	return array_merge( $size_names, array(
		'gallery'       => __( 'Gallery' ),
		'gallery_small' => __( 'Gallery, small' ),
	) );
}

add_filter( 'image_size_names_choose', 'ng_image_size_names_choose' );

/**
 * Filters WordPress` image gallery HTML to fit the react-image-lightbox NPM package
 * @see https://www.npmjs.com/package/react-image-lightbox
 * @see https://stackoverflow.com/questions/14585538/customise-the-wordpress-gallery-html-layout
 * @see https://stackoverflow.com/questions/8832528/escaping-encoding-single-quotes-in-json-encoded-html5-data-attributes
 *
 * @param $output (string) The gallery output. Default empty.
 * @param $attr (array) Attributes of the gallery shortcode.
 *
 * @return string
 */
function ng_post_gallery( $output, $attr ) {
	$posts_order_string = $attr['ids'];
	$posts_order        = explode( ',', $posts_order_string );

	$posts = get_posts( array(
		'include'   => $posts_order,
		'post_type' => 'attachment',
		'orderby'   => 'post__in'
	) );

	$images     = array();
	$list_items = '';
	$size       = 'gallery';
	$class_name = 'gallery';

	if ( $attr['size'] == 'gallery_small' ) {
		$size = 'gallery_small';
		$class_name .= ' gallery--small';
	}

	if ( $attr['orderby'] == 'rand' ) {
		shuffle( $posts );
	}

	foreach ( $posts as $index => $image_post ) {
		$image     = wp_get_attachment_image_src( $image_post->ID, 'large_2x' );
		$thumbnail = wp_get_attachment_image( $image_post->ID, $size );

		if ( ! $image ) {
			continue;
		}

		$images[] = $image[0];

		$list_items .= "<li class=\"gallery__item\">\n";
		$list_items .= "<a class=\"gallery__link\" href=\"{$image[0]}\" data-photo-index=\"{$index}\">{$thumbnail}</a>\n";
		$list_items .= "</li>\n";
	}

	if ( count( $images ) == 0 ) {
		return $output;
	}

	$json_images = htmlspecialchars( json_encode( $images ), ENT_QUOTES, 'UTF-8' );
	$output      = "<ul class=\"{$class_name}\" data-images=\"{$json_images}\">{$list_items}</ul>";

	return $output;
}

add_filter( 'post_gallery', 'ng_post_gallery', 10, 2 );

/**
 * Wraps WordPress` oembed HTML so it can be lazy-loaded
 * @see https://stackoverflow.com/questions/2936467/parse-youtube-video-id-using-preg-match
 * @see https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
 *
 * @param $cached_html (mixed) The cached HTML result, stored in post meta.
 * @param $url (string) The attempted embed URL.
 *
 * @return string
 */
function ng_embed_oembed_html( $cached_html, $url ) {
	$thumbnail_style = 'background-color:#000000;';

	if ( preg_match( '%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i', $url, $match ) ) {
		$thumbnail_style = "background-image:url(https://img.youtube.com/vi/{$match[1]}/maxresdefault.jpg);";
	}

	$cached_html = str_replace( 'src', 'title="a youtube video" src="" data-src', $cached_html );

	$output = "<div class=\"lazy-load-iframe\">\n";
	$output .= "<div class=\"lazy-load-iframe__iframe\">{$cached_html}</div>\n";
	$output .= "<div class=\"lazy-load-iframe__thumbnail\" style=\"{$thumbnail_style}\"></div>\n";
	$output .= "<div class=\"lazy-load-iframe__load-wrapper\">\n";
	$output .= "<button class=\"lazy-load-iframe__load button button--light\">load</button>\n";
	$output .= "</div>\n";
	$output .= "</div>\n";

	return $output;
}

add_filter( 'embed_oembed_html', 'ng_embed_oembed_html', 10, 2 );

/**
 * Enqueues styles and scripts, disables cache breaking query params - because Webpack hashes itself - inline loads CSS
 * @see https://wordpress.org/support/topic/403-cookie-nonce-is-invalid-wp-api-react-front-end-to-pull-revisions/
 * @see https://www.npmjs.com/package/wordpress-rest-api
 * @see https://jakearchibald.com/2016/link-in-body/
 */
function ng_enqueue_scripts() {
	$app_js  = get_asset_by_name_and_extension( 'bundle', 'js' );
	$app_css = get_asset_by_name_and_extension( 'bundle', 'css' );

	wp_enqueue_script( 'app', "{$app_js}#async", array(), null );

	if ( is_user_logged_in() ) {
		wp_localize_script( 'app', 'WP_API_Settings', array(
			'endpoint' => esc_url_raw( rest_url() ),
			'nonce'    => wp_create_nonce( 'wp_rest' )
		) );
	} else {
		wp_localize_script( 'app', 'WP_API_Settings', array(
			'endpoint' => esc_url_raw( rest_url() )
		) );
	}

	wp_add_inline_script( 'app', "loadCSS(\"{$app_css}\");" );
}

add_action( 'wp_enqueue_scripts', 'ng_enqueue_scripts' );

/**
 * Disables WordPress` embed script because there're custom oembed bindings
 * @see https://wordpress.stackexchange.com/questions/211701/what-does-wp-embed-min-js-do-in-wordpress-4-4
 */
function ng_footer() {
	wp_dequeue_script( 'wp-embed' );
}

add_action( 'wp_footer', 'ng_footer' );

/**
 * Includes revisions in WordPress` REST API
 * @see https://github.com/airesvsg/acf-to-rest-api/issues/190
 *
 * @param $response
 * @param $post
 *
 * @return mixed|WP_REST_Response
 */
function ng_rest_prepare_revisions( $response, $post ) {
	$data = $response->get_data();

	$data['acf'] = get_fields( $post->ID );

	return rest_ensure_response( $data );
}

add_filter( 'rest_prepare_revision', 'ng_rest_prepare_revisions', 10, 2 );

/**
 * Removes buttons from the first row of the tiny mce editor
 *
 * @see http://thestizmedia.com/remove-buttons-items-wordpress-tinymce-editor/
 *
 * @param $buttons (array) The default array of buttons
 *
 * @return array The updated array of buttons that excludes some items
 */
function ng_mce_buttons( $buttons ) {
	$remove_buttons = array(
		'blockquote',
		'alignleft',
		'aligncenter',
		'alignright',
	);
	foreach ( $buttons as $button_key => $button_value ) {
		if ( in_array( $button_value, $remove_buttons ) ) {
			unset( $buttons[ $button_key ] );
		}
	}

	return $buttons;
}

add_filter( 'mce_buttons', 'ng_mce_buttons' );

/**
 * Removes buttons from the second row (kitchen sink) of the tiny mce editor
 *
 * @see http://thestizmedia.com/remove-buttons-items-wordpress-tinymce-editor/
 *
 * @param $buttons (array) The default array of buttons in the kitchen sink
 *
 * @return array The updated array of buttons that excludes some items
 */
function ng_mce_buttons_2( $buttons ) {
	$remove_buttons = array(
		'strikethrough',
		'hr',
		'forecolor',
		'outdent',
		'indent',
	);
	foreach ( $buttons as $button_key => $button_value ) {
		if ( in_array( $button_value, $remove_buttons ) ) {
			unset( $buttons[ $button_key ] );
		}
	}

	return $buttons;
}

add_filter( 'mce_buttons_2', 'ng_mce_buttons_2' );

/**
 * Enables orderby_acf query parameter. It enhances the Wordpress REST API with its page, per_page, orderby, etc...
 * query parameters.
 *
 * @see https://developer.wordpress.org/rest-api/using-the-rest-api/pagination/
 *
 * @param $valid_vars
 *
 * @return array
 */
function ng_rest_query_vars( $valid_vars ) {
	return array_merge( $valid_vars, array( 'orderby_acf', 'meta_query' ) );
}

add_filter( 'rest_query_vars', 'ng_rest_query_vars' );

/**
 * Queries via Wordpress Meta Query, enables ordering by ACF
 * @see https://make.wordpress.org/core/2015/03/30/query-improvements-in-wp-4-2-orderby-and-meta_query/
 * @see https://github.com/airesvsg/acf-to-rest-api/issues/123
 * @see https://github.com/airesvsg/acf-to-rest-api/issues/13
 *
 * @param $args
 *
 * @return mixed
 */
function ng_rest_post_query( $args ) {
	$order_by_acf = $_GET['orderby_acf'];

	if ( ! empty( $order_by_acf ) ) {

		$args['meta_query'] = array(
			array(
				'key' => esc_sql( $order_by_acf ),
			)
		);

		$args['orderby'] = esc_sql( $order_by_acf );
	}

	return $args;
}

add_filter( 'rest_post_query', 'ng_rest_post_query' );

/**
 * Filters asset URLs to enable async load JS and CSS
 * @see https://ikreativ.com/async-with-wordpress-enqueue
 * @see https://heikomamerow.de/2014/07/30/css-trick-css-asynchron-laden/
 * @see https://github.com/filamentgroup/loadCSS
 *
 * @param $url
 *
 * @return mixed|string
 */
function ng_async_scripts( $url ) {
	$is_async_script = strpos( $url, '#async' ) !== false;
	$is_async_style  = strpos( $url, '#loadcss' ) !== false;

	if ( ! $is_async_script && ! $is_async_style ) {
		return $url;
	} else if ( is_admin() && $is_async_script ) {
		return str_replace( '#async', '', $url );
	} else if ( is_admin() && $is_async_style ) {
		return str_replace( '#loadcss', '', $url );
	} else if ( $is_async_script ) {
		return str_replace( '#async', '', $url ) . "' async='async";
	} else {
		return str_replace( '#loadcss', '', $url ) . "' as=\"style\" onload=\"this.rel='stylesheet'\" rel='preload";
	}
}

add_filter( 'clean_url', 'ng_async_scripts', 11, 1 );

/**
 * add a field to check for revisions (debug_preview)
 *
 * @param $fields
 *
 * @return mixed
 * @see https://support.advancedcustomfields.com/forums/topic/preview-solution/
 */
function add_field_debug_preview( $fields ) {
	$fields["debug_preview"] = "debug_preview";

	return $fields;
}

add_filter( '_wp_post_revision_fields', 'add_field_debug_preview' );

/**
 * add an hidden field (debug_preview) on edit pages with a value (‘debug_preview’ but any value works)
 * @see https://support.advancedcustomfields.com/forums/topic/preview-solution/
 */
function add_input_debug_preview() {
	echo '<input type="hidden" name="debug_preview" value="debug_preview">';
}

add_action( 'edit_form_after_title', 'add_input_debug_preview' );

function ng_loader_tag_remove_type_attr( $tag ) {
	return preg_replace( '/type=["\']text\/(javascript|css)["\']\s/', '', $tag );
}

add_filter( 'style_loader_tag', 'ng_loader_tag_remove_type_attr', 10, 1 );
add_filter( 'script_loader_tag', 'ng_loader_tag_remove_type_attr', 10, 1 );

/*
 * CPT and ACF
 */
function cptui_register_my_cpts() {

	/**
	 * Post Type: Header.
	 */

	$labels = array(
		"name"          => __( "Header", "" ),
		"singular_name" => __( "Header", "" ),
	);

	$args = array(
		"label"               => __( "Header", "" ),
		"labels"              => $labels,
		"description"         => "",
		"public"              => true,
		"publicly_queryable"  => true,
		"show_ui"             => true,
		"show_in_rest"        => true,
		"rest_base"           => "",
		"has_archive"         => false,
		"show_in_menu"        => true,
		"exclude_from_search" => false,
		"capability_type"     => "post",
		"map_meta_cap"        => true,
		"hierarchical"        => false,
		"rewrite"             => array( "slug" => "headers", "with_front" => true ),
		"query_var"           => true,
		"supports"            => array( "title", "editor", "revisions" ),
	);

	register_post_type( "headers", $args );

	/**
	 * Post Type: Footer.
	 */

	$labels = array(
		"name"          => __( "Footer", "" ),
		"singular_name" => __( "Footer", "" ),
	);

	$args = array(
		"label"               => __( "Footer", "" ),
		"labels"              => $labels,
		"description"         => "",
		"public"              => true,
		"publicly_queryable"  => true,
		"show_ui"             => true,
		"show_in_rest"        => true,
		"rest_base"           => "",
		"has_archive"         => false,
		"show_in_menu"        => true,
		"exclude_from_search" => false,
		"capability_type"     => "post",
		"map_meta_cap"        => true,
		"hierarchical"        => false,
		"rewrite"             => array( "slug" => "footers", "with_front" => true ),
		"query_var"           => true,
		"supports"            => array( "title", "revisions" ),
	);

	register_post_type( "footers", $args );

	/**
	 * Post Type: Sidebars.
	 */

	$labels = array(
		"name"          => __( "Sidebars", "" ),
		"singular_name" => __( "Sidebar", "" ),
	);

	$args = array(
		"label"               => __( "Sidebars", "" ),
		"labels"              => $labels,
		"description"         => "",
		"public"              => true,
		"publicly_queryable"  => true,
		"show_ui"             => true,
		"show_in_rest"        => true,
		"rest_base"           => "",
		"has_archive"         => false,
		"show_in_menu"        => true,
		"exclude_from_search" => false,
		"capability_type"     => "post",
		"map_meta_cap"        => true,
		"hierarchical"        => false,
		"rewrite"             => array( "slug" => "sidebars", "with_front" => true ),
		"query_var"           => true,
		"supports"            => array( "title", "revisions" ),
	);

	register_post_type( "sidebars", $args );
}

add_action( 'init', 'cptui_register_my_cpts' );

if ( function_exists( "register_field_group" ) ) {
	register_field_group( array(
		'id'         => 'acf_page',
		'title'      => 'Page',
		'fields'     => array(
			array(
				'key'          => 'field_5a4b72a108728',
				'label'        => 'Header',
				'name'         => 'header',
				'type'         => 'post_object',
				'instructions' => 'Hier kannst du einen Header für Deine Seite wählen. Neue Header verwaltest du im Menü "Header".',
				'required'     => 1,
				'post_type'    => array(
					0 => 'headers',
				),
				'taxonomy'     => array(
					0 => 'all',
				),
				'allow_null'   => 0,
				'multiple'     => 0,
			),
			array(
				'key'          => 'field_5a4b7ae608729',
				'label'        => 'Sidebar',
				'name'         => 'sidebar',
				'type'         => 'post_object',
				'instructions' => 'Hier kannst du eine Sidebar für Deine Seite wählen. Neue Sidebars verwaltest du im Menü "Sidebar".',
				'post_type'    => array(
					0 => 'sidebars',
				),
				'taxonomy'     => array(
					0 => 'all',
				),
				'allow_null'   => 1,
				'multiple'     => 0,
			),
			array(
				'key'          => 'field_5a4b7b560872a',
				'label'        => 'Footer',
				'name'         => 'footer',
				'type'         => 'post_object',
				'instructions' => 'Hier kannst du einen Footer für Deine Seite wählen. Neue Footer verwaltest du im Menü "Footer".',
				'required'     => 1,
				'post_type'    => array(
					0 => 'footers',
				),
				'taxonomy'     => array(
					0 => 'all',
				),
				'allow_null'   => 0,
				'multiple'     => 0,
			),
		),
		'location'   => array(
			array(
				array(
					'param'    => 'post_type',
					'operator' => '==',
					'value'    => 'page',
					'order_no' => 0,
					'group_no' => 0,
				),
			),
		),
		'options'    => array(
			'position'       => 'normal',
			'layout'         => 'no_box',
			'hide_on_screen' => array(),
		),
		'menu_order' => 0,
	) );
	register_field_group( array(
		'id'         => 'acf_post',
		'title'      => 'Post',
		'fields'     => array(
			array(
				'key'          => 'field_5a4b7c3234f6f',
				'label'        => 'Header',
				'name'         => 'header',
				'type'         => 'post_object',
				'instructions' => 'Hier kannst du einen Header für die Detailansicht Deines Posts wählen. Neue Header verwaltest du im Menü "Header".',
				'required'     => 1,
				'post_type'    => array(
					0 => 'headers',
				),
				'taxonomy'     => array(
					0 => 'all',
				),
				'allow_null'   => 0,
				'multiple'     => 0,
			),
			array(
				'key'          => 'field_5a4b7c7f34f70',
				'label'        => 'Sidebar',
				'name'         => 'sidebar',
				'type'         => 'post_object',
				'instructions' => 'Hier kannst du eine Sidebar für die Detailansicht Deines Posts wählen. Neue Sidebars verwaltest du im Menü "Sidebar".',
				'post_type'    => array(
					0 => 'sidebars',
				),
				'taxonomy'     => array(
					0 => 'all',
				),
				'allow_null'   => 1,
				'multiple'     => 0,
			),
			array(
				'key'          => 'field_5a4b7ca534f71',
				'label'        => 'Footer',
				'name'         => 'footer',
				'type'         => 'post_object',
				'instructions' => 'Hier kannst du einen Footer für die Detailansicht Deines Posts wählen. Neue Footer verwaltest du im Menü "Footer".',
				'required'     => 1,
				'post_type'    => array(
					0 => 'footers',
				),
				'taxonomy'     => array(
					0 => 'all',
				),
				'allow_null'   => 0,
				'multiple'     => 0,
			),
		),
		'location'   => array(
			array(
				array(
					'param'    => 'post_type',
					'operator' => '==',
					'value'    => 'post',
					'order_no' => 0,
					'group_no' => 0,
				),
			),
		),
		'options'    => array(
			'position'       => 'normal',
			'layout'         => 'no_box',
			'hide_on_screen' => array(),
		),
		'menu_order' => 0,
	) );
}
