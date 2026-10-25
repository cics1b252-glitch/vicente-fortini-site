const songs = window.VICENTE_SONGS;
const choices = document.getElementById('choices');
const result = document.getElementById('result');
const platforms = document.getElementById('platforms');
const allowedPlatforms = {spotify:'Spotify',deezer:'Deezer',youtubeMusic:'YouTube Music',amazonMusic:'Amazon Music'};
for (const song of songs) {
  const button=document.createElement('button');button.type='button';button.className='choice';
  const symbol=document.createElement('span');symbol.className='symbol';symbol.textContent=song.symbol;
  const name=document.createElement('span');name.textContent=song.label;
  button.append(symbol,name);
  button.addEventListener('click',()=>showSong(song,button));choices.append(button);
}
function showSong(song,button){
  document.querySelectorAll('.choice').forEach(b=>{b.classList.remove('selected');b.setAttribute('aria-pressed','false')});
  button.classList.add('selected');button.setAttribute('aria-pressed','true');
  document.getElementById('song-title').textContent=song.title;
  document.getElementById('song-description').textContent=song.description;
  document.getElementById('cover-title').textContent=song.title;
  const cover=document.getElementById('song-cover');const img=document.getElementById('cover-image');
  img.hidden=!song.cover;img.removeAttribute('src');cover.classList.toggle('has-image',!!song.cover);
  if(song.cover){img.src=song.cover;img.onerror=()=>{img.hidden=true;cover.classList.remove('has-image');cover.setAttribute('aria-label','Apresentação editorial de '+song.title)};}

  document.getElementById('cover-symbol').textContent=song.symbol;
  cover.setAttribute('aria-label',(song.cover?'Arte fornecida para ':'Apresentação editorial de ')+song.title);
  platforms.replaceChildren();let count=0;
  for(const [key,label] of Object.entries(allowedPlatforms)){
    const url=song.links?.[key];if(!url)continue;
    try{const parsed=new URL(url);if(parsed.protocol!=='https:')continue;
      const link=document.createElement('a');link.href=parsed.href;link.target='_blank';link.rel='noopener noreferrer';link.textContent='Ouvir no '+label;link.className='platform';platforms.append(link);count++;
    }catch{}
  }
  if(!count){const note=document.createElement('p');note.className='availability';note.textContent='Links oficiais de audição ainda não cadastrados.';platforms.append(note)}
  result.hidden=false;result.scrollIntoView({behavior:'smooth',block:'nearest'});
}
document.getElementById('again').addEventListener('click',()=>{result.hidden=true;document.querySelectorAll('.choice').forEach(b=>{b.classList.remove('selected');b.setAttribute('aria-pressed','false')});choices.scrollIntoView({behavior:'smooth',block:'center'});choices.querySelector('button')?.focus({preventScroll:true})});
document.getElementById('year').textContent=new Date().getFullYear();
