// youtube.js
import React from 'react'
import getYouTubeId from 'get-youtube-id'
import {IoLogoYoutube} from 'react-icons/io'
import YouTube from 'react-youtube'

const Preview = ({value}) => {
  const {url} = value
  const id = getYouTubeId(url)
  const opts = {
    width: '100%',
    playerVars: { // https://developers.google.com/youtube/player_parameters
      modestbranding: 1,
      rel: 0
    }
  }
  return (<YouTube videoId={id} opts={opts} />)
}

export default {
  name: 'youtube',
  type: 'object',
  title: 'YouTube Embed',
  icon: IoLogoYoutube,
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'YouTube video URL'
    }
  ],
  preview: {
    select: {
      url: 'url'
    },
    component: Preview
  }
}
