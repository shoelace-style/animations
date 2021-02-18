const del = require('del');
const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const mkdirp = require('mkdirp');

const __basedir = path.dirname(__dirname);
const parseAnimations = require('./animations.cjs');
const outputDir = path.join(__basedir, 'dist');
const prettierOptions = {
  parser: 'babel',
  printWidth: 120,
  singleQuote: true,
  trailingComma: 'none'
};

// Cleanup old files
del.sync(outputDir);

// Create the output directories
mkdirp.sync(outputDir);

parseAnimations().then(animations => {
  // Generate animations module
  animations.map(animation => {
    const filename = path.join(outputDir, animation.group, `${animation.name}.js`);
    mkdirp.sync(path.dirname(filename));

    const animationSource = prettier.format(
      `export const ${animation.name} = ${JSON.stringify(animation.keyframes)};`,
      prettierOptions
    );
    fs.writeFileSync(filename, animationSource, 'utf8');
  });

  // Generate animations index
  let animationsIndexSource = '';
  animations.map(animation => (animationsIndexSource += `export * from './${animation.group}/${animation.name}.js';`));
  animationsIndexSource += `export { easings } from './easings/easings.js'`;
  animationsIndexSource = prettier.format(animationsIndexSource, prettierOptions);
  fs.writeFileSync(path.join(outputDir, 'index.js'), animationsIndexSource, 'utf8');
});

// Copy easings.js to dist
mkdirp.sync(path.join(outputDir, 'easings'));
fs.copyFileSync(path.join(__basedir, 'src/easings.js'), path.join(outputDir, 'easings/easings.js'));

// Copy types.d.ts to dist
fs.copyFileSync(path.join(__basedir, 'src/index.d.ts'), path.join(outputDir, 'index.d.ts'));

// Copy animate.css license to dist
fs.copyFileSync(path.join(__basedir, 'node_modules/animate.css/LICENSE'), path.join(outputDir, 'LICENSE'));
