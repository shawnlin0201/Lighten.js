<h1 align="center"> Lighten.js</h1>
<p align="center">Lighten.js is a lighten web library, focus on boost <strong>one</strong> page application develop exprience.</p>



## Getting Started
[Download](https://raw.githubusercontent.com/shawnlin0201/Lighten.js/master/lighten.js) `lighten.js` and import script file above the end of `head`.

```html
<html>
  <head>
    <!-- import lighten.js here -->
    <script src='./lighten.js'></script>
  </head>
  <body>
    <!-- your script here-->
    <script src='./index.js'></script>
  </body>
</html>
```

Use `new` operator to create Lighten Instance and setup your data.
```js
let lighten = new Lighten({
  data: data
})
```

## Usage
### Definite render target
Use `l-target-app` attr to definite your render root.
```html
<div l-target-app>
  <h1> {{ title }} </h1>
</div>
```
### Template Syntax
Use double curly quote to get instance data.
```html
<h1> {{ title }} </h1>
```
```js
// your script file
let data = {
  title: 'Hello, Lighten!'
}

let lighten = new Lighten({
  data: data
})
```
And It will be render like this.
```html
<h1> Hello, Lighten! </h1>
```

### Directive
You can add directive to your html element to enhance it feature.
- `l-alert`
- `l-show`

#### l-alert
This directive will alert its value when mouse clicking.
```html
<button l-alert=''>alert</button>
```

#### l-show
This directive will trigger show/hidden via its <boolean>value .
```html
<button l-show=''>alert</button>
```
  
### Binding data
If you want to binding instance data to directive, add `:` front to directive and it will try get instance data.
```html
<div :l-show="isLightboxOpening"> {{ title }} </div>
```

```js
let lighten = new Lighten({
  data: {
    title: 'Hello, Lighten!'
    isLightboxOpening: false
  }
})
```
It will be render like this.
```html
<div style='display:none;'> Hello, Lighten! </div>
```
## Changelog
Version change detail are documented in the [release page.](https://github.com/shawnlin0201/Lighten.js/releases)

## License

[MIT](https://github.com/shawnlin0201/Lighten.js/blob/master/LICENSE)

Copyright (c) 2020-present, Shawn Lin
