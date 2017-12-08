/*!
 * maptalks.hash v0.1.0
 * LICENSE : 
 * (c) 2016-2017 maptalks.org
 */
/*!
 * requires maptalks@>=0.31.0 
 */
import { Class, DomUtil, StringUtil } from 'maptalks';

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var defaultOptions = {
    precision: 3,
    template: "{zoom}/{pitch}/{bearing}/{x}/{y}"
};

var Hash = function (_maptalks$Class) {
    _inherits(Hash, _maptalks$Class);

    function Hash(map, options) {
        _classCallCheck(this, Hash);

        options = Object.assign({}, defaultOptions, options);

        var _this = _possibleConstructorReturn(this, _maptalks$Class.call(this, options));

        _this._map = map;
        _this._view = _this._map.getView();
        _this.bindEvent();
        return _this;
    }

    Hash.prototype.bindEvent = function bindEvent() {
        DomUtil.addDomEvent(window, 'hashchange', this.onHashChange, this);
        this._map.on('viewchange', this.onViewChange, this);
    };

    Hash.prototype.setHash = function setHash() {};

    Hash.prototype.getHash = function getHash() {};

    Hash.prototype.getView = function getView() {
        return this._map.getView();
    };

    //@param {object} view


    Hash.prototype.setView = function setView(view) {
        view = Object.assign(this._view, view);
        this._map.setView(view);
    };

    Hash.prototype.onHashChange = function onHashChange(event) {
        if (window.location.hash === this.viewToHash(this.getView())) {
            console.log(111111);
            return;
        }
    };

    Hash.prototype.onViewChange = function onViewChange(event) {
        window.location.hash = this.viewToHash(event.new);
    };

    //@param {object} view


    Hash.prototype.viewToHash = function viewToHash(view) {
        var _options = this.options,
            template = _options.template,
            precision = _options.precision;


        return StringUtil.replaceVariable(template, {
            zoom: view.zoom,
            pitch: Math.floor(view.pitch),
            bearing: Math.floor(view.bearing),
            x: view.center[0].toFixed(precision),
            y: view.center[1].toFixed(precision)
        });
    };

    return Hash;
}(Class);

export { Hash };

typeof console !== 'undefined' && console.log('maptalks.hash v0.1.0, requires maptalks@>=0.31.0.');
