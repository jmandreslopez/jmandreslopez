import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

// App
import { ConfigService } from '../config/config.service';
import { HelpersService } from '../core/helpers.service';

@Injectable({
    providedIn: 'root'
})
export class SEOService {
    protected description: HTMLMetaElement;
    protected ogTitle: HTMLMetaElement;
    protected ogUrl: HTMLMetaElement;
    protected ogImage: HTMLMetaElement;
    protected ogDescription: HTMLMetaElement;

    constructor(protected title: Title,
                protected meta: Meta,
                protected configService: ConfigService,
                protected helpersService: HelpersService) {
        //
    }

    //****************************************************************************************
    // METHODS
    //****************************************************************************************

    protected getPathFromUrl(url) {
        return url.split(/[?#]/)[0];
    }

    public updateTags(custom?: any) {
        let tags = {
            title: this.configService.getAppTitle(),
            description: this.configService.getAppDescription(),
            url: this.getPathFromUrl(this.helpersService.getLocationURL()),
            image: this.configService.getAppImageUrl(),

            // Open Graph
            type: 'website',
            locale: 'en_US',
            ogDescription: this.configService.getAppDescription(),

            // Twitter
            // twitter: {
            //     site: '',
            // },

            // Custom Tags
            ...custom,
        };

        // HTML Title
        this.title.setTitle(tags.title);
        this.meta.updateTag({ name: 'description', content: tags.description });

        // Open Graph
        this.meta.updateTag({ property: 'og:url', content: tags.url });
        this.meta.updateTag({ property: 'og:title', content: tags.title });
        this.meta.updateTag({ property: 'og:description', content: tags.ogDescription });
        this.meta.updateTag({ property: 'og:image', content: tags.image });
        this.meta.updateTag({ property: 'og:type', content: tags.type });
        this.meta.updateTag({ property: 'og:locale', content: tags.locale });

        // Facebook
        this.meta.updateTag({ property: 'fb:app_id', content: tags.facebook.app_id });

        // Twitter
        this.meta.updateTag({ name: 'twitter:title', content: tags.title });
        this.meta.updateTag({ name: 'twitter:description', content: tags.description });
        this.meta.updateTag({ name: 'twitter:image', content: tags.image });
        this.meta.updateTag({ name: 'twitter:card', content: tags.type });
        this.meta.updateTag({ name: 'twitter:site', content: tags.twitter.site });
    }
}
