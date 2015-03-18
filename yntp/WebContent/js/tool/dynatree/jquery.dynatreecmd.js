/*! jQuery Dynatree Plugin - v1.2.4 - 2013-02-12
 * http://dynatree.googlecode.com/
 * Copyright (c) 2013 Martin Wendt; Licensed MIT, GPL */

define(function(require, exports, module) {
 var $ = require('$');
 jQuery = $;
 require('jquery-ui');
 require('bootstrap-dynatree.css');

function _log(e, t) {
	if (!_canLog)
		return;
	var n = Array.prototype.slice.apply(arguments, [1]), r = new Date, i = r.getHours() + ":" + r.getMinutes() + ":" + r.getSeconds() + "." + r.getMilliseconds();
	n[0] = i + " - " + n[0];
	try {
		switch(e) {
			case"info":
				window.console.info.apply(window.console, n);
				break;
			case"warn":
				window.console.warn.apply(window.console, n);
				break;
			default:
				window.console.log.apply(window.console, n)
		}
	} catch(s) {
		window.console ? s.number === -2146827850 && window.console.log(n.join(", ")) : _canLog = !1
	}
}

function _checkBrowser() {
	function n(e) {
		e = e.toLowerCase();
		var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
		return {
			browser : t[1] || "",
			version : t[2] || "0"
		}
	}

	var e, t;
	return e = n(navigator.userAgent), t = {}, e.browser && (t[e.browser] = !0, t.version = e.version), t.chrome ? t.webkit = !0 : t.webkit && (t.safari = !0), t
}

function logMsg(e) {
	Array.prototype.unshift.apply(arguments, ["debug"]), _log.apply(this, arguments)
}

var _canLog = !0, BROWSER = jQuery.browser || _checkBrowser(), getDynaTreePersistData = null, DTNodeStatus_Error = -1, DTNodeStatus_Loading = 1, DTNodeStatus_Ok = 0;
(function($) {
	function getDtNodeFromElement(e) {
		return alert("getDtNodeFromElement is deprecated"), $.ui.dynatree.getNode(e)
	}

	function noop() {
	}

	function versionCompare(e, t) {
		var n = ("" + e).split("."), r = ("" + t).split("."), i = Math.min(n.length, r.length), s, o, u;
		for ( u = 0; u < i; u++) {
			s = parseInt(n[u], 10), o = parseInt(r[u], 10), isNaN(s) && ( s = n[u]), isNaN(o) && ( o = r[u]);
			if (s == o)
				continue;
			return s > o ? 1 : s < o ? -1 : NaN
		}
		return n.length === r.length ? 0 : n.length < r.length ? -1 : 1
	}

	function _initDragAndDrop(e) {
		var t = e.options.dnd || null;
		t && (t.onDragStart || t.onDrop) && _registerDnd(), t && t.onDragStart && e.$tree.draggable({
			addClasses : !1,
			appendTo : "body",
			containment : !1,
			delay : 0,
			distance : 4,
			revert : !1,
			scroll : !0,
			scrollSpeed : 7,
			scrollSensitivity : 10,
			connectToDynatree : !0,
			helper : function(e) {
				var t = $.ui.dynatree.getNode(e.target);
				return t ? t.tree._onDragEvent("helper", t, null, e, null, null) : "<div></div>"
			},
			start : function(e, t) {
				var n = t.helper.data("dtSourceNode");
				return !!n
			},
			_last : null
		}), t && t.onDrop && e.$tree.droppable({
			addClasses : !1,
			tolerance : "intersect",
			greedy : !1,
			_last : null
		})
	}

	var Class = {
		create : function() {
			return function() {
				this.initialize.apply(this, arguments)
			}
		}
	}, DynaTreeNode = Class.create();
	DynaTreeNode.prototype = {
		initialize : function(e, t, n) {
			this.parent = e, this.tree = t, typeof n == "string" && ( n = {
				title : n
			}), n.key ? n.key = "" + n.key : n.key = "_" + t._nodeCount++, this.data = $.extend({}, $.ui.dynatree.nodedatadefaults, n), this.li = null, this.span = null, this.ul = null, this.childList = null, this._isLoading = !1, this.hasSubSel = !1, this.bExpanded = !1, this.bSelected = !1
		},
		toString : function() {
			return "DynaTreeNode<" + this.data.key + ">: '" + this.data.title + "'"
		},
		toDict : function(e, t) {
			var n = $.extend({}, this.data);
			n.activate = this.tree.activeNode === this, n.focus = this.tree.focusNode === this, n.expand = this.bExpanded, n.select = this.bSelected, t && t(n);
			if (e && this.childList) {
				n.children = [];
				for (var r = 0, i = this.childList.length; r < i; r++)
					n.children.push(this.childList[r].toDict(!0, t))
			} else
				delete n.children;
			return n
		},
		fromDict : function(e) {
			var t = e.children;
			if (t === undefined) {
				this.data = $.extend(this.data, e), this.render();
				return
			}
			e = $.extend({}, e), e.children = undefined, this.data = $.extend(this.data, e), this.removeChildren(), this.addChild(t)
		},
		_getInnerHtml : function() {
			var e = this.tree, t = e.options, n = e.cache, r = this.getLevel(), i = this.data, s = "", o;
			r < t.minExpandLevel ? r > 1 && (s += n.tagConnector) : this.hasChildren() !== !1 ? s += n.tagExpander : s += n.tagConnector, t.checkbox && i.hideCheckbox !== !0 && !i.isStatusNode && (s += n.tagCheckbox), i.icon ? (i.icon.charAt(0) === "/" ? o = i.icon : o = t.imagePath + i.icon, s += "<img src='" + o + "' alt='' />") : i.icon !== !1 && (i.iconClass ? s += "<span class=' " + i.iconClass + "'></span>" : s += n.tagNodeIcon);
			var u = "";
			t.onCustomRender && ( u = t.onCustomRender.call(e, this) || "");
			if (!u) {
				var a = i.tooltip ? ' title="' + i.tooltip.replace(/\"/g, "&quot;") + '"' : "", f = i.href || "#";
				t.noLink || i.noLink ? u = '<span style="display:inline-block;" class="' + t.classNames.title + '"' + a + ">" + i.title + "</span>" : u = '<a href="' + f + '" class="' + t.classNames.title + '"' + a + ">" + i.title + "</a>"
			}
			return s += u, s
		},
		_fixOrder : function() {
			var e = this.childList;
			if (!e || !this.ul)
				return;
			var t = this.ul.firstChild;
			for (var n = 0, r = e.length - 1; n < r; n++) {
				var i = e[n], s = t.dtnode;
				i !== s ? (this.tree.logDebug("_fixOrder: mismatch at index " + n + ": " + i + " != " + s), this.ul.insertBefore(i.li, s.li)) : t = t.nextSibling
			}
		},
		render : function(e, t) {
			var n = this.tree, r = this.parent, i = this.data, s = n.options, o = s.classNames, u = this.isLastSibling(), a = !1;
			if (!r && !this.ul)
				this.li = this.span = null, this.ul = document.createElement("ul"), s.minExpandLevel > 1 ? this.ul.className = o.container + " " + o.noConnector : this.ul.className = o.container;
			else if (r) {
				this.li || ( a = !0, this.li = document.createElement("li"), this.li.dtnode = this, i.key && s.generateIds && (this.li.id = s.idPrefix + i.key), this.span = document.createElement("span"), this.span.className = o.title, this.li.appendChild(this.span), r.ul || (r.ul = document.createElement("ul"), r.ul.style.display = "none", r.li.appendChild(r.ul)), r.ul.appendChild(this.li)), this.span.innerHTML = this._getInnerHtml();
				var f = [];
				f.push(o.node), i.isFolder && f.push(o.folder), this.bExpanded && f.push(o.expanded), this.hasChildren() !== !1 && f.push(o.hasChildren), i.isLazy && this.childList === null && f.push(o.lazy), u && f.push(o.lastsib), this.bSelected && f.push(o.selected), this.hasSubSel && f.push(o.partsel), n.activeNode === this && f.push(o.active), i.addClass && f.push(i.addClass), f.push(o.combinedExpanderPrefix + (this.bExpanded ? "e" : "c") + (i.isLazy && this.childList === null ? "d" : "") + ( u ? "l" : "")), f.push(o.combinedIconPrefix + (this.bExpanded ? "e" : "c") + (i.isFolder ? "f" : "")), this.span.className = f.join(" "), this.li.className = u ? o.lastsib : "", a && s.onCreate && s.onCreate.call(n, this, this.span), s.onRender && s.onRender.call(n, this, this.span)
			}
			if ((this.bExpanded || t === !0) && this.childList) {
				for (var l = 0, c = this.childList.length; l < c; l++)
					this.childList[l].render(!1, t);
				this._fixOrder()
			}
			if (this.ul) {
				var h = this.ul.style.display === "none", p = !!this.bExpanded;
				if (e && s.fx && h === p) {
					var d = s.fx.duration || 200;
					$(this.ul).animate(s.fx, d)
				} else
					this.ul.style.display = this.bExpanded || !r ? "" : "none"
			}
		},
		getKeyPath : function(e) {
			var t = [];
			return this.visitParents(function(e) {
				e.parent && t.unshift(e.data.key)
			}, !e), "/" + t.join(this.tree.options.keyPathSeparator)
		},
		getParent : function() {
			return this.parent
		},
		getChildren : function() {
			return this.hasChildren() === undefined ? undefined : this.childList
		},
		hasChildren : function() {
			if (this.data.isLazy)
				return this.childList === null || this.childList === undefined ? undefined : this.childList.length === 0 ? !1 : this.childList.length === 1 && this.childList[0].isStatusNode() ? undefined : !0;
			return !!this.childList
		},
		isFirstSibling : function() {
			var e = this.parent;
			return !e || e.childList[0] === this
		},
		isLastSibling : function() {
			var e = this.parent;
			return !e || e.childList[e.childList.length - 1] === this
		},
		isLoading : function() {
			return !!this._isLoading
		},
		getPrevSibling : function() {
			if (!this.parent)
				return null;
			var e = this.parent.childList;
			for (var t = 1, n = e.length; t < n; t++)
				if (e[t] === this)
					return e[t - 1];
			return null
		},
		getNextSibling : function() {
			if (!this.parent)
				return null;
			var e = this.parent.childList;
			for (var t = 0, n = e.length - 1; t < n; t++)
				if (e[t] === this)
					return e[t + 1];
			return null
		},
		isStatusNode : function() {
			return this.data.isStatusNode === !0
		},
		isChildOf : function(e) {
			return this.parent && this.parent === e
		},
		isDescendantOf : function(e) {
			if (!e)
				return !1;
			var t = this.parent;
			while (t) {
				if (t === e)
					return !0;
				t = t.parent
			}
			return !1
		},
		countChildren : function() {
			var e = this.childList;
			if (!e)
				return 0;
			var t = e.length;
			for (var n = 0, r = t; n < r; n++) {
				var i = e[n];
				t += i.countChildren()
			}
			return t
		},
		sortChildren : function(e, t) {
			var n = this.childList;
			if (!n)
				return;
			e = e ||
			function(e, t) {
				var n = e.data.title.toLowerCase(), r = t.data.title.toLowerCase();
				return n === r ? 0 : n > r ? 1 : -1
			}, n.sort(e);
			if (t)
				for (var r = 0, i = n.length; r < i; r++)
					n[r].childList && n[r].sortChildren(e, "$norender$");
			t !== "$norender$" && this.render()
		},
		_setStatusNode : function(e) {
			var t = this.childList ? this.childList[0] : null;
			if (!e) {
				if (t && t.isStatusNode()) {
					try {
						this.ul && (this.ul.removeChild(t.li), t.li = null)
					} catch(n) {
					}
					this.childList.length === 1 ? this.childList = [] : this.childList.shift()
				}
			} else
				t ? (e.isStatusNode = !0, e.key = "_statusNode", t.data = e, t.render()) : (e.isStatusNode = !0, e.key = "_statusNode", t = this.addChild(e))
		},
		setLazyNodeStatus : function(e, t) {
			var n = t && t.tooltip ? t.tooltip : null, r = t && t.info ? " (" + t.info + ")" : "";
			switch(e) {
				case DTNodeStatus_Ok:
					this._setStatusNode(null), $(this.span).removeClass(this.tree.options.classNames.nodeLoading), this._isLoading = !1, this.tree.options.autoFocus && (this === this.tree.tnRoot && this.childList && this.childList.length > 0 ? this.childList[0].focus() : this.focus());
					break;
				case DTNodeStatus_Loading:
					this._isLoading = !0, $(this.span).addClass(this.tree.options.classNames.nodeLoading), this.parent || this._setStatusNode({
						title : this.tree.options.strings.loading + r,
						tooltip : n,
						addClass : this.tree.options.classNames.nodeWait
					});
					break;
				case DTNodeStatus_Error:
					this._isLoading = !1, this._setStatusNode({
						title : this.tree.options.strings.loadError + r,
						tooltip : n,
						addClass : this.tree.options.classNames.nodeError
					});
					break;
				default:
					throw "Bad LazyNodeStatus: '" + e + "'."
			}
		},
		_parentList : function(e, t) {
			var n = [], r = t ? this : this.parent;
			while (r)(e || r.parent) && n.unshift(r), r = r.parent;
			return n
		},
		getLevel : function() {
			var e = 0, t = this.parent;
			while (t)e++, t = t.parent;
			return e
		},
		_getTypeForOuterNodeEvent : function(e) {
			var t = this.tree.options.classNames, n = e.target;
			if (n.className.indexOf(t.node) < 0)
				return null;
			var r = e.pageX - n.offsetLeft, i = e.pageY - n.offsetTop;
			for (var s = 0, o = n.childNodes.length; s < o; s++) {
				var u = n.childNodes[s], a = u.offsetLeft - n.offsetLeft, f = u.offsetTop - n.offsetTop, l = u.clientWidth, c = u.clientHeight;
				if (r >= a && r <= a + l && i >= f && i <= f + c) {
					if (u.className == t.title)
						return "title";
					if (u.className == t.expander)
						return "expander";
					if (u.className == t.checkbox)
						return "checkbox";
					if (u.className == t.nodeIcon)
						return "icon"
				}
			}
			return "prefix"
		},
		getEventTargetType : function(e) {
			var t = e && e.target ? e.target.className : "", n = this.tree.options.classNames;
			return t === n.title ? "title" : t === n.expander ? "expander" : t === n.checkbox ? "checkbox" : t === n.nodeIcon ? "icon" : t === n.empty || t === n.vline || t === n.connector ? "prefix" : t.indexOf(n.node) >= 0 ? this._getTypeForOuterNodeEvent(e) : null
		},
		isVisible : function() {
			var e = this._parentList(!0, !1);
			for (var t = 0, n = e.length; t < n; t++)
				if (!e[t].bExpanded)
					return !1;
			return !0
		},
		makeVisible : function() {
			var e = this._parentList(!0, !1);
			for (var t = 0, n = e.length; t < n; t++)
				e[t]._expand(!0)
		},
		focus : function() {
			this.makeVisible();
			try {
				$(this.span).find(">a").focus()
			} catch(e) {
			}
		},
		isFocused : function() {
			return this.tree.tnFocused === this
		},
		_activate : function(e, t) {
			this.tree.logDebug("dtnode._activate(%o, fireEvents=%o) - %o", e, t, this);
			var n = this.tree.options;
			if (this.data.isStatusNode)
				return;
			if (t && n.onQueryActivate && n.onQueryActivate.call(this.tree, e, this) === !1)
				return;
			if (e) {
				if (this.tree.activeNode) {
					if (this.tree.activeNode === this)
						return;
					this.tree.activeNode.deactivate()
				}
				n.activeVisible && this.makeVisible(), this.tree.activeNode = this, n.persist && $.cookie(n.cookieId + "-active", this.data.key, n.cookie), this.tree.persistence.activeKey = this.data.key, $(this.span).addClass(n.classNames.active), t && n.onActivate && n.onActivate.call(this.tree, this)
			} else if (this.tree.activeNode === this) {
				if (n.onQueryActivate && n.onQueryActivate.call(this.tree, !1, this) === !1)
					return;
				$(this.span).removeClass(n.classNames.active), n.persist && $.cookie(n.cookieId + "-active", "", n.cookie), this.tree.persistence.activeKey = null, this.tree.activeNode = null, t && n.onDeactivate && n.onDeactivate.call(this.tree, this)
			}
		},
		activate : function() {
			this._activate(!0, !0)
		},
		activateSilently : function() {
			this._activate(!0, !1)
		},
		deactivate : function() {
			this._activate(!1, !0)
		},
		isActive : function() {
			return this.tree.activeNode === this
		},
		_userActivate : function() {
			var e = !0, t = !1;
			if (this.data.isFolder)
				switch(this.tree.options.clickFolderMode) {
					case 2:
						e = !1, t = !0;
						break;
					case 3:
						e = t = !0
				}
			this.parent === null && ( t = !1), t && (this.toggleExpand(), this.focus()), e && this.activate()
		},
		_setSubSel : function(e) {
			e ? (this.hasSubSel = !0, $(this.span).addClass(this.tree.options.classNames.partsel)) : (this.hasSubSel = !1, $(this.span).removeClass(this.tree.options.classNames.partsel))
		},
		_updatePartSelectionState : function() {
			var e;
			if (!this.hasChildren())
				return e = this.bSelected && !this.data.unselectable && !this.data.isStatusNode, this._setSubSel(!1), e;
			var t, n, r = this.childList, i = !0, s = !0;
			for ( t = 0, n = r.length; t < n; t++) {
				var o = r[t], u = o._updatePartSelectionState();
				u !== !1 && ( s = !1), u !== !0 && ( i = !1)
			}
			return i ? e = !0 : s ? e = !1 : e = undefined, this._setSubSel(e === undefined), this.bSelected = e === !0, e
		},
		_fixSelectionState : function() {
			var e, t, n;
			if (this.bSelected) {
				this.visit(function(e) {
					e.parent._setSubSel(!0), e.data.unselectable || e._select(!0, !1, !1)
				}), e = this.parent;
				while (e) {
					e._setSubSel(!0);
					var r = !0;
					for ( t = 0, n = e.childList.length; t < n; t++) {
						var i = e.childList[t];
						if (!i.bSelected && !i.data.isStatusNode && !i.data.unselectable) {
							r = !1;
							break
						}
					}
					r && e._select(!0, !1, !1), e = e.parent
				}
			} else {
				this._setSubSel(!1), this.visit(function(e) {
					e._setSubSel(!1), e._select(!1, !1, !1)
				}), e = this.parent;
				while (e) {
					e._select(!1, !1, !1);
					var s = !1;
					for ( t = 0, n = e.childList.length; t < n; t++)
						if (e.childList[t].bSelected || e.childList[t].hasSubSel) {
							s = !0;
							break
						}
					e._setSubSel(s), e = e.parent
				}
			}
		},
		_select : function(e, t, n) {
			var r = this.tree.options;
			if (this.data.isStatusNode)
				return;
			if (this.bSelected === e)
				return;
			if (t && r.onQuerySelect && r.onQuerySelect.call(this.tree, e, this) === !1)
				return;
			r.selectMode == 1 && e && this.tree.visit(function(e) {
				if (e.bSelected)
					return e._select(!1, !1, !1), !1
			}), this.bSelected = e, e ? (r.persist && this.tree.persistence.addSelect(this.data.key), $(this.span).addClass(r.classNames.selected), n && r.selectMode === 3 && this._fixSelectionState(), t && r.onSelect && r.onSelect.call(this.tree, !0, this)) : (r.persist && this.tree.persistence.clearSelect(this.data.key), $(this.span).removeClass(r.classNames.selected), n && r.selectMode === 3 && this._fixSelectionState(), t && r.onSelect && r.onSelect.call(this.tree, !1, this))
		},
		select : function(e) {
			return this.data.unselectable ? this.bSelected : this._select(e !== !1, !0, !0)
		},
		toggleSelect : function() {
			return this.select(!this.bSelected)
		},
		isSelected : function() {
			return this.bSelected
		},
		isLazy : function() {
			return !!this.data.isLazy
		},
		_loadContent : function() {
			try {
				var e = this.tree.options;
				this.tree.logDebug("_loadContent: start - %o", this), this.setLazyNodeStatus(DTNodeStatus_Loading), !0 === e.onLazyRead.call(this.tree, this) && (this.setLazyNodeStatus(DTNodeStatus_Ok), this.tree.logDebug("_loadContent: succeeded - %o", this))
			} catch(t) {
				this.tree.logWarning("_loadContent: failed - %o", t), this.setLazyNodeStatus(DTNodeStatus_Error, {
					tooltip : "" + t
				})
			}
		},
		_expand : function(e, t) {
			if (this.bExpanded === e) {
				this.tree.logDebug("dtnode._expand(%o) IGNORED - %o", e, this);
				return
			}
			this.tree.logDebug("dtnode._expand(%o) - %o", e, this);
			var n = this.tree.options;
			if (!e && this.getLevel() < n.minExpandLevel) {
				this.tree.logDebug("dtnode._expand(%o) prevented collapse - %o", e, this);
				return
			}
			if (n.onQueryExpand && n.onQueryExpand.call(this.tree, e, this) === !1)
				return;
			this.bExpanded = e, n.persist && ( e ? this.tree.persistence.addExpand(this.data.key) : this.tree.persistence.clearExpand(this.data.key));
			var r = (!this.data.isLazy || this.childList !== null) && !this._isLoading && !t;
			this.render(r);
			if (this.bExpanded && this.parent && n.autoCollapse) {
				var i = this._parentList(!1, !0);
				for (var s = 0, o = i.length; s < o; s++)
					i[s].collapseSiblings()
			}
			n.activeVisible && this.tree.activeNode && !this.tree.activeNode.isVisible() && this.tree.activeNode.deactivate();
			if (e && this.data.isLazy && this.childList === null && !this._isLoading) {
				this._loadContent();
				return
			}
			n.onExpand && n.onExpand.call(this.tree, e, this)
		},
		isExpanded : function() {
			return this.bExpanded
		},
		expand : function(e) {
			e = e !== !1;
			if (!this.childList && !this.data.isLazy && e)
				return;
			if (this.parent === null && !e)
				return;
			this._expand(e)
		},
		scheduleAction : function(e, t) {
			this.tree.timer && (clearTimeout(this.tree.timer), this.tree.logDebug("clearTimeout(%o)", this.tree.timer));
			var n = this;
			switch(e) {
				case"cancel":
					break;
				case"expand":
					this.tree.timer = setTimeout(function() {
						n.tree.logDebug("setTimeout: trigger expand"), n.expand(!0)
					}, t);
					break;
				case"activate":
					this.tree.timer = setTimeout(function() {
						n.tree.logDebug("setTimeout: trigger activate"), n.activate()
					}, t);
					break;
				default:
					throw "Invalid mode " + e
			}
			this.tree.logDebug("setTimeout(%s, %s): %s", e, t, this.tree.timer)
		},
		toggleExpand : function() {
			this.expand(!this.bExpanded)
		},
		collapseSiblings : function() {
			if (this.parent === null)
				return;
			var e = this.parent.childList;
			for (var t = 0, n = e.length; t < n; t++)
				e[t] !== this && e[t].bExpanded && e[t]._expand(!1)
		},
		_onClick : function(e) {
			var t = this.getEventTargetType(e);
			if (t === "expander")
				this.toggleExpand(), this.focus();
			else if (t === "checkbox")
				this.toggleSelect(), this.focus();
			else {
				this._userActivate();
				var n = this.span.getElementsByTagName("a");
				if (!n[0])
					return !0;
				BROWSER.msie && parseInt(BROWSER.version, 10) < 9 || n[0].focus()
			}
			e.preventDefault()
		},
		_onDblClick : function(e) {
		},
		_onKeydown : function(e) {
			var t = !0, n;
			switch(e.which) {
				case 107:
				case 187:
					this.bExpanded || this.toggleExpand();
					break;
				case 109:
				case 189:
					this.bExpanded && this.toggleExpand();
					break;
				case 32:
					this._userActivate();
					break;
				case 8:
					this.parent && this.parent.focus();
					break;
				case 37:
					this.bExpanded ? (this.toggleExpand(), this.focus()) : this.parent && this.parent.parent && this.parent.focus();
					break;
				case 39:
					!this.bExpanded && (this.childList || this.data.isLazy) ? (this.toggleExpand(), this.focus()) : this.childList && this.childList[0].focus();
					break;
				case 38:
					n = this.getPrevSibling();
					while (n && n.bExpanded && n.childList)
					n = n.childList[n.childList.length - 1];
					!n && this.parent && this.parent.parent && ( n = this.parent), n && n.focus();
					break;
				case 40:
					if (this.bExpanded && this.childList)
						n = this.childList[0];
					else {
						var r = this._parentList(!1, !0);
						for (var i = r.length - 1; i >= 0; i--) {
							n = r[i].getNextSibling();
							if (n)
								break
						}
					}
					n && n.focus();
					break;
				default:
					t = !1
			}
			t && e.preventDefault()
		},
		_onKeypress : function(e) {
		},
		_onFocus : function(e) {
			var t = this.tree.options;
			if (e.type == "blur" || e.type == "focusout")
				t.onBlur && t.onBlur.call(this.tree, this), this.tree.tnFocused && $(this.tree.tnFocused.span).removeClass(t.classNames.focused), this.tree.tnFocused = null, t.persist && $.cookie(t.cookieId + "-focus", "", t.cookie);
			else if (e.type == "focus" || e.type == "focusin")
				this.tree.tnFocused && this.tree.tnFocused !== this && (this.tree.logDebug("dtnode.onFocus: out of sync: curFocus: %o", this.tree.tnFocused), $(this.tree.tnFocused.span).removeClass(t.classNames.focused)), this.tree.tnFocused = this, t.onFocus && t.onFocus.call(this.tree, this), $(this.tree.tnFocused.span).addClass(t.classNames.focused), t.persist && $.cookie(t.cookieId + "-focus", this.data.key, t.cookie)
		},
		visit : function(e, t) {
			var n = !0;
			if (t === !0) {
				n = e(this);
				if (n === !1 || n == "skip")
					return n
			}
			if (this.childList)
				for (var r = 0, i = this.childList.length; r < i; r++) {
					n = this.childList[r].visit(e, !0);
					if (n === !1)
						break
				}
			return n
		},
		visitParents : function(e, t) {
			if (t && e(this) === !1)
				return !1;
			var n = this.parent;
			while (n) {
				if (e(n) === !1)
					return !1;
				n = n.parent
			}
			return !0
		},
		remove : function() {
			if (this === this.tree.root)
				throw "Cannot remove system root";
			return this.parent.removeChild(this)
		},
		removeChild : function(e) {
			var t = this.childList;
			if (t.length == 1) {
				if (e !== t[0])
					throw "removeChild: invalid child";
				return this.removeChildren()
			}
			e === this.tree.activeNode && e.deactivate(), this.tree.options.persist && (e.bSelected && this.tree.persistence.clearSelect(e.data.key), e.bExpanded && this.tree.persistence.clearExpand(e.data.key)), e.removeChildren(!0), this.ul && this.ul.removeChild(e.li);
			for (var n = 0, r = t.length; n < r; n++)
				if (t[n] === e) {
					this.childList.splice(n, 1);
					break
				}
		},
		removeChildren : function(e, t) {
			this.tree.logDebug("%s.removeChildren(%o)", this, e);
			var n = this.tree, r = this.childList;
			if (r) {
				for (var i = 0, s = r.length; i < s; i++) {
					var o = r[i];
					o === n.activeNode && !t && o.deactivate(), this.tree.options.persist && !t && (o.bSelected && this.tree.persistence.clearSelect(o.data.key), o.bExpanded && this.tree.persistence.clearExpand(o.data.key)), o.removeChildren(!0, t), this.ul && $("li", $(this.ul)).remove()
				}
				this.childList = null
			}
			e || (this._isLoading = !1, this.render())
		},
		setTitle : function(e) {
			this.fromDict({
				title : e
			})
		},
		reload : function(e) {
			throw "Use reloadChildren() instead"
		},
		reloadChildren : function(e) {
			if (this.parent === null)
				throw "Use tree.reload() instead";
			if (!this.data.isLazy)
				throw "node.reloadChildren() requires lazy nodes.";
			if (e) {
				var t = this, n = "nodeLoaded.dynatree." + this.tree.$tree.attr("id") + "." + this.data.key;
				this.tree.$tree.bind(n, function(r, i, s) {
					t.tree.$tree.unbind(n), t.tree.logDebug("loaded %o, %o, %o", r, i, s);
					if (i !== t)
						throw "got invalid load event";
					e.call(t.tree, i, s)
				})
			}
			this.removeChildren(), this._loadContent()
		},
		_loadKeyPath : function(e, t) {
			var n = this.tree;
			n.logDebug("%s._loadKeyPath(%s)", this, e);
			if (e === "")
				throw "Key path must not be empty";
			var r = e.split(n.options.keyPathSeparator);
			if (r[0] === "")
				throw "Key path must be relative (don't start with '/')";
			var i = r.shift();
			if (this.childList)
				for (var s = 0, o = this.childList.length; s < o; s++) {
					var u = this.childList[s];
					if (u.data.key === i) {
						if (r.length === 0)
							t.call(n, u, "ok");
						else if (!u.data.isLazy || u.childList !== null && u.childList !== undefined)
							t.call(n, u, "loaded"), u._loadKeyPath(r.join(n.options.keyPathSeparator), t);
						else {
							n.logDebug("%s._loadKeyPath(%s) -> reloading %s...", this, e, u);
							var a = this;
							u.reloadChildren(function(i, s) {
								s ? (n.logDebug("%s._loadKeyPath(%s) -> reloaded %s.", i, e, i), t.call(n, u, "loaded"), i._loadKeyPath(r.join(n.options.keyPathSeparator), t)) : (n.logWarning("%s._loadKeyPath(%s) -> reloadChildren() failed.", a, e), t.call(n, u, "error"))
							})
						}
						return
					}
				}
			t.call(n, undefined, "notfound", i, r.length === 0), n.logWarning("Node not found: " + i);
			return
		},
		resetLazy : function() {
			if (this.parent === null)
				throw "Use tree.reload() instead";
			if (!this.data.isLazy)
				throw "node.resetLazy() requires lazy nodes.";
			this.expand(!1), this.removeChildren()
		},
		_addChildNode : function(e, t) {
			var n = this.tree, r = n.options, i = n.persistence;
			e.parent = this, this.childList === null ? this.childList = [] : t || this.childList.length > 0 && $(this.childList[this.childList.length - 1].span).removeClass(r.classNames.lastsib);
			if (t) {
				var s = $.inArray(t, this.childList);
				if (s < 0)
					throw "<beforeNode> must be a child of <this>";
				this.childList.splice(s, 0, e)
			} else
				this.childList.push(e);
			var o = n.isInitializing();
			r.persist && i.cookiesFound && o ? (i.activeKey === e.data.key && (n.activeNode = e), i.focusedKey === e.data.key && (n.focusNode = e), e.bExpanded = $.inArray(e.data.key, i.expandedKeyList) >= 0, e.bSelected = $.inArray(e.data.key, i.selectedKeyList) >= 0) : (e.data.activate && (n.activeNode = e, r.persist && (i.activeKey = e.data.key)), e.data.focus && (n.focusNode = e, r.persist && (i.focusedKey = e.data.key)), e.bExpanded = e.data.expand === !0, e.bExpanded && r.persist && i.addExpand(e.data.key), e.bSelected = e.data.select === !0, e.bSelected && r.persist && i.addSelect(e.data.key)), r.minExpandLevel >= e.getLevel() && (this.bExpanded = !0);
			if (e.bSelected && r.selectMode == 3) {
				var u = this;
				while (u)u.hasSubSel || u._setSubSel(!0), u = u.parent
			}
			return n.bEnableUpdate && this.render(), e
		},
		addChild : function(e, t) {
			if ( typeof e == "string")
				throw "Invalid data type for " + e;
			if (!e || e.length === 0)
				return;
			if ( e instanceof DynaTreeNode)
				return this._addChildNode(e, t);
			e.length || ( e = [e]);
			var n = this.tree.enableUpdate(!1), r = null;
			for (var i = 0, s = e.length; i < s; i++) {
				var o = e[i], u = this._addChildNode(new DynaTreeNode(this, this.tree, o), t);
				r || ( r = u), o.children && u.addChild(o.children, null)
			}
			return this.tree.enableUpdate(n), r
		},
		append : function(e) {
			return this.tree.logWarning("node.append() is deprecated (use node.addChild() instead)."), this.addChild(e, null)
		},
		appendAjax : function(e) {
			var t = this;
			this.removeChildren(!1, !0), this.setLazyNodeStatus(DTNodeStatus_Loading);
			if (e.debugLazyDelay) {
				var n = e.debugLazyDelay;
				e.debugLazyDelay = 0, this.tree.logInfo("appendAjax: waiting for debugLazyDelay " + n), setTimeout(function() {
					t.appendAjax(e)
				}, n);
				return
			}
			var r = e.success, i = e.error, s = "nodeLoaded.dynatree." + this.tree.$tree.attr("id") + "." + this.data.key, o = $.extend({}, this.tree.options.ajaxDefaults, e, {
				success : function(e, n, i) {
					var u = t.tree.phase;
					t.tree.phase = "init", o.postProcess ? e = o.postProcess.call(this, e, this.dataType) : e && e.hasOwnProperty("d") && ( e = typeof e.d == "string" ? $.parseJSON(e.d) : e.d), (!$.isArray(e) || e.length !== 0) && t.addChild(e, null), t.tree.phase = "postInit", r && r.call(o, t, e, n), t.tree.logDebug("trigger " + s), t.tree.$tree.trigger(s, [t, !0]), t.tree.phase = u, t.setLazyNodeStatus(DTNodeStatus_Ok), $.isArray(e) && e.length === 0 && (t.childList = [], t.render())
				},
				error : function(e, n, r) {
					t.tree.logWarning("appendAjax failed:", n, ":\n", e, "\n", r), i && i.call(o, t, e, n, r), t.tree.$tree.trigger(s, [t, !1]), t.setLazyNodeStatus(DTNodeStatus_Error, {
						info : n,
						tooltip : "" + r
					})
				}
			});
			$.ajax(o)
		},
		move : function(e, t) {
			var n;
			if (this === e)
				return;
			if (!this.parent)
				throw "Cannot move system root";
			if (t === undefined || t == "over")
				t = "child";
			var r = this.parent, i = t === "child" ? e : e.parent;
			if (i.isDescendantOf(this))
				throw "Cannot move a node to it's own descendant";
			if (this.parent.childList.length == 1)
				this.parent.childList = this.parent.data.isLazy ? [] : null, this.parent.bExpanded = !1;
			else {
				n = $.inArray(this, this.parent.childList);
				if (n < 0)
					throw "Internal error";
				this.parent.childList.splice(n, 1)
			}
			this.parent.ul && this.parent.ul.removeChild(this.li), this.parent = i;
			if (i.hasChildren())
				switch(t) {
					case"child":
						i.childList.push(this);
						break;
					case"before":
						n = $.inArray(e, i.childList);
						if (n < 0)
							throw "Internal error";
						i.childList.splice(n, 0, this);
						break;
					case"after":
						n = $.inArray(e, i.childList);
						if (n < 0)
							throw "Internal error";
						i.childList.splice(n + 1, 0, this);
						break;
					default:
						throw "Invalid mode " + t
				}
			else
				i.childList = [this];
			i.ul || (i.ul = document.createElement("ul"), i.ul.style.display = "none", i.li.appendChild(i.ul)), this.li && i.ul.appendChild(this.li);
			if (this.tree !== e.tree)
				throw this.visit(function(t) {
					t.tree = e.tree
				}, null, !0), "Not yet implemented.";
			r.isDescendantOf(i) || r.render(), i.isDescendantOf(r) || i.render()
		},
		lastentry : undefined
	};
	var DynaTreeStatus = Class.create();
	DynaTreeStatus._getTreePersistData = function(e, t) {
		var n = new DynaTreeStatus(e, t);
		return n.read(), n.toDict()
	}, getDynaTreePersistData = DynaTreeStatus._getTreePersistData, DynaTreeStatus.prototype = {
		initialize : function(e, t) {
			e === undefined && ( e = $.ui.dynatree.prototype.options.cookieId), t = $.extend({}, $.ui.dynatree.prototype.options.cookie, t), this.cookieId = e, this.cookieOpts = t, this.cookiesFound = undefined, this.activeKey = null, this.focusedKey = null, this.expandedKeyList = null, this.selectedKeyList = null
		},
		_log : function(e) {
			Array.prototype.unshift.apply(arguments, ["debug"]), _log.apply(this, arguments)
		},
		read : function() {
			this.cookiesFound = !1;
			var e = $.cookie(this.cookieId + "-active");
			this.activeKey = e === null ? "" : e, e !== null && (this.cookiesFound = !0), e = $.cookie(this.cookieId + "-focus"), this.focusedKey = e === null ? "" : e, e !== null && (this.cookiesFound = !0), e = $.cookie(this.cookieId + "-expand"), this.expandedKeyList = e === null ? [] : e.split(","), e !== null && (this.cookiesFound = !0), e = $.cookie(this.cookieId + "-select"), this.selectedKeyList = e === null ? [] : e.split(","), e !== null && (this.cookiesFound = !0)
		},
		write : function() {
			$.cookie(this.cookieId + "-active", this.activeKey === null ? "" : this.activeKey, this.cookieOpts), $.cookie(this.cookieId + "-focus", this.focusedKey === null ? "" : this.focusedKey, this.cookieOpts), $.cookie(this.cookieId + "-expand", this.expandedKeyList === null ? "" : this.expandedKeyList.join(","), this.cookieOpts), $.cookie(this.cookieId + "-select", this.selectedKeyList === null ? "" : this.selectedKeyList.join(","), this.cookieOpts)
		},
		addExpand : function(e) {
			$.inArray(e, this.expandedKeyList) < 0 && (this.expandedKeyList.push(e), $.cookie(this.cookieId + "-expand", this.expandedKeyList.join(","), this.cookieOpts))
		},
		clearExpand : function(e) {
			var t = $.inArray(e, this.expandedKeyList);
			t >= 0 && (this.expandedKeyList.splice(t, 1), $.cookie(this.cookieId + "-expand", this.expandedKeyList.join(","), this.cookieOpts))
		},
		addSelect : function(e) {
			$.inArray(e, this.selectedKeyList) < 0 && (this.selectedKeyList.push(e), $.cookie(this.cookieId + "-select", this.selectedKeyList.join(","), this.cookieOpts))
		},
		clearSelect : function(e) {
			var t = $.inArray(e, this.selectedKeyList);
			t >= 0 && (this.selectedKeyList.splice(t, 1), $.cookie(this.cookieId + "-select", this.selectedKeyList.join(","), this.cookieOpts))
		},
		isReloading : function() {
			return this.cookiesFound === !0
		},
		toDict : function() {
			return {
				cookiesFound : this.cookiesFound,
				activeKey : this.activeKey,
				focusedKey : this.activeKey,
				expandedKeyList : this.expandedKeyList,
				selectedKeyList : this.selectedKeyList
			}
		},
		lastentry : undefined
	};
	var DynaTree = Class.create();
	DynaTree.version = "$Version:$", DynaTree.prototype = {
		initialize : function(e) {
			this.phase = "init", this.$widget = e, this.options = e.options, this.$tree = e.element, this.timer = null, this.divTree = this.$tree.get(0), _initDragAndDrop(this)
		},
		_load : function(e) {
			var t = this.$widget, n = this.options, r = this;
			this.bEnableUpdate = !0, this._nodeCount = 1, this.activeNode = null, this.focusNode = null, n.rootVisible !== undefined && this.logWarning("Option 'rootVisible' is no longer supported."), n.minExpandLevel < 1 && (this.logWarning("Option 'minExpandLevel' must be >= 1."), n.minExpandLevel = 1), n.classNames !== $.ui.dynatree.prototype.options.classNames && (n.classNames = $.extend({}, $.ui.dynatree.prototype.options.classNames, n.classNames)), n.ajaxDefaults !== $.ui.dynatree.prototype.options.ajaxDefaults && (n.ajaxDefaults = $.extend({}, $.ui.dynatree.prototype.options.ajaxDefaults, n.ajaxDefaults)), n.dnd !== $.ui.dynatree.prototype.options.dnd && (n.dnd = $.extend({}, $.ui.dynatree.prototype.options.dnd, n.dnd)), n.imagePath || $("script").each(function() {
				var e = /.*dynatree[^\/]*\.js$/i;
				if (this.src.search(e) >= 0)
					return this.src.indexOf("/") >= 0 ? n.imagePath = this.src.slice(0, this.src.lastIndexOf("/")) + "/skin/" : n.imagePath = "skin/", r.logDebug("Guessing imagePath from '%s': '%s'", this.src, n.imagePath), !1
			}), this.persistence = new DynaTreeStatus(n.cookieId, n.cookie), n.persist && ($.cookie || _log("warn", "Please include jquery.cookie.js to use persistence."), this.persistence.read()), this.logDebug("DynaTree.persistence: %o", this.persistence.toDict()), this.cache = {
				tagEmpty : "<span class='" + n.classNames.empty + "'></span>",
				tagVline : "<span class='" + n.classNames.vline + "'></span>",
				tagExpander : "<span class='" + n.classNames.expander + "'></span>",
				tagConnector : "<span class='" + n.classNames.connector + "'></span>",
				tagNodeIcon : "<span class='" + n.classNames.nodeIcon + "'></span>",
				tagCheckbox : "<span class='" + n.classNames.checkbox + "'></span>",
				lastentry : undefined
			}, (n.children || n.initAjax && n.initAjax.url || n.initId) && $(this.divTree).empty();
			var i = this.$tree.find(">ul:first").hide();
			this.tnRoot = new DynaTreeNode(null, this, {}), this.tnRoot.bExpanded = !0, this.tnRoot.render(), this.divTree.appendChild(this.tnRoot.ul);
			var s = this.tnRoot, o = n.persist && this.persistence.isReloading(), u = !1, a = this.enableUpdate(!1);
			this.logDebug("Dynatree._load(): read tree structure..."), n.children ? s.addChild(n.children) : n.initAjax && n.initAjax.url ? ( u = !0, s.data.isLazy = !0, this._reloadAjax(e)) : n.initId ? this._createFromTag(s, $("#" + n.initId)) : (this._createFromTag(s, i), i.remove()), this._checkConsistency(), !u && n.selectMode == 3 && s._updatePartSelectionState(), this.logDebug("Dynatree._load(): render nodes..."), this.enableUpdate(a), this.logDebug("Dynatree._load(): bind events..."), this.$widget.bind(), this.logDebug("Dynatree._load(): postInit..."), this.phase = "postInit", n.persist && this.persistence.write(), this.focusNode && this.focusNode.isVisible() && (this.logDebug("Focus on init: %o", this.focusNode), this.focusNode.focus()), u || (n.onPostInit && n.onPostInit.call(this, o, !1), e && e.call(this, "ok")), this.phase = "idle"
		},
		_reloadAjax : function(e) {
			var t = this.options;
			if (!t.initAjax || !t.initAjax.url)
				throw "tree.reload() requires 'initAjax' mode.";
			var n = this.persistence, r = $.extend({}, t.initAjax);
			r.addActiveKey && (r.data.activeKey = n.activeKey), r.addFocusedKey && (r.data.focusedKey = n.focusedKey), r.addExpandedKeyList && (r.data.expandedKeyList = n.expandedKeyList.join(",")), r.addSelectedKeyList && (r.data.selectedKeyList = n.selectedKeyList.join(",")), r.success && this.logWarning("initAjax: success callback is ignored; use onPostInit instead."), r.error && this.logWarning("initAjax: error callback is ignored; use onPostInit instead.");
			var i = n.isReloading();
			r.success = function(n, r, s) {
				t.selectMode == 3 && n.tree.tnRoot._updatePartSelectionState(), t.onPostInit && t.onPostInit.call(n.tree, i, !1), e && e.call(n.tree, "ok")
			}, r.error = function(n, r, s, o) {
				t.onPostInit && t.onPostInit.call(n.tree, i, !0, r, s, o), e && e.call(n.tree, "error", r, s, o)
			}, this.logDebug("Dynatree._init(): send Ajax request..."), this.tnRoot.appendAjax(r)
		},
		toString : function() {
			return "Dynatree '" + this.$tree.attr("id") + "'"
		},
		toDict : function() {
			return this.tnRoot.toDict(!0)
		},
		serializeArray : function(e) {
			var t = this.getSelectedNodes(e), n = this.$tree.attr("name") || this.$tree.attr("id"), r = [];
			for (var i = 0, s = t.length; i < s; i++)
				r.push({
					name : n,
					value : t[i].data.key
				});
			return r
		},
		getPersistData : function() {
			return this.persistence.toDict()
		},
		logDebug : function(e) {
			this.options.debugLevel >= 2 && (Array.prototype.unshift.apply(arguments, ["debug"]), _log.apply(this, arguments))
		},
		logInfo : function(e) {
			this.options.debugLevel >= 1 && (Array.prototype.unshift.apply(arguments, ["info"]), _log.apply(this, arguments))
		},
		logWarning : function(e) {
			Array.prototype.unshift.apply(arguments, ["warn"]), _log.apply(this, arguments)
		},
		isInitializing : function() {
			return this.phase == "init" || this.phase == "postInit"
		},
		isReloading : function() {
			return (this.phase == "init" || this.phase == "postInit") && this.options.persist && this.persistence.cookiesFound
		},
		isUserEvent : function() {
			return this.phase == "userEvent"
		},
		redraw : function() {
			this.tnRoot.render(!1, !1)
		},
		renderInvisibleNodes : function() {
			this.tnRoot.render(!1, !0)
		},
		reload : function(e) {
			this._load(e)
		},
		getRoot : function() {
			return this.tnRoot
		},
		enable : function() {
			this.$widget.enable()
		},
		disable : function() {
			this.$widget.disable()
		},
		getNodeByKey : function(e) {
			var t = document.getElementById(this.options.idPrefix + e);
			if (t)
				return t.dtnode ? t.dtnode : null;
			var n = null;
			return this.visit(function(t) {
				if (t.data.key === e)
					return n = t, !1
			}, !0), n
		},
		getActiveNode : function() {
			return this.activeNode
		},
		reactivate : function(e) {
			var t = this.activeNode;
			t && (this.activeNode = null, t.activate(), e && t.focus())
		},
		getSelectedNodes : function(e) {
			var t = [];
			return this.tnRoot.visit(function(n) {
				if (n.bSelected) {
					t.push(n);
					if (e === !0)
						return "skip"
				}
			}), t
		},
		activateKey : function(e) {
			var t = e === null ? null : this.getNodeByKey(e);
			return t ? (t.focus(), t.activate(), t) : (this.activeNode && this.activeNode.deactivate(), this.activeNode = null, null)
		},
		loadKeyPath : function(e, t) {
			var n = e.split(this.options.keyPathSeparator);
			return n[0] === "" && n.shift(), n[0] == this.tnRoot.data.key && (this.logDebug("Removed leading root key."), n.shift()), e = n.join(this.options.keyPathSeparator), this.tnRoot._loadKeyPath(e, t)
		},
		selectKey : function(e, t) {
			var n = this.getNodeByKey(e);
			return n ? (n.select(t), n) : null
		},
		enableUpdate : function(e) {
			return this.bEnableUpdate == e ? e : (this.bEnableUpdate = e, e && this.redraw(), !e)
		},
		count : function() {
			return this.tnRoot.countChildren()
		},
		visit : function(e, t) {
			return this.tnRoot.visit(e, t)
		},
		_createFromTag : function(parentTreeNode, $ulParent) {
			var self = this;
			$ulParent.find(">li").each(function() {
				var $li = $(this), $liSpan = $li.find(">span:first"), $liA = $li.find(">a:first"), title, href = null, target = null, tooltip;
				if ($liSpan.length)
					title = $liSpan.html();
				else if ($liA.length)
					title = $liA.html(), href = $liA.attr("href"), target = $liA.attr("target"), tooltip = $liA.attr("title");
				else {
					title = $li.html();
					var iPos = title.search(/<ul/i);
					iPos >= 0 ? title = $.trim(title.substring(0, iPos)) : title = $.trim(title)
				}
				var data = {
					title : title,
					tooltip : tooltip,
					isFolder : $li.hasClass("folder"),
					isLazy : $li.hasClass("lazy"),
					expand : $li.hasClass("expanded"),
					select : $li.hasClass("selected"),
					activate : $li.hasClass("active"),
					focus : $li.hasClass("focused"),
					noLink : $li.hasClass("noLink")
				};
				href && (data.href = href, data.target = target), $li.attr("title") && (data.tooltip = $li.attr("title")), $li.attr("id") && (data.key = "" + $li.attr("id"));
				if ($li.attr("data")) {
					var dataAttr = $.trim($li.attr("data"));
					if (dataAttr) {
						dataAttr.charAt(0) != "{" && ( dataAttr = "{" + dataAttr + "}");
						try {
							$.extend(data, eval("(" + dataAttr + ")"))
						} catch(e) {
							throw "Error parsing node data: " + e + "\ndata:\n'" + dataAttr + "'"
						}
					}
				}
				var childNode = parentTreeNode.addChild(data), $ul = $li.find(">ul:first");
				$ul.length && self._createFromTag(childNode, $ul)
			})
		},
		_checkConsistency : function() {
		},
		_setDndStatus : function(e, t, n, r, i) {
			var s = e ? $(e.span) : null, o = $(t.span);
			this.$dndMarker || (this.$dndMarker = $("<div id='dynatree-drop-marker'></div>").hide().css({
				"z-index" : 1e3
			}).prependTo($(this.divTree).parent()));
			if (r === "after" || r === "before" || r === "over") {
				var u = "0 0";
				switch(r) {
					case"before":
						this.$dndMarker.removeClass("dynatree-drop-after dynatree-drop-over"), this.$dndMarker.addClass("dynatree-drop-before"), u = "0 -8";
						break;
					case"after":
						this.$dndMarker.removeClass("dynatree-drop-before dynatree-drop-over"), this.$dndMarker.addClass("dynatree-drop-after"), u = "0 8";
						break;
					default:
						this.$dndMarker.removeClass("dynatree-drop-after dynatree-drop-before"), this.$dndMarker.addClass("dynatree-drop-over"), o.addClass("dynatree-drop-target"), u = "8 0"
				}
				this.$dndMarker.show().position({
					my : "left top",
					at : "left top",
					of : o,
					offset : u
				})
			} else
				o.removeClass("dynatree-drop-target"), this.$dndMarker.hide();
			r === "after" ? o.addClass("dynatree-drop-after") : o.removeClass("dynatree-drop-after"), r === "before" ? o.addClass("dynatree-drop-before") : o.removeClass("dynatree-drop-before"), i === !0 ? (s && s.addClass("dynatree-drop-accept"), o.addClass("dynatree-drop-accept"), n.addClass("dynatree-drop-accept")) : (s && s.removeClass("dynatree-drop-accept"), o.removeClass("dynatree-drop-accept"), n.removeClass("dynatree-drop-accept")), i === !1 ? (s && s.addClass("dynatree-drop-reject"), o.addClass("dynatree-drop-reject"), n.addClass("dynatree-drop-reject")) : (s && s.removeClass("dynatree-drop-reject"), o.removeClass("dynatree-drop-reject"), n.removeClass("dynatree-drop-reject"))
		},
		_onDragEvent : function(e, t, n, r, i, s) {
			var o = this.options, u = this.options.dnd, a = null, f = $(t.span), l, c;
			switch(e) {
				case"helper":
					var h = $("<div class='dynatree-drag-helper'><span class='dynatree-drag-helper-img' /></div>").append($(r.target).closest(".dynatree-title").clone());
					$("ul.dynatree-container", t.tree.divTree).append(h), h.data("dtSourceNode", t), a = h;
					break;
				case"start":
					t.isStatusNode() ? a = !1 : u.onDragStart && ( a = u.onDragStart(t)), a === !1 ? (this.logDebug("tree.onDragStart() cancelled"), i.helper.trigger("mouseup"), i.helper.hide()) : f.addClass("dynatree-drag-source");
					break;
				case"enter":
					a = u.onDragEnter ? u.onDragEnter(t, n) : null, a ? a = {
						over : a === !0 || a === "over" || $.inArray("over", a) >= 0,
						before : a === !0 || a === "before" || $.inArray("before", a) >= 0,
						after : a === !0 || a === "after" || $.inArray("after", a) >= 0
					} : a = !1, i.helper.data("enterResponse", a);
					break;
				case"over":
					c = i.helper.data("enterResponse"), l = null;
					if (c !== !1)
						if ( typeof c == "string")
							l = c;
						else {
							var p = f.offset(), d = {
								x : r.pageX - p.left,
								y : r.pageY - p.top
							}, v = {
								x : d.x / f.width(),
								y : d.y / f.height()
							};
							c.after && v.y > .75 ? l = "after" : !c.over && c.after && v.y > .5 ? l = "after" : c.before && v.y <= .25 ? l = "before" : !c.over && c.before && v.y <= .5 ? l = "before" : c.over && ( l = "over"), u.preventVoidMoves && (t === n ? l = null : l === "before" && n && t === n.getNextSibling() ? l = null : l === "after" && n && t === n.getPrevSibling() ? l = null : l === "over" && n && n.parent === t && n.isLastSibling() && ( l = null)), i.helper.data("hitMode", l)
						}
					l === "over" && u.autoExpandMS && t.hasChildren() !== !1 && !t.bExpanded && t.scheduleAction("expand", u.autoExpandMS);
					if (l && u.onDragOver) {
						a = u.onDragOver(t, n, l);
						if (a === "over" || a === "before" || a === "after")
							l = a
					}
					this._setDndStatus(n, t, i.helper, l, a !== !1 && l !== null);
					break;
				case"drop":
					var m = i.helper.hasClass("dynatree-drop-reject");
					l = i.helper.data("hitMode"), l && u.onDrop && !m && u.onDrop(t, n, l, i, s);
					break;
				case"leave":
					t.scheduleAction("cancel"), i.helper.data("enterResponse", null), i.helper.data("hitMode", null), this._setDndStatus(n, t, i.helper, "out", undefined), u.onDragLeave && u.onDragLeave(t, n);
					break;
				case"stop":
					f.removeClass("dynatree-drag-source"), u.onDragStop && u.onDragStop(t);
					break;
				default:
					throw "Unsupported drag event: " + e
			}
			return a
		},
		cancelDrag : function() {
			var e = $.ui.ddmanager.current;
			e && e.cancel()
		},
		lastentry : undefined
	}, $.widget("ui.dynatree", {
		_init : function() {
			if (versionCompare($.ui.version, "1.8") < 0)
				return this.options.debugLevel >= 0 && _log("warn", "ui.dynatree._init() was called; you should upgrade to jquery.ui.core.js v1.8 or higher."), this._create();
			this.options.debugLevel >= 2 && _log("debug", "ui.dynatree._init() was called; no current default functionality.")
		},
		_create : function() {
			var e = this.options;
			e.debugLevel >= 1 && logMsg("Dynatree._create(): version='%s', debugLevel=%o.", $.ui.dynatree.version, this.options.debugLevel), this.options.event += ".dynatree";
			var t = this.element.get(0);
			this.tree = new DynaTree(this), this.tree._load(), this.tree.logDebug("Dynatree._init(): done.")
		},
		bind : function() {
			function t(e) {
				e = $.event.fix(e || window.event);
				var t = $.ui.dynatree.getNode(e.target);
				return t ? t._onFocus(e) : !1
			}
			this.unbind();
			var e = "click.dynatree dblclick.dynatree";
			this.options.keyboard && (e += " keypress.dynatree keydown.dynatree"), this.element.bind(e, function(e) {
				var t = $.ui.dynatree.getNode(e.target);
				if (!t)
					return !0;
				var n = t.tree, r = n.options;
				n.logDebug("event(%s): dtnode: %s", e.type, t);
				var i = n.phase;
				n.phase = "userEvent";
				try {
					switch(e.type) {
						case"click":
							return r.onClick && r.onClick.call(n, t, e) === !1 ? !1 : t._onClick(e);
						case"dblclick":
							return r.onDblClick && r.onDblClick.call(n, t, e) === !1 ? !1 : t._onDblClick(e);
						case"keydown":
							return r.onKeydown && r.onKeydown.call(n, t, e) === !1 ? !1 : t._onKeydown(e);
						case"keypress":
							return r.onKeypress && r.onKeypress.call(n, t, e) === !1 ? !1 : t._onKeypress(e)
					}
				} catch(s) {
					var o = null;
					n.logWarning("bind(%o): dtnode: %o, error: %o", e, t, s)
				} finally {
					n.phase = i
				}
			});
			var n = this.tree.divTree;
			n.addEventListener ? (n.addEventListener("focus", t, !0), n.addEventListener("blur", t, !0)) : n.onfocusin = n.onfocusout = t
		},
		unbind : function() {
			this.element.unbind(".dynatree")
		},
		enable : function() {
			this.bind(), $.Widget.prototype.enable.apply(this, arguments)
		},
		disable : function() {
			this.unbind(), $.Widget.prototype.disable.apply(this, arguments)
		},
		getTree : function() {
			return this.tree
		},
		getRoot : function() {
			return this.tree.getRoot()
		},
		getActiveNode : function() {
			return this.tree.getActiveNode()
		},
		getSelectedNodes : function() {
			return this.tree.getSelectedNodes()
		},
		lastentry : undefined
	}), versionCompare($.ui.version, "1.8") < 0 && ($.ui.dynatree.getter = "getTree getRoot getActiveNode getSelectedNodes"), $.ui.dynatree.version = "$Version:$", $.ui.dynatree.getNode = function(e) {
		if ( e instanceof DynaTreeNode)
			return e;
		e.selector !== undefined && ( e = e[0]);
		while (e) {
			if (e.dtnode)
				return e.dtnode;
			e = e.parentNode
		}
		return null
	}, $.ui.dynatree.getPersistData = DynaTreeStatus._getTreePersistData, $.ui.dynatree.prototype.options = {
		title : "Dynatree",
		minExpandLevel : 1,
		imagePath : null,
		children : null,
		initId : null,
		initAjax : null,
		autoFocus : !0,
		keyboard : !0,
		persist : !1,
		autoCollapse : !1,
		clickFolderMode : 3,
		activeVisible : !0,
		checkbox : !1,
		selectMode : 2,
		fx : null,
		noLink : !1,
		onClick : null,
		onDblClick : null,
		onKeydown : null,
		onKeypress : null,
		onFocus : null,
		onBlur : null,
		onQueryActivate : null,
		onQuerySelect : null,
		onQueryExpand : null,
		onPostInit : null,
		onActivate : null,
		onDeactivate : null,
		onSelect : null,
		onExpand : null,
		onLazyRead : null,
		onCustomRender : null,
		onCreate : null,
		onRender : null,
		postProcess : null,
		dnd : {
			onDragStart : null,
			onDragStop : null,
			autoExpandMS : 1e3,
			preventVoidMoves : !0,
			onDragEnter : null,
			onDragOver : null,
			onDrop : null,
			onDragLeave : null
		},
		ajaxDefaults : {
			cache : !1,
			timeout : 0,
			dataType : "json"
		},
		strings : {
			loading : "Loading&#8230;",
			loadError : "Load error!"
		},
		generateIds : !1,
		idPrefix : "dynatree-id-",
		keyPathSeparator : "/",
		cookieId : "dynatree",
		cookie : {
			expires : null
		},
		classNames : {
			container : "dynatree-container",
			node : "dynatree-node",
			folder : "dynatree-folder",
			empty : "dynatree-empty",
			vline : "dynatree-vline",
			expander : "dynatree-expander",
			connector : "dynatree-connector",
			checkbox : "dynatree-checkbox",
			nodeIcon : "dynatree-icon",
			title : "dynatree-title",
			noConnector : "dynatree-no-connector",
			nodeError : "dynatree-statusnode-error",
			nodeWait : "dynatree-statusnode-wait",
			hidden : "dynatree-hidden",
			combinedExpanderPrefix : "dynatree-exp-",
			combinedIconPrefix : "dynatree-ico-",
			nodeLoading : "dynatree-loading",
			hasChildren : "dynatree-has-children",
			active : "dynatree-active",
			selected : "dynatree-selected",
			expanded : "dynatree-expanded",
			lazy : "dynatree-lazy",
			focused : "dynatree-focused",
			partsel : "dynatree-partsel",
			lastsib : "dynatree-lastsib"
		},
		debugLevel : 2,
		lastentry : undefined
	}, versionCompare($.ui.version, "1.8") < 0 && ($.ui.dynatree.defaults = $.ui.dynatree.prototype.options), $.ui.dynatree.nodedatadefaults = {
		title : null,
		key : null,
		isFolder : !1,
		isLazy : !1,
		tooltip : null,
		href : null,
		icon : null,
		addClass : null,
		noLink : !1,
		activate : !1,
		focus : !1,
		expand : !1,
		select : !1,
		hideCheckbox : !1,
		unselectable : !1,
		children : null,
		lastentry : undefined
	};
	var didRegisterDnd = !1, _registerDnd = function() {
		if (didRegisterDnd)
			return;
		$.ui.plugin.add("draggable", "connectToDynatree", {
			start : function(e, t) {
				var n = $(this).data("ui-draggable") || $(this).data("draggable"), r = t.helper.data("dtSourceNode") || null;
				if (r)
					return n.offset.click.top = -2, n.offset.click.left = 16, r.tree._onDragEvent("start", r, null, e, t, n)
			},
			drag : function(e, t) {
				var n = $(this).data("ui-draggable") || $(this).data("draggable"), r = t.helper.data("dtSourceNode") || null, i = t.helper.data("dtTargetNode") || null, s = $.ui.dynatree.getNode(e.target);
				if (e.target && !s) {
					var o = $(e.target).closest("div.dynatree-drag-helper,#dynatree-drop-marker").length > 0;
					if (o)
						return
				}
				t.helper.data("dtTargetNode", s), i && i !== s && i.tree._onDragEvent("leave", i, r, e, t, n), s && (!s.tree.options.dnd.onDrop || (s === i ? s.tree._onDragEvent("over", s, r, e, t, n) : s.tree._onDragEvent("enter", s, r, e, t, n)))
			},
			stop : function(e, t) {
				var n = $(this).data("ui-draggable") || $(this).data("draggable"), r = t.helper.data("dtSourceNode") || null, i = t.helper.data("dtTargetNode") || null, s = n._mouseDownEvent, o = e.type, u = o == "mouseup" && e.which == 1;
				logMsg("draggable-connectToDynatree.stop: targetNode(from event): %s, dtTargetNode: %s", i, t.helper.data("dtTargetNode")), u || logMsg("Drag was cancelled"), i && (u && i.tree._onDragEvent("drop", i, r, e, t, n), i.tree._onDragEvent("leave", i, r, e, t, n)), r && r.tree._onDragEvent("stop", r, null, e, t, n)
			}
		}), didRegisterDnd = !0
	}
})(jQuery);

});
