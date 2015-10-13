// 有关“空白”模板的简介，请参阅以下文档:
// http://go.microsoft.com/fwlink/?LinkID=329104

(function () {
    "use strict";

    var gold = parseInt( localStorage.getItem("GOLD"));
    if (gold < 9999) {
    	var gold = gold + 200;
    	localStorage.setItem("GOLD",gold);
    }

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var onbackclick = function (args) {
    	if (DNStateManager.g_instance) {
    		var map = DNStateManager.g_instance.stage.children[0].children;

    		if (map.length > 1) {
    			DNStateManager.g_instance.popState();
    			return true;

    		} else {
    			switch (map[0].name) {
    				case 'MainMenuState': //首页
    					return false;
    					break;
    				case 'SelectLevelState'://地图
    					DNStateManager.g_instance.pushState(new CoolTransitionInState(new MainMenuState()));
    					break;
    				default:
    					DNStateManager.g_instance.pushState(new PauseState());
    			}
    		}

    		//console.log('1', map[0].id, map.length);

    	}
    	return true;
    }

	//暂停游戏
	//DNStateManager.g_instance.pushState(new PauseState());
	//回到游戏地图
	//DNStateManager.g_instance.pushState(new CoolTransitionInState(new SelectLevelState()));
	//回到首页
	//DNStateManager.g_instance.pushState(new CoolTransitionInState(new MainMenuState()));
    app.onbackclick = onbackclick;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO:  此应用程序刚刚启动。在此处初始化
                //您的应用程序。
            } else {
                // TODO:  此应用程序已从挂起状态重新激活。
                // 在此处恢复应用程序状态。
            }
            args.setPromise(WinJS.UI.processAll());
        }
    };

    app.oncheckpoint = function (args) {
        // TODO:  即将挂起此应用程序。在此处保存
        //需要在挂起中保留的任何状态。您可以使用
        // WinJS.Application.sessionState 对象，该对象将在
        //挂起中自动保存和恢复。如果您需要在
        //挂起应用程序之前完成异步操作，请调用
        // args.setPromise()。
    };

    app.start();
})();
