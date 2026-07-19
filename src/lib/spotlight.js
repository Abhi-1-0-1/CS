// A cursor-tracked "spotlight" glow for cards.
// Deliberately NOT React state — mutating the DOM node's own CSS custom
// properties directly avoids a re-render on every mousemove pixel, which is
// the perf-sensitive pattern React docs point to when state isn't needed
// for something that never has to be reflected in render output.
export function handleSpotlightMove(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
}
