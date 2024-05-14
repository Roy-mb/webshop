import { Component, OnInit} from '@angular/core';
import { CartService } from '../services/cart.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Product } from '../shared/models/Product';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  constructor(private cartService: CartService, private authService: AuthService, private router: Router){}
  public isLoggedIn: boolean;
  isTextEnlarged: boolean;
  originalFontSize: number;
  firstIncrease: boolean = true;
  firstDecrease: boolean = true;

  ngOnInit(): void {
    this.cartService.$productInCart.subscribe((products: Product[]) => {
      this.checkUserLogin();
    })
  }

  public getTotalAmount(){
    return this.cartService.getTotalAmount();
  }

  public onLogout(){
    this.authService.logOut();
    alert("Succesvol uitgelogd.")
    this.router.navigate(['/']);
    this.cartService.removeAllProductsFromCart();
  }

  public checkUserLogin(){
    this.authService
    .$userIsLoggedIn
    .subscribe((loggedInStatus: boolean) => {
      this.isLoggedIn = loggedInStatus;
    });

  }


  toggleTextSize(): void {
    const allElements = document.querySelectorAll('*');
    if (this.originalFontSize === undefined) {
      this.originalFontSize = parseInt(window.getComputedStyle(document.body).fontSize, 10);
    }

    for (let i = 0; i < allElements.length; i++) {
      let currentFontSize = parseFloat(window.getComputedStyle(allElements[i] as HTMLElement, null).getPropertyValue('font-size'));
      if (!this.isTextEnlarged) {
        if(this.firstIncrease)
          {
            (allElements[i] as HTMLElement).style.fontSize = (currentFontSize + 2.4) + 'px'; 

          }
        else if(!this.firstIncrease){
          (allElements[i] as HTMLElement).style.fontSize = (currentFontSize + 7) + 'px';
        }

      } else {
        console.log(this.firstDecrease);
        
        if(this.firstDecrease)
          {
            // (allElements[i] as HTMLElement).style.fontSize = (currentFontSize - 10) + 'px';
            (allElements[i] as HTMLElement).style.fontSize = Math.max(currentFontSize - 14, this.originalFontSize) + 'px';
          }
        else if(!this.firstDecrease){
          (allElements[i] as HTMLElement).style.fontSize = Math.max(currentFontSize - 7, this.originalFontSize) + 'px';
        }

      }
    }
    if(!this.firstIncrease)
      {
        this.firstDecrease = false;
      }
    this.firstIncrease = false;
    this.isTextEnlarged = !this.isTextEnlarged;
  }
}

