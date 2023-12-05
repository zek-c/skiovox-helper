class FullscreenController {
  constructor(element) {
    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  async onKeyDown(event) {
    if (event.key === 'F3') {
      const isFullscreen = await this.getFullscreen();
      this.setFullscreen(!isFullscreen);
    }
  }

  setFullscreen(bool) {
    chrome.windows.getLastFocused((window) => {
      const state = bool
        ? chrome.windows.WindowState.MAXIMIZED
        : chrome.windows.WindowState.NORMAL;
      chrome.windows.update(window.id, { state });
    });
  }

  async getFullscreen() {
    return new Promise((resolve) => {
      chrome.windows.getLastFocused((window) => {
        const bool = window.state === chrome.windows.WindowState.MAXIMIZED;
        resolve(bool);
      });
    });
  }
}

export { FullscreenController };
