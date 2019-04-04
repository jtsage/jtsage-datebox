# DateBox Versioning

This document explains how to change the version of DateBox.


## To bump the version and release

--> edit package.json

```json
{
  "version" : "SemVer"
}
```
___OR___

```sh
# npm version [<new verson>|major|minor|patch]
```

__THEN__

```sh
# npm run latest
# npm run release
```

--> __COMMIT AND TAG POINT ARE HERE__

--> __RESTART THE BUILDER SERVER, IF IT'S RUNNING!__

 - The builderServer caches the source files - for the length of it's runtime. If you don't restart it, you will still be building old versions.


## To up a version of a framework:

--> edit package.json

```json
  "supports" : {
    "npm-package-name" : "version"
  }
```

## To add a framework:

--> edit package.json

```json
  "supports" : {
    "npm-package-name-of-framework" : "version-supported"
  },
  "prettyMap": {
    "filename-without-extension-in-modes-folder" : "Pretty Name of Framework"
  }
```


