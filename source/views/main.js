var html = require('bel')
var md = require('marked')
var objectValues = require('object-values')

module.exports = Main

function Header (state, emit) {
  var content = state.content['site-meta'] || { }

  return html`
    <div class="p1 x xw vhmn33">
      <div class="c8 p1" sm="c12">
        ${content.name}
      </div>
      <div class="c4 p1" sm="c12">
        <div>
          <a
            href="mailto:${content.email}"
            class="tdn tc-black"
          >
            ${content.email}
          </a>
        </div>
        <div>
          <a
            href="http://twitter.com/${content.twitter}"
            class="tdn tc-black"
          >
            @${content.twitter}
          </a>
        </div>
      </div>
    </div>
  `
}

function List (state, emit) {
  var entries = objectValues(state.content)
    .filter(entry => !entry.hidden)
    .sort(function(a, b) {
      a = a.date.replace(/\//g, ':')
      b = b.date.replace(/\//g, ':')
      return a > b ? -1 : a < b ? 1 : 0
    })
    .map(entry => Entry(entry, emit))

  return html`<div class="p1">${entries}</div>`
}

function Entry (state, emit) {
  var isExternal = state.external && state.url
  var url = isExternal ? state.url : '/' + state.id

  var collaborator = () => html`
    <span class="op25">w/ ${state.collaborator}</span>
  `

  var client = () => html`
    <span class="op25">${state.client}</span>
  `

  var external = () => html`
    <span class="tr-45">→</span>
  `

  return html`
    <div>
      <a href=${url} class="x tc-black tdn hcbb1">
        <div class="c8 pl1 pr4" sm="c12 pr1">
          <div class="indent">
            <span class="hbb1">${state.title}</span>
            ${isExternal ? external() : ''}
            ${state.collaborator ? collaborator() : ''} 
            ${state.client ? client() : ''} 
          </div>
        </div>
        <div class="c4 px1 op25" sm="dn">
          ${state.type}
        </div>
      </a>
    </div>
  `
}

function Main (state, emit) {
  return html`
    <div>
      ${Header(state, emit)}
      ${List(state, emit)}
    </div>
  `

  function onclick () {
    emit('increment', 1)
  }
}