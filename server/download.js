import ytdl from 'ytdl-core';
import fs from 'fs';


export const download = (videoId) => new Promise((resolve, reject) => {
  const videoUrl = 'https://www.youtube.com/shorts/' + videoId
  console.log('Realizando download do vídeo ▶ ' + videoId)

  ytdl(videoUrl, {quality: 'lowestaudio', filter: 'audioonly'}).on(
    'info',
    (info) => {
      const seconds = info.formats[0].approxDurationMs / 1000
      
      if(seconds > 60) {
        throw new Error('Este vídeo não é um shorts!')
      }
    })
    .on(
      'end', () => {
        console.log('Download concluído com exito.')
        resolve()
      })
    .on('error', (error) => {
      console.log('Não foi possível compeltar o download do vídeo 😢. Detalhes:', error)
      reject(error)
    }).pipe(fs.createWriteStream('./tmp/audio.mp4'))
})