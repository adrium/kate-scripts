var katescript = {
	"revision": 1,
	"kate-version": "5.0",
	"functions": ["colorToHex", "colorToRgb", "colorToDec"],
	"actions": [
		{   "function": "colorToHex",
			"name": "Convert Colors to Hex",
			"category": "Editing",
			"interactive": "false"
		},
		{   "function": "colorToRgb",
			"name": "Convert Colors to RGB",
			"category": "Editing",
			"interactive": "false"
		},
		{   "function": "colorToDec",
			"name": "Convert Colors to Decimal",
			"category": "Editing",
			"interactive": "false"
		}
	]
};

require("../commands/utils.js")

var lithex1 = "([0-9a-f]{1})"
var lithex2 = "([0-9a-f]{2})"
var litdec = "([0-9]{1,3})"
var litflt = "(0[.][0-9]+|1|1[.]0+)"
var nonum = "(?![0-9a-z.])"
var comma = " *, *"

var regexHexShort = new RegExp("#" + lithex1 + lithex1 + lithex1 + lithex1 + "?" + nonum, "i")
var regexHexLong = new RegExp("#" + lithex2 + lithex2 + lithex2 + lithex2 + "?" + nonum, "i")
var regexDec = new RegExp("(?:rgba?[(] *)?"
	+ litdec + comma + litdec + comma + litdec + "(?:" + comma + litflt + ")?"
	+ "(?: *[)])?", "i")

function convertHexToRgb(line, fmt)
{
	return line
		.replace(regexHexShort, "#$1$1$2$2$3$3$4$4")
		.replace(regexHexLong, function (m, r, g, b, a) {
			var rgb = [r, g, b, a]
			rgb = rgb.map(function (hex) { return parseInt(hex, 16) })
			rgb[3] = Math.round(1000 * rgb[3] / 255) / 1000
			rgb = a ? rgb : rgb.slice(0, 3)
			return fmt.replace("%a%", a ? "a" : "").replace("%rgb%", rgb.join(","))
		})
}

function convertDecToHex(line)
{
	return line
		.replace(regexDec, function (m, r, g, b, a) {
			var rgb = [r, g, b, a]
			rgb[3] = Math.round(parseFloat(a) * 255)
			rgb = rgb.map(function (dec) { return (parseInt(dec, 10) + 0x100).toString(16).slice(-2) })
			rgb = a ? rgb : rgb.slice(0, 3)
			return "#" + rgb.join("")
		})
}

function colorToHex()
{
	map(function (line) { return convertDecToHex(line) })
}

function colorToRgb()
{
	map(function (line) { return convertHexToRgb(line, "rgb%a%(%rgb%)") })
}

function colorToDec()
{
	map(function (line) { return convertHexToRgb(line, "%rgb%") })
}
