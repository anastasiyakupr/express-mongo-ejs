# Express (EJS/SCSS)

## Summary

Express configured to use EJS (via `--view=ejs`) and SCSS (via `--css=sass`), with an `assets` directory instead of `public` as well as a `views/theme` directory for `header.ejs` and `footer.ejs` includes.

### Additional Information

For the `.scss` extension to be processed `indentedSyntax: false` was used along with a prefix blocker `prefix: '/css'` to avoid an extra `/css` placed within the source and destination URLs.