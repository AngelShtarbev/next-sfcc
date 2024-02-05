const CryptoJS = require('crypto-js');

const generateCodeVerifier = async () => {
    return generateRandomString(96);
}

const generateRandomString = async (length: any) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

const generateCodeChallenge = async (code_verifier: any)  => {
    return CryptoJS.SHA256(code_verifier);
}

const base64URL = async (verifierStr: any) => {
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

    const response = await fetch(url, {
        method: 'GET',
        headers: headers,
        redirect: 'manual'
    });

    const responseHeaders: any = response.headers;

    switch (response.status) {
        case 200:
            const responseJson = await response.json();
            code = responseJson.code || responseJson.authCode;
            usid = responseJson.usid;
        case 303:
            let headersLocation = responseHeaders.get('Location').split('?');
            let locationParams = headersLocation[1].split('&');
            code = locationParams.pop().substring(5);
            usid = locationParams.pop().substring(5);
    }
    
    return { code, usid, verifier };
};


const getAccessToken = async (authData: any) => {
    const redirectUrl: any = process.env.SFCC_REDIRECT_URL;
    const host: any = process.env.SFCC_HOST;
    const organizationId: any = process.env.SFCC_ORGANIZATIONID;
    const verifier: any = authData.verifier;
    const channelId: any = process.env.SFCC_SITEID;
    const clientId: any = process.env.SFCC_CLIENT_ID;

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

    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: urlencoded,
        redirect: 'manual'
    });

    const responseJson = await response.json();
    return responseJson;
};


const productSearch = async (productSearchConfig: any) => {
    try {
        const authData = await getAuthorize();
        const accessTokenData = await getAccessToken(authData);
        const accessToken = accessTokenData.access_token;
        
        const siteId = process.env.SFCC_SITEID;
        const organizationId = process.env.SFCC_ORGANIZATIONID;
        const host = process.env.SFCC_HOST;
        let url = `${host}/search/shopper-search/v1/organizations/${organizationId}/product-search?siteId=${siteId}&q=${productSearchConfig.searchQuery}`;

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${accessToken}`);

        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
            redirect: 'manual'
        });
        
        const responseJson = await response.json();
        return responseJson.hits !== undefined ? responseJson.hits : [];
    } catch (e) {
        return [];
    }
};

export { productSearch };