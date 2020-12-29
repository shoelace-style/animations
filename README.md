# Shoelace Animations

Your favorite [animate.css](https://animate.style/) effects available as ES modules for use with the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API).

- 🏆 Nearly 100 quality animations
- 🚚 Works with CDNs
- 🌲 Fully tree-shakeable

This module was built for [Shoelace](https://shoelace.style/), but it works well as a stand-alone library too!

## Installation

```bash
npm install @shoelace-style/animations
```

## Usage

Importing all animations:

```js
import * as animations from '@shoelace-style/animations';
```

Importing individual animations:

```js
import { bounce } from '@shoelace-style/animations';
```

Animating an element:

```html
<div style="display: block; width: 100px; height: 100px; background: tomato;"></div>

<script>
  import { bounce } from '@shoelace-style/animations';

  const el = document.querySelector('div');

  el.animate(bounce, {
    duration: 1000,
    iterations: Infinity,
    easing: 'linear'
  });
</script>
```

## Developers

This script parses all animation stylesheets found in `node_modules/animate.css` and generates [keyframe objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats) that you can use with the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API). As animations are tweaked and added to animate.css, the keyframes herein will be kept in sync when rerunning the script.

To build the project, run:

```bash
npm run build
```

This will purge and rebuild the `dist` directory.

Please report all bugs and suggestions to [the issue tracker](https://github.com/shoelace-style/animations/issues).