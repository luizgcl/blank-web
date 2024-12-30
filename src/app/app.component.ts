import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  template: `
  <main class="h-screen w-screen flex justify-center items-center p-2">
    <section class="h-full w-full max-w-[1440px]">
      <router-outlet/>
    </section>
  </main>`,
})
export class AppComponent { }
