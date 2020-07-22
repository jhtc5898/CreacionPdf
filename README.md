# CreacionPdf

Se debe instalar:
  npm install cordova-plugin-file
  npm install @ionic-native/file
  ionic cap sync

  npm install cordova-plugin-file-opener2
  npm install @ionic-native/file-opener
  npm install pdfmake @ionic-native/file-opener @ionic-native/file 
  ionic cap sync



Debemos agregar en el:src/app.module.ts
  import { File } from '@ionic-native/file';
  import { FileOpener } from '@ionic-native/file-opener';

y agregamos el 
 providers: [
    File,
    FileOpener
  ]
  
Para aplicar en android cabiar el import content:
  androidx.core.content.FileProvider
  
 Funcionamiento 
 ![alt text](https://github.com/jhtc5898/CreacionPdf/blob/master/Funcionamiento%20.JPG)

