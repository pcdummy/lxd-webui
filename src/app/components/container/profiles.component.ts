import {Component, OnInit} from '@angular/core';
import {Profile} from '../../models/profile';
import {ProfilesService} from '../../services/profiles.service';
import {AppConfig} from '../../services/config.service';
import {ToastyService} from 'ng2-toasty';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'lxd-profiles',
    templateUrl: 'profiles.component.html'
})
export class ProfilesComponent implements OnInit {
    public profiles: Profile[];
    selectedProfile: Profile;

    ngOnInit(): any {
        this.getProfiles();
    }

    constructor(private conf: AppConfig,
                private profilesService: ProfilesService,
                private toastyService: ToastyService) {
        this.conf.onChangeConfig.subscribe( (e: any) => this.getProfiles() );
    }

    onSelect(profile: Profile) {
        // this.router.navigate(['profile', profile.name]);
    }

    public getProfiles(): void {
        this.profilesService.getProfiles()
            .subscribe((forkJoin: Observable<Profile[]>) => {
                    forkJoin.subscribe((profiles: Profile[]) => this.profiles = profiles);
                },
                err => this.toastyService.error(this.getToastyOptions(err)));
    }

    getToastyOptions(message: string = '', title: string = '') {
        return {
            title: title,
            msg: message,
            timeout: 3000,
            theme: 'material'
        };
    }
}
