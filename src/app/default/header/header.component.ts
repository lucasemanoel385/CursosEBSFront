import { Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnChanges{


  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  #router = inject(Router);

  searchHeader(search: HTMLInputElement) {
    this.#router.navigate(['courses/list/', search.value])
    search.value = '';
    this.#router.getCurrentNavigation();
    console.log(this.#router.getCurrentNavigation()?.extractedUrl.toString());
  } 

  login() {
    return true ? localStorage.getItem('tokenJWT') : false;
  }

  loginName() {
    return true ? localStorage.getItem('name') : false;
  }

  logout() {
    localStorage.clear();
  }

  instructorOrAdmin() {
    const token = jwtDecode(localStorage.getItem("tokenJWT") as string) as any;
    return true ? token.role === "ROLE_INSTRUCTOR" || token.role === "ROLE_ADMIN" : false;
  }

  menuDisplay(menu: HTMLUListElement, image: HTMLImageElement) {
    if(menu.style.display == 'flex') {
      menu.style.display = 'none'
      image.setAttribute("class", "reverseRotate");
    } else {
      menu.style.display = 'flex';
      image.setAttribute("class", "rotateArroww")
    }

  }
}
