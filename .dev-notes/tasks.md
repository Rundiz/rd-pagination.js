## Start development
### Delete built files.
Delete already built files for edit JS and see changes immediately.

#### Automatic method
1. Use command `npm run clean`.
#### Manual method
1. Delete files **assets/js/rd-pagination.min.js**, **assets/js/rd-pagination.min.js.map**, **assets/js/rd-pagination.umd.js**.




## Finish development

### Update class constructor's options.
1. From main folder in this repo. Use command `npm run jsdoc2md -- "assets/js/rd-pagination.js" > "rd-pagination.js-doc.md"`
2. Copy  markdown to readme file below `### Options` section.

### Build
#### Automatic method
1. Use command `npm run build`.
#### Manual method
1. Use command `npm run rollup -- -c` to build JS file in UMD format.  
    This format will be use in unit tests.
2. Use command `npm run terser -- "assets/js/rd-pagination.js" --compress --comments --source-map "url='rd-pagination.min.js.map'" --output "assets/js/rd-pagination.min.js"` to minify JS file for use in web browser.

On any method you use, always run test command `npm run test`.

### Publish

To publish this package to node package manager please follow instruction.

1. Update the version number in **package.json** and **assets/js/rd-pagination.js**.
2. Make sure that you processed the **Build** step. Also check the **Update class constructor's options** either.
2. Commit and push to Github.
3. run `npm publish` command.