import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Ng2CompleterModule } from "ng2-completer";
import { TypeaheadDirective } from './typeahead.directive';
import { GraphComponent } from './graph/graph.component';
import { NodeComponent } from './node/node.component';
import { BoxComponent } from './box/box.component';



@NgModule({
  declarations: [
    AppComponent,
    TypeaheadDirective,
    GraphComponent,
    NodeComponent,
    BoxComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFontAwesomeModule,
    FormsModule,
    Ng2CompleterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
