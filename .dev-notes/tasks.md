## Start development

### Update class constructor's options.
1. From main folder in this repo. Use command `npm run jsdoc2md -- "assets/js/rd-pagination.js" > "rd-pagination.js-doc.md"`
2. Copy  markdown to readme file below `### Options` section.

### Minify JS
Use this command: `npm run terser -- "assets/js/rd-pagination.js" --compress --comments --source-map "url='../assets/js/rd-pagination.min.js.map'" --output "assets/js/rd-pagination.min.js"`.  
And then run test command `npm run test`.
-----

### Publish

To publish this package to node package manager please follow instruction.

1. Update the version number in **package.json** and **assets/js/rd-pagination.js**.
2. Commit and push to Github.
3. run `npm publish` command.