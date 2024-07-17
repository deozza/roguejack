import { browser } from "$app/environment";

export 	const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const scrollToElement = (id: string) => {
    if(browser) {
        const element = document.getElementById(id);
        element.scrollIntoView({ behavior: 'smooth' });
    }
}