import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {ServiceService} from '../../Service/service.service';

class Departamento {
  idDepartment: string;
  nameDepartment: string;
}

@Component({
  selector: 'app-listar-d',
  templateUrl: './listar-d.component.html',
  styleUrls: ['./listar-d.component.css']
})
export class ListarDComponent implements OnInit {

  departamentos: any;
  departamento: Departamento;
  nuevoDepartamento: Departamento;

  constructor(private service: ServiceService) {
  }

  ngOnInit(): void {
    this.obtenerDepartamentos();
    this.departamento = new Departamento();
    this.nuevoDepartamento = new Departamento();
  }

  obtenerDepartamentos() {
    this.service.getAll().subscribe(res => {
      this.departamentos = res;
    });
  }

  guardar() {
    console.log(this.nuevoDepartamento.nameDepartment);
    this.service.create(this.nuevoDepartamento).subscribe(res => {
      if (res) {
        this.obtenerDepartamentos();
      }
    });
  }

  editar(id) {
    console.log(id);
    this.service.update(this.nuevoDepartamento).subscribe(res => {
      this.nuevoDepartamento = res;
      this.obtenerDepartamentos();
    });
  }

  obtener(id) {
    this.service.get(id).subscribe(res => {
      this.nuevoDepartamento = res;
    });
  }

  eliminar(idDepartment) {
    Swal.fire({
      title: '¿Seguro que desea eliminar la persona?',
      text: '¡No podra deshacer esta acción!',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminarlo'
    }).then((res) => {
      if (res.value) {
        // tslint:disable-next-line:no-shadowed-variable
        this.service.delete(idDepartment).subscribe(res => {
          Swal.fire(
            'Eliminado',
            'La persona ha sido eliminado exitosamente',
            'success'
          );
          this.obtenerDepartamentos();
        });
      }
    });
  }
}
