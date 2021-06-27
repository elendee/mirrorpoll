const POLL_TIME = 3000;

// -------------------
// How/when the state get and set happen...
setInterval(() => {
    mirrorpoll_get(state => {
        deserialize_state(state);
    });
}, POLL_TIME);

for(const controlElement of document.querySelectorAll('.control')) {
    // controlElement.addEventListener('click', () => {
    //     controlElement.classList.toggle('selected');
    //     mirrorpoll_set(serialize_state());
    // })

	// init uuids
	controlElement.setAttribute('data-uuid', random_hex(6) )

	// bind
    controlElement.addEventListener('click', () => {
        controlElement.classList.toggle('selected');
        controlElement.setAttribute('data-modified', Date.now() )
        mirrorpoll_set(serialize_state());
    })
    controlElement.querySelector('.remove').addEventListener('click', () => {
    	const garbage = Number( controlElement.getAttribute('data-garbage-collected') || 1 )
    	controlElement.setAttribute('data-garbage-collected', garbage )
    	controlElement.classList.add('trash')
    })
}
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
    return state;
}

function deserialize_state(state) { 
    const content = document.querySelector('#sample-content');
    content.innerText = ( JSON.stringify( state, false, 4 ) );
}