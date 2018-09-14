import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { UserEditComponent } from './components/user-edit.component';
import { ArtistListComponent } from './components/artist-list.component';
import { HomeComponent } from './components/home.component';
import { ArtistAddComponent } from './components/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit.component';
import { ArtistDetailComponent } from './components/artist-detail.component';
import { AlbumAddComponent } from './components/album-add.component';
import { AlbumEditComponent } from './components/album-edit.component';
import { AlbumDetailComponent } from './components/album-detail.component';
import { SongAddComponent } from './components/song-add.component';
import { SongEditComponent } from './components/song-edit.component';

const appRoutes : Routes = [
    {path : '', component : HomeComponent},
    {path : 'artists/:page', component : ArtistListComponent},
    {path : 'create-artist', component : ArtistAddComponent},
    {path : 'update-artist/:id', component : ArtistEditComponent},
    {path : 'artist/:id', component : ArtistDetailComponent},
    {path : 'create-album/:artist', component : AlbumAddComponent},
    {path : 'update-album/:id', component : AlbumEditComponent},
    {path : 'album/:id', component : AlbumDetailComponent},
    {path : 'create-song/:album', component : SongAddComponent},
    {path : 'update-song/:id', component : SongEditComponent},
    {path : 'my-data', component : UserEditComponent},
    {path : '**', component : HomeComponent},
];

export const appRoutingProviders: any[] = [];
export const routing:ModuleWithProviders = RouterModule.forRoot(appRoutes);
