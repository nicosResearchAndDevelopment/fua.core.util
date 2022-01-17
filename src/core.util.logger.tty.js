const
    {
        FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM
    }       = process.env,
    isTTY   = process.stdout && process.stdout.isTTY,
    enabled = !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== 'dumb' && (FORCE_COLOR != null && FORCE_COLOR !== '0' || isTTY);

/**
 * @param {number} x
 * @param {number} y
 * @returns {function(string): string}
 * @see https://chrisyeh96.github.io/2020/03/28/terminal-colors.html Chris Yeh - Terminal Colors
 * @see https://github.com/doowb/ansi-colors/blob/master/index.js doowb - ansi-colors
 * @see https://github.com/lukeed/kleur/blob/master/colors.mjs lukeed - kleur/colors
 */
function _formatter(x, y) {
    const
        rgx   = new RegExp(`\\x1b\\[${y}m`, 'g'),
        open  = `\x1b[${x}m`,
        close = `\x1b[${y}m`;

    return function (txt) {
        if (!(enabled && txt)) return txt;
        if (!txt.includes(close)) return open + txt + close;
        return open + txt.replace(rgx, close + open) + close;
    };
} // _formatter

// modifiers
exports.reset         = _formatter(0, 0);
exports.bold          = _formatter(1, 22);
exports.dim           = _formatter(2, 22);
exports.italic        = _formatter(3, 23);
exports.underline     = _formatter(4, 24);
exports.inverse       = _formatter(7, 27);
exports.hidden        = _formatter(8, 28);
exports.strikethrough = _formatter(9, 29);

// colors
exports.black   = _formatter(30, 39);
exports.red     = _formatter(31, 39);
exports.green   = _formatter(32, 39);
exports.yellow  = _formatter(33, 39);
exports.blue    = _formatter(34, 39);
exports.magenta = _formatter(35, 39);
exports.cyan    = _formatter(36, 39);
exports.white   = _formatter(37, 39);
exports.gray    = _formatter(90, 39);
exports.grey    = _formatter(90, 39);

// background colors
exports.blackBG   = _formatter(40, 49);
exports.redBG     = _formatter(41, 49);
exports.greenBG   = _formatter(42, 49);
exports.yellowBG  = _formatter(43, 49);
exports.blueBG    = _formatter(44, 49);
exports.magentaBG = _formatter(45, 49);
exports.cyanBG    = _formatter(46, 49);
exports.whiteBG   = _formatter(47, 49);

// bright colors
exports.lightBlack   = _formatter(90, 39);
exports.lightRed     = _formatter(91, 39);
exports.lightGreen   = _formatter(92, 39);
exports.lightYellow  = _formatter(93, 39);
exports.lightBlue    = _formatter(94, 39);
exports.lightMagenta = _formatter(95, 39);
exports.lightCyan    = _formatter(96, 39);
exports.lightWhite   = _formatter(97, 39);

// bright background colors
exports.lightBlackBG   = _formatter(100, 49);
exports.lightRedBG     = _formatter(101, 49);
exports.lightGreenBG   = _formatter(102, 49);
exports.lightYellowBG  = _formatter(103, 49);
exports.lightBlueBG    = _formatter(104, 49);
exports.lightMagentaBG = _formatter(105, 49);
exports.lightCyanBG    = _formatter(106, 49);
exports.lightWhiteBG   = _formatter(107, 49);

Object.freeze(exports);
// Object.entries(exports).forEach(([name, fn]) => console.log(fn(name)));
