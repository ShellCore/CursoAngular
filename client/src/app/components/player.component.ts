import { Component, OnInit } from '@angular/core';
import { GLOBAL } from '../services/global';

@Component({
    selector : 'player',
    template:
        `
            <h1>Player</h1>
        `
})
export class PlayerComponent implements OnInit {
    public url : string;
    public song;

    constructor(

    ) {
        this.url = GLOBAL.url;
    }
    
    ngOnInit(): void {
        console.log('Player cargado');
    }

}