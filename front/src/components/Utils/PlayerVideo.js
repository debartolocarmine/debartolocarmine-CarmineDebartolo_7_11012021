/* eslint-disable */
import React, { Component } from 'react';
import './PlayerVideo.scss'
// Start Class
class PlayerVideo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  validateUrl(url) {
    var success = false;
    var media = { iframe: null };
    // Check if url come from Youtube
    //eslint-disable-next-line
    if (url.match('https://(www.)?youtube|youtu\.com')) {
      // console.log('YOUTUBE')
      let youtube_id = null
      if (url.match('embed')) { youtube_id = url.split(/embed\//)[1].split('"')[0]; }
      else { youtube_id = url.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0]; }
      media.type = "youtube";
      media.iframe = 'https://www.youtube.com/embed/' + youtube_id;
      media.id = youtube_id;
      success = true;
    }
    else if (url.match('https://(www.)?vimeo\.com')) {
      // Check if url come from Vimeo
      console.log('vimeo')
      var matches = url.match('^(?:https?:\/\/)?(?:www\.)?(?:vimeo)(?:\.com\/)([0-9A-Za-z_-]*)');
      media.type = "vimeo";
      media.iframe = null
      if (matches && matches[1]) {
        media.iframe = 'https://player.vimeo.com/video/' + matches[1];
      }
      success = true;
    }
    else if (url.match('https://(www.)?dailymotion\.com')) {
      console.log('VIMEO')
      var matches = url.match('^(?:https?:\/\/)?(?:www\.)?(?:dailymotion)(?:\.com\/)(?:video\/)([0-9A-Za-z_-]*)');

      media.type = "dailymotion";
      media.iframe = null
      if (matches && matches[1]) {
        media.iframe = 'https://www.dailymotion.com/embed/video/' + matches[1];
      }
      success = true;
    }
    else if (url.match('https://(www.)?archive\.org')) {
      console.log('ARCHIVE')
      var matches = url.match('^(?:https?:\/\/)?(?:www\.)?(?:archive)(?:\.org\/)(?:details\/)([0-9A-Za-z_-]*)');
      // console.log(matches[1])
      // archive_id = url.split(/details\/|http:\/\/archive\.org\//)[1].split(/[?&]/)[0];
      media.type = "archive";
      media.url = url;
      media.iframe = null
      if (matches && matches[1]) {
        media.iframe = 'https://archive.org/embed/' + matches[1];
      }
      success = true;
    }

    if (success) {
      return <iframe src={media.iframe} width="100%" frameBorder="0"></iframe>
    }
    else { console.log("No valid media id detected"); }
    return false;
  }

  render() {

    const { video_url } = this.props;
    // console.log(video_url)
    return (
      <div className="card-video">
        <div className={`video-16-9`}>
          {this.validateUrl(video_url)}
        </div>
      </div>
    );
  }
}

export default PlayerVideo