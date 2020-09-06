import { Component } from '@angular/core';
import { interval } from 'rxjs'
import { takeWhile, tap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-electron';
  max = 1;
  current = 0;

  start() {
    const inter = interval(100);

    inter.pipe(
      takeWhile(val => !this.isFinished),
      tap(i => this.current += 0.1)
    ).subscribe();
  }

  finish() {
    this.current = this.max;
  }

  reset() {
    this.current = 0;
  }


  // Getters to prevent NaN errors
  get maxVal() {
    return isNaN(this.max) || this.max < 0.1 ? 0.1 : this.max;
  }

  get currentVal() {
    return isNaN(this.current) || this.current < 0 ? 0 : this.current;
  }

  get isFinished() {
    return this.currentVal >= this.maxVal;
  }
}
