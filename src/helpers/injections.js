export const injections = {
    disableScrolling: () => {
        document.body.style.overflow = 'hidden';
    },
    enableScrolling: () => {
        document.body.style.overflow = 'scroll';
    },
}