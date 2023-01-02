import axios from 'axios'

interface GetKitProps {
    searchTerm: string,
    controller?: AbortController,
    exactMatch?: boolean,
    count?: number,
    pageNumber?: number
}

const getKits = async (props: GetKitProps) => {
    try {
        const options = props.controller ? { signal: props.controller.signal } : {};
        if (props.exactMatch == undefined) {
            props.exactMatch = false;
        }
        const response = await axios.get(
            `http://localhost:3001/api/search/${props.searchTerm}?fuzzy=${!props.exactMatch}${props.count ? `&count=${props.count}` : ''}${props.pageNumber ? `&pagenum=${props.pageNumber}` : ''}`,
            options,
        );
        if (response.status === 200) {
            return response.data
        }
        // normally would log an error here
        return []
    } catch (err) {
        // normally would do some logging, maybe also a toast notification.
        return []
    }

}

export default { getKits }