# Express (EJS/SCSS)

## Summary

Express configured to use EJS (via `--view=ejs`) and SCSS (via `--css=sass`), with an `assets` directory instead of `public` as well as a `views/theme` directory for `header.ejs` and `footer.ejs` includes.

### Additional Information

For the `.scss` extension to be processed `indentedSyntax: false` was used along with a prefix blocker `prefix: '/css'` to avoid an extra `/css` placed within the source and destination URLs.

#### Mongo Commands

`show dbs`
Display the databases

`use bookworm`
Specify the database you're going to work with

`show collections`
Shows the document collections for the selected database

`db.users.find()`
Display all the documents in the users collection

`db.users.find().pretty()`
Nicer format for output documents within the shell

`db.users.drop()`
Remove the users collection from the current database
