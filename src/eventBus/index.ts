type EventHandler = (...param : any[]) => any

class EventBus {
    private events : Map<string, EventHandler[]>

    constructor() {
        this.events = new Map()
    }

    on(name : string, handler : EventHandler) {
        if (this.events.has(name)) {
            // 注册多任务
            const eventFuncs = this.events.get(name)
            eventFuncs!.push(handler)
            this.events.delete(name)
            this.events.set(name, eventFuncs!)
        } else {
            // 注册单任务
            this.events.set(name, [ handler ])
        }
    }

    emit(name : string, ...payload : any[]) {
        if (!this.events.has(name)) return
        // 触发
        const eventFuncs = this.events.get(name)
        eventFuncs!.forEach((func) => {
            func(...payload)
        })
    }
}

interface I_EventBus {
    on : (name : string, handler : EventHandler) => void
    emit : (name : string, ...payload : any) => void
}

export type { I_EventBus }
export default new EventBus()


