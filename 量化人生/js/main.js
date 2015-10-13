Overload = function (fn_objs) {
	var is_match = function (x, y) {
		if (x == y) return true;
		if (x.indexOf("*") == -1) return false;

		var x_arr = x.split(","), y_arr = y.split(",");
		if (x_arr.length != y_arr.length) return false;

		while (x_arr.length) {
			var x_first = x_arr.shift(), y_first = y_arr.shift();
			if (x_first != "*" && x_first != y_first) return false;
		}
		return true;
	};
	var ret = function () {
		var args = arguments
		, args_len = args.length
		, args_types = []
		, args_type
		, fn_objs = args.callee._fn_objs
		, match_fn = function () { };

		for (var i = 0; i < args_len; i++) {
			var type = typeof args[i];
			type == "object" && (args[i].length > -1) && (type = "array");
			args_types.push(type);
		}
		args_type = args_types.join(",");
		for (var k in fn_objs) {
			if (is_match(k, args_type)) {
				match_fn = fn_objs[k];
				break;
			}
		}
		return match_fn.apply(this, args);
	};
	ret._fn_objs = fn_objs;
	return ret;
};

String.prototype.format = Overload({
	"array": function (params) {
		var reg = /{(\d+)}/gm;
		return this.replace(reg, function (match, name) {
			return params[~~name];
		});
	}
	, "object": function (param) {
		var reg = /{([^{}]+)}/gm;
		return this.replace(reg, function (match, name) {
			return param[name];
		});
	}
});

WinJS.UI.Pages.define("/pages/start.html", {
	ready: function (element, options) {
		WinJS.Utilities.query("#startButton").listen("click", function () {
			document.body.innerHTML = "";

			var birthdate = localStorage.getItem("birthdate");
			console.log(birthdate);
			//if (birthdate == null) {
			if(false){
				WinJS.UI.Pages.render("/pages/main.html", document.body, {
					controlText: "This control created by calling WinJS.UI.Pages.render",
					message: "Render control"
				}).done();
			} else {
				WinJS.UI.Pages.render("/pages/select.date.html", document.body, {
					controlText: "This control created by calling WinJS.UI.Pages.render",
					message: "Render control"
				}).done();
				
			}

		});
	}, unload: function () {
		console.log("unload");
	},

	updateLayout: function (element) {
		console.log("updateLayout");

	}
});
WinJS.UI.Pages.define("/pages/select.date.html", {
	ready: function (element, options) {
		WinJS.Utilities.query("#calcButton").listen("click", function () {
			var date = new Date(document.getElementById("date").winControl.current);
			var now = new Date();
			if (date > now) {
				alert("选择的日期不正确");
				return;
			}


			localStorage.setItem("birthdate", document.getElementById("date").winControl.current);
			console.log("save" + document.getElementById("date").winControl.current);
			document.body.innerHTML = "";
			WinJS.UI.Pages.render("/pages/main.html", document.body);
		});

		
		
		console.log(options);
	}, unload: function () {
		console.log("unload");
	},

	updateLayout: function (element) {
		console.log("updateLayout");

	}
});
WinJS.UI.Pages.define("/pages/main.html", {
	ready: function (element, options) {

		for (var i = 0; i < 1200; i++) {
			var item = $("<span>");
			item.addClass("item");
			$(".box").append(item);
		}


		function calcLife(num) {
			var ele = ".box> span.item:nth-child({数目})";
			ele = ele.format({ "数目": num });
			$(ele).addClass("now");
			$(".box>span.now").prevAll().addClass("active");
		}

		function calcLifeNum(bothDate, nowDate) {
			var bothYear = bothDate.getFullYear();
			var bothMonth = bothDate.getMonth();
			var nowYear = nowDate.getFullYear();
			var nowMonth = nowDate.getMonth();

			var tmpYear = nowYear - (bothYear+1);
			var tmpMonth = tmpYear * 12;
			var tmpBothMonth = 12 - bothMonth;
			var tmpNowMonth = nowMonth;

			var month = tmpMonth + tmpBothMonth + tmpNowMonth;
			return month;
		}


		var bothDate = new Date(localStorage.getItem("birthdate"));
		var nowDate = new Date();

		var num = calcLifeNum(bothDate, nowDate);

		$("#curWeak").text(num);
		calcLife(num);

		window.onresize = function () {
			var width = window.innerWidth;
			var height = window.innerHeight;
			var x = Math.sqrt((2 * height * width - 1200 * 6) / 1200) / 2;
			x = x + "px";
			//$(".box >span.item").css({ "width": x, "height": x });
		}
		window.onresize();
	}, unload: function () {
		console.log("unload");
	},

	updateLayout: function (element) {
		console.log("updateLayout");

	}
});



WinJS.UI.processAll();
