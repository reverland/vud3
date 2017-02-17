let oceanFill = (h, oceanColor) => (
  <defs>
    <radialGradient id="ocean_fill" cx="75%" cy="25%"><stop offset="5%" stop-color="#fff"></stop><stop offset="100%" stop-color={oceanColor}></stop></radialGradient>
  </defs>
)

let globeHighlight = (h) => (
  <defs><radialGradient id="globe_highlight" cx="75%" cy="25%"><stop offset="5%" stop-color="#ffd" stop-opacity="0.6"></stop><stop offset="100%" stop-color="#ba9" stop-opacity="0.2"></stop></radialGradient></defs>
)

let globeShading = (h) => (
  <defs><radialGradient id="globe_shading" cx="55%" cy="45%"><stop offset="30%" stop-color="#fff" stop-opacity="0"></stop><stop offset="100%" stop-color="#505962" stop-opacity="0.3"></stop></radialGradient></defs>
)

export {
  oceanFill,
  globeHighlight,
  globeShading
}
