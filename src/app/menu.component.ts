import { Component, Input } from '@angular/core';
import { AppConfig } from './services/config.service';

@Component({
    selector: 'lxd-header',
    templateUrl: 'menu.component.html',
})

export class HeaderComponent {
    public isCollapsed: boolean = true;
    @Input() title: string;

    constructor(private appConfig: AppConfig) {
    }

    get lxdServerUrl(){
        return this.appConfig.lxdServerUrl;
    }

    public onLXDUrl(event: KeyboardEvent) {
        let lxdServerUrl = (<HTMLInputElement>event.target).value;

        // Apply new LXD Server URL into application configuration
        this.appConfig.lxdServerUrl = lxdServerUrl;
    }
}
