const CryptoJS = require('crypto-js');

const generateCodeVerifier = async () => {
    return generateRandomString(96);
}

const generateRandomString = async (length: number) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

const generateCodeChallenge = async (code_verifier: string)  => {
    return CryptoJS.SHA256(code_verifier);
}

const base64URL = async (verifierStr: string) => {
    return verifierStr.toString(CryptoJS.enc.Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

const getAuthorize = async () => {
    let code: any, usid: any;
    const host = process.env.SFCC_HOST;
    const organizationId = process.env.SFCC_ORGANIZATIONID;
    const redirectUrl = process.env.SFCC_REDIRECT_URL;
    const clientId = process.env.SFCC_CLIENT_ID;
    
    const verifier = await base64URL(await generateCodeVerifier());
    const codeChallenge = await base64URL(await generateCodeChallenge(verifier));

    const url = `${host}/shopper/auth/v1/organizations/${organizationId}/oauth2/authorize?redirect_uri=${redirectUrl}&response_type=code&client_id=${clientId}&hint=guest&code_challenge=${codeChallenge}`;
    
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const requestConfig = {
        method: 'GET',
        headers: headers,
        redirect: 'manual'
    };
    
    const response = await fetch(url, requestConfig);

    switch (response.status) {
        case 200:
            var responseJson = await response.json();
            code = responseJson.code || responseJson.authCode;
            usid = responseJson.usid;
        case 303:
            let location = response.headers.get('Location').split('?');
            let params = location[1].split('&');
            code = params.pop().substring(5);
            usid = params.pop().substring(5);
    }
    
    return { code, usid, verifier };
};


const getAccessToken = async (authData: any) => {
    const redirectUrl = process.env.SFCC_REDIRECT_URL;
    const host = process.env.SFCC_HOST;
    const organizationId = process.env.SFCC_ORGANIZATIONID;
    const verifier = authData.verifier;
    const channelId = process.env.SFCC_SITEID;
    const clientId = process.env.SFCC_CLIENT_ID;

    const url = `${host}/shopper/auth/v1/organizations/${organizationId}/oauth2/token`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const urlencoded = new URLSearchParams();
    urlencoded.append('code', authData.code);
    urlencoded.append('grant_type', 'authorization_code_pkce');
    urlencoded.append('redirect_uri', redirectUrl);
    urlencoded.append('code_verifier', verifier);
    urlencoded.append('channel_id', channelId);
    urlencoded.append('client_id', clientId);
    urlencoded.append('usid', authData.usid);

    const requestConfig = {
        method: 'POST',
        headers: headers,
        body: urlencoded,
        redirect: 'manual'
    };

    const response = await fetch(url, requestConfig);
    const responseJson = await response.json();
    return responseJson;
};


const productSearch = async (searchQuery: string) => {
    const authData = await getAuthorize();
    const accessTokenData = await getAccessToken(authData);
    const accessToken = accessTokenData.access_token;

    const siteId = process.env.SFCC_SITEID;
    const organizationId = process.env.SFCC_ORGANIZATIONID;
    const host = process.env.SFCC_HOST;
    const url = `${host}/search/shopper-search/v1/organizations/${organizationId}/product-search?siteId=${siteId}&q=${searchQuery}`;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${accessToken}`);

    const requestConfig = {
        method: 'GET',
        headers: headers,
        redirect: 'manual'
    };

    const response = await fetch(url, requestConfig);
    const responseJson = await response.json();
    return responseJson.hits;
};

export { productSearch };