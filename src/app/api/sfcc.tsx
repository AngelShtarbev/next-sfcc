import { ProductHits, AuthorizeResponse, AuthorizeJson, ProductHit, GetAccessToken, ProductSearch } from '../types/interface';
const CryptoJS = require('crypto-js');

const generateCodeVerifier = async (): Promise<string> => {
    return generateRandomString(96);
};

const generateRandomString = async (length: number): Promise<string> => {
    let text: string = '';
    const possible: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i: number = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const generateCodeChallenge = async (code_verifier: string): Promise<string>  => {
    return CryptoJS.SHA256(code_verifier);
};

const base64URL = async (verifierStr: any): Promise<string> => {
    return verifierStr.toString(CryptoJS.enc.Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
};

const getAuthorize = async (): Promise<GetAccessToken> => {
    let code: string = '', usid: string = '';
    const host: string = process.env.SFCC_HOST ? process.env.SFCC_HOST : '';
    const organizationId: string = process.env.SFCC_ORGANIZATIONID ? process.env.SFCC_ORGANIZATIONID : '';
    const redirectUrl: string = process.env.SFCC_REDIRECT_URL ? process.env.SFCC_REDIRECT_URL : '';
    const clientId: string = process.env.SFCC_CLIENT_ID ? process.env.SFCC_CLIENT_ID : '';
    
    const verifier: string = await base64URL(await generateCodeVerifier());
    const codeChallenge: string = await base64URL(await generateCodeChallenge(verifier));

    const url: string = `${host}/shopper/auth/v1/organizations/${organizationId}/oauth2/authorize?redirect_uri=${redirectUrl}&response_type=code&client_id=${clientId}&hint=guest&code_challenge=${codeChallenge}`;
    
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const response: AuthorizeResponse = await fetch(url, {
        method: 'GET',
        headers: headers,
        redirect: 'manual'
    });

    switch (response.status) {
        case 200:
            const responseJson: AuthorizeJson = await response.json();
            code = responseJson.code || responseJson.authCode;
            usid = responseJson.usid;
        case 303:
            const responseHeaders = response.headers;
            let headersLocation = responseHeaders.get('Location').split('?');
            let locationParams = headersLocation[1].split('&');
            code = locationParams.pop().substring(5);
            usid = locationParams.pop().substring(5);
    }
    
    return { verifier, code, usid };
};


const getAccessToken = async (authData: GetAccessToken): Promise<any> => {
    const redirectUrl: string = process.env.SFCC_REDIRECT_URL ? process.env.SFCC_REDIRECT_URL : '';
    const host: string = process.env.SFCC_HOST ? process.env.SFCC_HOST : '';
    const organizationId: string = process.env.SFCC_ORGANIZATIONID ? process.env.SFCC_ORGANIZATIONID : '';
    const channelId: string = process.env.SFCC_SITEID ? process.env.SFCC_SITEID : '';
    const clientId: string = process.env.SFCC_CLIENT_ID ? process.env.SFCC_CLIENT_ID : '';
    const verifier: string = authData.verifier;

    const url: string = `${host}/shopper/auth/v1/organizations/${organizationId}/oauth2/token`;
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const urlencoded: URLSearchParams = new URLSearchParams();
    urlencoded.append('code', authData.code);
    urlencoded.append('grant_type', 'authorization_code_pkce');
    urlencoded.append('redirect_uri', redirectUrl);
    urlencoded.append('code_verifier', verifier);
    urlencoded.append('channel_id', channelId);
    urlencoded.append('client_id', clientId);
    urlencoded.append('usid', authData.usid);

    const response: Response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: urlencoded,
        redirect: 'manual'
    });

    const responseJson: any = await response.json();
    return responseJson;
};


const productSearch = async (productSearchConfig: ProductSearch): Promise<Array<object>> => {
    try {
        const authData: GetAccessToken = await getAuthorize();
        const accessTokenData: any = await getAccessToken(authData);
        const accessToken: string = accessTokenData.access_token;
        
        const siteId: string = process.env.SFCC_SITEID ? process.env.SFCC_SITEID : '';
        const organizationId: string = process.env.SFCC_ORGANIZATIONID ? process.env.SFCC_ORGANIZATIONID : '';
        const host: string = process.env.SFCC_HOST ? process.env.SFCC_HOST : '';
        let url: string = `${host}/search/shopper-search/v1/organizations/${organizationId}/product-search?siteId=${siteId}&q=${productSearchConfig.searchQuery}`;

        if (productSearchConfig.refinements !== '') {
            url += `&refine=${productSearchConfig.refinements}`;
        }

        const headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${accessToken}`);

        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
            redirect: 'manual'
        });
        
        const responseJson: ProductHits = await response.json();
        const responseJsonHits: [ProductHit] = responseJson.hits;
        return responseJsonHits !== undefined ? responseJsonHits : [];
    } catch (e) {
        // console.error(e);
        return [];
    }
};

export { productSearch };