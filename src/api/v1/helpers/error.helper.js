class myError extends Error{
    constructor(data){
        const {message,status,...rest} = data
        super(message);
        this.status = status;
        
        this.info = rest

    }
}
module.exports =  myError;