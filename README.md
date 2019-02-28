# Matrix4.js
4x4矩阵变换，主要用于空间坐标变换计算。4X4 matrix transformation is mainly used for space coordinate transformation calculation.

如何使用？
--------------------------------------
如果你开发的是一个web项目，直接在页面引入即可：

```html
<script src="./build/Matrix4.js" type="text/javascript"></script>
```

如果你想通过npm方式管理，首先你需要通过命令行安装：

```bash
npm install --save matrix4.js
```

安装好了，然后调用：
```js
import Matrix4 from 'matrix4.js';
```

接口API
--------------------------------------
```js
var matrix4=Matrix4(initMatrix4);
```

Matrix4是一个列主序存储的4x4矩阵，使用该矩阵对象的第一步是像上面那样获取该对象，参数initMatrix4可选，你可以传递一个初始化矩阵或默认采用单位矩阵E初始化。

基本运算
-------
> value
```js
var val=matrix4.value();
```
返回matrix4当前记录的内部矩阵，比如采用默认值初始化的矩阵对象，打印结果如下：

```js
(16) [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
```

> multiply

```js
matrix4.multiply(newMatrix4[, flag]);
```

二个矩阵相乘，第一个参数应该是一个和value打印出来一样格式的一维数组，列主序存储。返回矩阵对象。

flag默认false，可不传，表示左乘，即newMatrix4 × matrix4，如果设置flag为true，表示右乘。

> inverse

```js
matrix4.inverse();
```

把matrix4维护的矩阵求逆矩阵。返回矩阵对象。

> use

```js
var position=matrix4.use(x, y, z, w);
```

矩阵的目的是对坐标进行变换，use方法返回齐次坐标(x, y, z, w)经过matrix4矩阵变换后的坐标值。其中z和w可以不传递，默认0和1，返回的坐标值是一个齐次坐标。

坐标变换
-----

坐标变换并不是直接计算出新的坐标，而是求解出记录着一系列变换的变换矩阵，计算出的变换矩阵应用到点上就可以求解出点变换后的位置。

> move

```js
matrix4.move(dis, a, b, c);
```

沿着向量(a, b, c)方向移动距离dis，其中c可以不传，默认0。返回变换矩阵。

> scale

```js
matrix4.scale(xTimes, yTimes, zTimes, cx, cy, cz);
```

以点(cx, cy, cz)为中心，分别在x、y和z方向上缩放xTimes、yTimes和zTimes倍，其中cx、cy和cz都可以不传递，默认0。返回变换矩阵。

>rotate

```js
matrix4.rotate(deg, a1, b1, c1, a2, b2, c2);
```

围绕射线(a1, b1, c1) -> (a2, b2, c2)旋转deg度，旋转单位为弧度，方向由右手法则确定。返回变换矩阵。

a1、b1、c1、a2、b2和c2这6个值在设置的时候，不是一定需要全部设置，有以下可选：

第一种：全部设置；
第二种：只设置了a1和b1，表示在xoy平面围绕（a1, b1）旋转；
第三种：只设置三个点(设置不足六个点都认为只设置了三个点)，表示围绕从原点出发的射线旋转。

### 免责声明

*   项目中部分数据（如图片等）来自互联网，如果侵犯到对应权益者请联系我们，方便我们及时删除！
*   本项目保留贡献者全部权利，发生的任何纠纷，本项目作者和维护人概不负责，如有侵权，请及时和我们取得联系。
