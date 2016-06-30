'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slideTemplate = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SlideErrors = require('./SlideErrors');

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _pretty = require('pretty');

var _pretty2 = _interopRequireDefault(_pretty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_marked2.default.setOptions({
  renderer: new _marked2.default.Renderer(),
  gfm: true
});

var slideTemplate = exports.slideTemplate = _handlebars2.default.compile('<section class="slide">{{{ content }}}</section>');

var Slide = function () {
  function Slide(object) {
    _classCallCheck(this, Slide);

    if (!(_lodash2.default.isString(object.content) && _lodash2.default.isPlainObject(object.meta))) {
      throw new _SlideErrors.InvalidSlideObjectError();
    }
    this.content = object.content.trim();
    this._meta = object.meta;
    this.title = _lodash2.default.isEmpty(this._meta.title) ? undefined : _lodash2.default.trim(this._meta.title);
    this.notes = this._meta.notes;
    this.transition = this._meta.transition;
    this.transition_speed = this._meta.transition_speed;
  }
  //
  // attributes:
  // - title
  // - cover_slide: true
  // - notes
  // - transition
  // - background:
  //     color:
  //     image:
  //     image-repeat:
  //     video:
  //     video-loop:
  //     video-muted:
  //     iframe:

  _createClass(Slide, [{
    key: 'renderHTML',
    value: function renderHTML() {
      var html = "";
      html += this._HTMLtitle();
      html += (0, _marked2.default)(this.content).trim();
      return html;
    }
  }, {
    key: 'renderSlide',
    value: function renderSlide() {
      return (0, _pretty2.default)(slideTemplate({ content: this.renderHTML() }));
    }
  }, {
    key: 'renderSection',
    value: function renderSection() {}
  }, {
    key: '_render',
    value: function _render(format) {}
  }, {
    key: '_HTMLtitle',
    value: function _HTMLtitle() {
      return _lodash2.default.isEmpty(this.title) ? "" : (0, _marked2.default)('## ' + this.title) + '\n';
    }
  }]);

  return Slide;
}();

exports.default = Slide;