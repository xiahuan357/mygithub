define(function() {

	var eventSplitter = /\s+/

	function Events() {
	}

	Events.prototype.on = function(events, callback, context) {
		//				seajs.log("绑定"+events);
		var cache, event, list
		if (!callback)
			return this

		cache = this.__events || (this.__events = {})
		events = events.split(eventSplitter)

		while (event = events.shift()) {
			list = cache[event] || (cache[event] = [])
			list.push(callback, context)
		}

		return this
	}

	Events.prototype.off = function(events, callback, context) {
		var cache, event, list, i

		if (!(cache = this.__events))
			return this
		if (!(events || callback || context)) {
			delete this.__events
			return this
		}

		events = events ? events.split(eventSplitter) : keys(cache)

		while (event = events.shift()) {
			list = cache[event]
			if (!list)
				continue

			if (!(callback || context)) {
				delete cache[event]
				continue
			}

			for (i = list.length - 2; i >= 0; i -= 2) {
				if (!(callback && list[i] !== callback || context
						&& list[i + 1] !== context)) {
					list.splice(i, 2)
				}
			}
		}

		return this
	}

	Events.prototype.trigger = function(events) {
		//				seajs.log("触发"+events);
		var cache, event, all, list, i, len, rest = [], args
		if (!(cache = this.__events))
			return this

		events = events.split(eventSplitter)

		for (i = 1, len = arguments.length; i < len; i++) {
			rest[i - 1] = arguments[i]
		}

		while (event = events.shift()) {

			if (all = cache.all)
				all = all.slice()
			if (list = cache[event])
				list = list.slice()

			if (list) {
				for (i = 0, len = list.length; i < len; i += 2) {
					list[i].apply(list[i + 1] || this, rest)
				}
			}

			if (all) {
				args = [ event ].concat(rest)
				for (i = 0, len = all.length; i < len; i += 2) {
					all[i].apply(all[i + 1] || this, args)
				}
			}
		}

		return this
	}

	Events.mixTo = function(receiver) {
		receiver = receiver.prototype || receiver
		var proto = Events.prototype

		for ( var p in proto) {
			if (proto.hasOwnProperty(p)) {
				receiver[p] = proto[p]
			}
		}
	}

	var keys = Object.keys

	if (!keys) {
		keys = function(o) {
			var result = []

			for ( var name in o) {
				if (o.hasOwnProperty(name)) {
					result.push(name)
				}
			}
			return result
		}
	}

	return Events
})
