import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ScreenWidth } from '@shared/enums';
import { fromEvent, Observable, of, Subject } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  screen: ScreenWidth = ScreenWidth.DESKTOP;
  private screenChange$ = new Subject<number>();

  get screenInnerWidth$(): Observable<number> {
    return this.screenChange$.asObservable();
  }

  addScreenResizeListener(): void {
    of(window.innerWidth)
      .pipe(
        tap((innerWidth) => this.detectScreen(innerWidth)),
        switchMap(() => fromEvent(window, 'resize')),
        map((event) => (event.target as typeof window).innerWidth),
        tap((innerWidth) => {
          this.detectScreen(innerWidth);
        }),
        untilDestroyed(this)
      )
      .subscribe();
  }

  onReadyStateComplete(): Observable<string> {
    return fromEvent(document, 'readystatechange').pipe(
      map((event: any) => event.target?.readyState),
      filter((state) => state === 'complete')
    );
  }

  private detectScreen(innerWidth: number): void {
    if (innerWidth < ScreenWidth.TABLET) {
      this.screen = ScreenWidth.MOBILE;
    } else if (
      innerWidth >= ScreenWidth.TABLET &&
      innerWidth < ScreenWidth.DESKTOP
    ) {
      this.screen = ScreenWidth.TABLET;
    } else {
      this.screen = ScreenWidth.DESKTOP;
    }

    this.screenChange$.next(innerWidth);
  }
}
