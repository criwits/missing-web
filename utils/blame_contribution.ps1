# 设置用户名
$User = $args[0] # 请替换为你要统计的用户
$TotalCommits = 0
$TotalLines = 0   # 初始化总行数

# 获取该用户所有的提交记录，并筛选出 .md 文件的提交
$commits = git log --author="$User"  --reverse --pretty=format:"%h" 249a26a^...HEAD

# 过滤掉需要忽略的提交
$commits = $commits | Where-Object { $_ -ne "22c4cff" }

foreach ($commit in $commits) {
	$TotalCommits = $TotalCommits + 1
	
    # 获取每个提交的行数变动，使用 git diff --shortstat
    $diff = git diff --shortstat $commit^ $commit -- "*.md"
    
    Write-Host $diff
    
    # 提取插入和删除行数
    $insertions = 0
    $deletions = 0
    
    # 检查是否有增减行数
    if ($diff -match "(\d+) insertions?") {
        $insertions = [int]$matches[1]
    } else {
        $insertions = 0
    }

    if ($diff -match "(\d+) deletions?") {
        $deletions = [int]$matches[1]
    } else {
        $deletions = 0
    }
    
    Write-Host "$insertions, $deletions"
    
    # 累加插入和删除的行数
    $TotalLines += $insertions
    $TotalLines += $deletions
}

# 输出统计结果
Write-Host "用户 '$User' 提交 $TotalCommits 次：$TotalLines 行位于 .md 的修改"

