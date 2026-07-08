export default class BasePage {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    protected async open(path: string): Promise<void> {
        await browser.url(path);
    }
}