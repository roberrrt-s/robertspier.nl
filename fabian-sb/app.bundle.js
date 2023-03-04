!(function (e) {
	var t = {};
	function n(r) {
		if (t[r]) return t[r].exports;
		var o = (t[r] = { i: r, l: !1, exports: {} });
		return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
	}
	(n.m = e),
		(n.c = t),
		(n.d = function (e, t, r) {
			n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
		}),
		(n.r = function (e) {
			"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
		}),
		(n.t = function (e, t) {
			if ((1 & t && (e = n(e)), 8 & t)) return e;
			if (4 & t && "object" == typeof e && e && e.__esModule) return e;
			var r = Object.create(null);
			if ((n.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e))
				for (var o in e)
					n.d(
						r,
						o,
						function (t) {
							return e[t];
						}.bind(null, o)
					);
			return r;
		}),
		(n.n = function (e) {
			var t =
				e && e.__esModule
					? function () {
							return e.default;
					  }
					: function () {
							return e;
					  };
			return n.d(t, "a", t), t;
		}),
		(n.o = function (e, t) {
			return Object.prototype.hasOwnProperty.call(e, t);
		}),
		(n.p = ""),
		n((n.s = 0));
})([
	function (e, t, n) {
		n(1), (e.exports = n(2));
	},
	function (e, t, n) {
		const r = new Audio(),
			o = document.querySelectorAll(".options");
		let u;
		r.addEventListener("playing", function (e) {
			u = setInterval(function () {
				!(function () {
					for (let e = 0; e < o.length; e++) o[e].classList.add("hidden");
					o[((e = 0), (t = 2), (e = Math.ceil(e)), (t = Math.floor(t)), Math.floor(Math.random() * (t - e + 1)) + e)].classList.remove("hidden");
					var e, t;
				})();
			}, 100);
		}),
			r.addEventListener("ended", function (e) {
				clearInterval(u);
				for (let e = 0; e < o.length; e++) o[e].classList.add("hidden");
			}),
			document.querySelector(".default").addEventListener("click", function (e) {
				e.preventDefault(), (r.src = "./static/cheese.mp3"), (r.volume = 1), r.play();
			});
	},
	function (e, t, n) {}
]);
//# sourceMappingURL=app.bundle.js.map
