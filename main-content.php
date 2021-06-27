<div id='header'>
	<a href='./admin'>admin</a>
</div>

<div id='sample-area'>

    <div id='sample-controls'>
        sample controls:<br>
        <div class='control'>1</div>
        <div class='control'>2</div>
        <div class='control'>3</div>
    </div>

    <div id='sample-content'>
        sample content:
    </div>

</div>

<script>
    const POLL_TIME = 3000;

    // -------------------
    // How/when the state get and set happen...
    setInterval(() => {
        mirrorpoll_get(state => {
            deserialize_state(state);
        });
    }, POLL_TIME);

    for(const controlElement of document.querySelectorAll('.control')) {
        controlElement.addEventListener('click', () => {
            controlElement.classList.toggle('selected');
            mirrorpoll_set(serialize_state());
        })
    }
    // -------------------

    function serialize_state() {
        let state = {
            controls: []
        };
        const controls = document.querySelectorAll('.control');
        for( const control of controls ) {
            state.controls.push( control.classList.contains('selected') );
        }
        return state;
    }

    function deserialize_state(state) { 
        const content = document.querySelector('#sample-content');
        content.innerText = ( JSON.stringify( state, false, 4 ) );
    }
</script>