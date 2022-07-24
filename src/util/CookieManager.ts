// 管理cookie
export default class {
    // 清除所有cookie
    public static clear() : void {
        const keys = document.cookie.match(/[^ =;]+(?==)/g)
        const d = new Date()
        d.setTime(-1)
        if (keys) {
            let i = keys.length
            while (i >= 0) {
                document.cookie = `${ keys[i] }=0;expires=${ d.toUTCString() }`
                i -= 1
            }
        }
    }

    // 获取cookie
    public static getItem(key : string) : string {
        const name = `${ key }=`
        const ca = document.cookie.split(';')
        for (let i = 0; i < ca.length; i += 1) {
            let c = ca[i]
            while (c.charAt(0) === ' ') c = c.substring(1)
            if (c.indexOf(name) !== -1) {
                return c.substring(name.length, c.length)
            }
        }
        return ''
    }

    // 删除指定cookie
    public static removeItem(key : string) : void {
        const d = new Date()
        d.setTime(-1)
        const expires = `expires=${ d.toUTCString() };path=/`
        document.cookie = `${ key }=''; ${ expires }`
    }

    // 判断是否存在指定cookie   存在返回true  不存在返回false
    public static hasKey(key : string) : boolean {
        return new RegExp(`(?:^|;\\s*)${ key }\\s*\\=`).test(document.cookie)
    }

    // 设置cookie
    public static setItem(key : string, item : any, keepDays = 720) : void {
        const d = new Date()
        d.setTime(d.getTime() + keepDays * 24 * 60 * 60 * 1000)
        const expires = `expires=${ d.toUTCString() }`
        document.cookie = `${ key }=${ item }; ${ expires }`
    }
}
