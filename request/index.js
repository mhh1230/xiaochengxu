//同时发送异步代码的次数
let ajaxCounts = 0;

export const request = (params) => {
    ajaxCounts++;
    //由于每次请求数据都要显示loading
    //所以就在这里写加载的代码了
    wx.showLoading({
        title: '加载中……',
        mask: true

    })

    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {
                ajaxCounts--;
                //关闭正在等待的加载图标
                if (ajaxCounts == 0) {
                    wx.hideLoading();
                }
            }
        });

    })
}