"auto";

const profile = require('profile1440.js');
const carrerCars = profile.carrer.cars;
const levelName = profile.mp.levelName;
const status = profile.mp.status;
const carPick = profile.mp.carPick;

const robot = require('robot.js');
const DEVICE = require('device.js');

var startTime = new Date().getTime();
var timer = new Date().getTime();

var lastLevel = 0;
var lastLevel2 = 5;
var lastCar   = 0;

var touchDrive = false;

DEVICE.checkPermission();

module.exports = {
    profile: profile,
    // 生涯
    carrer: {
        /**
         * 非循环部分
         */
        beforeRun() {
            var carrerFlag = false;
            // 判断是否从主页开始
            while (!carrerFlag) {
                switch(carrerCheckState()) {
                    // 是主页
                    case 1 : {
                        // toast(1)
                        // 点击生涯
                        robot.click(profile.carrer.carrerBlock.x, profile.carrer.carrerBlock.y);
                        sleep(1000);
                        robot.click(profile.carrer.carrerBlock.x, profile.carrer.carrerBlock.y);
                        sleep(3000);
                    
                        // 点击位置
                        robot.click(profile.carrer.careerPercent.x, profile.carrer.careerPercent.y);
                        sleep(2000);
                        // 选择关卡
                        robot.click(profile.carrer.euro.x, profile.carrer.euro.y);
                        sleep(1000);
                        carrerFlag = true;
                        break;
                    }
                    // 是Euro界面
                    case 3 : {
                        // toast(3)
                        carrerFlag = true;
                        break;
                    }
                    // 是结算界面
                    case 5 : {
                        // toast(5)
                        robot.back();
                        sleep(4000);
                        break;
                    }
                    // 否则模拟按下一次返回键
                    default : {
                        // toast("default")
                        robot.back();
                        sleep(8000);
                        break;
                    }
                }
            }
            toastLog("The beforeRun() ends.");
        },

        /**
         * 选择关卡
         * @param {Number} counter_carrer 已完成的生涯比赛次数
         */
        chooseMode() {
            
            sleep(1000);
            profile.carrer.swipeScreen();

            // toastLog("请在此处截图,截图时不要滑动屏幕");
            // exit();
            sleep(1000);
            // 选择第12关
            robot.click(profile.carrer.block12.x, profile.carrer.block12.y);
            sleep(2000);

            // 继续
            robot.click(profile.carrer.goldenPoint.x, profile.carrer.goldenPoint.y);
            toastLog("The chooseMode() ends.");
            sleep(2000);
        },

        /**
         * 选车
         */
        chooseCar() {
            for (let i = 0; i < carrerCars.length; i++) {
                let n = carrerCars[i];
                // toastLog(n);
                var carPoint = {
                    x: profile.carrer.firstCar.x + profile.carrer.distance.x * parseInt((n - 1) / 2),
                    y: profile.carrer.firstCar.y + profile.carrer.distance.y * ((n - 1) % 2)
                }
                // toastLog(carPoint.x + "," + carPoint.y);
                var img = captureScreen();
                var carcheckState = images.pixel(img, carPoint.x, carPoint.y);
                // toastLog(colors.toString(carcheckState));

                if (colors.equals(carcheckState, "#ffc3fb13")) {
                    robot.click(carPoint.x , carPoint.y);
                    break;
                }
            }
            sleep(4000);
            // 开始
            robot.click(profile.carrer.goldenPoint.x, profile.carrer.goldenPoint.y);
            toastLog("The chooseCar() ends.");
            sleep(6000);    
        },

        /**
         * 完成每局比赛之后的结算
         * @param {Number} counter_carrer 已完成的生涯比赛次数 
         */
        run(counter_carrer) {
            
            // 检查是否已经到达结算界面
            while (true) {
                if (carrerCheckState() == 5) {
                    break;
                }
                // 若未跑完,则点击氮气
                else {
                    robot.click(profile.carrer.width * 5 / 6, profile.carrer.height / 2);
                    sleep(1000);
                    // toastLog("isNext ?= " + checkState());
                }
            }
            var nowTime = new Date().getTime();
            counter_carrer++;
            toastLog(counter_carrer + "场生涯比赛已完成，平均用时" +parseInt((nowTime - startTime) / 1000 / counter_carrer)+"秒。\n即将开始下一场比赛。");
            return counter_carrer;
        }
    },

    // 多人
    mp: {
        /**
         * 非循环部分
         */
        beforeRun() {
            var Flag = false;
            // 判断是否是否已经到达开始界面
            while (!Flag){
                var mpStatus = mpCheckState();
                if (mpStatus != -1) {
                    timer = new Date().getTime();
                }
                else {
                    var now = new Date().getTime();
                    if ((now - timer) > 300000) {
                        toastLog("blocked!restart!");
                        timer = new Date().getTime();
                        restart();
                    }
                }

                switch(mpStatus){
                    case 0: {
                        toast('home');
                        if (true) {
                            robot.click(profile.mp.homeup.x, profile.mp.homeup.y);
                        } else {
                            robot.click(profile.mp.homedown.x, profile.mp.homedown.y);
                        }
                        sleep(2000);
                        break;
                    }
                    // error
                    case -2: {
                toastLog('error');
                          robot.back();
                        sleep(1000); 
                         break;
                    } 
                    case 2: {
                        robot.click(profile.mp.multiplayer.x, profile.mp.multiplayer.y);
                        sleep(2000);
                        break;
                        }                    // 游戏主界面
                    case 1: {
                        // 点击多人按钮
                        toast('index');
                        robot.click(profile.mp.multiplayer.x, profile.mp.multiplayer.y);
                        sleep(2000);
                        break;
                    }
                    // 多人开始界面
                    case 3: {
                        toast('start');
                        Flag = true;
                        break;
                    }
                    // 结算界面
                    case 5: {
                        toast('result');
                        robot.back();
                        sleep(3950);
                        break;
                    }
                    // 打满了 5 / 10 / 20 个奖杯
                    case 7: {
                        toast('claim');
                       // log('claim');
                        robot.click(profile.mp.claim.x, profile.mp.claim.y);
                        sleep(2000);
                        break;
                    }
                    // 否则暂时停止运行
                    default: {
                        toast('default');
                        robot.back();
                        sleep(5950);
                    }
                        
                }
                sleep(100);
            }
        },

        /**
         * 选车
         */
        chooseCar() {
            robot.click(profile.mp.start.x, profile.mp.start.y);
            sleep(4000);
            var FOUND = false;
            /*if (lastLevel != -1) {
                if (hasFuel(levelName[lastLevel])){
                    FOUND = true;
                }
            }*/

            // TODO  先验证上一次使用的车是否有油

            // 依次选车
            for (let i = 0; i < 5 && !FOUND; i++){
                if (status[i]){
                    if (hasFuel(levelName[i])){
                        FOUND = true;
                        lastLevel = levelName[i];
                    }
                }
            }
            
            if (FOUND) {
                //toastLog("lastCar = " + lastCar + "lastLevel = " + lastLevel );
                // 找到有油的车
                sleep(4000);
                robot.click(profile.common.goldenPoint.x, profile.common.goldenPoint.y);
                toastLog('Loading')
                return true;
            }
            else {
                lastCar = undefined;
                lastLevel = undefined;      
                toastLog("\n全部车辆无油。\n");
                return false;
            }
        },

        /**
         * 完成每局比赛之后的结算
         * @param {number} counter_mp 已完成的多人比赛次数 
         */
        run(counter_mp) {
            var left = 0;
            var runTime = new Date().getTime();
            
            // 检查是否已经到达结算界面
            while (true) {
                var nowTime = new Date().getTime();
                if ((nowTime - runTime) > 600000) {
                    toastLog("blocked!restart!");
                    restart();
                }
                
                if (mpCheckState() != -1) {
                    break;
                }
                // 若未跑完仍可点击氮气
                else {
                    robot.click(profile.common.width * 5 / 6, profile.common.height / 2);
                    if (left == 5){
                        left = 0;
                        robot.click(profile.common.width * 3 / 10, profile.common.height / 2);
                        sleep(400);
                        robot.click(profile.common.width * 3 / 10, profile.common.height / 2);
                    }
                    sleep(950);
                    // toastLog("isNext ?= " + checkState());
                }
            }
            toastLog(++counter_mp + "场多人比赛已完成，平均用时" +parseInt((nowTime - startTime)/1000/counter_mp)+"秒。\n即将开始下一场比赛。");
            sleep(2000)
        }
    },

    // 多人2
    mp2: {
        goingHome() {
            while (1){
                var mpStatus = mpCheckState();
                toastLog("mpStatus:" + mpStatus);
                if (mpStatus == 7) {
                robot.click(profile.mp.claim.x, profile.mp.claim.y);
                sleep(2000);
                continue;
                }
                if ((mpStatus == 1) || (mpStatus == 0)) {
                    break;
                }
                else {
                    sleep(2000);
                    robot.back();
                }    
            }                
            toastLog("goingHome!"); 
        },
        /**
         * 非循环部分
         */
        beforeRun() {
            var Flag = false;
            // 判断是否是否已经到达开始界面
            while (!Flag){
                var mpStatus = mpCheckState();
                if (mpStatus != -1) {
                    timer = new Date().getTime();
                }
                else {
                    var now = new Date().getTime();
                    if ((now - timer) > 300000) {
                        toastLog("blocked!restart!");
                        timer = new Date().getTime();
                        restart();
                    }
                }
                
                switch(mpStatus){
                    case 0: {
                        toast('home');
                        toastLog("x="+profile.mp.homedown.x+"y="+profile.mp.homedown.y);
                        robot.click(profile.mp.homedown.x, profile.mp.homedown.y);
                        sleep(2000);
                        break;
                    }
                       // error
                     case -2: {
                         toastLog('error');
                          robot.back();
                        sleep(1000);                           
                         break;            
                    } 

                    // 单个多人
                    case 2: {
                        robot.click(profile.mp.multiplayer.x, profile.mp.multiplayer.y);
                        sleep(1000);
                        break;
                    }
                        // 游戏主界面
                    case 1: {
                        // 点击多人按钮
                        toast('index');
                        robot.click(profile.mp.multiplayer.x, profile.mp.multiplayer.y);
                        sleep(4000);
                        break;
                    }
                        // 多人开始界面
                    case 3: {
                        toast('start');
                        Flag = true;
                        break;
                    }
                        // 结算界面
                    case 5: {
                        toast('result');
                        robot.back();
                        sleep(3950);
                        break;
                    }
                        // 打满了 5 / 10 / 20 个奖杯
                    case 7: {
                        toast('claim');
                        // log('claim');
                        robot.click(profile.mp.claim.x, profile.mp.claim.y);
                        sleep(2000);
                        break;
                    }
                        // 否则暂时停止运行
                    default: {
                        toast('default');
                        robot.back();
                        sleep(5950);
                    }
                        
                }
                sleep(100);
            }
        },
        
        /**
         * 选车
         */
        chooseCar() {        
    /* 下方多人选车策略多变，所以此处有多个开关以供选择 */
    // 不用选车直接开始
    if (0) {
            robot.click(profile.mp.start.x, profile.mp.start.y);
            sleep(4000);
            robot.click(profile.common.goldenPoint.x, profile.common.goldenPoint.y);
            return true;
        }
    // 使用上一次的车
        if (0) {
            robot.click(profile.common.goldenPoint.x, profile.common.goldenPoint.y);
            sleep(2000);
            if (up)
                robot.click(1100, 450);
            else
                robot.click(1100, 850);
            sleep(2000);
            robot.click(profile.common.goldenPoint.x, profile.common.goldenPoint.y);
            return true;
        }    
    // 常规选车
        if (1) {
            robot.click(profile.mp.start.x, profile.mp.start.y);
            sleep(4000);
            var FOUND = false;
    
            for (let i = lastLevel2; i < 10 && !FOUND; i++){
                if (status[i]){
                    if (hasFuel(levelName[i])){
                        FOUND = true;
                        lastLevel2 = i;
                    }
                }
            }
            
            if (FOUND){
                // 找到有油的车
                sleep(4000);
                robot.click(profile.common.goldenPoint.x, profile.common.goldenPoint.y);
                return true;
            }
            else {
                lastCar = 0;
                lastLevel2 = 5;      
    
                toastLog("\n无油。\nNo fuel.");
                return false;
            }
        }
    },      //end of chooseCar
            
        /**
         * 完成每局比赛之后的结算
         * @param {number} counter_mp 已完成的多人比赛次数
         */
        run(counter_mp) {
            var left = 0;
            var runTime = new Date().getTime();
            
            // 检查是否已经到达结算界面
            while (true) {
                var nowTime = new Date().getTime();
                if ((nowTime - runTime) > 600000) {
                    toastLog("blocked!restart!");
                    restart();
                }
                if (mpCheckState() != -1) {
                    break;
                }
                // 若未跑完仍可点击氮气
                else {
                    robot.click(profile.common.width * 5 / 6, profile.common.height / 2);
                    if (left == 5){
                        left = 0;
                        robot.click(profile.common.width * 3 / 10, profile.common.height / 2);
                        sleep(400);
                        robot.click(profile.common.width * 3 / 10, profile.common.height / 2);
                    }
                    sleep(950);
                    // toastLog("isNext ?= " + checkState());
                }
            }
            toastLog(++counter_mp + "场无人比赛已完成，平均用时" +parseInt((nowTime - startTime)/1000/counter_mp)+"秒。\n即将开始下一场比赛。");
        }
    },

    // CarHunt
    ch:{
        /**
         * 非循环部分, position=寻车赛事按钮的位置，0表示特殊赛事寻车
         */
        beforeRun(position) {
            var Flag = false;
            // 判断是否是否已经到达开始界面
            while (!Flag){
                var chStatus = chCheckState();
                if (chStatus != -1) {
                    timer = new Date().getTime();
                }
                else {
                    var now = new Date().getTime();
                    if ((now - timer) > 300000) {
                        toastLog("BLOCKED!\nRESTART!\n");
                        timer = new Date().getTime();
                        restart();
                    }
                }

                switch(chStatus){
                        // error
                    case -2: {
                        toastLog('error');
                        for (let j=0; j<1; j++) {
                            robot.back();
                            sleep(1000);
                        }
                        sleep(2000);
                        break;
                    }
    
                        // 游戏主界面
                    case 1: 
                        toast('index');                   
                        //点击每日按钮
                        if (position != 0) {
                            robot.click(profile.ch.daily.x, profile.ch.daily.y);
                        }
                        else {
                        // 点击特殊按钮
                            robot.click(profile.chSp.special.x, profile.chSp.special.y);
                        }
                        sleep(1000);
                        break
                    case 2: {                    
                        toastLog('special');
                        y = profile.common.height / 2;
                        // 右移到达第一个任务
                        for(let j = 0; j < profile.run.chSp.preSwipe; j++) {
                            toastLog("右移1次");
                            robot.swipe(550, y, 1800, y, 700);
                            sleep(1000);
                        }
                        
                        swipes = profile;
            
                        // 左移507像素
                        for(let j = 0; j < profile.run.chSp.group - 1; j++) {
                            toastLog("左移1次");
                            robot.swipe(1800, y, 1800 - profile.run.chSp.groupDistance[j], y, 700);
                            sleep(1000);
                        }
                        
                        
                        robot.click(profile.run.chSp.firstMissionX + profile.run.chSp.distance * (profile.run.chSp.mission - 1), y);
                        sleep(1000);
                        break;
                    sleep(2000);
                    break;
                    }
                        // 每日开始界面
                    case 3: 
                        toastLog('dayly');
                    
                        // 每日寻车
                        if (position != 0) {
                            // 寻车赛事按钮位置
                            var CarHuntX = profile.ch.firstEvent.x + profile.ch.interval * position;
                            var CarHuntY = profile.ch.firstEvent.y;
                            //toastLog("click"+CarHuntX+" "+CarHuntY+" "+profile.ch.firstEvent.x+" "+profile.ch.interval+" "+position);
                            robot.click(CarHuntX, CarHuntY);
                        //   toast('start');
                            sleep(2000);
                            break;
                        }
                        // 特殊寻车
                        else {
                           
                        }    
                        // 寻车开始界面
                    case 5: {
                        toast('carHunt');
                        sleep(2000);
                        Flag = true;
                        break;
                    }
                        // 否则暂时停止运行
                    default: {
                        toast('default');
                        robot.back();
                        sleep(5950);
                    }
                        
                }
                sleep(100);
            }
        },
        
        /**
         * 选车 
         * 利用最近一次使用的车辆会在屏幕中央的特性，不使用复杂的选车策略，
         * 请选择5个油、能够自动完成比赛并获得奖励的车，并在脚本运行前用该车辆跑一次，然后补满油
         * up参数为上/下车辆选择
         */
        
        chooseCar(up) {
            robot.click(profile.common.goldenPoint.x, profile.common.goldenPoint.y);
            sleep(4000);
            toastLog("up="+up);
            
            
            if (up) {
                toastLog(profile.ch.lastCarUp.x+","+profile.ch.lastCarUp.y);
                robot.click(profile.ch.lastCarUp.x, profile.ch.lastCarUp.y);
            } else {
                toastLog(profile.ch.lastCarDown.x+","+profile.ch.lastCarDown.y);
                robot.click(profile.ch.lastCarDown.x, profile.ch.lastCarDown.y);
            }
            sleep(2000);
            checkTouchDrive();
            
            robot.click(profile.common.goldenPoint.x, profile.common.goldenPoint.y);
            sleep(2000);
            return checkFuel() && checkTicket();
            //return true;
        },
        
        /**
         * 完成每局比赛之后的结算
         * @param {number} counter_mp 已完成的多人比赛次数
         */
        run(counter_mp) {
            var left = 0;
            
            // 检查是否已经到达结算界面
            while (true) {
                if (mpCheckState() != -1) {
                    break;
                }
                // 若未跑完仍可点击氮气
                else {
                    robot.click(profile.common.width * 5 / 6, profile.common.height / 2);
                    if (left == 5){
                        left = 0;
                        robot.click(profile.common.width * 3 / 10, profile.common.height / 2);
                        sleep(400);
                        robot.click(profile.common.width * 3 / 10, profile.common.height / 2);
                    }
                    sleep(950);
                    // toastLog("isNext ?= " + checkState());
                }
            }
            toastLog(++counter_mp + "场寻车比赛已完成，即将开始下一场比赛。");
        }
    }    
}

/**
 * 检查是否开启自动挡
 */
function checkTouchDrive() {
    if (!touchDrive) {
        var point = profile.common.touchDriveOn;
        var img = captureScreen();
        // 配置了才检查
        if (profile.common.touchDriveOn != undefined && !compareColor(img, profile.common.touchDriveOn)) {
            robot.click(profile.common.touchDriveOn.x, profile.common.touchDriveOn.y);
            sleep(2000)
        }
        
        // 无论是否配置都置为true
        touchDrive = true;
    }    
}

/**
 * 检查是否有油（是否出现补油界面）
 */
function checkFuel() {
    // 配置了才检查
    var img = captureScreen();
    if (profile.common.refillFuel != undefined && compareColor(img, profile.common.refillFuel)) {
        toastLog("无油退出");
        robot.click(profile.common.refillFuel.x, profile.common.refillFuel.y);
        return false;
    }
    return true;
}

/**
 * 检查是否有票（是否出现补票界面）
 */
function checkTicket() {
    // 配置了才检查
    var img = captureScreen();
    if (profile.common.refillTicket != undefined && compareColor(img, profile.common.refillTicket)) {
        toastLog("无票退出");
        robot.click(profile.common.refillTicket.x, profile.common.refillTicket.y);
        return false;
    }
    return true;
}

/**
 * 控制完成一个段位的选车
 * @param {string} level 段位
 */
function hasFuel(level) {
    // log('checkFuel(' + level + ')');
    var cars;
    var carFuel;
    var levelPoint;
    // 给cars[]赋值
    switch(level) {

        case 'legend': {
            cars = carPick.legend;
            levelPoint = {
                x : profile.mp.legend.x,
                y : profile.mp.legend.y
            };
            break;
        }

        case 'platinum': {
            cars = carPick.platinum;
            levelPoint = {
                x : profile.mp.platinum.x,
                y : profile.mp.platinum.y
            };
            break;
        }

        case 'gold': {
            cars = carPick.gold;
            levelPoint = {
                x : profile.mp.gold.x,
                y : profile.mp.gold.y
            };
            break;
        }

        case 'silver': {
            cars = carPick.silver;
            levelPoint = {
                x : profile.mp.silver.x,
                y : profile.mp.silver.y
            };
            break;
        }

        case 'bronze': {
            cars = carPick.bronze;
            levelPoint = {
                x : profile.mp.bronze.x,
                y : profile.mp.bronze.y
            };
            break;
        }
        
        case 'bronze2': {
            cars = carPick.bronze2;
            levelPoint = {
                x : profile.mp.bronze.x,
                y : profile.mp.bronze.y
            };
            break;
        }

        default: {
            cars = [4, 3, 2, 1];
            levelPoint = {
                x : profile.mp.bronze.x,
                y : profile.mp.bronze.y
            };
        }

    }
    robot.click(levelPoint.x, levelPoint.y);
    sleep(2000);
    var theCar = -1;
    // 只配置一辆车默认无限油模式
    if (cars.length == 1) {
        theCar = cars[0]
    } else {
        toastLog('开始扫描' + level + '段位车辆');
        carFuel = scanFuel(cars);
        toastLog(level + '段位车辆扫描完成');
        theCar = compareFuel(cars, carFuel);
    }
    if(theCar == -1) {
        toastLog(level + '段位车辆全部无油');
        return false;
    } else {
        toastLog('\n' + level + '段位第' + theCar + '号车辆有油\n正在选取该车');
        lastCar = theCar;;
        robot.click(levelPoint.x, levelPoint.y);
        sleep(2000)
        if (theCar > 6) {
            horizontalSwipe(parseInt((theCar - 5) / 2));
            robot.click(profile.mp.firstCar.x + 2 * profile.mp.distance.x,
                profile.mp.firstCar.y + parseInt( (theCar - 1) % 2 ) * profile.mp.distance.y);
        } else {
            robot.click(profile.mp.firstCar.x + parseInt((theCar - 1) / 2) * profile.mp.distance.x, 
                profile.mp.firstCar.y + parseInt( (theCar - 1) % 2 ) * profile.mp.distance.y);
        }
        return true;
    }
}

/**
 * 扫描用户所选的车辆
 * 首先根据最大数算出需要滑动三列的次数及起始滑动单列次数，
 * 整页（3列）滑动前先滑动单列，保证在最大数大于6时最后一辆车扫描时在最后一列
 * @param {array} cars 用户自定义的选车数组
 */
function scanFuel(cars) {    
    // 最靠后的车辆
    var maxCar = cars.reduce((a, b) => {
        return a > b ? a : b
    });
    // 最靠前的车辆序号
    minCar = cars.reduce((a, b) => {
        return a < b ? a : b
    });

    // 有几次移动整个屏幕（三列），前三列不需要移动，第四第五列仅需移动单列即可
    var totalThreeCol = parseInt((maxCar - 5) / 6);
    //toastLog("totalThreeCol:" + totalThreeCol);
    // 整页滑动前滑动单列数
    var preSingleCol = maxCar > 6 ? parseInt(((maxCar + 1) / 2) % 3) : 0;
    //toastLog("preSingleCol:" + preSingleCol);
    // 是否跳过单列滑动再扫描油量
    var skipSingleCol = minCar > preSingleCol * 2;
    //toastLog("skipSingleCol:" + skipSingleCol);
    // 扫描前跳过的页数
    var skipThreeCol = skipSingleCol ? 0 : parseInt((minCar - preSingleCol * 2 - 1) / 6)
    //toastLog("skipThreeCol:" + skipThreeCol);

    // 建立油量数组
    var carFuel = new Array(maxCar);

    // 不跳过单列移动
    if (!skipSingleCol) {
        judgeThisScreenFuel(0, carFuel);
    }

    // 滑动跳过单列偏移
    horizontalSwipe(preSingleCol);
    // 滑动跳过的页
    for (let i = 0; i < skipThreeCol; i++) {
        horizontalSwipe(3);
    }

    // 扫描前跳过的列数
    var offsetCols = preSingleCol + 3 * skipThreeCol;

    judgeThisScreenFuel(offsetCols, carFuel);
    // 扫描三列
    for (let i = 0; i < totalThreeCol - skipThreeCol; i++) {
        horizontalSwipe(3);
        judgeThisScreenFuel(offsetCols + 3 * (i + 1), carFuel);
    }
    
    //toastLog("选车数组：" + cars + "， 总数：" + cars.length);
    //toastLog("车油数组：" + carFuel + "总数：" + carFuel.length);
    // 返回油量表
    return carFuel;
}

/**
 * 对比用户的选择和实际情况，选择优先级最高的有油的车，返回是否找到
 * @param {array} cars 用户自定义的车辆使用数组
 * @param {array} carFuel 记录车辆有无油的数组
 */
function compareFuel(cars, carFuel) {
    for (let i = 0; i < cars.length; i++) {
        if(carFuel[cars[i]]) {
            return cars[i];
        }
    }
    return -1;
}

/**
 * 判断屏幕中当前页中的车辆有油与否
 * @param {number} nCol 偏移列数
 * @param {carFuel} carFuel 油量数组
 */
function judgeThisScreenFuel(nCol, carFuel) {
    var img = captureScreen();

    for (let i = 1; i < 7; i++) {
        n = 2 * nCol + i
        var carPoint = {
            x: profile.mp.firstCar.x + profile.mp.distance.x * parseInt((i - 1) / 2),
            y: profile.mp.firstCar.y + profile.mp.distance.y * ((i - 1) % 2),
            name: profile.mp.firstCar.name + "_" + n,
            colors: profile.mp.firstCar.colors,
            isDebug: profile.mp.firstCar.isDebug
        }
        //toastLog("n = " + n);
        carFuel[n] = compareColor(img, carPoint);
        //toastLog("carFule = " + carFuel);
    }
}
/* function judgeThisScreenFuel(n) {
    var carPoint = {
        x: profile.mp.firstCar.x + profile.mp.distance.x * parseInt((n - 1) / 2),
        y: profile.mp.firstCar.y + profile.mp.distance.y * ((n - 1) % 2)
    }
    toastLog("car num: " + n)
    toastLog(carPoint.x + "," + carPoint.y);
    var img = captureScreen();
    var carcheckState = images.pixel(img, carPoint.x, carPoint.y);
    toastLog(colors.toString(carcheckState));
    
    if (colors.equals(carcheckState, "#ffc3fb13")) {
        return true;
    } else {
        return false;
    }
} */

/**
 * 向左滑动指定列数
 * @param {number} swipes 列数
 */
function horizontalSwipe(swipes) {
    for(let i = 0; i < swipes; i++) {
        // toast("作揖1次");
        robot.swipe(profile.mp.swipeStart.x, profile.mp.swipeStart.y, profile.mp.swipeEnd.x, profile.mp.swipeEnd.y, 700);
        sleep(1000);
    }
}

/**
 * 生涯状态机
 */
function carrerCheckState() {
    /* var img = captureScreen();
    
    var token = images.pixel(img, profile.carrer.token.x, profile.carrer.token.y);
    var isToken = colors.equals(token, "#0090ff");

    var credit = images.pixel(img, profile.carrer.credit.x, profile.carrer.credit.y);
    var isCredit = colors.isSimilar(credit, "#ffc600", 2, "diff");

    var goldenPoint = images.pixel(img, profile.carrer.goldenPoint.x, profile.carrer.goldenPoint.y);
    var isGoldenPoint = colors.equals(goldenPoint, "#c3fb12")

    var questionMark = images.pixel(img, profile.carrer.questionMark.x, profile.carrer.questionMark.y);
    var isQuestionMark = colors.equals(questionMark, "#ff0054")

    var recommendedPoints = images.pixel(img, profile.carrer.recommendedPoints.x, profile.carrer.recommendedPoints.y);
    var isRecommendedPoints = colors.equals(recommendedPoints, "#c3fc0f") || colors.equals(recommendedPoints, "#ff0054")

    // 1 主页
    if (!isGoldenPoint && isToken && isCredit && !isQuestionMark)
        return 1;
    // 3 EURO
    if (isRecommendedPoints && isQuestionMark)
        return 3;
    // 5 结算
    if (isGoldenPoint && !isRecommendedPoints)
        return 5;
    
    if (0) {}
        toastLog("goldenPoint is " + colors.toString(goldenPoint));
        toastLog("token is " + colors.toString(token));
        toastLog("credit is " + colors.toString(credit));
        toastLog("recommendedPoints is " + colors.toString(recommendedPoints));
    }  
    return -1; */
}

/**
 * 多人状态机
 */
function mpCheckState() {
    var state = -1;

    var img = captureScreen();
    
    // 代币
    var isToken = compareColor(img, profile.common.token);

    // 积分
    var isCredit = compareColor(img, profile.common.credit);
    
    // 多人开始按钮
    var isStart = compareColor(img, profile.mp.start);

    // 继续按钮
    var isNext = compareColor(img, profile.common.goldenPoint);

    // 多人按钮
    var isDuoren = compareColor(img, profile.mp.multiplayer);

    // 返回按钮
    var isBack = compareColor(img, profile.common.back) && compareColor(img, profile.common.backward);
        
    // 领取5-10-20
    var isClaim = compareColor(img, profile.mp.mpackage1) && compareColor(img, profile.mp.mpackage2);

    // 多人选取
    var isHomeup = compareColor(img, profile.mp.homeup);
    var isHomedown = compareColor(img, profile.mp.homedown);

    // 各种出错
    var iserror = compareColor(img, profile.common.errorleft) && compareColor(img, profile.common.errorright);

        
    // -2 error
    if (iserror)
        state = -2;
    // 0 Home
    else if (isToken && isCredit && !isBack && !isStart && !isClaim && isHomedown && isHomeup)
        state = 0;
    // 1 主页
    else if (isToken && isCredit && !isBack && !isDuoren && !isStart && !isClaim)
        state = 1;
    // 2 单个多人
    else if (isToken && isCredit && isDuoren && !isBack && !isClaim)
        state = 2;
    // 3 多人开始
    else if (isToken && isCredit && isBack && isStart)
        state = 3;
    // 5 结算
    else if (isNext && !isCredit && !isToken)
        state = 5;
    // 7 5/10/20奖杯包
    else if (isClaim)
        state = 7;
    
    if (profile.run.mp.isDebug) {
        var ds="";
        if (isToken)
            ds += "代币1.";
        if (isCredit)
            ds += "积分.";
        if (isStart)
            ds += "开始.";
        if (isBack)
            ds += "回退.";
        if (isNext)
            ds += "继续.";
        if (isDuoren)
            ds +="多人";
        else
            ds +="default";

        toastLog(ds);
        toastLog("mp return state: " + state);
    }
    
    return state;
}

/**
 * 寻车状态机
 */
function chCheckState() {
    var state = -1;
    
    var img = captureScreen();
    
    // 代币
    var isToken = compareColor(img, profile.common.token);
    
    // 积分
    var isCredit = compareColor(img, profile.common.credit);
    
    // 每日赛事买票的➕号
    var hasPlus = compareColor(img, profile.ch.plusLeft) && compareColor(img, profile.ch.plusRight);

    // 寻车开始按钮
    var isNext = compareColor(img, profile.common.goldenPoint);

    // 每日按钮
    var isDaily = compareColor(img, profile.ch.daily);

    // 特殊按钮
    var isSpecial = compareColor(img, profile.chSp.plusLeft) && compareColor(img, profile.chSp.plusRight);
    
    // 返回按钮
    var isBack = compareColor(img, profile.common.back) && compareColor(img, profile.common.backward);
    
    // 各种出错
    var iserror = compareColor(img, profile.common.errorleft) && compareColor(img, profile.common.errorright);
    
     // 2 error
    if (iserror)
        state = -2;
    // 1 主页
    else if (isToken && isCredit && !isBack && !hasPlus && !isNext)
        state = 1;
    // 2 特别赛事
    else if (isToken && isCredit && !hasPlus && isSpecial && isBack)
       state = 2;
    // 3 每日开始
    else if (isToken && isCredit && isBack && hasPlus)
        state = 3;
    // 5 寻车开始
    else if (isToken && isCredit && isBack && isNext)
        state = 5; 
    
    if (profile.run.ch.isDebug) {
        var ds="";
        if (isCredit)
        ds += "Cre";
        if (isToken)
        ds += "Tok";
        if (isBack)
        ds += "Back";
        if (isNext)
        ds += "next";
        if (hasPlus)
        ds += "hasPlus";
        else
        ds += "default";

        toastLog(ds);
        toastLog("ch return state: " + state);
    } 

    return state;
}

/**
 * 比较颜色
 * @param {img} img 抓取的图片
 * @param {object} point 待比较的点
 */
function compareColor(img, point) {
    var isDebug = false;
    if (point.isDebug != undefined && point.isDebug != false) {
        isDebug = true;
    }
        
    if (isDebug) {
        log("compare point color, point is " + JSON.stringify(point));
    }    
    
    var p = images.pixel(img, point.x, point.y);
    
    
    var result;
    var color;
    for (let i = 0; i < point.colors.length; i++) {
        color = point.colors[i];
        if (isDebug) {
            log("current color is " + color);
        }
        if (point.accurate != undefined && point.accurate != false) {
            result = colors.equals(p, color);
        } else {
            result = colors.isSimilar(p, color);
        }
        if (result) {
            break;
        }
    }
    
    if (isDebug) {
        log("compare result is " + result);
        log("the actual color is " + colors.toString(p));
    }
    
    return result;
}

/**
 * 重启游戏
 */
function restart() {
    
    var c = 0;

    robot.home();

    sleep(1000);
    openAppSetting(getPackageName("极光"));

    while(!click("结束运行")) {
        if (c++ > 3) {
            toastLog("kill V timeout!");
            break;
        }
        sleep(5000);
    //    toastLog("waiting...endv");
    }

    sleep(500);
    while(!click("确定")) {
        if (c++ > 3) {
            toastLog("confirm V timeout!");
            break;
        }
    //    toastLog("waiting...yesv");
        sleep(5000);
    }

    sleep(1000);
    robot.back();
        
    sleep(1000);
    openAppSetting(getPackageName("狂野飙车9"));
    while(!click("结束运行")) {
        if (c++ > 3) {
            toastLog("kill A timeout!");
            break;
        }
        sleep(5000);
    //    toastLog("waiting...enda");
        
    }

    sleep(500);
    while(!click("确定")) {
        if (c++ > 3) {
            toastLog("confirm A timeout!");
            break;
        }
    //    toastLog("waiting...yesa");
        sleep(5000);
    }

    sleep(1000);
    robot.back();

    // home
    for (let i=0; i<4; i++) {
    robot.home();
    sleep(1000);
    }

    click("极光");

    sleep(10000);

    while (!textContains("点击链接").exists()) {
        if (c++ > 3) break;
        sleep(5000);
    }

    click("点击连接");
        
    sleep(10000);    
    while (!textContains("轻触断开").exists()) {
        if (c++ > 3) break;
        sleep(5000);
    }

    sleep(1000);

    robot.home();

    sleep(2000);

    click("狂野飙车9");

    sleep(60000);

}
