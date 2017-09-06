
window.onload = function(){
    function circle(){
        var showData = [];
        var positionData = [];
        var radius = 0;
        //获取单个节点的定位
        var getNode = function(theta,phi,index){
            var z = radius*Math.sin(theta)*Math.cos(phi);
            var x = radius*Math.sin(theta)*Math.sin(phi)+radius;
            var y = radius*Math.cos(theta)+radius;
            var data = {
                left:x+'px',
                top:y-30+'px',
                x:theta-Math.PI/2,
                y:phi,
                z:(index==(length-1))?1:z
            };
            if(!index || index==(length-1)){
                data.left = x - 30 + 'px';
            }
            return data;
        };
        //获取n个小于max的随机数
        function getRandom(max,n){
            var randomArr = [];
            for(var i = 0;i<n;i++){
                var random = parseInt(Math.random()*max+1);
                if(randomArr.indexOf(random) === -1){
                    randomArr.push(random);
                }else{
                    i--;
                }
            }
            return randomArr;
        }
        //获取球体定位信息
        function getPosition(ballLength){
            var angles = [];
            //根据外层容器的宽高，调整球形ball容器的宽高以及定位
            var outH = document.getElementById('out').offsetHeight;
            var width = document.getElementById('out').offsetWidth;
            if(width>outH){
                width = outH;
            }
            width = width - 50;
            radius = width/2;
            document.getElementsByClassName('ball')[0].style.width = width+'px';
            document.getElementsByClassName('ball')[0].style.height = width + 'px';

            var ballData = [];
            var dataLength = ballLength;
            var baseArr = [1,3,5,7,5,3,1];
            if(dataLength>50){
                var baseArr = [1,3,5,7,9,7,5,3,1];
            }
            var total = 0;
            for(var i=0;i<baseArr.length;i++){
                total = total + baseArr[i];
            }
            total = total - 2;//去掉顶部两个点
            var pie = parseInt((dataLength - 2)/total);
            if((dataLength - 2)%total){
                pie = pie + 1;
            }
            var length = pie * total + 2;
            //不一定要展示的数据，就能平铺组成一个圆，部分节点要显示默认值
            //var emptyArr = getRandom(length,length - dataLength);
            //for(var i=0;i<emptyArr.length;i++){
            //    ballData.splice(emptyArr[i],0,{
            //        imgUrl:'./images/sample-profile-01.jpg'
            //    });
            //}
            for(var i=0;i<length;i++){
                var item = {
                    imgUrl:'./images/sample-profile-'+parseInt(Math.random()*10+1)+'.jpg'
                };
                ballData.push(item);
            }
            showData = ballData;
            //根据基数，计算圆的各层分别有多少个节点
            var yArr = [];
            for(var i=0;i<baseArr.length;i++){
                if(!i){
                    yArr.push(1);
                }else if(i<baseArr.length-1){
                    yArr.push(yArr[i-1]+ baseArr[i]*pie);
                }else{
                    yArr.push(yArr[i-1]);
                }
            }
            var start = 0;
            var end = 0;
            var theta=0;
            var phi=0;
            positionData = [];
            for(var y=0;y<yArr.length;y++){
                end = yArr[y];
                if(!y){
                    theta=0;
                    phi=0;
                    positionData.push(getNode(theta,phi,0));
                }else if(y<yArr.length-1){
                    for(var x=start;x<end;x++){
                        theta = Math.PI/(yArr.length -1)*y;
                        phi = Math.PI*2/(end - start)*(x-1);
                        positionData.push(getNode(theta,phi,x));
                    }
                }else{
                    theta=Math.PI;
                    phi=0;
                    positionData.push(getNode(theta,phi,end));
                }
                start = yArr[y];
            }
        }
        //初始化
        this.init = function(data){
            getPosition(data);
            var ballTag = document.getElementById('ball');
            ballTag.innerHTML = '';
            //动态生成球体
            for(var i = 0;i<positionData.length;i++){
                var item = positionData[i];
                var liTag = document.createElement('li');
                liTag.style.left = item.left;
                liTag.style.top = item.top;
                liTag.style.transform = 'translateZ('+item.z+'px) rotateY('+item.y+'rad) rotateX('+item.x+'rad)';
                var imgTag = document.createElement('img');
                imgTag.src = showData[i].imgUrl;
                liTag.appendChild(imgTag);
                ballTag.appendChild(liTag);
            }
        }
    };
    var circle = new circle();
    circle.init(100);
    var rondNum = 3;
    var numm = 0;
    function rond(){
        if(!rondNum){
            numm = 0;
            return;
        }
        numm =numm + rondNum;
        document.getElementsByClassName('ball')[0].style.transform = 'rotateY('+numm+'deg) rotateX('+numm+'deg)';

    }
    setInterval(function(){
        rond();
    }, 100);
    window.onresize = function(){
        circle.init(100);
    }
};

