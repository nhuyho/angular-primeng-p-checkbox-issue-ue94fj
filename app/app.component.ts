import { Component } from '@angular/core';
import { GatheringDocumentData } from './data';
import { AfterViewInit, ElementRef } from '@angular/core';
import { Log } from '@angular/core/testing/src/logger';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  tableData = GatheringDocumentData;
  isObjectChecked = [];
  options = {
    percent: 0,
    size: 220,
    lineWidth: 15,
    rotate: 0,
  };
  constructor(private elementRef: ElementRef) {}
  ngOnInit() {
    this.calculatePercent();
  }
  calculatePercent() {
    const el = document.getElementById('graph'); // get canvas
    const canvas = document.getElementById(
      'progress-spinner'
    ) as HTMLCanvasElement;

    const span = document.getElementById('middle-circle');
    span.textContent = this.options.percent + '%';
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.height = this.options.size;
    this.drawBoundCircle(this.options.lineWidth, this.options.percent / 100);
  }
  changeCheckmark(isChecked: boolean, key: string, value: string) {
    const params = {
      id: key,
      name: value,
    };
    if (isChecked) {
      this.isObjectChecked.push(params);
    } else {
      for (let index = 0; index < this.isObjectChecked.length; index++) {
        const element = this.isObjectChecked[index];
        if (element.id === key) {
          this.isObjectChecked.splice(index, 1);
        }
      }
    }

    if (!this.isObjectChecked.length) {
      this.options.percent = 0;
    } else {
      const progress =
        (this.isObjectChecked.length * 100) / this.tableData.length;
      this.options.percent = Number(Math.round(progress));
    }
    this.calculatePercent();
  }

  drawBoundCircle(lineWidth, percent) {
    const canvas = document.getElementById(
      'progress-spinner'
    ) as HTMLCanvasElement;

    const ctx = canvas.getContext('2d');
    ctx.translate(this.options.size / 2, this.options.size / 2); // change center
    ctx.rotate((-1 / 2 + this.options.rotate / 180) * Math.PI); // rotate -90 deg
    const radius = (200 - this.options.lineWidth) / 2;
    percent = Math.min(Math.max(0, percent || 1), 1);
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
    ctx.strokeStyle = this.options.percent < 90 ? '#f87f14' : '#2a9c65';

    if (this.options.percent === 0) {
      ctx.strokeStyle = '#ffffff';
    }
    ctx.lineCap = 'round';
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
}
