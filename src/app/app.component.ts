import { Component, ViewContainerRef } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { AppConfig } from './services/config.service';
import { Overlay, DialogRef } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';


@Component({
    selector: 'lxd-app',
    templateUrl: 'app.component.html',
})

export class AppComponent {
    title: string = 'LXD WebUI';

    constructor(private appConfig: AppConfig,
                private toastyService: ToastyService,
                public overlay: Overlay, 
                public vcRef: ViewContainerRef,
                public modal: Modal) {
        appConfig.onChangeConfig.subscribe((e: any) => this.checkLxdConnection());
        this.checkLxdConnection();
    }

    checkLxdConnection() {
        this.appConfig.checkLxdConnection()
            .subscribe(
                result => this.onSuccessConnection(result),
                err => this.onFailConnection(err)
            );
    }

    onSuccessConnection(result: any) {
        if (result.metadata && result.metadata.auth !== 'trusted') {
            this.openModalUntrusted();
            return;
        }
        this.toastyService.success({
            title: 'Connection established',
            timeout: 3000,
            theme: 'material'
        });
    }

    onFailConnection(error: string) {
        switch (error) {
            case 'net::ERR_INSECURE_RESPONSE' :
                this.openModalConnectionFailed();
                break;
            case 'NOT_LXD_SERVER' :
                this.openModalNotLxdServer();
                break;
            default :
                console.log(error);
                break;
        }
    }

    onModalConnectionOpened(dialog: DialogRef<any>) {
        dialog.result.then(
            this.onModalConnectionClickOk.bind(this),
            this.onModalConnectionClickCancel.bind(this
            ));
    }

    onModalConnectionClickOk(result: any) {
        this.checkLxdConnection();
        return;
    }

    onModalConnectionClickCancel() {

    }

    openModalConnectionFailed() {
        this.modal.confirm()
            .size('lg')
            .showClose(false)
            .isBlocking(true)
            .title('Security certificate is not trusted or Server isn\'t accessible')
            .message(`
<ul>
    <li>Please check if server is accessible</li>
    <li>Please check and validate the certificate</li>
    <li>Please check the configuration of <b>Access-Control-Allow-Origin</b></li>
    <li>Please check this URL : 
        <a href="${this.appConfig.lxdServerUrl}" target="_blank">${this.appConfig.lxdServerUrl}</a>
    </li>
</ul>
                    `)
            .open()
            .then(this.onModalConnectionOpened.bind(this));
    }

    openModalNotLxdServer() {
        this.modal.alert()
            .size('lg')
            .showClose(false)
            .isBlocking(true)
            .title('This is not a LXD server')
            .message(`
<ul>
    <li>The URL API response don't match with LXD response</li>
    <li>Please check this URL : 
        <a href="${this.appConfig.lxdServerUrl}" target="_blank">${this.appConfig.lxdServerUrl}</a>
    </li>
</ul>
                    `)
            .open();
    }

    openModalUntrusted() {
        this.modal.alert()
            .size('lg')
            .showClose(false)
            .isBlocking(true)
            .title('You arn\'t authenticated')
            .message(`
<ul>
    <li>Please check your client certificate in your brower</li>
    <li>Please check your client certificate is allowed in LXD server with :
        <code>lxc config trust list</code>
    </li>
</ul>
                    `)
            .open();
    }


}
