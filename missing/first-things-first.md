# 一些约定与预备知识

尽管《Missing》自认为受众是「电脑小白」，但我们依然不得不要求读者有一些最最基本的知识和操作经验。此外，为了便于后续的讲述，我们会进行一些约定。

---

## 文中的标记符号

在《Missing》网页版中，我们使用「直角引号」而不是 “弯引号” 来表示强调和引用。这是出于在显示器上阅读体验的考虑，并不代表这种用法更适合在书面文件中使用。

我们使用方头括号「【】」来标记所有屏幕上字面显示的选项。例如，当我们希望你右键桌面上的图标

![Untitled](first-things-first/Untitled.png)

时，我们会称「右键【此电脑】」。

我们使用右箭头「→」来表示下一步操作。例如，「右键【此电脑】→【属性】」的意思是，右键桌面上的【此电脑】图标，然后在弹出的菜单中左键点击【属性】。

如果某一章节的标题后带有星号「*」，表明这一章节是选读的。

## 快捷键的操作说明

如果你按快捷键（组合键）后，电脑并没有行使预想的功能，可能是你的按法不对。快捷键的按法并不是「同时按下所有的键」，而是「依次序按下各键不松手，最后一起松开」。例如，若要按快捷键「`Windows` + `Shift` + `S`」：

- 先按住 `Windows` 键（`Windows` 键上印有 Windows 徽标，一般来说这个键在 `Ctrl` 和 `Alt` 之间）不要松手；
- 再按住 `Shift` 键，同样不要松手；
- 接着按一下 `S` 键，然后松开全部按键。

## `F1` — `F12` 功能键的使用说明

在很久以前，人们为了增加电脑键盘的使用效率，在键盘的最顶端设计了一排按键，它们就是 `F1` — `F12` 功能键：

![Untitled](first-things-first/Untitled%201.png)

这些功能键和键盘上的 `Ctrl`、`Alt` 等键一样，并不能用来输入文字；相反，它们是用来组合出各种功能的。比如，按 `Alt` + `F4` 可以用来关闭当前程序，按 `F5` 可以用来刷新网页，按 `F1` 用来查找帮助，等。

随着电脑操作方式的演变和进化，`F1` — `F12` 键使用得越来越少。这时，人们想到，与其让这些键在键盘上吃灰，不如赋予它们一些「新」的功能，比如便捷地调整屏幕亮度和音量等设置。于是，这 12 个按键从此有了两重功能：「它们本身的功能」和「它们的拓展功能」。

![Untitled](first-things-first/Untitled%202.png)

所谓「它们本身的功能」，指的是原先 `F1` — `F12` 这些键在系统中被约定的功能；而「它们的拓展功能」，则以图标的形式，画在了这些键上。上图中 `F5` 键上画有亮度降低的符号，因此 `F5` 键的「拓展功能」就是降低屏幕亮度； `F1` 键画有静音的符号，因此 `F1` 键的「拓展功能」就是静音。

为了让 `F1` — `F12` 键能够在这两种功能中自如切换，人们在键盘左下角安排了一个 `Fn` 键。具体地，对于一台具有 `Fn` 键的电脑，它的键盘情况可能是下列两种情况中的一种：

- 直接按 `F1` — `F12` 功能键可以行使它们本来的功能，按住 `Fn` 的同时再按 `F1` — `F12` 则行使它们的拓展功能。
    
    例如：如果 `F5` 功能如上，那么，在这种情况下，按 `F5` 可以在浏览器中刷新页面，按 `Fn` + `F5` 可以降低屏幕亮度。
    
- 直接按 `F1` — `F12` 功能键可以行使它们的拓展功能，按住 `Fn` 的同时再按 `F1` — `F12` 则行使它们本来的功能。
    
    例如：如果 `F5` 功能如上，那么，在这种情况下，按 `F5` 可以降低屏幕亮度，按 `Fn` + `F5` 可以在浏览器中刷新页面。
    

你可以随便打开一个应用（比如浏览器），然后按 `Alt` + `F4`。如果当前应用退出了，就说明你的电脑属于上面两种情况中的第一种。否则就属于第二种。

很多笔记本电脑提供了一种快捷的方法在这两种模式中切换。对于一些品牌的笔记本，你可以通过按 `Fn` + `Esc` 来切换这两种模式。另一些笔记本可能需要使用专门的软件（例如，Lenovo Vantage）或进入 BIOS 设置。具体请查阅你设备的操作指南或自行上网搜索。

## 有关「重启」的说明

由于自 Windows 8 以来的 Windows 系统引入了「快速启动」的机制，现在「重启」这个过程并不等价于「先关机再开机」的过程。

故，若在文中提及「重启」这样的操作，请一定是选择开始菜单中的「重启」选项，而非点选「关机」后再手动打开电脑。

## 对容量单位的说明

我们约定存储在电脑中的数据的容量单位「GB」「MB」「KB」等的关系如下：

$$
1\,\mathrm{TB}=1024\,\mathrm{GB}=1024\times1024\,\mathrm{MB}=1024^3\,\mathrm{KB}=1024^4\,\text{字节}
$$

即，我们统一使用「1024 进位」而不是「1000 进位」作为单位换算的系数。此外，我们有时会略去这些单位最后的字母「B」，即文中可能用「1 T」来表示「1 TB」。

你可能会问为什么要特别说明这里是「1024 进位」而不是「1000 进位」。如果你有买过 U 盘，你会发现标称「128 GB」的 U 盘实际可用的容量只有 119 GB 左右。这是因为生产 U 盘的厂家是用「1000 进位」来计算容量，而电脑自身是用「1024 进位」来计算容量的。在这里我们进行容量单位的约定，是为了避免这种争议。

## 「设置」和「控制面板」

在 Windows 10 和 Windows 11 中，有两个不同的地方可以对系统设置进行更改：

- 「设置」：是指打开开始菜单，在应用列表中齿轮图标的名为「设置」的应用。按键盘上的 `Windows` + `I` 也可以打开它。它的图标如下图所示：
    
    ![Untitled](first-things-first/Untitled%203.png)
    
- 「控制面板」：是指打开开始菜单，直接键入 `control` 后看到的名为「控制面板」的应用。它的图标如下图所示：
    
    ![Untitled](first-things-first/Untitled%204.png)
    

显然，「设置」和「控制面板」并不是一个东西。在文中，除非明确说明是「打开【控制面板】」，否则，诸如「打开系统设置」「打开【设置】」这样的语句，均表示打开「设置」。

## 练习

1. 计算 1 GB 等于多少 KB？等于多少字节？假设一个汉字占两个字节，1 GB 大约可以记录多少个汉字？
2. 尝试计算，一个按「1000 进位」计算得到容量为 64 GB 的 U 盘，它按「1024 进位」得到的容量是多少？
3. 在自己电脑上尝试这些快捷键：
    1. `Windows` + `Shift` + `S` （仅限 Windows 10 / 11）  
    2. `Ctrl` + `Shift` + `Esc`   
    3. `Windows` + `D`   
4. 了解并试验自己笔记本电脑的 `F1` — `F12` 功能键的拓展功能。