/*!
*  @license Matrix4.js v0.1.1
* (c) 2019 yelloxing git+https://github.com/yelloxing/Matrix4.js.git
* License: MIT
*/
(function (global, factory) {

    'use strict';

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory();
    } else {
        global.Matrix4 = factory();
    }

})(typeof window !== "undefined" ? window : this, function (undefined) {

    'use strict';

    /**
 * 类型判断
 * ==========================
 */

// 判断是否是数字
var _is_number = function (param) {
  return typeof param === 'number';
};// 二个4x4矩阵相乘
// 或矩阵和齐次坐标相乘
var _multiply = function (matrix4, param) {
    var newParam = [], i, j;
    for (i = 0; i < 4; i++)
        for (j = 0; j < param.length / 4; j++)
            newParam[j * 4 + i] =
                matrix4[i] * param[j * 4] +
                matrix4[i + 4] * param[j * 4 + 1] +
                matrix4[i + 8] * param[j * 4 + 2] +
                matrix4[i + 12] * param[j * 4 + 3];
    return newParam;
};

// 求一个矩阵的行列式（方阵）
// 4x4 或 3x3
var _determinant = function (matrixX) {

    // 3x3
    if (matrixX.length == 9) {
        return matrixX[0] * matrixX[4] * matrixX[8] -
            matrixX[0] * matrixX[7] * matrixX[5] -
            matrixX[3] * matrixX[1] * matrixX[8] +
            matrixX[3] * matrixX[7] * matrixX[2] +
            matrixX[6] * matrixX[1] * matrixX[5] -
            matrixX[6] * matrixX[4] * matrixX[2];
    }

    // 4x4
    else if (matrixX.length == 16) {
        return matrixX[0] * _determinant([
            matrixX[5], matrixX[6], matrixX[7],
            matrixX[9], matrixX[10], matrixX[11],
            matrixX[13], matrixX[14], matrixX[15]
        ]) -
            matrixX[4] * _determinant([
                matrixX[1], matrixX[2], matrixX[3],
                matrixX[9], matrixX[10], matrixX[11],
                matrixX[13], matrixX[14], matrixX[15]
            ]) +
            matrixX[8] * _determinant([
                matrixX[1], matrixX[2], matrixX[3],
                matrixX[5], matrixX[6], matrixX[7],
                matrixX[13], matrixX[14], matrixX[15]
            ]) -
            matrixX[12] * _determinant([
                matrixX[1], matrixX[2], matrixX[3],
                matrixX[5], matrixX[6], matrixX[7],
                matrixX[9], matrixX[10], matrixX[11]
            ]);
    }

    // 其它情况
    else {
        throw new Error('Unsupported parameter!');
    }

};

// 求一个4x4矩阵的全部代数余子式Aij
var _algebraic_cofactor = function (matrix4) {
    return [

        // 0
        _determinant([
            matrix4[5], matrix4[6], matrix4[7],
            matrix4[9], matrix4[10], matrix4[11],
            matrix4[13], matrix4[14], matrix4[15]
        ]),

        // 1
        -_determinant([
            matrix4[4], matrix4[6], matrix4[7],
            matrix4[8], matrix4[10], matrix4[11],
            matrix4[12], matrix4[14], matrix4[15]
        ]),

        // 2
        _determinant([
            matrix4[4], matrix4[5], matrix4[7],
            matrix4[8], matrix4[8], matrix4[11],
            matrix4[12], matrix4[13], matrix4[15]
        ]),

        // 3
        -_determinant([
            matrix4[4], matrix4[5], matrix4[6],
            matrix4[8], matrix4[9], matrix4[10],
            matrix4[12], matrix4[13], matrix4[14]
        ]),

        // 4
        -_determinant([
            matrix4[1], matrix4[2], matrix4[3],
            matrix4[9], matrix4[10], matrix4[11],
            matrix4[13], matrix4[14], matrix4[15]
        ]),

        // 5
        _determinant([
            matrix4[0], matrix4[2], matrix4[3],
            matrix4[8], matrix4[10], matrix4[11],
            matrix4[12], matrix4[14], matrix4[15]
        ]),

        // 6
        -_determinant([
            matrix4[0], matrix4[1], matrix4[3],
            matrix4[8], matrix4[9], matrix4[11],
            matrix4[12], matrix4[13], matrix4[15]
        ]),

        // 7
        _determinant([
            matrix4[0], matrix4[1], matrix4[2],
            matrix4[8], matrix4[9], matrix4[10],
            matrix4[12], matrix4[13], matrix4[14]
        ]),

        // 8
        _determinant([
            matrix4[1], matrix4[2], matrix4[3],
            matrix4[5], matrix4[6], matrix4[7],
            matrix4[13], matrix4[14], matrix4[15]
        ]),

        // 9
        -_determinant([
            matrix4[0], matrix4[2], matrix4[3],
            matrix4[4], matrix4[6], matrix4[7],
            matrix4[12], matrix4[14], matrix4[15]
        ]),

        // 10
        _determinant([
            matrix4[0], matrix4[1], matrix4[3],
            matrix4[4], matrix4[5], matrix4[7],
            matrix4[12], matrix4[13], matrix4[15]
        ]),

        // 11
        -_determinant([
            matrix4[0], matrix4[1], matrix4[2],
            matrix4[4], matrix4[5], matrix4[6],
            matrix4[12], matrix4[13], matrix4[14]
        ]),

        // 12
        -_determinant([
            matrix4[1], matrix4[2], matrix4[3],
            matrix4[5], matrix4[6], matrix4[7],
            matrix4[9], matrix4[10], matrix4[11]
        ]),

        // 13
        _determinant([
            matrix4[0], matrix4[2], matrix4[3],
            matrix4[4], matrix4[6], matrix4[7],
            matrix4[8], matrix4[10], matrix4[11]
        ]),

        // 14
        -_determinant([
            matrix4[0], matrix4[1], matrix4[3],
            matrix4[4], matrix4[5], matrix4[7],
            matrix4[8], matrix4[9], matrix4[11]
        ]),

        // 15
        _determinant([
            matrix4[0], matrix4[1], matrix4[2],
            matrix4[4], matrix4[5], matrix4[6],
            matrix4[8], matrix4[9], matrix4[10]
        ])
    ];
};

// 求一个4x4矩阵的伴随矩阵A*
var _adjoint_matrix = function (matrix4) {
    var algebraic_cofactor = _algebraic_cofactor(matrix4);
    return [
        algebraic_cofactor[0], algebraic_cofactor[4], algebraic_cofactor[8], algebraic_cofactor[12],
        algebraic_cofactor[1], algebraic_cofactor[5], algebraic_cofactor[9], algebraic_cofactor[13],
        algebraic_cofactor[2], algebraic_cofactor[6], algebraic_cofactor[10], algebraic_cofactor[14],
        algebraic_cofactor[3], algebraic_cofactor[7], algebraic_cofactor[11], algebraic_cofactor[15]
    ];
};

// 求一个4x4矩阵的逆矩阵A'
var _inverse_matrix = function (matrix4) {
    var adjoint = _adjoint_matrix(matrix4),
        determinant = _determinant(matrix4),
        flag, newMatrix4 = [];
    if (determinant == 0) throw new Error('This matrix is irreversible!');
    for (flag = 0; flag < 16; flag++)
        newMatrix4[flag] = adjoint[flag] / determinant;
    return newMatrix4;
};
// 针对任意射线(a1,b1,c1)->(a2,b2,c2)
// 计算出二个变换矩阵
// 分别为：任意射线变成OZ轴变换矩阵 + OZ轴变回原来的射线的变换矩阵
var _transform = function (a1, b1, c1, a2, b2, c2) {

    if (_is_number(a1) && _is_number(b1)) {

        // 如果设置二个点
        // 表示二维上围绕某个点旋转
        if (!_is_number(c1)) {
            c1 = 0; a2 = a1; b2 = b1; c2 = 1;
        }
        // 只设置三个点(设置不足六个点都认为只设置了三个点)
        // 表示围绕从原点出发的射线旋转
        else if (!_is_number(a2) || !_is_number(b2) || !_is_number(c2)) {
            a2 = a1; b2 = b1; c2 = c1; a1 = 0; b1 = 0; c1 = 0;
        }

        if (a1 == a2 && b1 == b2 && c1 == c2) throw new Error('It\'s not a legitimate ray!');

        var sqrt1 = Math.sqrt((a2 - a1) * (a2 - a1) + (b2 - b1) * (b2 - b1)),
            cos1 = sqrt1 != 0 ? (b2 - b1) / sqrt1 : 1,
            sin1 = sqrt1 != 0 ? (a2 - a1) / sqrt1 : 0,

            b = (a2 - a1) * sin1 + (b2 - b1) * cos1,
            c = c2 - c1,

            sqrt2 = Math.sqrt(b * b + c * c),
            cos2 = sqrt2 != 0 ? c / sqrt2 : 1,
            sin2 = sqrt2 != 0 ? b / sqrt2 : 0;

        return [

            // 任意射线变成OZ轴变换矩阵
            [
                cos1, cos2 * sin1, sin1 * sin2, 0,
                -sin1, cos1 * cos2, cos1 * sin2, 0,
                0, -sin2, cos2, 0,
                b1 * sin1 - a1 * cos1, c1 * sin2 - a1 * sin1 * cos2 - b1 * cos1 * cos2, -a1 * sin1 * sin2 - b1 * cos1 * sin2 - c1 * cos2, 1
            ],

            // OZ轴变回原来的射线的变换矩阵
            [
                cos1, -sin1, 0, 0,
                cos2 * sin1, cos2 * cos1, -sin2, 0,
                sin1 * sin2, cos1 * sin2, cos2, 0,
                a1, b1, c1, 1
            ]

        ];
    } else {
        throw new Error('a1 and b1 is required!');
    }
};
// 在(a,b,c)方向位移d
var _move = function (d, a, b, c) {
    c = c || 0;
    var sqrt = Math.sqrt(a * a + b * b + c * c);
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        a * d / sqrt, b * d / sqrt, c * d / sqrt, 1
    ];
};
// 围绕0Z轴旋转
// 其它的旋转可以借助transform实现
// 旋转角度单位采用弧度制
var _rotate = function (deg) {
    var sin = Math.sin(deg),
        cos = Math.cos(deg);
    return [
        cos, sin, 0, 0,
        -sin, cos, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];
};
// 围绕圆心x、y和z分别缩放xTimes, yTimes和zTimes倍
var _scale = function (xTimes, yTimes, zTimes, cx, cy, cz) {
    cx = cx || 0; cy = cy || 0; cz = cz || 0;
    return [
        xTimes, 0, 0, 0,
        0, yTimes, 0, 0,
        0, 0, zTimes, 0,
        cx - cx * xTimes, cy - cy * yTimes, cz - cz * zTimes, 1
    ];
};


    /**
     * 4x4矩阵
     * 列主序存储
     */
    return function (initMatrix4) {

        var matrix4 = initMatrix4 || [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];

        var matrix4Obj = {

            // 移动
            "move": function (dis, a, b, c) {
                matrix4 = _multiply(_move(dis, a, b, c), matrix4);
                return matrix4Obj;
            },

            // 旋转
            "rotate": function (deg, a1, b1, c1, a2, b2, c2) {
                var matrix4s = _transform(a1, b1, c1, a2, b2, c2);
                matrix4 = _multiply(_multiply(_multiply(matrix4s[1], _rotate(deg)), matrix4s[0]), matrix4);
                return matrix4Obj;
            },

            // 缩放
            "scale": function (xTimes, yTimes, zTimes, cx, cy, cz) {
                matrix4 = _multiply(_scale(xTimes, yTimes, zTimes, cx, cy, cz), matrix4);
                return matrix4Obj;
            },

            // 乘法
            // 可以传入一个矩阵(matrix4,flag)
            "multiply": function (newMatrix4, flag) {
                matrix4 = flag ? _multiply(matrix4, newMatrix4) : _multiply(newMatrix4, matrix4);
                return matrix4Obj;
            },

            // 逆矩阵
            "inverse": function () {
                matrix4 = _inverse_matrix(matrix4);
                return matrix4Obj;
            },

            // 对一个坐标应用变换
            // 齐次坐标(x,y,z,w)
            "use": function (x, y, z, w) {
                // w为0表示点位于无穷远处，忽略
                z = z || 0; w = w || 1;
                var temp = _multiply(matrix4, [x, y, z, w]);
                temp[0] = temp[0].toFixed(7);
                temp[1] = temp[1].toFixed(7);
                temp[2] = temp[2].toFixed(7);
                return temp;
            },

            // 矩阵的值
            "value": function () {
                return matrix4;
            }

        };

        return matrix4Obj;
    };

});