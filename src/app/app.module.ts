import { PersonService } from './people/person.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PersonListComponent } from './people/person-list/person-list.component';
import { PersonFormComponent } from './people/person-form/person-form.component';
import { HttpModule } from '@angular/http';
import { PhoneMaskDirective } from './directives/phone-mask.directive';

@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    PersonFormComponent,
    PhoneMaskDirective
  ],
  imports: [BrowserModule, HttpModule, FormsModule],
  providers: [PersonService],
  bootstrap: [AppComponent]
})
export class AppModule {}
