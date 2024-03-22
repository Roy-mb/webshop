import { Component} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
englishButtonEnabled = true;
dutchButtonEnabled = false;

  changeLanguage(){
    this.englishButtonEnabled = !this.englishButtonEnabled;
    this.dutchButtonEnabled = !this.dutchButtonEnabled;
  }

}
