import { test, expect } from '@playwright/test';
import 'dotenv/config'

test('Wikipedia API login', async ({ request }) => {
    const API_URL = 'https://en.wikipedia.org/w/api.php';

    const username = process.env.WIKI_BOT_USERNAME ?? '';
    const password = process.env.WIKI_BOT_PASSWORD ?? '';

    console.log('USER length:', username.length);
    console.log('PASS length:', password.length);
    expect(username.length).toBeGreaterThan(0);
    expect(password.length).toBeGreaterThan(0);

    const tokenResp = await request.get(API_URL, {

        params: {
            action: 'query',
            meta: 'tokens',
            type: 'login',
            format: 'json',
        },
    });
    expect(tokenResp.ok()).toBeTruthy();

    const tokenJson = await tokenResp.json();

    const loginToken = tokenJson?.query?.tokens?.logintoken;
    expect(loginToken).toBeTruthy();

    const loginResp = await request.post(API_URL, {
        form: {
            action: 'login',
            lgname: username,
            lgpassword: password,
            lgtoken: loginToken,
            format: 'json',
        },
    });

    expect(loginResp.ok()).toBeTruthy();

    const loginJson = await loginResp.json();
    console.log('LOGIN RESPONSE:', JSON.stringify(loginJson, null, 2));

    expect(loginJson?.login?.result).toBe('Success')


})