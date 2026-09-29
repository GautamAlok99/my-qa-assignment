import { test, expect } from '@playwright/test';

const BASE_URL = 'https://reqres.in';

test('GET call - verify status 200 and user properties', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/users?page=2`);

    //Verify status 200
    expect(response.status()).toBe(200);
    const responseBody = await response.json();

    //Verify response contains a "data" array
    expect(responseBody).toHaveProperty('data');
    expect(Array.isArray(responseBody.data)).toBeTruthy();

    //Verify that each user block contains property
    for (const user of responseBody.data) {
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('first_name');
        expect(user).toHaveProperty('last_name');
    }
});

test('POST call - verify status 201 and user properties', async ({ request }) => {
    const userPayload = {
        name: 'morpheus',
        job: 'leader',
    };

    const response = await request.post(`${BASE_URL}/api/users`, {
        data: userPayload,
    });

    //Verify status 201
    expect(response.status()).toBe(201);
    const responseBody = await response.json();

    //Verify response
    expect(responseBody.name).toBe(userPayload.name);
    expect(responseBody.job).toBe(userPayload.job);
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('createdAt');
});


