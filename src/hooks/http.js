import { useContext, useState } from 'react';
import { GlobalContext } from '../context/global-context';

const useHttp = props => {
    const { veil } = useContext(GlobalContext);
    const { alerter } = useContext(GlobalContext);

    const sendRequest = async ({ url, method = 'GET', body, headers }) => {
        let dataJson = {};

        veil.setVeil();

        try {

        	//throw new Error('copón');

            const response = await fetch(url, {
                method,
                ...body ? { body: JSON.stringify(body) } : {},
                ...headers ? { headers } : {}
            });
            const { ok, status, type } = response;
            dataJson = await response.json();

            console.table({ ok, status, type });
        } catch ({message}) {
            alerter.setAlerter({ active: true, text: message, type: 'error' })
        }

        veil.setVeil(false);

        alerter.setAlerter({ active: true, text: JSON.stringify(dataJson, null, 2), type: 'success' })

        return dataJson;
    }

    const [data, setData] = useState({});

    const GET = async (url, headers) => setData(await sendRequest({ url, headers }));
    const POST = async (url, body, headers) => setData(await sendRequest({ url, method: 'POST', body, headers }));
    const PUT = async (url, body, headers) => setData(await sendRequest({ url, method: 'PUT', body, headers }));
    const DELETE = async (url, headers) => setData(await sendRequest({ url, method: 'DELETE', headers }));

    return {
        data,
        GET,
        POST,
        PUT,
        DELETE
    }
}

export default useHttp;