const POLL_TIME = 3000;

// -------------------
// How/when the state get and set happen...
setInterval(() => {
    mirrorpoll_get(state => {
        deserialize_state(state);
    });
}, POLL_TIME);

// -------------------

function serialize_state() {
    let state = {
        controls: []
    };
    const controls = document.querySelectorAll('.control');
    for( const control of controls ) {
        // state.controls.push( control.classList.contains('selected') );
        state.controls.push({
        	uuid: control.getAttribute('data-uuid'),
        	selected: control.classList.contains('selected'),
        	garbage: control.getAttribute('data-garbage-collected'),
        	modified: control.getAttribute('data-modified')
	    })
    }
    console.log('serialized ', controls.length )
    return state;
}

function deserialize_state(state) { 

	// display legible state
    const readout = document.querySelector('#readout');
    readout.innerText = ( JSON.stringify( state, false, 4 ) );

    // handle incoming state
    const existing_controls = document.querySelectorAll('.control')
    for( const data of state.controls ){
    	let found, ele_modified
    	for( const element of existing_controls ){
    		if( element.getAttribute('data-uuid') === data.uuid ){
    			found = true
    			// check if server data is more recent:
    			ele_modified = element.getAttribute('data-modified')
    			if( data.modified > ele_modified ){
    				if( data.garbage && data.garbage > 0 ){
    					element.classList.add('trash')
    				}
    			}
    			break;
    		}
    	}
    	// || ( !ele_modified || ele_modified < data.modified )
    	if( !found ){
    		const control = build_control( data )
    		document.body.appendChild( control )
    	}
    }

    // parse DOM state
    // for( const element of existing_controls ){
    // 	let found, modified
    // 	for( const data of state.controls ){
    // 		if( data.uuid === element.getAttribute('data-uuid')){
    // 			found = true
    // 			modified = data.modified
    // 		}
    // 	}
    // }

}



const build_control = data => {

	console.log( data )

	data = data || {}

	const control = document.createElement('div')
	control.classList.add('control')

	if( data.garbage && data.garbage > 0 ) control.classList.add('trash')
	control.setAttribute('data-uuid', data.uuid || random_hex(6) )
	control.setAttribute('data-modified', data.modified || Date.now() )
    control.addEventListener('click', () => {
        control.classList.toggle('selected');
        control.setAttribute('data-modified', Date.now() )
        mirrorpoll_set(serialize_state());
    })

    const remove = document.createElement('div')
    remove.classList.add('remove')
    remove.innerHTML = 'x'
    remove.addEventListener('click', () => {
    	const garbage = Number( control.getAttribute('data-garbage-collected') || 1 )
    	control.setAttribute('data-garbage-collected', garbage )
    	control.classList.add('trash')
    })
    control.appendChild( remove )

    return control

}




const builder = document.createElement('div')
builder.id = 'builder'
builder.innerText = 'add button'
builder.addEventListener('click', () => {
	document.body.appendChild( build_control() )
})
document.body.appendChild( builder )