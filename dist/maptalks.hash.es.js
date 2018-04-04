/*!
 * maptalks.hash v0.1.3
 * LICENSE : MIT
 * (c) 2016-2018 maptalks.org
 */
/*!
 * requires maptalks@>=0.31.0 
 */
import { Class, DomUtil, StringUtil } from 'maptalks';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var template = "{zoom}/{pitch}/{bearing}/{x}/{y}";

var Hash = function (_maptalks$Class) {
    _inherits(Hash, _maptalks$Class);

    //@param {object} map
    function Hash(map) {
        _classCallCheck(this, Hash);

        var _this = _possibleConstructorReturn(this, _maptalks$Class.call(this));

        _this._map = map;
        _this._updateing = false;
        _this._view = _this._map.getView();
        _this.bindEvent();
        _this.updateView();

        var hash = _this.viewToHash(_this._view);
        _this.setHash(hash);
        return _this;
    }

    Hash.prototype.bindEvent = function bindEvent() {
        DomUtil.addDomEvent(window, 'hashchange', this.onHashChange, this);
        this._map.on('viewchange', this.onViewChange, this);
    };
    //@param {string} hash


    Hash.prototype.setHash = function setHash(hash) {
        window.location.hash = hash;
    };

    Hash.prototype.getHash = function getHash() {
        return window.location.hash;
    };

    Hash.prototype.getView = function getView() {
        return this._map.getView();
    };

    //@param {object} view


    Hash.prototype.setView = function setView(view) {
        view = Object.assign(this._view, view);
        this._map.setView(view);
    };

    Hash.prototype.updateView = function updateView() {
        var hash = this.getHash(),
            view = this.hashToView(hash);

        if (view) {
            this._map.setView(view);
        }
    };

    Hash.prototype.onHashChange = function onHashChange() {
        console.log('onHashChange');
        if (this._updateing === true) {
            return;
        }
        this.updateView();
        console.log('updateView');
    };

    Hash.prototype.onViewChange = function onViewChange(event) {
        var _this2 = this;

        var hash = this.viewToHash(event.new);
        this._updateing = true;
        this.setHash(hash);

        setTimeout(function () {
            return _this2._updateing = false;
        }, 0);
    };

    //@param {string} hash


    Hash.prototype.hashToView = function hashToView(hash) {
        if (hash.indexOf('#') === 0) {
            hash = hash.substr(1);
        }

        var params = hash.split('/');

        if (params.length !== 5) {
            return false;
        }

        var zoom = params[0],
            pitch = params[1],
            bearing = params[2],
            x = params[3],
            y = params[4];


        zoom = parseInt(zoom);
        pitch = parseInt(pitch);
        bearing = parseInt(bearing);
        x = parseFloat(x);
        y = parseFloat(y);

        if (!isNaN(zoom) && zoom >= 1 && zoom <= 21 && !isNaN(pitch) && pitch >= 0 && pitch <= 90 && !isNaN(bearing) && bearing >= -180 && bearing <= 180 && !isNaN(x) && x >= -180 && x <= 180 && !isNaN(y) && y >= -90 && y <= 90) {
            this.setView({ center: [x, y], zoom: zoom, pitch: pitch, bearing: bearing });
        } else {
            return false;
        }
    };

    //@param {object} view


    Hash.prototype.viewToHash = function viewToHash(view) {
        var precision = Math.max(0, Math.ceil(Math.log(view.zoom) / Math.LN2));

        return StringUtil.replaceVariable(template, {
            zoom: view.zoom,
            pitch: parseInt(view.pitch),
            bearing: parseInt(view.bearing),
            x: view.center[0].toFixed(precision + 2),
            y: view.center[1].toFixed(precision + 2)
        });
    };

    return Hash;
}(Class);

export { Hash };

typeof console !== 'undefined' && console.log('maptalks.hash v0.1.3, requires maptalks@>=0.31.0.');
