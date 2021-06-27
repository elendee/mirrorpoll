function mirrorpoll_get(callback = () => {}) {
    fetch( './state_get.php', {method: 'get'})
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
    fetch( './state_set.php', {
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

function random_hex( len ) {

	//	let r = '#' + Math.floor( Math.random() * 16777215 ).toString(16)
	let s = ''
	
	for( let i = 0; i < len; i++){
		s += Math.floor( Math.random() * 16 ).toString( 16 )
	}
	
	return s

}

