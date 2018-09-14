import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../services/global';
import { Song } from '../models/song';

@Component({
    selector : 'player',
    template:
        `
        <div class="album-image">
            <span *ngIf="song.album">
                <img id="playImageAlbum" src="{{url + 'get-image-album/' + song.album.img}}">
            </span>
            <span *ngIf="!song.album">
                <img id="playImageAlbum" src="assets/images/default.jpg">
            </span>
        </div>

        <div class="audioFile">
            <p>Reproduciendo</p>
            <span id="playSongTitle">
                {{song.name}}
            </span>
            <span id="playSongArtist">
                <span *ngIf="song.album && song.album.artist">
                    {{song.album.artist.name}}
                </span>
            </span>
        </div>

        <audio controls id="player">
            <source id="mp3Source" src="{{url + 'get-file-song/' + song.file}}" type="audio/mpeg">
            Tu navegador no es compatible
        </audio>
        `
})
export class PlayerComponent implements OnInit {
    public url : string;
    public song;

    constructor(

    ) {
        this.url = GLOBAL.url;
        this.song = new Song(0,'','','','');
    }
    
    ngOnInit(): void {
        console.log('Player cargado');
    }

}