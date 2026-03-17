import { test, expect } from "@playwright/test";
import { title } from "node:process";

const REPO_PATH = "MarcosMatt/Pruebas_PW_Scripts";
const REPO_NAME = "MarcosMatt/Ejemplo";
const API_BASE_URL = "https://api.github.com/";

test.beforeAll(async ({ request }) => {
    const response = await request.post('user/repos', {
        data: {
            name: REPO_NAME,
            description: 'Repositorio para pruebas de API con Playwright',
            private: false,
        },
        headers: {
            'Authorization': `token ${process.env.API_TOKEN}`,
            'Accept': 'application/vnd.github+json',
        }
    });

    expect(response.status()).toBeTruthy();
})


test('Se puede crear un issue en el repo de GitHub', async ({ request }) => {
    
    const newIssue = await request.post(`${API_BASE_URL}repos/${REPO_PATH}/issues`, {
        data: {
            title: "[Bug] Reporte 1",
            body: "Este es un issue creado desde Playwright para documemntar un bug"
        },
        headers: {
            'Authorization': `token ${process.env.API_TOKEN}`,
            'Accept': 'application/vnd.github+json',
        }
    });
    
    expect(newIssue.status()).toBe(201);

    const issue = await request.get(`${API_BASE_URL}repos/${REPO_PATH}/issues`,{
        headers: {
            'Authorization': `token ${process.env.API_TOKEN}`,
            'Accept': 'application/vnd.github+json',
        }
    });
    expect(issue.ok()).toBeTruthy();
    expect(await issue.json()).toContainEqual(expect.objectContaining({
        title: "[Bug] Reporte 1",
        body: "Este es un issue creado desde Playwright para documemntar un bug"
    }));
})

test('Puedo crear un request feature', async ({ request }) => {
    const newIssue = await request.post(`${API_BASE_URL}repos/${REPO_PATH}/issues`, {
        data: {
            title: "[Feature] Reporte 1",
            body: "Este es un issue creado desde Playwright para documentar una nueva feature",
        },
        headers: {
            'Authorization': `token ${process.env.API_TOKEN}`,
            'Accept': 'application/vnd.github+json',
        }
    });

    expect(newIssue.status()).toBe(201);
    
    const issue = await request.get(`${API_BASE_URL}repos/${REPO_PATH}/issues`, {
        headers: {
            'Authorization': `token ${process.env.API_TOKEN}`,
            'Accept': 'application/vnd.github+json',
        }
    });
    expect(issue.ok()).toBeTruthy();
    expect(await issue.json()).toContainEqual(expect.objectContaining({
        title: "[Feature] Reporte 1",
        body: "Este es un issue creado desde Playwright para documentar una nueva feature",
    }));
});

test.afterAll(async ({ request }) => {
    const response = await request.delete(`repos/${REPO_NAME}`, {
        headers: {
            'Authorization': `token ${process.env.API_TOKEN}`,
            'Accept': 'application/vnd.github+json',
        }
    });

    expect(response.status()).toBe(204);
})

