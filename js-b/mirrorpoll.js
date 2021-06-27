function mirrorpoll_get(callback = () => {}) {
    fetch( '/mirrorpoll/state_get.php', {method: 'get'})
        .then( res => res.json())
        .then( r => {
            if( r.success ){
                const state = JSON.parse( r.state );
                callback(state);
            }else{
                console.error( r );
            }
        })
        .catch( err => {
            console.log( err );
        })
        ;
}
function mirrorpoll_set(state, callback = () => {}) {
    fetch( '/mirrorpoll/state_set.php', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            state: JSON.stringify( state ),
        })
    })
    .then( res => res.json())
    .then( r => {
        if( r.success ) {
            callback(r);
        }else{
            console.error( r )
        }
    }).catch( err => { console.log( err ) })
    .catch( err => { console.log( err )})
}
