import { Component, ViewChild, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';

import { sleep } from './game/core/infra';
import { Input, Keyboard } from './game/core/infra/inputs';
import { store, setup } from './game/core/infra/data';

import { Loading } from './game/domain/scenarios/loading';
import { Scenario } from './game/domain/scenarios/scenario';
import { Start } from './game/domain/scenarios/start';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  private input: Input = new Keyboard();
  private scenario: Scenario;
  private loadingConfig: any;
  private startConfig: any;
  private context: CanvasRenderingContext2D;

  @ViewChild('game') game;

  constructor() { }

  ngAfterViewInit(): void {
    this.context = this.game.nativeElement.getContext('2d');
    this.initialize();

    $(document).on('changeScenario', this.changeScenario.bind(this));
  }

  private async initialize(): Promise<void> {
    this.input.bind();

    await sleep(1000);
    await store.initialize();
    await setup();
    await sleep(1000);

    this.loadingConfig = await store.get('scenarios', 'loading');
    this.startConfig = await store.get('scenarios', 'start');

    this.changeScenario(null, new Loading(this.loadingConfig, this.context));
    this.scenarioLoop();
    await sleep(3000);

    this.changeScenario(null, new Start(this.startConfig, this.context));
  }

  private scenarioLoop(): void {
    window.requestAnimationFrame(() => this.scenarioLoop());

    this.scenario.updates();
    this.scenario.draw();
  }

  private changeScenario(event: any, newScenario: Scenario): void {
    this.scenario = newScenario;
    this.scenario.start();
  }
}
