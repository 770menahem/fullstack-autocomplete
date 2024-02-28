import * as request from 'supertest';
import App from '../src/infra/express/app';
import AuthMock from './mocks/auth';
import BlogControllerMock from './mocks/blogController';
import BlogRouter from '../src/infra/express/routers/blog.route';

let server: App;

jest.setTimeout(60000);

describe('Blog Routes', () => {
    beforeAll(async () => {
        const auth = new AuthMock(async (token) => token);
        const blogController = new BlogControllerMock();
        const blogRouter = new BlogRouter(blogController, auth.check);

        server = new App(4770, [blogRouter]);
    });

    afterAll(async () => {
        await server.stop();
    });

    test('GET /api/blogs', async () => {
        const response = await request(server.getApp()).get('/api/blogs').set('Authorization', 'token');
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(2);
        expect(response.body[0]).toEqual({ _id: '1', title: 'test blog', description: 'test blog content', author: '62bbf56b05013d64ec58e7b6' });
    });

    test('GET /api/blogs/:id', async () => {
        const response = await request(server.getApp()).get('/api/blogs/1').set('Authorization', 'token');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ _id: '1', title: 'test blog', description: 'test blog content', author: '62bbf56b05013d64ec58e7b6' });
    });

    test('GET /api/blogs/:id not exist i', async () => {
        const response = await request(server.getApp()).get('/api/blogs/6').set('Authorization', 'token');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Blog not found');
    });

    test('POST /api/blogs', async () => {
        const response = await request(server.getApp())
            .post('/api/blogs')
            .set('Authorization', 'token')
            .send({ title: 'test blog 2', description: 'test blog content 2', author: '62bbf56b05013d64ec58e7b6' });
        expect(response.status).toBe(200);
        expect(response.body.title).toEqual('test blog 2');
        expect(response.body.description).toEqual('test blog content 2');
    });

    test('POST /api/blogs not enough fields', async () => {
        const response = await request(server.getApp()).post('/api/blogs').set('Authorization', 'token').send({ title: 'test blog 2' });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('"body.description" is required. "body.author" is required');
    });

    test('PUT /api/blogs/:id fail to many fields', async () => {
        const response = await request(server.getApp())
            .put('/api/blogs/1')
            .set('Authorization', 'token')
            .send({ title: 'test blog 2', description: 'test blog content 2' });
        expect(response.status).toBe(400);
        expect(response.body.message).toEqual('"body.title" is not allowed');
    });

    test('PUT /api/blogs/:id', async () => {
        const response = await request(server.getApp())
            .put('/api/blogs/1')
            .set('Authorization', 'token')
            .send({ description: 'test blog content 2' });
        expect(response.status).toBe(200);
        expect(response.body.title).toEqual('test blog');
        expect(response.body.description).toEqual('test blog content 2');
    });

    test('PUT /api/blogs/:id not exist', async () => {
        const response = await request(server.getApp())
            .put('/api/blogs/6')
            .set('Authorization', 'token')
            .send({ description: 'test blog content 2' });
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Blog not found');
    });

    test('DELETE /api/blogs/:id', async () => {
        const response = await request(server.getApp()).delete('/api/blogs/todelete').set('Authorization', 'token');
        expect(response.status).toBe(200);
        expect(response.body._id).toBe('todelete');
    });

    test('DELETE /api/blogs/:id not exist', async () => {
        const response = await request(server.getApp()).delete('/api/blogs/6').set('Authorization', 'token');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Blog not found');
    });

    test('GET /api/blogs/author/:userName', async () => {
        const response = await request(server.getApp()).get('/api/blogs/author/62bbf56b05013d64ec58e7b6').set('Authorization', 'token');
        expect(response.status).toBe(200);
        expect(response.body.length).toEqual(2);
    });
});
