import { Component, inject } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserCardComponent, RouterLink, RouterLinkActive, NgxPaginationModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  arrUsers: User[] = []
  userService = inject(UserService);

  page: number = 1;
  pageSize: number = 8;

  async ngOnInit(): Promise<void> {
    try {
      this.arrUsers = await this.userService.getAllWithPromises();
      console.log('arrUsers:', this.arrUsers);
    }
    catch (err) {
      console.log('Error al conectar a la API: '+err)
    }
    
  }

}
