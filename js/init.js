import * as settings from './settings.js'
import {
	serialize_state,
	deserialize_state,
} from './serialize.js'
import {
	mirrorpoll_get,
	mirrorpoll_set,
} from './polls.js'
import uuid from './uuid.js'





// -------------------
// How/when the state get and set happen...
let worldUpdate = setInterval(() => {
    mirrorpoll_get(state => {
        deserialize_state(state);
    });
}, settings.POLL_TIME);


for(const controlElement of document.querySelectorAll('.control')) {
	// init uuids
	controlElement.setAttribute('data-uuid', uuid(6) )

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