import { NgModule }  from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { HomeComponent }  from './home/home.component';
import { BrandIdentityComponent }  from './brand-identity/brand-identity.component';
import { DigitalMarketingComponent }  from './digital-marketing/digital-marketing.component';
import { MobileAppDevelopmentComponent } from './mobile-app-development/mobile-app-development.component';
import { PageNotFoundComponent } from './404/404.component';

const routes: Routes = [
	{path: '', redirectTo: '/index', pathMatch: 'full'},
	{path: 'index', component: HomeComponent},
	{path: 'brand-identity', component: BrandIdentityComponent},
	{path: 'digital-marketing', component: DigitalMarketingComponent},
	{path: 'mobile-app-development', component: MobileAppDevelopmentComponent},
	{path: '**', component: PageNotFoundComponent}
];

@NgModule ({
	imports : [
		RouterModule.forRoot(routes)
	],
	exports : [
		RouterModule
	]
})

export class AppRoutingModule {};
export const AppRoutingComponents = [
	HomeComponent,
	BrandIdentityComponent,
	DigitalMarketingComponent,
	MobileAppDevelopmentComponent
];