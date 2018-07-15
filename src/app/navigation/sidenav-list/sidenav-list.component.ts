import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../auth/service/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() linkClicked = new EventEmitter();

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
  }

}
