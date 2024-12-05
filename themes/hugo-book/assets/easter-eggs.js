const random_number = Math.floor(Math.random() * 10);
const easter_eggs = [
    "乌拉呀哈~呀哈乌拉！",
    "点击<a href='https://www.bilibili.com/video/BV1GJ411x7h7/'>这里</a>轻松一下！",
    "愿《你缺计课》能顺利在书店里和你见面！",
    "欢迎报考哈工大！",
    "欢迎报考哈工大（深圳）！",
    "欢迎报考华中科技大学！",
    "欢迎报考湖南大学！",
    "把《你缺计课》分享给更多的人吧🥺！",
    "疑？悟！",
    "<span style='text-decoration: line-through;'>你能 V 我 50 吗？</span>", // 请固定为最后一个
]
const placeholder = document.getElementById('easter_egg_placeholder');
if (random_number < 4) {
    placeholder.innerHTML = easter_eggs[Math.floor(Math.random() * easter_eggs.length)];
    console.log("恭喜你发现了彩蛋！");
} else {
    today = new Date();
    if (today.getDay() === 4) {
        placeholder.innerHTML = easter_eggs[easter_eggs.length - 1];
        console.log("本来你没有彩蛋的，但是今天是疯狂星期四！");
    }
}