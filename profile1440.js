// 1440×720分辨率
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
    false,     // 黄金
    false,     // 白银
    true    // 青铜
];

var mpCarPick = {
    legend: [1, 2, 3, 4, 5, 11],
    platinum: [1, 2, 3, 5, 6, 7, 10, 11, 15],
    gold: [5, 6, 7, 9, 10, 12, 15, 17],
    silver: [7, 8, 10, 12, 15],
    bronze: [5, 6, 7, 8, 9, 10, 11, 12],

    legend2: [1, 2, 3, 4],
    // 白金
    platinum2: [1, 2, 3, 4, 5, 6, 7, 12],
    // 黄金
    gold2: [1, 2],
    // 白银
    silver2: [1, 2, 3],
    // 青铜
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
        width : 1440,
        
        // 分辨率高度
        height : 720,
    
        // 最上方代币图标
        token: { x: 900 , y: 43 },
    
        // 最上方积分图标
        credit: { x: 1136 , y: 33 },

        // 主界面的生涯块
        carrerBlock : { x : 1240 , y : 680 },
    
        // 生涯,开始,继续
        goldenPoint : { x: 1130, y: 660 },
    
        // 生涯百分比
        careerPercent : { x: 2173, y: 1050 },
    
        // euro
        euro : { x: 350, y: 300 },

        // euro界面右上角任务旁边的红底白色问号
        questionMark : { x : 1860 , y : 153},
    
        // 选关
        swipeScreen : function () {
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
        firstCar: { x: 164, y: 616 },
    
        // 车辆间距
        distance: { x: 711, y: 364 }
    },

    // 多人
    mp: {
        // 上方多人>尖端=#ffffff白色，多人赛事调整时y会有变化
        // homeup: { x : 2206, y : 269 },
        // homeup: { x : 1368, y : 284, name: "homeup", colors: ["#ffffff"], isDebug: false }, // 只有一个赛事
        homeup: { x : 1368, y : 167, name: "homeup", colors: ["#ffffff"], isDebug: false }, // 
        // 下方多人>尖端=#ffffff，多人赛事调整时y会有变化
        homedown: { x : 1368, y : 418, name: "homedown", colors: ["#ffffff"], isDebug: false },
        
        // error
    // 出错窗口左下角=#1c5ab2蓝色
        errorleft: { x : 169, y : 528, name: "errorleft", colors: ["#1c5ab2"] },
    // 出错窗口右下角=#1c5ab2蓝色
        errorright: { x : 1270, y : 528, name: "errorright", colors: ["#1c5ab2"] },
        
        // 多人数据
        levelName : mpLevelName,

        status : mpStatus,

        carPick : mpCarPick,

        // 分辨率宽度
        width : 1440,
        
        // 分辨率高度
        height : 720,
    
        // 最上方代币图标=#0090ff蓝色，会有色差
        token: { x: 900 , y: 43, name: "token", colors: ["#ff0190fe", "#0090ff", "#0492fa", "#0392fb", "#0291fd"], isDebug: false },
    
        // 最上方积分图标=#ffc600||#ffc500黄色
        credit: { x: 1136 , y: 33, name: "credit", colors: ["#ffc600"] },
        
        // 返回按钮=#ffffff白色
        back: { x: 25, y: 25, name: "back", colors: ["#fffffe", "#ffffff"], isDebug: false},
        // 返回按钮里的<尖端=#010101黑色
        backward: { x: 56, y: 33, name: "backward", colors: ["#060606", "#ff000000"], isDebug: false },

        // 多人块
        multiplayer: { x: 800, y: 666, name: "multiplayer", colors: ["#ffffff"]},

        // 开始按钮
        start: { x: 630, y: 660, name: "start", colors: ["#c3fb12"], isDebug: false },

        // 领奖按钮
        claim: { x: 670, y: 520, name: "claim", colors: ["#c3fb12"] },
        // 多人包的X级车库红色
        mpackage1: { x: 696, y: 402, name: "mpackage1", colors: ["#fffa154f", "#fffa144f"], isDebug: false},
        mpackage2: { x: 782, y: 402, name: "mpackage2", colors: ["#fffa154f", "#fffa144f"], isDebug: false},
                
        // 青铜
        bronze: { x: 990, y: 150 },
        
        // 白银
        silver: { x: 1070, y: 150 },

        // 黄金
        gold: { x: 1150, y: 150 },

        // 白金
        platinum: { x: 1240, y: 150 },

        // 传奇
        legend: { x: 1320, y: 150 },

        // 生涯,开始,继续
        goldenPoint : { x: 1214, y: 675, name: "goldenPoint", colors: ["#c3fb12"], isDebug: true },

        // 第一辆车
        firstCar: { x: 254, y: 415, name: "car", colors: ["#ffc3fb13"], isDebug: false},

        // 车辆间距
        distance: { x: 455, y: 234 },

        // 滑动,未知原因1440分辨率下x差值=车辆间距时会偏差4个像素
        swipeStart: { x: 865, y: 480 },
        swipeEnd:   { x: 405, y: 480 }
    },
    
    // 寻车
    ch: {
        // 每日赛事按钮
        daily: { x: 570, y: 666, name: "daily", colors: ["#ffffff"]},
        // 特殊赛事按钮
        special: { x: 360, y: 666, name: "special", colors: ["#ffffff"]},
        // 买票➕横线
        plusLeft: {x: 1357, y: 127, name: "plusLeft", colors: ["#c3fb12"]},
        plusRight: {x: 1368, y: 127, name: "plusRight", colors: ["#c3fb12"]},
        // 自动挡开的绿色背景
        touchDriveOn: {x: 980, y: 660, name: "touchDriveOn", colors: ["#c3fb12"]},
        // 补油界面右上角X中心白色
        refuel: { x: 1124, y: 196, name: "refuel", colors: ["#ffff0054"], isDebug: false},
        // 第一个赛事位置
        firstEvent: {x: 175, y: 656},
        // 2个赛事的间隔距离
        interval: 187,     
        // 车库上一次选车上车坐标
        lastCarUp: {x: 660, y: 350},
        // 车库上一次选车下车坐标
        lastCarDown: {x: 660, y: 580}
    } 
}; 
