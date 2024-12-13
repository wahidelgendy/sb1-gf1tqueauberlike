import { Frame } from '@nativescript/core';

export class NavigationUtil {
  static navigate(page: string, context?: any) {
    Frame.topmost().navigate({
      moduleName: `features/${page}/${page}-page`,
      context
    });
  }

  static goBack() {
    Frame.topmost().goBack();
  }
}