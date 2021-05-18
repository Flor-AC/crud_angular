import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../../Service/service-e.service';
import Swal from 'sweetalert2';

class Empleado {
  idEmployee: string;
  nameEmployee: string;
  addressEmployee: string;
  phoneNumberEmployee: string;
}

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})

export class ListarComponent implements OnInit {

  empleados: any;
  empleado: Empleado;
  nuevoEmpleado: Empleado;

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.obtenerEmplados();
    this.nuevoEmpleado = new Empleado();
  }

  obtenerEmplados() {
    this.service.getAllE().subscribe(res => {
      this.empleados = res;
    });
  }

  guardar() {
    console.log(this.nuevoEmpleado.nameEmployee);
    this.service.createE(this.nuevoEmpleado).subscribe(res => {
      if (res) {
        this.obtenerEmplados();
      }
    });
  }

  eliminar(idEmployee) {
    Swal.fire({
      title: '¿Seguro que desea eliminar la persona?',
      text: '¡No podra deshacer esta acción!',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminarlo'
    }).then((res) => {
      if (res.value) {
        // tslint:disable-next-line:no-shadowed-variable
        this.service.deleteE(idEmployee).subscribe(res => {
          Swal.fire(
            'Eliminado',
            'La persona ha sido eliminado exitosamente',
            'success'
          );
          this.obtenerEmplados();
        });
      }
    });
  }
}
