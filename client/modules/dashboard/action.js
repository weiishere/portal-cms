export const HELLO = 'HELLO';

export function hello(content = '') {
    return {
        type: HELLO,
        content,
    };
}

