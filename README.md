# P5js scripts
This repository contains the collection of p5js codes/sketches that i made. Feel free to use for ur needs!

## Method of setup
P5js on offline works by creating a local server on the directory where the script files are present
the local server can be created using python itself by the command below
> python -m http.server 8080
this is for python3 and refer p5js.org site for python2 if needed.
after starting the server, open a browser and go to "localhost:8080" on addressbar
based on location, where the server was started, it will show either the output from the script
or a list of directories, in which case, navigate to the scripts directory.

in the scripts directory, there will be a folder named "library" like in starField/library/
that containst the library files which is used by javascript to work offline.

for online editor, the following site can be used "editor.p5js.org"

## Matter.js
Matter.js is a javascript library for physics engine. It was downloaded from the official
site https://brm.io/matter-js/index.html
the js file is downloaded and placed in the library/ folder and its entry is updated on
index.html file. Following are few codes that were created using this library
* fallBox_matterJs/
* slideBalls_matterJs/
* balls_Chain/

## saveFrames with custom class function
Previously, i faced issues in saving canvas frames for creating animations in p5.
I tried **createCapture** but it looked quite complex to me. Hence i prepared a
small class function that does the need to me. I named it as *ImageSaver*.
Its a really small class that takes following inputs and create an instance
* image base name (without extension or numerals)
* extension (like 'png' or 'jpg')
* number of numeral spaces to be considered (like 6 '0's as image000000.png)

the created instance can be put inside the draw function and call the "save" subfunction
of the instance to save the canvas image. Since this thing runs on a browser, it is
strongly recommended to enable auto-download for images to prevent poping up for
permission everytime which may ultimately lead to browser crash.
It was tested on firefox and found to be doing its job well.

