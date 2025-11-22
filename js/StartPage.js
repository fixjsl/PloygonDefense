

function Init(){

    document.body.innerHTML = ''

    const StartPage = document.createElement('div');

    const Title = document.createElement('h1');
    Title.textContent = 'Ploygon Defense'

    const StartButton = document.createElement('button');

    const EditorButton = document.createElement('button')

    StartPage.id = 'startPage'

    StartButton.className = 'startPagebutton'
    EditorButton.className = 'startPagebutton'

    StartPage.append(
        Title,
        StartButton,
        EditorButton
    )


    document.body.appendChild(StartPage)

}


addEventListener('DOMContentLoaded' , ()=>{
    Init()
})






