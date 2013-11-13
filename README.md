## 基于nodejs和uglifyjs的javascript合并压缩工具
### 压缩且合并：
1. 把需要压缩的js文件拷到source这个目录下
2. 配置config.json中的input数组(需要合并文件的文件名),output为输出的文件名
3. 在comment.txt中加入需要的注释
4. 双击 ‘compress_and_merge.bat’文件
5. 合并并压缩的文件位于配置的文件夹中(默认merge)

### 压缩：
1. 把需要压缩的js文件拷到source这个目录下
2. 双击'compress.bat'即可
3. 合并并压缩的文件位于min文件夹中