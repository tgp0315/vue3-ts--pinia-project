import mitt from 'mitt'
import type { Emitter, EventType } from 'mitt'

export const emitter: Emitter<Record<EventType, unknown>> = mitt()
