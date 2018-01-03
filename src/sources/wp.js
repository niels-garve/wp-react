import WPAPI from 'wpapi';

const wpapiOpts = {
  endpoint: window.WP_API_Settings.endpoint,
};

if (window.WP_API_Settings.nonce) {
  wpapiOpts.nonce = window.WP_API_Settings.nonce;
}

const wp = new WPAPI(wpapiOpts);

wp.headers = wp.registerRoute('wp/v2', '/headers/(?P<id>[\\d]+)/revisions');
wp.sidebars = wp.registerRoute('wp/v2', '/sidebars/(?P<id>[\\d]+)/revisions');
wp.footers = wp.registerRoute('wp/v2', '/footers/(?P<id>[\\d]+)/revisions');

export default wp;
