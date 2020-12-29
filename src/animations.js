const css = require('css');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const __basedir = path.dirname(__dirname);

module.exports = function () {
  return new Promise(resolve => {
    const animations = [];

    // Loop through all of the animation source files from animate.css
    glob(path.join(path.join(__basedir, 'node_modules/animate.css/source'), '**/*/*.css'), null, (err, files) => {
      files.map(file => {
        const name = path.parse(file).name;
        const group = path.parse(path.dirname(file)).name;
        const source = fs.readFileSync(file, 'utf8');
        const parsed = css.parse(source);

        // Look for keyframe rules
        parsed.stylesheet.rules.map(rule => {
          if (rule.type !== 'keyframes') return;

          let keyframes = [];
          rule.keyframes.map(keyframe => {
            keyframe.values.map(value => {
              let offset = value;
              if (offset === 'from') offset = '0%';
              if (offset === 'to') offset = '100%';
              if (offset.indexOf('%') > -1) offset = parseFloat(offset) / 100;

              const properties = { offset };

              keyframe.declarations.map(declaration => {
                let property = declaration.property;
                if (property === 'animation-timing-function') property = 'easing';
                properties[property] = declaration.value;
              });

              keyframes.push(properties);
            });
          });

          // Sort by offset
          keyframes = keyframes.sort((a, b) => {
            return parseFloat(a.offset) > parseFloat(b.offset) ? 1 : -1;
          });

          animations.push({
            group,
            name: rule.name,
            keyframes: keyframes
          });
        });
      });

      resolve(animations);
    });
  });
};
