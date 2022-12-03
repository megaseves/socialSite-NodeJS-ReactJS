import React, {useEffect} from 'react';

export function Home() {



    useEffect(() => {
        fetch( 'http://localhost:8080/names')
            .then(response => {
            if (response.ok) {
                return response;
            } else {
                console.log(response.errored);
            }
            })
            .then(res => res.text())
            .then(data => {
                console.log(data);
            });
    }, []);

    return (
        <div className={'home-container'}>
            <h1>Hello bello</h1>

            <div className={'name-card'}>
                <h3>Name</h3>
                <p>Age</p>
            </div>
        </div>
    )
}
