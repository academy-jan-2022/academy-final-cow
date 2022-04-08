import client from '../HttpClient';
const axios = require('axios');

jest.mock("axios");

const url = 'https://some.url.com'
let matcher = `${url}/?foo=bar&baz=meh`;
let postMatcher = `${url}/get-apple`

beforeEach(async () => {
    const getList = { data: { name: "banana" }};
    const postList = { data: { name: "apple"} }
    axios.get.mockImplementation(() => Promise.resolve(getList));
    axios.post.mockImplementation(() => Promise.resolve(postList));
})

interface MyResult {
    name: string;
}

test('url is called', async () => {
    const result = await client.get<MyResult>(
        {
            url: url,
            queryParams: {
                foo: 'bar',
                baz: 'meh'
            }
        }
    );

    expect(result).toEqual({ name: "banana" });
    expect(axios.get).toHaveBeenCalledWith(matcher);
});

test('post is called', async () => {
    const body = {token: "fake token"};

    const result = await client.post<MyResult>(
        {
            url: postMatcher,
            body,
            headers: {
                token: "token"
            }
        }
    );

    expect(result).toEqual({ name: "apple" });
    expect(axios.post).toHaveBeenCalledWith(postMatcher, body, {headers: {Authorization: "Bearer token"}});
});