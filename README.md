# Lightness.js
Lightness.js is a lightness front-end framework.

## Getting Started
[Download](https://raw.githubusercontent.com/shawnlin0201/Lightness.js/master/lightness.js) `lightness.js` and import script file above the end of `head`.

```html
<html>
  <head>
    <!-- import lightness.js here -->
    <script src='./lightness.js'></script>
  </head>
  <body>
    <!-- your script here-->
    <script src='./index.js'></script>
  </body>
</html>
```

Use `new` operator to create Lightness Instance and setup your data.
```js
let lightness = new Lightness({
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
  title: 'Hello, Lightness!'
}

let lightness = new Lightness({
  data: data
})
```
And It will be render like this.
```html
<h1> Hello, Lightness! </h1>
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
let lightness = new Lightness({
  data: {
    title: 'Hello, Lightness!'
    isLightboxOpening: false
  }
})
```
It will be render like this.
```html
<div style='display:none;'> Hello, Lightness! </div>
```

## License

[MIT](https://github.com/shawnlin0201/Lightness.js/blob/master/LICENSE)

Copyright (c) 2020-present, Shawn Lin
