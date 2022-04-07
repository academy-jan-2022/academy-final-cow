import { HttpClient } from '../HttpClient';
const axios = require('axios');

jest.mock("axios");

const url = 'https://some.url.com'
let matcher = `${url}/?foo=bar&baz=meh`;
const httpClient = new HttpClient();

beforeEach(async () => {
    const list = { data: { name: "banana" }};
    axios.get.mockImplementation(() => Promise.resolve(list));
})

interface MyResult {
    name: string;
}

test('url is called', async () => {
    const result = await httpClient.get<MyResult>(
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