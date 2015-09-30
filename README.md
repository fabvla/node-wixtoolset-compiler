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
wixtoolset-compiler <command> <args>
```

for example, this windows script:

```shell
set wix_dir="C:\Program Files (x86)\WiX Toolset v3.10\bin"
set src_dir="C:\WORKAREA\myproject\build\release"

%wix_dir%\heat.exe dir %src_dir% -srd -dr INSTALLDIR -cg MainComponentGroup -out directory.wxs -ke -sfrag -gg -var var.SourceDir -sreg -scom
%wix_dir%\candle.exe -dversion="1.0.0" -dSourceDir="%src_dir%" *.wxs -o output\ -ext WiXUtilExtension
%wix_dir%\light.exe -o output\installer.msi output\*.wixobj -cultures:en-US -ext WixUIExtension.dll -ext WiXUtilExtension
```

can be replaced with:

```shell
wixtoolset-compiler heat --args="dir C:\WORKAREA\myproject\build\release -srd -dr INSTALLDIR -cg MainComponentGroup -out installer/directory.wxs -ke -sfrag -gg -var var.SourceDir -sreg -scom"
wixtoolset-compiler candle --args="-dversion=1.0.0 -dSourceDir=C:\WORKAREA\myproject\build\release installer/*.wxs -o C:\WORKAREA\myproject\build\release\ -ext WiXUtilExtension"
wixtoolset-compiler light --args="-o C:\WORKAREA\myproject\build\installer\Setup.msi C:\WORKAREA\myproject\build\release\*.wixobj -cultures:it-IT -ext WixUIExtension.dll -ext WiXUtilExtension"
```


##### Node JS

```shell
npm install wixtoolset-compiler
```

### Sample Installer

We also add sample WXS files for generate a full features (basic) installer with also shortcuts on Desktop. These sources are placed inside `sample-installer` directory and can be used as starting point for your MSI installer.
There's also the basic BMP images for Banner and Dialog.
These example is based on the great work of [auth0 nodejs-msi](https://github.com/auth0/nodejs-msi).

1) Copy the `sample-installer` directory inside your project and rename it to `installer`.
2) Edit files inside directory, specifically installer.wxs with your proper configurations. 

#### How to Compile the sample

Run:

```shell
wixtoolset-compiler heat --args="dir C:\WORKAREA\myproject\build\release -srd -dr INSTALLDIR -cg MainComponentGroup -out installer/directory.wxs -ke -sfrag -gg -var var.SourceDir -sreg -scom"
wixtoolset-compiler candle --args="-dversion=1.0.0 -dSourceDir=C:\WORKAREA\myproject\build\release installer/*.wxs -o C:\WORKAREA\myproject\build\release\ -ext WiXUtilExtension"
wixtoolset-compiler light --args="-o C:\WORKAREA\myproject\build\installer\Setup.msi C:\WORKAREA\myproject\build\release\*.wixobj -cultures:it-IT -ext WixUIExtension.dll -ext WiXUtilExtension"
```

### Credits

Thanks to WiX Toolset Team for the amazing work on WiX.
Thanks also to [felicienfrancois](https://github.com/felicienfrancois/node-innosetup-compiler) for the NodeJS Innosetup compiler.
