# Kate Scripts

Collection of scripts compatible with Kate (KTextEditor, KatePart).
[Installation instructions](https://docs.kde.org/stable5/en/kate/katepart/dev-scripting.html#:~:text=Command%20line%20scripts%20are%20located) can be found in the manual.

## Color Convert

**Best used with the [Color Picker](https://docs.kde.org/stable5/en/kate/kate/kate-application-plugin-colorpicker.html) Plugin!**

This script adds the following commands to the *Editing* menu:

* `colorToHex` Convert Colors to Hex
* `colorToRgb` Convert Colors to RGB
* `colorToDec` Convert Colors to Decimal

It can be used to convert between CSS RGB color values.

Text | `colorToHex`
---- | ------------
rgba(128, 128, 128, 0.2) | #80808033
rgb( 128 , 16 , 64 ) | #801040
51,102,153 | #336699

Text | `colorToRgb` | `colorToDec`
---- | ------------ | ------------
#80808033 | rgba(128,128,128,0.2) | 128,128,128,0.2
#801040 | rgb(128,16,64) | 128,16,64
#369 | rgb(51,102,153) | 51,102,153
