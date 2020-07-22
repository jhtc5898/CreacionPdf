import { Component, OnInit } from '@angular/core';
import { EmpleosService } from '../../services/empleos.service';
import { Observable, Subscriber } from 'rxjs';
import { Router } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform } from '@ionic/angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-lista-empleos',
  templateUrl: './lista-empleos.page.html',
  styleUrls: ['./lista-empleos.page.scss'],
})
export class ListaEmpleosPage implements OnInit {

  
  pdfObj = null;
  empleados: Observable<any[]>
  cosas: any = new Array ()
  constructor(private empleosService: EmpleosService,
     public router:Router,private file: File, private fileOpener: FileOpener,
     private plt: Platform
     ) { }
 ngOnInit() 
  {
    this.empleados= this.empleosService.getEmpleos()
    this.cosas.push({id:10,nombre:"John"})
  }

  imprimir()
  {
    console.log("Para Imprimir")
    //this.pdfGenerator.fromURL(url, options).then(base64String => console.log(base64String));
  }

  showEmpleo(id:any){
    this.router.navigate([`empleo/${id}`])
  }

  actualizarEmpleo(id:any)
  {
    this.router.navigate([`actualizar-empleo/${id}`])
  }


  showCrearEmpleo()
  {
    this.router.navigate(["crear-empleo"])
  }

  createPdf(datos:any) {
    console.log(datos)
    var docDefinition = {
      content: [
        { text: 'REMINDER', style: 'header' },
        { text: new Date().toTimeString(), alignment: 'right' },
 
        { text: 'Titulo Empleos:', style: 'subheader' },
        { text: datos.titulo },
 
        { text: 'Descripcion y Salario:', style: 'subheader' }, datos.descripcion ,
 
        { text: datos.salario , style: 'story', margin: [0, 20, 0, 20] },
 
        {
          ul: [
            'Cosas Extra:',
            'Cosas Extra:',
            'Cosas Extra:',
          ]
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }
 





   
  
  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
 
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      this.pdfObj.download();
    }
  }
}
