import { Component, inject, Input } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-botonera',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './botonera.component.html',
  styleUrl: './botonera.component.css'
})
export class BotoneraComponent {

  UsersService = inject(UserService);
  router = inject(Router);

  @Input() _id: string;
  @Input() parent: string;


  constructor() {
    this._id = "";
    this.parent = "";
  }

  async borrarUser(_id: string) {

    const { isConfirmed } = await Swal.fire({
      title: '¿Está seguro de que quiere eliminar este usuario?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
  
    if (isConfirmed) {
      let response = await this.UsersService.delete(_id);
  
      if (response._id) {
        Swal.fire({
          icon: 'success',
          title: `${response.username} borrado correctamente`,
          showConfirmButton: true,
          timer: 3000
        });
        if (this.parent == 'view') {
            this.router.navigate(['/users']);
        } else if (this.parent == "card") {
          setTimeout(() => {
            location.reload();
          }, 3000);
        }
      }

    }

  }


  
}