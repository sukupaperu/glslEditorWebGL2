import MenuItem from 'app/ui/MenuItem';
import Modal from './Modal';
import { saveOnServer, createOpenFrameArtwork } from 'app/io/share';

export default class ShareModal extends Modal {
    constructor (CSS_PREFIX, properties) {
        super(CSS_PREFIX, properties);
        this.main = properties.main;

        this.shareURL = new MenuItem(this.el, 'ge_sub_menu', 'Copy URL...', (event) => {
            saveOnServer(this.main, (event) => {
                prompt('Use this url to share your code', 'http://editor.thebookofshaders.com/?log=' + event.name);
                this.removeModal();
            });
        });

        let shareOF = new MenuItem(this.el, 'ge_sub_menu ' + this.getModalClass(), '[o]', (event) => {
            shareOF.el.innerHTML = '[o]... adding to collection';
            saveOnServer(this.main, (event) => {
                createOpenFrameArtwork(this.main, event.name, event.url, (success) => {
                    if (success) {
                        shareOF.el.innerHTML = '[o]... added!';
                    }
                    else {
                        shareOF.el.innerHTML = '[o]... failed :(';
                    }
                    setTimeout(() => {
                        shareOF.el.innerHTML = '[o]';
                        this.removeModal();
                    }, 4000);
                });
            });
        });
    }
}
