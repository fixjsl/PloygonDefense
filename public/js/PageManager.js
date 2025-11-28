class PageManager{
    constructor(){
        
    }
    changePage(prev, next){
        prev.CloseScreen()
        next.StartScreen()
    }

}

const PM = new PageManager()

export default PM