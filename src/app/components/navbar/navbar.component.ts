import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  counter = 0;
  constructor(private counterService: CounterService) {}
  ngOnInit(){
    this.counterService.getCounter().subscribe((count)=>this.counter=count);
  }
}
