function serialize_state() {
    let state = {
        controls: []
    };
    const controls = document.querySelectorAll('.control');
    for( const control of controls ) {
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


export {
	serialize_state,
	deserialize_state,
}