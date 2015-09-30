# node-wixtoolset
Node wrapper for WiX Toolset, to Creating MSI setup files using WXS files

This is a simple node wrapper of [WiX Toolset](http://wixtoolset.org/), and it's inspired by [node-innosetup-compiler](https://github.com/felicienfrancois/node-innosetup-compiler)

### OS Support

##### Windows

Works natively on windows

##### Linux & Mac OS X

Not supported yet.

### Usage

```shell
wixtoolset <command> <args>

examples:
wixtoolset heat dir ./sources -srd -dr INSTALLDIR -cg MainComponentGroup -out directory.wxs -ke -sfrag -gg -var var.SourceDir -sreg -scom
wixtoolset candle -dversion="1.0.0" -dSourceDir=./sources *.wxs -o .\build\ -ext WiXUtilExtension
wixtoolset light -o .\build\Setup.msi .\build\*.wixobj -cultures:en-US -ext WixUIExtension.dll -ext WiXUtilExtension
```

##### Node JS

```shell
npm install wixtoolset
```

### Credits

Thanks to WiX Toolset Team for the amazing work on WiX.
Thanks also to [felicienfrancois](https://github.com/felicienfrancois/node-innosetup-compiler) for the NodeJS Innosetup compiler.
