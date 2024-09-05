# FloatingUI

The FloatingUI extension implements [Floating UI](https://floating-ui.com) library in MediaWiki.

[Extension:FloatingUI on MediaWiki](https://www.mediawiki.org/wiki/Extension:FloatingUI).

## Usage
This extension is in an early stage of development.

### Loading library
There are several ways to load the library on a given page. Once the library is loaded, it can be accessed through `window.FloatingUIDOM` in Javascript.


To attach the library to a wikipage, put the following wikitext onto the page:

```wikitext
{{#floatingui:}}
```

Or alternatively, you can load the ResourceLoader module in Javascript:
```js
mw.loader.load( 'ext.floatingUI.lib' );
```

### Defining elements
1. Reference element has to have the HTML class `ext-floatingui-reference`.
2. Floating element has to have the HTML class `ext-floatingui-content` and is a direct children of the reference element.

## Requirements
* [MediaWiki](https://www.mediawiki.org) 1.39 or later

## Installation
You can get the extension via Git (specifying FloatingUI as the destination directory):

    git clone https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI.git FloatingUI

Or [download it as zip archive](https://github.com/StarCitizenTools/mediawiki-extensions-FloatingUI/archive/main.zip).

In either case, the "FloatingUI" extension should end up in the "extensions" directory 
of your MediaWiki installation. If you got the zip archive, you will need to put it 
into a directory called FloatingUI.