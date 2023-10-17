import Cookies from "js-cookie";

export async function handleAuthSSR(ctx: { req: { headers: { cookie: string; }; }; }) {
    let token = null;
    // if context has request info aka Server Side
    if (ctx.req && ctx.req.headers && ctx.req.headers.cookie) {
        token = ctx.req.headers.cookie.replace(/(?:(?:^|.*;\s*)id_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    }
    else {
        // we dont have request info aka Client Side
        token = Cookies.get('id_token')
    }

    if (!token) {
        return false;
    }else{
        return token;
    }
}