import React, {useEffect, useState} from 'react';
import axios from 'axios';

export function Home() {
    const [names, setNames] = useState([]);


    useEffect(() => {
        try {
            const fetchData = async () => {
                const result = await axios(
                    'http://localhost:8080/names'
                );
                setNames(result.data)
            };

            fetchData();
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <div className={'home-container'}>
            <h1>Hello ...</h1>
                {
                    names.map(name =>
                        <div className={'name-card'} key={name.id}>
                            <h3>{name.name}</h3>
                            <p>{name.age}</p>
                        </div>)
                }
        </div>
    )
}
