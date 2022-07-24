export default class {
    private requestLimit : boolean //当前请求是否受限制
    private requestLimitTime : number  //请求限制时间片。单位ms,表示该时间片下只能请求一次

    constructor(requestLimitTime : number = 1000) {
        this.requestLimit = false
        if (requestLimitTime <= 0) {
            throw new Error('requestLimitTime < 0 ! ! !')
        }
        this.requestLimitTime = requestLimitTime
    }

    public LimitCall(method : Function) : boolean {
        let callSucceed = false
        if (!this.requestLimit) {
            method()
            callSucceed = this.requestLimit = true
            setTimeout(() => {
                this.requestLimit = false
            }, this.requestLimitTime)
        }
        return callSucceed
    }

    public LimitCallTest() : boolean {
        let callSucceed = false
        if (!this.requestLimit) {
            callSucceed = this.requestLimit = true
            setTimeout(() => {
                this.requestLimit = false
            }, this.requestLimitTime)
        }
        return callSucceed
    }


}
