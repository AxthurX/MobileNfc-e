import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ColorSchemeService {
  private renderer: Renderer2;
  private colorScheme: string;
  // Define prefix for more clear and readable styling classes in scss files
  private colorSchemePrefix = '';

  constructor(rendererFactory: RendererFactory2) {
    // Create new renderer from renderFactory, to make it possible to use renderer2 in a service
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  _setColorScheme(scheme) {
    this.colorScheme = scheme;
    // Save prefers-color-scheme to localStorage
    localStorage.setItem(environment.theme_color_key, scheme);
  }

  _getColorScheme() {
    // Check if any prefers-color-scheme is stored in localStorage
    if (localStorage.getItem(environment.theme_color_key)) {
      // Save prefers-color-scheme from localStorage
      this.colorScheme = localStorage.getItem(environment.theme_color_key);
    } else {
      this.colorScheme = 'light';
      localStorage.setItem(environment.theme_color_key, this.colorScheme);
    }
  }

  load() {
    this._getColorScheme();
    this.update(this.colorScheme);
  }

  update(scheme) {
    this._setColorScheme(scheme);
    // Remove the old color-scheme class
    this.renderer.removeClass(
      document.body,
      this.colorSchemePrefix + (this.colorScheme === 'dark' ? 'light' : 'dark')
    );
    // Add the new / current color-scheme class
    this.renderer.addClass(document.body, this.colorSchemePrefix + scheme);
  }

  currentActive() {
    return this.colorScheme;
  }
}
