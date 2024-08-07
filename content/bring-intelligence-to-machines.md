---
title: 从加减乘除到 AI 对话
type: docs
---

# 从加减乘除到 AI 对话

{{<hint danger>}}
本文正在施工中……
{{</hint>}}

{{< hint warning >}}
欢迎来到《你缺失的那门计算机课》超越篇！在这一部分，我们将带领大家在了解「电脑最好怎么用」的基础上，探索无限的可能性——今天，人们利用电脑这一强大的工具，创造了一个璀璨斑斓的世界。人工智能、云计算、网络安全、大数据……这些词汇，或许你早已在各种各样的地方听说过，但你是否真正了解它们？我们将用通俗易懂的语言，带领大家走进这些新颖的领域，探索它们的奥秘。
{{< /hint >}}

{{< hint info >}}
这一章，我们将介绍超越篇的第一个领域——人工智能，它常常被人们简称为「AI」（Artificial Intelligence）。AI 技术让电脑不再是冷冰冰的机器，而拥有了一定模仿人类思维的能力。今天，诸如 AI 对话、AI 绘画、AI 写作等技术正在极大地提高人们的生产效率。阅读完这一章，你或许能找到下面这些问题的答案：

- 我想体验一下现在最新的 AI 技术！
- 到底是什么让 AI 能够模仿人类的思维，实现「智能」？
- 未来，AI 技术会如何发展？我们需要担心吗？我们应该怎么办？
{{< /hint >}}

## 让机器像人一样思考

### 人工实现的「智能」

我们把「人工智能」这个词拆成两个部分：「人工」和「智能」。「智能」本是人类的专利，我们的意识、思考、判断和情感等都是智能的表现。「人工」修饰着「智能」，昭示着这种「智能」由人工实现。人工智能技术的目标，就是由「人工」来实现一种所谓的「智能」，并让机器能够模拟和呈现它，从而让它们具有识别、决策、判断，乃至分析、学习和创造的能力。

上千年前，古代东西方的人们就不约而同地畅想过各种各样的「自动人偶」，其中的一些甚至具有意识和智慧，这可以看成是「人工智能」概念最早的先驱。近代，随着数学和逻辑学的发展，学者们开始研究如何把世间一切逻辑都用数学语言表达出来，这为人工智能的发展奠定了基础。到了 20 世纪中叶，伴随着电子计算机的诞生，人工智能技术也开始萌芽，人们开始使用电子计算机模拟人类的思维。此后，人工智能技术经历了几次高潮和低谷，而当下则是人工智能技术发展的一个新高峰。

今天，人工智能技术已经完完全全地融入了我们生活的每一个角落。当我们「刷脸」步入小区大门时，人脸识别系统能像门卫一样辩认我们的身份；当我们上网购物时，推荐系统能像私人助理一般推测我们的喜好。马路上，各种「智驾」技术正在解放司机的双手；工厂中，机器人正在代替人类完成重复性劳动……这些我们今天看来已经理所当然、司空见惯的技术，其实都是人工智能技术的应用。

近年来，「AI 绘画」「AI 聊天」等技术再一次高调地让「AI」进入人们的视野。作为 AI 一种应用，这些技术看似各不相同，但它们有着一个共同的特点：它们都是由机器来生成一些内容，例如绘画作品、聊天回复、文学小说等。机器生成的内容在质量和效果上与人类相差无几，甚至有时候还能达到超越常人的水平。这种技术称为「生成式人工智能」，简称「生成式 AI」，通常被缩写成英文 AIGC（Artificial Intelligence Generated Content）。如果说传统的 AI 技术，如前文提到的人脸识别、推荐系统等，是让「智能」去「干活」，那么 AIGC 技术则是让「智能」去「创作」。

AIGC 的诞生具有里程碑式的意义。在 AIGC 技术大规模应用之前，人们通常认为「创作」是人类思维独有的能力，传统的 AI 技术只不过是让机器代替人类做一些简单而枯燥的工作。然而，AIGC 技术的出现打破了这种观念。自此之后，人们对 AI 技术的未来充满了无限的憧憬，也让人们对 AI 技术的潜在风险产生了更多的担忧。

### 什么是「模型」，如何「训练」模型？

在 AI 领域中，「模型」（model）指的是用于完成特定任务的算法，或者可以理解为「程序」。例如，用于 AI 绘画的模型，输入你的文字描述，就能输出一幅符合描述的图画。而用于 AI 聊天的模型，输入你的问题，就能输出一个符合问题的回答。模型是人工智能技术的核心，它决定了 AI 的功能和效果。

![不同的 AI 模型](bring-intelligence-to-machines/AI_models.png#center)

模型的本质是复杂的数学运算，其中的大量参数并非人们直接设定，而是通过「学习」得来。这个「学习」的过程称为「训练」，它需要大量的数据和计算资源。例如，要训练一个能够实现 AI 对话的模型，人们需要准备大量的采集自现实生活的对话数据，模型能通过这些数据学习到对话的规律，从而逐渐具有对话的能力。

![模型的训练](bring-intelligence-to-machines/Model_training.png)

将模型加以包装，就能得到可供用户使用的 app 或网站产品，人们可以在 app 或网页上便捷地使用 AI 模型。2022 年末，美国人工智能技术公司 OpenAI 基于其所研发的「GPT」系列模型，上线了一款 AI 聊天机器人「ChatGPT」，引起了全球的轰动。随后，谷歌、Meta、微软等行业巨头纷纷推出了自己的 AIGC 模型；与此同时，许多国内人工智能研究机构、高校和企业也不甘落后，各种国产模型如雨后春笋般出现。这些产品各自有着不同的特色和应用场景，琳琅满目，让人目不暇接。下图展示的就是 ChatGPT 的界面。

![ChatGPT 的界面](bring-intelligence-to-machines/ChatGPT.png)

在一众国内国外的 AIGC 模型中，由智谱 AI 和清华大学联合开发的 GLM/ChatGLM 模型表现突出，它在生成内容质量和速度上都有着相当不错的表现。智谱 AI 公司推出的「智谱清言」平台，提供了包括 ChatGLM 在内的多种 AIGC 模型供用户使用。下面，我们就借助「智谱清言」平台，来体验 AIGC 的魅力。

## 体验 AIGC 的魅力

### 在「智谱清言」上使用 ChatGLM 模型

「智谱清言」是一个由智谱 AI 公司所推出的平台，在平台网站上可以使用 ChatGLM（用于 AI 对话）、CogView（用于 AI 绘画）等多种 AIGC 模型。

访问「智谱清言」官方网站（[https://chatglm.cn](https://chatglm.cn)），按提示注册账号并登录。登录后，你可以看到平台的主界面，如下图所示。

![「智谱清言」的主界面](bring-intelligence-to-machines/Zhipu_main.png)

主界面最左方提供了不同的 AIGC 应用供我们选择，包括 ChatGLM 对话、AI 画图、数据分析等。默认情况下，我们会进入 ChatGLM 对话应用。界面右侧则是对话区域，我们可以在下方的文本框中向 AI「发送」消息，对话的历史则会在上方显示。我们试着向 ChatGLM 提出一些简单的问题，通常便可以得到一个详细而不失准确的回答。

![让 AI 帮你回答问题](bring-intelligence-to-machines/Zhipu_q1.png)

一般来说，现今的对话模型都有一定的「记忆」能力，因此我们可以向它追问，或者提出一些与之前对话相关的问题，模型会根据之前的对话内容，给出更加详细的回答。当然，我们也可以询问它「我之前的问题是什么？」，来验证它的记忆能力。

![追问模型的记忆](bring-intelligence-to-machines/Zhipu_q2.png)

有时，我们不希望模型的回答受到之前对话的影响，这时我们点击【新建对话】按钮，便可以开始一个全新的对话，不受之前对话记忆的影响。当然，在界面左方的【历史记录】面板上，我们也可以查看之前的对话记录，甚至继续之前的对话。

![进行多个对话](bring-intelligence-to-machines/Zhipu_q3.png)

上面的例子中，我们提出的问题都比较偏向于「常识」，它们只涉及通用的原理或技术。由于模型是使用海量的数据训练的，因此对于这类问题，模型的回答通常比较准确的——可以理解为，在训练的阶段，模型就已经「见」过我们提出的问题或者类似问题了。但是，如果我们提出一些比较专业、具体，或者提出有关新兴事物的问题，由于训练数据中并没有相关的知识，凭借模型自己的能力是无法回答的。为了解决这一问题，ChatGLM 在面临此类问题时，会选择上网搜索相关知识，然后给出一个基于搜索结果的回答。

![模型的搜索能力](bring-intelligence-to-machines/Zhipu_q4.png)

在上图中，我们向模型提问「国产芯片最新发展现状」。由于这个问题涉及到了最新的技术发展，模型并没有相关的知识，因此它会选择上网搜索相关的信息。从图中我们可以看到，模型一共阅读了 5 篇互联网的相关报告，将它们总结为答案。这种搜索能力，使得模型在回答问题时，能够给出更加详细、准确的答案。

除了让 AI 帮我们回答各种问题之外，我们还可以让 AI 帮我们「撰写」我们需要的文章。比如，我们可以让模型帮我们写一封长度在 500 字左右的申请读研的自荐信：

![AI 写的自荐信](bring-intelligence-to-machines/Zhipu_q5.png)

从上图中我们不难发现，这封 AI 撰写的自荐信在结构和格式上大致正确，包括了自我介绍、学术背景、科研经历、个人特长等部分；而在内容上，由于我们并没有提供给模型具体的撰写细节，因此每个部分的具体内容则由模型「自由发挥」而来。这也决定了我们利用 AI 的方式——我们可以将 AI 作为工具，让其帮我们生成基础的构架，然后我们再根据自己的需求进行修改和完善。

我们也可以选择在向模型「布置任务」时，提供给它更多的细节，这样模型就会选择性地按照我们的要求进行撰写。例如，我们可以在让模型帮我们写自荐信的基础上，提供给它一些具体的细节，比如我们的专业、研究方向和个人特长等。这样，模型就会尝试把这些信息融入到生成的文章中，使得文章更加符合我们的需求。

![AI 写自荐信的细节](bring-intelligence-to-machines/Zhipu_q6.png)

由于 ChatGLM 的训练数据中除了对话、文章语料外，还有着许多代码片段，因此我们还可以向模型询问一些关于编程的问题。例如，我们可以让模型帮我们写一个简单的 Python 程序，或者解释一些代码的含义。这对于一些编程初学者来说，是一个非常好的学习方式。

![让模型写快速排序](bring-intelligence-to-machines/Zhipu_q8.png)

除了 ChatGLM 对话模型，「智谱清言」平台还提供了许多其他的 AIGC 模型供我们使用。例如，我们在网站左侧栏中选择「AI 画图」，然后在右方输入我们希望绘制的内容，还可以指定一些细节，比如画面的主题、颜色、风格等，模型会尝试根据这些信息生成一幅符合我们要求的图画。

![AI 画图](bring-intelligence-to-machines/Zhipu_q7.png)

### 让 AI 更好理解我们的意图

尽管今天各种 AI 模型的能力已经相当强大，但当我们尝试将它们实地应用到我们的工作和学习中时，有时也会发现 AI 难以理解我们的意图——有时 AI 生成的内容答非所问，有时 AI 忽略了我们的一些细节要求。为了尽量避免这种情况，我们可以对我们的「提示词」进行优化。

「提示词」（prompt）指的是我们向 AI 提出问题或者任务时所使用的文字，前文中诸如「请告诉我国产芯片发展现状」「我是……写一篇自荐信」等都是提示词。人们发现，对于相同的任务，提示词设计的好坏会直接影响到模型的表现。设计提示词是一项复杂的工作，不过，对于我们这样的简单应用来说，我们通常只需要注意以下几点：

- **准确、清晰、通顺**：在日常生活中与他人沟通时，准确、清晰、通顺的语言能够极大地提高我们的沟通效率，在设计与 AI 对话的提示词时亦是如此。比如，「请告诉我国产芯片最新发展现状」就要比「国产芯片怎么样」更加合适，而「请帮我设计一份《计算机系统》教案」往往也会取得比「写一份计算机系统教案」更好的效果。
- **构造具体的场景**：在设计提示词时，我们可以尽量构造一个具体的场景，将我们希望让模型注意到的信息逐项给出。在前文演示让 AI 写自荐信时，我们提到的「提供给模型更多的细节」，本质上便是在构造具体的场景，并在这个场景中提供更多的背景信息。我们还可以选择对 AI 进行角色引导，比如，如果我们希望让 AI 帮我们总结一些有关「金融」方面的文章，「你是一位金融方面的专家，请阅读下面的文章并帮我总结它们」便是一个不错的提示词开头。
- **给出样例**：对于一些比较复杂的任务，例如生成解决具体问题的代码，我们可以在提示词中给出样例，这样模型往往可以快速理解我们的意图。比如，如果我们需要让 AI 帮我们编写程序，将字符串中的数字提取出来并求和，我们可以在提示词中给出一个简单的样例：
  
  > 请帮我写一个 Python 程序，将字符串中的数字提取出来并求和
  > 
  > 示例输入：s194ab3cd12<br/>
  > 示例输出：209<br/>
  > 解释：字符串中的数字有 194、3 和 12，它们的和为 209
  >

  对于一些复杂的任务，相比于绕来绕去地描述任务要求，直接给出样例往往更加直接、有效。

对提示词进行优化是一门艺术，需要我们在实践中不断摸索。在使用 AI 模型时，我们可以尝试不同的提示词，观察模型的回答，然后根据回答的效果来调整我们的提示词。若你对提示词的设计还有兴趣，不妨上网搜索「提示词工程」，了解更多关于提示词设计的技巧。

## 从加减乘除到 AI 对话

体验过 AIGC 的魅力之后，你是否好奇过，这些神奇的技术究竟是如何实现的？「计算机」的本质是「计算」，但从「加减乘除」的四则运算到人工智能的各种应用，之间到底经历了怎样的跨越？本节将带着你慢慢揭开 AI 那神秘的面纱，用通俗易懂的语言向你展现在人工智能背后的基本原理。

### AI 的本质——「预测」

我们可以简单地把人工智能的本质归纳为「预测」。「预测」指的是依据某种「经验」，根据已知的信息去推测未知的信息。例如，天气预报是一种预测，人们的「经验」来自于长期对天气的观察和气象学的发展，「已知的信息」则是人们收集到的各种气象数据。借助经验和已知信息，气象学家们可以预测未来的天气情况——这便是「未知的信息」。

上面我们看到的各种 AI 应用，其实亦是一系列的「预测」。以 AI 对话为例，在模型训练过程中，模型通过大量的语料数据，「学习」到了人类语言的统计规律——例如，「你好」之后通常会伴随另一句问候，「你是谁」之后通常会伴随一句自我介绍；「今天天气真」之后大概率是「好」「不好」等词汇，而「美国的首都」之后要么是「华盛顿」要么是一个问号。最终，借助这些统计规律，模型能够做到给定任意的一串文字，预测出接下来最可能的一个词汇。

![模型的本质是预测](bring-intelligence-to-machines/GPT_is_predicting.png)

在预测出第一个词汇之后，模型会将这个词汇作为「已知信息」，然后继续预测下一个词汇。这样，模型就可以不断地生成出一段连贯的文本。这种「逐词预测」的方式，便是模型生成长篇文本的基本原理。当然，这个过程中会有诸多的调整和优化，以生成更加符合人类语言习惯的连贯文本。不过，无论怎样的优化，模型的本质仍然是「预测」。

> 那么，请你自己想象一下，如果需要你设计一个 AI 绘画模型，它应当要学习到什么「经验」？它的「已知信息」又是什么？它是如何「预测」出一幅图画的呢？
>

建立在这样的看法上，我们不难明白，AI 模型的关键便是这套「预测」算法的设计、训练、验证和优化。还是以 AI 对话模型为例，如何设计出合理的「预测」方式，如何让模型从文字语料中学习到足够的「经验」，就是人们正在研究的重要问题。这些问题解决的好坏，直接决定了 AI 模型的表现。

### 一个简单的「预测」问题——租金预测

诸如 AI 对话那样的模型，其内部的「预测」算法极为复杂，我们无法在这里详细展开。相反地，我们选择一个简单得多的「预测」问题——「租金预测」来进行研究。在理解了「租金预测」问题之后，我们就能以小见大，举一反三地理解 AI 推理的过程。

#### 线性回归模型

假设我们现在要根据一间房屋的面积，预测它的租金。在这个问题中，「面积」就是「已知的信息」，房屋的租金则是对应的「未知的信息」。为了获取「经验」来解决这个预测问题，我们收集了该地区 20 套出租屋的面积和租金数据，如下表所示：

| 序号 | 面积（平方米） | 价格（元/月） | 序号 | 面积（平方米） | 价格（元/月） |
| ---- | -------------- | ---------- | ---- | -------------- | ---------- |
| 1    | 68.42          | 4112.29    | 11   | 85.42          | 4676.86    |
| 2    | 80.06          | 4622.83    | 12   | 67.02          | 3960.83    |
| 3    | 72.19          | 4094.26    | 13   | 69.76          | 3970.62    |
| 4    | 68.14          | 4019.30    | 14   | 94.79          | 5266.96    |
| 5    | 59.66          | 3330.10    | 15   | 34.97          | 2056.14    |
| 6    | 75.21          | 4316.60    | 16   | 36.10          | 2352.01    |
| 7    | 60.63          | 3388.90    | 17   | 31.42          | 2115.60    |
| 8    | 92.42          | 5299.07    | 18   | 88.28          | 4960.94    |
| 9    | 97.46          | 5381.56    | 19   | 84.47          | 4901.05    |
| 10   | 56.84          | 3307.91    | 20   | 90.90          | 5117.77    |

这些数据将被用来「训练」我们的模型。我们可以将这些数据绘制成散点图，横轴是房屋的面积（平方米），纵轴是房屋的租金（元/月）。如下图所示：

![房屋面积与租金的关系](bring-intelligence-to-machines/House_price_vs_size.png#center)

从图上我们可以直观地看见，我们可以用一条直线来刻画和租金之间的关系——具体地说，如果把面积记作 {{<katex>}}x{{</katex>}}，把对应的租金记作 {{<katex>}}y{{</katex>}}，那么它们之间的关系就可以用方程
{{<katex display>}}
y = ax + b
{{</katex>}}
来描述。这个方程就是我们的「模型」，其中 {{<katex>}}a{{</katex>}} 和 {{<katex>}}b{{</katex>}} 是这个模型的「参数」。{{<katex>}}a{{</katex>}} 和 {{<katex>}}b{{</katex>}} 的值决定了这条直线长什么样，也就决定了我们的模型对租金的预测效果。

现在，我们的目标就是：对上面那 20 个房屋数据进行「学习」，来找到**最合适**的 {{<katex>}}a{{</katex>}} 和 {{<katex>}}b{{</katex>}}，也就是参数，这样我们的模型就可以胜任「预测租金」的任务了。由于这个模型是一个线性方程，它被称为「线性回归」模型。

#### 「损失」函数

要找到所谓「最合适」的 {{<katex>}}a{{</katex>}} 和 {{<katex>}}b{{</katex>}}，我们就得定义什么是「合适」。

我们说我们的模型预测得「好」，是指在某个面积下，**模型预测的租金**和**实际租金**尽可能接近。因此，我们可以把那 20 个房屋的面积 {{<katex>}}x_i{{</katex>}}（{{<katex>}}i=1,2,\cdots,20{{</katex>}}）逐一代入我们的模型，预测出对应的租金 {{<katex display>}}
\hat{y_i} = ax_i + b\text{。}
{{</katex>}}。
显然，我们会希望所有的 {{<katex>}}\hat{y_i}{{</katex>}} 和相应的实际租金 {{<katex>}}y_i{{</katex>}} 之间的差 {{<katex>}}(\hat{y_i} - y_i){{</katex>}} 都能越小越好。怀着这样的想法，我们可以把所有的差的平方加起来，得到一个「差距和」，称为「损失」，即
{{<katex display>}}
L = \sum_{i=1}^{20} (\hat{y_i} - y_i)^2 = \sum_{i=1}^{20} (ax_i + b - y_i)^2
{{</katex>}}
至此，我们的任务就变成了：找到一对 {{<katex>}}a{{</katex>}} 和 {{<katex>}}b{{</katex>}} 的值，使上面的损失 {{<katex>}}L{{</katex>}} 最小。

观察上面的式子，在那 20 个样本点给定，也就是说 {{<katex>}}x_i{{</katex>}} 和 {{<katex>}}y_i{{</katex>}}（{{<katex>}}i = 1, 2, \cdots, 20{{</katex>}}）都是定值的情况下，{{<katex>}}L{{</katex>}} 只和 {{<katex>}}a{{</katex>}} 与 {{<katex>}}b{{</katex>}} 有关——{{<katex>}}L{{</katex>}} 是一个关于 {{<katex>}}a{{</katex>}} 和 {{<katex>}}b{{</katex>}} 的函数，我们记作 {{<katex>}}L(a, b){{</katex>}}。

现在，所谓「训练模型」，就是求这个函数 {{<katex>}}L(a, b){{</katex>}} 的最小值点。

#### 梯度下降

我们如何找到这个函数的最小值点呢？在这个例子中，我们的损失函数
{{<katex display>}}
L(a, b) = \sum_{i=1}^{20} (ax_i + b - y_i)^2
{{</katex>}}
比较简单，我们可以直接通过求（偏）导数的方式找到最小值点。但是，当模型的参数量不是 2 而是 2000 甚至 2 千万时，当模型不再是线性的而是复杂函数构成时，直接「解」出最小值就不太可行了。我们需要寻找一个「通用」的方法，对于再复杂的失函数，都可以有效地找到我们需要的最小值点——哪怕不十分精确，但是足够接近就可以。这个方法就是「梯度下降」。

> 对于这个线性回归问题，直接求出最小损失值点的方法被称为「最小二乘法」。
> 

让我们先把刚刚的损失函数放到一边，考虑一个（可导，但是无法直接解出导数零点的）一元函数 {{<katex>}}f(x){{</katex>}}，我们的目标是找它的最小值点。我们可以先随意挑一个 {{<katex>}}x_0{{</katex>}} 作为起点：

![挑选一个下降的起点](bring-intelligence-to-machines/GD_1.png#center)

接着，我们计算 {{<katex>}}f(x){{</katex>}} 在 {{<katex>}}x_0{{</katex>}} 处的导数值 {{<katex>}}f'(x_0){{</katex>}}。导数值反映着图像的斜率，展示着图像在一点处向上向下的趋势，故我们可以逆着导数的方向「走」一步，即令 {{<katex>}}x_1 = x_0 - \alpha f'(x_0){{</katex>}}：

![沿着导数的反方向走一步](bring-intelligence-to-machines/GD_2.png#center)

不难发现，我们得到了一个比 {{<katex>}}x_0{{</katex>}} 更靠近函数（局部）最小值的 {{<katex>}}x_1{{</katex>}}。上面式子中的 {{<katex>}}\alpha{{</katex>}} 是一个「步长」参数，它影响着我们每次「走」的步长大小。不断这样「走」下去，我们就可以逐渐接近函数的（局部）最小值点：

![梯度下降的过程](bring-intelligence-to-machines/GD_3.png#center)

事实上，如果函数局部的最小值点存在，选择好调整合适的步长参数 {{<katex>}}\alpha{{</katex>}}，不断地重复这个「走」的过程，就可以近似地找到这个局部最小值点。这个过程就称为「梯度下降」，而步长参数 {{<katex>}}\alpha{{</katex>}} 被称为「学习率」。每一次「走」被称为「训练一步」，而整个过程，就是 AI 模型开发过程中最为耗时的过程之一——「训练」。

对于有多个自变量的函数，它在某一点处对不同自变量的（偏）导数值共同构成了「梯度」。在上面的一元函数例子中，导数值反映着图像在一点处向上向下的趋势，而在多元函数中，梯度则反映着图像在一点处最快上升和下降的方向。因此，对于多元函数，我们可以用「梯度」来指导我们的「走」的方向——我们每次「走」的方向，都是梯度指向的函数值减小最快的方向。不断地重复训练，我们就能逐步接近函数的（局部）最小值点。

回到具体问题中的损失函数 {{<katex>}}L(a, b){{</katex>}}，即使这个函数非常复杂，只要它可导（微），我们就可以从一个随机的起点开始，用梯度下降的方法逐步找到它的最小值点。模型训练的过程，核心就是这一梯度下降的过程。

当然，实际的训练过程中还会对许多细节进行优化。譬如，上文中提到的学习率 {{<katex>}}\alpha{{</katex>}} 的取值，对训练的效率有着至关重要的影响。选择合理的 {{<katex>}}\alpha{{</katex>}}，对 {{<katex>}}\alpha{{</katex>}} 动态地调整，就能有效地提升训练效果。此外，当样本点的数量不是 20 个而是 2000 甚至 200 万个时，对样本点的处理方式亦十分关键。不过，「万变不离其宗」，这些优化的方法都是围绕着「梯度下降」这个核心展开的。

### 模型在变，核心未变

租金预测问题是一个非常简单的「预测」问题，它所使用的模型只有两个参数，模型的形式仅仅是一个线性方程。然而，从这样简单的线性回归问题，到复杂无比的 AI 对话模型，训练它们的核心原理却并没有本质的区别。不管模型多么复杂，参数数量多大，训练模型仍然需要构造合适的「损失」函数，收集大量的训练数据，通过（类似于）梯度下降的方式，逐步调整模型参数，让损失函数的值逐渐减小。这一切未曾改变，只是在更加复杂的模型和更加庞大的数据集上进行罢了。

在看完上文的介绍之后，你对一个 AI 模型从诞生到应用的过程应该有了一个大致的了解。下面我们总结一下这个过程：

- **需求分析与模型设计**：我们要根据实际的需求设计出合理的 AI 模型，确定模型的结构等技术细节。在上面租金预测的例子中，我们通过「观察」数据特征，选择了线性回归模型；而面对更加复杂的场景，更加复杂、能力更强的模型也会被设计出来。
- **数据采集与预处理**：我们需要收集大量用于训练的数据。对于租金预测，那 20 个样本就是我们全部的训练数据。现实中，我们不仅需要收集海量数据，还要对数据进行清洗、去噪、标注等处理。
- **模型训练**：将训练数据送入模型，梯度下降调整模型参数，再重复这个过程——就这样。这个过程是整个 AI 模型开发中最为耗时的一个环节，但是它的本质，与我们上面讲的线性回归模型训练过程并没有太大的区别。
- **模型验证**：在训练结束后，我们还需要想办法验证我们模型的效果。常用的方法是再另外收集一些数据，将数据送入模型进行预测并与实际值进行比较。如果模型的预测效果不好，我们还需要回到训练环节，调整模型的结构、参数等。

这个过程中，每一步都需要大量的实验和探索。从「加减乘除」到现在的 AI 对话，AI 技术的发展是人们不断努力的结果。在未来，AI 技术还会继续发展，为人们的生活和工作带来更多的便利。

## 大模型、GPU 和 AI 芯片

### 大模型的烦恼

人们已经发现，不断增大 AI 模型的规模，增加参数的数量，就能显著地提升模型的效果。现在，人们把模型参数量特别大的模型称为「大模型」[^1]。例如前文大家体验的 GLM 模型，其开源版本 GLM-4 的参数量就能达到 90 亿个。一些大模型的参数量能达到上百亿甚至更多。下表展示了目前一些流行大语言模型的参数量。

| 模型名称 | 参数量 | 开发机构 |
| -------- | ------ | -------- |
| GPT-3    | 175 亿 | OpenAI   |
| GPT-4    | 未知，据称达 1.8 万亿  | OpenAI   |
| GLM-3-6b    | 60 亿  | 智谱 AI 和清华大学 KEG 实验室     |
| GLM-4-9b    | 90 亿  | 智谱 AI   |
| Llama 3.1    | 80 亿——4 千亿  | Google   |

在上一节中我们已经知道，对模型进行训练，本质是对它的参数进行调整优化。然而，对于这些参数量轻松破亿的大模型来说，训练它们是一件非常困难的事情——巨大的参数量，意味着巨大的计算量。试想，按上一节的思路，如果我们对这些参数逐个地求导来进行梯度下降，就算我们的 CPU 速度再快，也不知道得算到何年何月才能完成一轮训练。寻找高效的训练方法，就成为了一个重要的问题。

### GPU 的「副业」

我们仔细分析模型训练的过程，可以发现它的两个特征：

- **可并行性**：在模型训练的过程中，我们需要在大量的数据上进行计算。这些数据之间的计算是相互独立的，因此我们可以同时对多个数据进行计算，提高计算效率。同时，许多模型在设计时也引入了可并行的结构。这些特点使得模型训练过程可以被很好地并行化，即将一个任务分拆成多个小任务同时进行。
- **以矩阵运算为主**：在具体的模型训练实现中，诸如求解梯度、梯度下降等操作，通常都被转化为矩阵运算来进行。因此，模型训练的实质是大量的矩阵运算。

这两个特点使得模型训练的过程在传统的 CPU 上并不能高效地进行——我们的 CPU 通常只有几个核心，能够同时进行的计算任务有限；同时，CPU 是一种通用计算芯片，它主打的是「会算的多」，而不是「能算得快」，针对矩阵运算这一种特定的计算任务，CPU 并没有进行过多的优化。自然而然地，我们需要寻找一个更加适合模型训练的计算设备，而用来进行图形处理的显卡（GPU）就进入了我们的视野。

GPU 作为一种专门用来进行图形处理的设备，其设计上有着与 CPU 不同的特点。首先，为了满足图形处理需要的极高同步率，GPU 拥有着大量的计算单元，它们可以同时进行大量的计算任务，这样我们在用 GPU 打游戏、看视频时，才不会出现卡顿和撕裂。其次，由于图形最终以像素点组成的图像在屏幕上展现，而图像的本质便是矩阵，因此 GPU 在设计上就针对各种矩阵运算做了大量的优化。GPU 的这两个特性给我们带来了更好的视觉体验，也让它成为了进行模型训练的理想设备——让 GPU 干点儿训练模型的「副业」，可能会有意想不到的效果。

2007 年，GPU 巨头英伟达（NVIDIA）推出了 CUDA 平台，让人们可以利用这一平台在英伟达的 GPU 上进行各种计算任务。随后的 2009 年，由 AMD 和苹果等联合推出的 OpenCL 平台则在更多品牌的 GPU 上带来了类似的功能。与这些平台相对应的各种机器学习框架也随之应运而生，极大地便利了 AI 模型的设计、训练和应用的过程。时过境迁，CUDA 技术伴随着英伟达的迅速发展不断占据着市场，英伟达 GPU 最终成为了 AI 模型训练的「标配」。

### AI 芯片的崛起

虽然 GPU 在 AI 模型训练中具有较好的性能，但是作为「图形处理器」的它，训练 AI 模型终究是一种「副业」。人们开始在 GPU 的基础之上，设计一种专门用来进行 AI 模型训练的芯片，这就是「AI 芯片」。与 GPU 相比，AI 芯片不再有着图形处理的「包袱」，不需要考虑与图形处理相关的部分，而可以把更多的资源投入到 AI 模型训练的优化上。从 GPU 到 AI 芯片，副业转正。

作为老牌 GPU 厂商的英伟达，早在 2016 年就推出了专门用来进行 AI 计算的 GPU 系列——Tesla P100，专门针对 AI 计算进行了优化，性能大幅提升。此后，英伟达又推出了一系列专门用来进行 AI 计算的 GPU，如 Tesla V100、A100 等。这些 GPU 采用了更加先进的架构，性能更加强大，成为了 AI 训练的「标杆」。这些芯片虽然被称为「GPU」，但是已经没有了视频输出等图形处理的功能，而是完全的 AI 芯片。与「显卡」一词类比地，我们把这样的产品也称为「计算卡」。

与此同时，其他厂商，尤其是我国的科技公司亦不甘落后。谷歌、华为、阿里巴巴等公司都推出了自己的 AI 芯片，如谷歌的 TPU、华为的昇腾系列、阿里巴巴的 Ali-NPU 等。它们的出现不仅为 AI 计算提供了更多的选择，为市场注入了更多的活力，客观上也推动着 AI 技术的发展。

## 展望一个与 AI 共处的未来

谈到「人工智能」四个字，你会感到什么？是未来已至，还是脊背发凉？

相信通过阅读这一章，你会逐渐开始对 AI「袪魅」。在今天，一切看似神奇的 AI 技术，都只不过是基于海量学习得到的统计规律进行的某种「预测」。而「意识」这一人类独有的特质，在任何时候都无法被这样的预测机器所取代。技术只能而且必然会被人类掌握在自己手中，而不是反过来；AI 只能而且必然会成为人类的「工具」，为人类服务，为我们带来更好的生活。


[^1]: 不过现在「大模型」一词其实往往被用来特指「大语言模型」（Large Language Model，简称 LLM），即我们文中所谓的「AI 对话模型」。