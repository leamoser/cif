export const injections = {
    //MISC
    disableScrolling: () => {
        document.body.style.overflow = 'hidden';
    },
    enableScrolling: () => {
        document.body.style.overflow = 'scroll';
    }
}