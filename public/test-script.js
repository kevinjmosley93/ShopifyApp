
const script = document.createElement('script')
script.src = 'https://code.jquery.com/jquery-3.5.1.min.js'
script.type = 'text/javascript'
script.onreadystatechange = handler
script.onload = handler
document.getElementsByTagName('head')[0].appendChild(script)

function handler(){
  const header = $('header.header').parent()
  header.prepend('<div>hello from public folder</div>').css({ 'background-color': '#51836D', 'text-align': 'center', 'color': 'white' })
}