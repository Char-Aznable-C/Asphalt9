// 2340×1080分辨率
// 选择可用的车,第一列第一张编号为1,第一列第二张为2,第二列第一张为3,依次递增.可根据自己需求修改
// 填写车的编号,1920*1080分辨率下最多6张车循环,按填写先后顺序用车

/*********************** 生涯用车 ******************************/
var carrerCars = [1, 2, 3, 4, 5, 6];
/*********************** 生涯用车 ******************************/

/*********************** 多人用车 开始 ******************************/
var mpLevelName = ['legend', 'platinum', 'gold', 'silver', 'bronze', 'legend2', 'platinum2', 'gold2', 'silver2', 'bronze2'];
// 传奇、白金、黄金、白银、青铜的车是否可用，true表示可用，false表示不可用
var mpStatus = [
    false,     // 传奇
    false,     // 白金
    true,     // 黄金
    true,     // 白银
    false,     // 青铜

    false,     // 传奇
    false,     // 白金
    true,     // 黄金
    false,     // 白银
    false    // 青铜
];

var mpCarPick = {
    legend: [1, 2, 3, 4, 6],
    platinum: [1, 2, 3, 4, 5, 6, 7, 9, 10, 14],
    gold: [1, 2, 3, 4, 5, 6],
    silver: [5, 6],
    bronze: [5, 6, 7, 8, 9, 10, 11, 12],

    legend2: [1, 2, 3, 4],
    platinum2: [1, 2, 3, 4, 5, 6, 7, 12],
    gold2: [1, 2],
    silver2: [1, 2, 3],
    bronze2: [3]
};
/*********************** 多人用车 结束 ******************************/

const robot = require('robot.js');

module.exports = {
    // 生涯
    carrer: {
        // 生涯用车
        cars : carrerCars,
    
        // 分辨率宽度
        width : 2340,
        
        // 分辨率高度
        height : 1080,
    
        // 最上方代币图标
        token: { x: 921 , y: 42 },
    
        // 最上方积分图标
        credit: { x: 1206 , y: 42 },
    
        // 生涯,开始,继续
        goldenPoint: { x: 1500, y: 1000 },
    
        // 生涯百分比
        careerPercent: { x: 1560, y: 1050 },
    
        // euro
        euro: { x: 350, y: 300 },
    
        // 选关
        swipeScreen: function () {
            for (i = 0; i < 4; i++) {
                robot.swipe(this.height * 2 / 3, 150, this.height * 2 / 3, 900, 400);
                sleep(200);
            }
        },
    
        // 12
        block12: { x: 680, y: 800 },
    
        // 推荐性能分
        recommendedPoints: { x: 1800, y: 900 },
    
        // 第一辆车
        firstCar: { x: 555, y: 616 },
    
        // 车辆间距
        distance: { x: 519, y: 365 },
    },
    
    // 多人
    mp: {
        // 上方多人>尖端=#ffffff白色，多人赛事调整时y会有变化
        homeup: { x: 1841, y: 279, name: "homeup", colors: ["#ffffff"], isDebug: false},
//        homeup: { x: 1841, y: 226 },
        // 下方多人>尖端=#ffffff，多人赛事调整时y会有变化
        homedown: {x: 1842, y: 615, name: "homedown", colors: ["#ffffff"], isDebug: false},
 //       homedown: {x: 1842, y: 896 },
        
        // 出错窗口左下角=#1c5ab2蓝色
        errorleft: { x: 276, y: 816, name: "errorleft", colors: ["#1c5ab2"]},
        // 出错窗口右下角=#1c5ab2蓝色
        errorright: { x: 2065, y:816, name: "errorright", colors: ["#1c5ab2"]},
        
        // 多人数据
        levelName : mpLevelName,

        status : mpStatus,

        carPick : mpCarPick,

        // 分辨率宽度
        width : 2340,
        
        // 分辨率高度
        height : 1080,

        // 最上方代币图标=#0090ff蓝色，会有色差
        token: { x: 1240, y: 54, name: "token", colors: ["#ff0190fe", "#0090ff", "#0492fa", "#0392fb", "#0291fd"], isDebug: false},
        
        // 最上方积分图标=#ffc600||#ffc500黄色
        credit: { x: 1550, y: 55, name: "credit", colors: ["#ffc600"]},
        
        // 返回按钮=#ffffff白色
        back: { x: 25, y: 25, name: "back", colors: ["#fffffe", "#ffffff"], isDebug: false},
        // 返回按钮里的<尖端=#010101黑色
        backward: { x: 112, y: 53, name: "backward", colors: ["#010101", "#ff000000"], isDebug: false},

        // 多人游戏按钮
        multiplayer: { x: 1152, y: 1000, name: "multiplayer", colors: ["#ffffff"]},

        // 开始按钮
        start: { x: 1450, y: 999, name: "start", colors: ["#ffc3fb11"], isDebug: false},

        // 领奖按钮
        claim: { x: 1170, y: 950, name: "claim", colors: ["#c3fb12"]},
        // 多人包的x1标签=#ffc3fb13绿色
        mpackage1: { x: 1240, y: 670, name: "mpackage1", colors: ["#ffc3fc0f"], isDebug: false},
        mpackage2: { x: 1310, y: 670, name: "mpackage2", colors: ["#ffc3fc0f"], isDebug: false},
                
        // 青铜
        bronze: { x: 1600, y: 250 },
        
        // 白银
        silver: { x: 1740, y: 250 },

        // 黄金
        gold: { x: 1870, y: 250 },

        // 白金
        platinum: { x: 2000, y: 250 },

        // 传奇
        legend: { x: 2140, y: 250 },

        // 生涯,开始,继续
        goldenPoint: { x: 1900, y: 1000, name: "goldenPoint", colors: ["#c3fb12", "#ffc3fb11"], isDebug: false},
        

        // 第一辆车, 颜色为有油的#ffc3fb13绿色
        firstCar: { x: 735, y: 625, name: "car", colors: ["#ffc3fb12", "#ffc3fb13"], isDebug: false},

        // 车辆间距
        distance: { x: 496, y: 346 },

        // 滑动
        swipeStart: { x: 1091, y: 480 },
        swipeEnd:   { x: 570, y: 480 }
    },
    
    // 寻车
    ch: {
        // 每日赛事按钮
        daily: { x: 600, y: 1000, name: "daily", colors: ["#ffffff"]},
        // 特殊赛事按钮
        special: { x: 300, y: 1000, name: "special", colors: ["#ffffff"]},
        // 买票➕横线
        plusLeft: {x: 2205, y: 215, name: "plusLeft", colors: ["#c3fb12"], isDebug: false},
        plusRight: {x: 2225, y: 215, name: "plusRight", colors: ["#c3fb12"], isDebug: false},
        // 自动挡开的绿色背景
        touchDriveOn: {x: 2170, y: 818, name: "touchDriveOn", colors: ["#c3fb12"]},
        // 补油界面右上角X中心白色
        //refuel: { x: 1826, y: 274, name: "refuel", colors: ["#ffff0054"], isDebug: false},
        // 第一个赛事位置
        firstEvent: {x: 255, y: 1015},
        // 2个赛事的间隔距离
        interval: 281,
        // 车库上一次选车上车坐标
        lastCarUp: {x: 1100, y: 450},
        // 车库上一次选车下车坐标
        lastCarDown: {x: 1100, y: 850}
    }
}
