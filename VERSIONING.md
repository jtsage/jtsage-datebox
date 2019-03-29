# DateBox Versioning

This document explains how to change the version of DateBox.


## To bump the version and release

--> edit package.json

```json
{
  "version" : "SemVer"
}
```

```sh
# npm run prerelease
```

--> commit and tag here

```sh
# npm run latest
# npm run release
```

--> __RESTART THE BUILDER SERVER, IF IT'S RUNNING!__


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
