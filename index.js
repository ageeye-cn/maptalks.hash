import * as maptalks from 'maptalks';

const template = "{zoom}/{pitch}/{bearing}/{x}/{y}"

export class Hash extends maptalks.Class {
    constructor(map) {
        super()

        this._map = map
        this._view = this._map.getView()
        this.bindEvent()
        this.updateView()
    }

    bindEvent() {
        maptalks.DomUtil.addDomEvent(window, 'hashchange', this.onHashChange, this)
        this._map.on('viewchange', this.onViewChange, this)
    }
    //@param {string} hash
    setHash(hash) {
        window.location.hash = hash
    }

    getHash() {
        return window.location.hash
    }

    getView() {
        return this._map.getView()
    }

    //@param {object} view
    setView(view) {
        view = Object.assign(this._view, view)
        this._map.setView(view)
    }
    updateView(){
        const hash = this.getHash(),
            view = this.hashToView(hash)

        if (view){
            this._map.setView(view)
        }
    }
    onHashChange() {
        this.updateView()
    }

    onViewChange(event) {
        const hash = this.viewToHash(event.new)

        this.setHash(hash)
    }

    //@param {string} hash
    hashToView(hash) {
        if(hash.indexOf('#') === 0) {
            hash = hash.substr(1)
        }

        const params = hash.split('/')

        if (params.length !== 5){
            return false
        }

        let [zoom, pitch, bearing, x, y] = params

        zoom = parseInt(zoom)
        pitch = parseInt(pitch)
        bearing = parseInt(bearing)
        x = parseFloat(x)
        y = parseFloat(y)


        if ( !isNaN(zoom) && zoom >= 1 && zoom <= 21 &&
            !isNaN(pitch) && pitch >= 0 && pitch <= 90 &&
            !isNaN(bearing) && bearing >= -180 && bearing <= 180 &&
            !isNaN(x) && x >= -180 && x <= 180 &&
            !isNaN(y) && y >= -90 && y <= 90
        ){
            this.setView({center:[x,y], zoom, pitch, bearing})
        }
    }

    //@param {object} view
    viewToHash(view) {
        const precision = Math.max(0, Math.ceil(Math.log(view.zoom) / Math.LN2));

        return maptalks.StringUtil.replaceVariable(template, {
            zoom: view.zoom,
            pitch: parseInt(view.pitch),
            bearing: parseInt(view.bearing),
            x: view.center[0].toFixed(precision),
            y: view.center[1].toFixed(precision)
        })
    }
}