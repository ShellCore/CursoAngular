import { Component, OnInit } from "@angular/core";

@Component({
    selector : 'home',
    templateUrl : '../views/home.html'
})
export class HomeComponent implements OnInit {
    
    public title : string;

    constructor() {
        this.title = 'Inicio'
    }

    ngOnInit(): void {
        console.log('home.component.ts cargado');
    }

}

