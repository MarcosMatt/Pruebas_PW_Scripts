import { type Locator, type Page } from "@playwright/test";

export class SandboxPage {

    readonly page: Page;
    readonly PastaCheckBox: Locator;

    constructor(page: Page){
        this.page = page;
        this.PastaCheckBox = page.getByLabel('Pasta 🍝');
    }

    async clickPastaCheckBox(){
        await this.PastaCheckBox.click();
    }
}

