import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { Game } from './game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('game') canvas;
  private game: Game;

  constructor() { }

  ngAfterViewInit(): void {
    const context = this.canvas.nativeElement.getContext('2d');
    this.game = new Game(context);
  }
}
