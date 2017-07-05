import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { AppRoutingComponents } from './app.routing';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './404/404.component';
import { BrandIdentityComponent } from './brand-identity/brand-identity.component';
import { DigitalMarketingComponent } from './digital-marketing/digital-marketing.component';
import { MobileAppDevelopmentComponent } from './mobile-app-development/mobile-app-development.component';
import { CmsDevelopmentComponent } from './cms-development/cms-development.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    BrandIdentityComponent,
    DigitalMarketingComponent,
    MobileAppDevelopmentComponent,
    CmsDevelopmentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
