# 记录遇到的问题

## 问题1（2023-09-05）:

语音播放后，调用暂停函数，一段时间（几秒）后会自动触发end事件

```js
speechSynthesis.speak(new SpeechSynthesisUtterance(text))

speechSynthesis.onend = function() {
  console.log('end')
}
// ...

speechSynthesis.pause() // 暂停后，几秒内会输出'end'，即触发了end事件
```

本项目默认speechInstance.lang为'zh-CN'
```js
speechInstance.getVoices() // 可以查看浏览器支持的语言列表，可以看到默认的语言是'zh-CN'
```

### 解决办法：

暂时发现，只有设置语言为'en-US'，暂停后不会自动触发end事件（尝试过设置其他语言，都不行）
```js
speechInstance.lang = 'en-US'
```

但是，这样就不会说中文了
