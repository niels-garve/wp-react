import React from 'react';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import Lightbox from 'react-image-lightbox';

class RichText extends React.Component {

  static fadeOutAndRemove(el) {
    const element = el;
    element.style.opacity = 1;

    function fade() {
      if (element.style.opacity < 0.1) {
        element.parentNode.removeChild(element);
      } else {
        element.style.opacity -= 0.1;
        requestAnimationFrame(fade);
      }
    }

    fade();
  }

  constructor(props) {
    super(props);

    this.sanitizeHtmlOpts = {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'img', 'iframe', 'button', 'figure']),
      allowedAttributes: false, // all
    };

    this.state = {
      photoIndex: 0,
      isOpen: false,
      images: [],
    };
  }

  componentDidMount() {
    this.galleryLinks = this.richtextWrapper.querySelectorAll('.gallery__link');
    this.lazyIframeBtns = this.richtextWrapper.querySelectorAll('.lazy-load-iframe__load');

    const galleryLinksLength = this.galleryLinks.length;
    const lazyIframeBtnsLength = this.lazyIframeBtns.length;

    for (let i = 0; i < galleryLinksLength; i += 1) {
      this.galleryLinks[i].addEventListener('click', (event) => {
        try {
          const galleryElement = event.currentTarget.parentNode.parentNode;

          this.setState({
            photoIndex: parseInt(event.currentTarget.getAttribute('data-photo-index'), 10),
            isOpen: true,
            images: JSON.parse(galleryElement.getAttribute('data-images')),
          });

          event.preventDefault();
        } catch (e) {
          // the link's href is the fallback, remain silently
        }
      });
    }

    for (let i = 0; i < lazyIframeBtnsLength; i += 1) {
      this.lazyIframeBtns[i].addEventListener('click', (event) => {
        const moduleElement = event.currentTarget.parentNode.parentNode;
        const iframe = moduleElement.querySelector('iframe');
        const thumbnail = moduleElement.querySelector('.lazy-load-iframe__thumbnail');
        const loadWrapper = moduleElement.querySelector('.lazy-load-iframe__load-wrapper');

        iframe.setAttribute('src', iframe.getAttribute('data-src'));

        RichText.fadeOutAndRemove(thumbnail);
        RichText.fadeOutAndRemove(loadWrapper);
      });
    }
  }

  render() {
    const {
      photoIndex,
      isOpen,
      images,
    } = this.state;

    return (
      <section>
        <div
          className="rich-text"
          ref={(div) => {
            this.richtextWrapper = div;
          }}
          dangerouslySetInnerHTML={{
            __html: sanitizeHtml(this.props.html, this.sanitizeHtmlOpts),
          }}
        />
        {isOpen &&
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}

          onCloseRequest={() => this.setState({ isOpen: false })}
          onMovePrevRequest={() => this.setState({
            photoIndex: (photoIndex + images.length - 1) % images.length,
          })}
          onMoveNextRequest={() => this.setState({
            photoIndex: (photoIndex + 1) % images.length,
          })}
        />
        }
      </section>
    );
  }
}

RichText.propTypes = {
  html: PropTypes.string.isRequired,
};

export default RichText;
