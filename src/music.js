
import './stylesheets/style.css'
import tracks from './data/tracks.json'

const main = document.querySelector('main')
const musicSection = document.createElement('section')
musicSection.id = 'musique'
musicSection.className = 'music-grid'

if (main) {
    tracks.forEach((track) => {
        const article = document.createElement('article')
        article.className = 'track-card'
        article.innerHTML = `
        <a href="${track.url}" target="_blank" rel="noopener">
          <img src="${track.image || '/images/default-cover.jpg'}" alt="${track.title}" loading="lazy">
          <div class="track-info">
            <h3>${track.title}</h3>
          </div>
        </a>
      `
        musicSection.appendChild(article)
    })

    main.appendChild(musicSection)
}
