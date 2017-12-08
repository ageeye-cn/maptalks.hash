import * as maptalks from 'maptalks';

const defaultOptions = {
    precision: 3,
    template: "{zoom}/{pitch}/{bearing}/{x}/{y}"
}

export class Hash extends maptalks.Class {
    constructor(map, options) {
        options = Object.assign({}, defaultOptions, options)

        super(options)

        this._map = map
        this._view = this._map.getView()
        this.bindEvent()
    }

    bindEvent() {
        maptalks.DomUtil.addDomEvent(window, 'hashchange', this.onHashChange, this)
        this._map.on('viewchange', this.onViewChange, this)
    }

    setHash() {

    }

    getHash() {

    }

    getView() {
        return this._map.getView()
    }

    //@param {object} view
    setView(view) {
        view = Object.assign(this._view, view)
        this._map.setView(view)
    }

    onHashChange(event) {
        if (window.location.hash === this.viewToHash(this.getView())){
            return
        }
    }

    onViewChange(event) {
        window.location.hash = this.viewToHash(event.new)
    }

    //@param {object} view
    viewToHash(view) {
        const {template, precision} = this.options

        return maptalks.StringUtil.replaceVariable(template, {
            zoom: view.zoom,
            pitch: Math.floor(view.pitch),
            bearing: Math.floor(view.bearing),
            x: view.center[0].toFixed(precision),
            y: view.center[1].toFixed(precision)
        })
    }
}