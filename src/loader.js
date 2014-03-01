'use strict';

var $ = require('jquery');

/**
 * All available sizes.
 * @type {Object}
 */
var SIZES = {
    MINI: 'mini',
    SMALL: 'small',
    LARGE: 'large'
};

/**
 * The classname prefix.
 * @type {string}
 */
var CLASS_PREFIX = 'lf-';

/**
 * The default size.
 * @type {string}
 */
var DEFAULT_SIZE = SIZES.SMALL;

/**
 * The DOM string of the loader.
 * @type {string}
 */
var LOADER_DOM = ['<div class="lf-loader">',
    '<div /><div /><div /><div /><div /><div /><div /><div /><div />',
    '</div>'].join('');

/**
 * List of valid string sizes.
 * @type {Array.<string>}
 */
var VALID_SIZES = [SIZES.MINI, SIZES.SMALL, SIZES.LARGE];

/**
 * Creates a loader with a specific size.
 * @param {Element} elem The element to decorate with the loader.
 * @param {string|number=} opt_size The size of the loader. This can be either a
 *    string size `mini, small, large` or a number that is divisible by 3
 *    since the loader is a cube.
 */
module.exports = function (elem, opt_size) {
    var $loader = $(LOADER_DOM);
    $(elem).html('').append($loader);

    if (!opt_size) {
        $loader.addClass(CLASS_PREFIX + DEFAULT_SIZE);
        return;
    }

    if (typeof opt_size === 'string') {
        // Ensure that it's a valid string value.
        if (VALID_SIZES.indexOf(opt_size) === -1) {
            opt_size = DEFAULT_SIZE;
        }

        $loader.addClass(CLASS_PREFIX + opt_size);
        return;
    }

    if (typeof opt_size === 'number') {
        // It must be divisible by 3. If it's not, use the default size.
        if (opt_size % 3 !== 0) {
            $loader.addClass(CLASS_PREFIX + DEFAULT_SIZE);
            return;
        }

        $loader.height(opt_size).width(opt_size);
        return;
    }

    throw opt_size + " is not a valid argument.";
};
