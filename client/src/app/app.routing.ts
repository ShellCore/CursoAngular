import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { UserEditComponent } from './components/user-edit.component';
import { ArtistListComponent } from './components/artist-list.component';
import { HomeComponent } from './components/home.component';
import { ArtistAddComponent } from './components/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit.component';

const appRoutes : Routes = [
    {path : '', component : HomeComponent},
    {path : 'artists/:page', component : ArtistListComponent},
    {path : 'create-artist', component : ArtistAddComponent},
    {path : 'update-artist/:id', component : ArtistEditComponent},
    {path : 'my-data', component : UserEditComponent},
    {path : '**', component : HomeComponent},
];

export const appRoutingProviders: any[] = [];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);
