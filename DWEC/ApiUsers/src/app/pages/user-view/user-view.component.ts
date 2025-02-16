import { Component, inject } from '@angular/core';
import { BotoneraComponent } from '../../components/botonera/botonera.component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [BotoneraComponent, CommonModule],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {

  userService = inject(UserService);
  activatedRoute = inject(ActivatedRoute);

  miUser!: User;
  

  ngOnInit(): void{
    this.activatedRoute.params.subscribe(async (params: any) => {
      let _id: string = params._id as string;

      try {
        this.miUser = await this.userService.getById(_id);
        console.log("Usuario recibido:", this.miUser);
      } catch (err) {
        console.log("Error al llamar a la API: " + err);
      }
    });
  }

  

}
