import { useEffect, useState } from 'react';
import axios from 'axios';

const Search = () => {
    const [text, setText] = useState<string>('initial text');

    useEffect(() => {
        getText()
    }, [])

    const getText = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api');
            if (response.status === 200) {
                setText(response.data)
            }
        } catch (err) {
            // do nothing
        }
        
    }

    return <>{text}</>
}

export default Search