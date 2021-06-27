async function mirrorpoll_get() {
    const res = await fetch( './state_get.php', {method: 'get'})
    if(res.ok){
        const r = await res.json();
        if( r.success ){
            return JSON.parse( r.state );
        }
    } else {
        console.error(res);
    }
}
async function mirrorpoll_set(state, callback = () => {}) {
    const res = await fetch( './state_set.php', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            state: JSON.stringify( state ),
        })
    });
    if(res.ok){
        const r = await res.json();
        if( r.success ){
            return r;
        }
    } else {
        console.error(res);
    }
}

function random_hex( len ) {

	//	let r = '#' + Math.floor( Math.random() * 16777215 ).toString(16)
	let s = ''
	
	for( let i = 0; i < len; i++){
		s += Math.floor( Math.random() * 16 ).toString( 16 )
	}
	
	return s

}

