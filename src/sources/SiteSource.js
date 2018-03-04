import SiteActions from '../actions/SiteActions';

const SiteSource = {
  fetchSite: {
    remote() {
      return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function onreadystatechange() {
          if (this.readyState === 4 && this.status === 200) {
            try {
              const data = JSON.parse(xhttp.responseText);
              resolve(data);
            } catch (parseError) {
              reject(parseError);
            }
          } else if (this.readyState === 4) {
            reject(new Error(xhttp.responseText));
          }
        };
        xhttp.open('GET', window.WP_API_Settings.endpoint, true);
        xhttp.send();
      });
    },
    loading: SiteActions.loadingSite,
    success: SiteActions.receivedSite,
    error: SiteActions.fetchingSiteFailed,
  },
};

export default SiteSource;
