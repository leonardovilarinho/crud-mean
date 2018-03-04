import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PersonDetailsComponent } from './people/person-details/person-details.component';
import { PersonListComponent } from './people/person-list/person-list.component';
import { PersonFormComponent } from './people/person-form/person-form.component';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    PersonDetailsComponent,
    PersonListComponent,
    PersonFormComponent
  ],
  imports: [BrowserModule, HttpModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
