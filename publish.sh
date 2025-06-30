#!/bin/bash

# 发布脚本
set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 开始发布 @hanglin/request 包...${NC}"

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
  echo -e "${RED}❌ 错误: 请在包的根目录下运行此脚本${NC}"
  exit 1
fi

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
  echo -e "${RED}❌ 错误: 有未提交的更改，请先提交或暂存${NC}"
  exit 1
fi

# 安装依赖
echo -e "${YELLOW}📦 安装依赖...${NC}"
pnpm install

# 构建
echo -e "${YELLOW}🔨 构建项目...${NC}"
pnpm build

# 检查构建产物
if [ ! -d "dist" ]; then
  echo -e "${RED}❌ 错误: 构建失败，dist 目录不存在${NC}"
  exit 1
fi

# 运行测试（如果有的话）
if grep -q "\"test\"" package.json; then
  echo -e "${YELLOW}🧪 运行测试...${NC}"
  pnpm test
fi

# 版本提升
echo -e "${YELLOW}📝 请选择版本提升类型:${NC}"
echo "1) patch (1.0.0 -> 1.0.1)"
echo "2) minor (1.0.0 -> 1.1.0)"
echo "3) major (1.0.0 -> 2.0.0)"
echo "4) 自定义版本"
echo "5) 不提升版本"

read -p "请输入选项 (1-5): " choice

case $choice in
1)
  echo -e "${YELLOW}🔢 提升 patch 版本...${NC}"
  pnpm version patch
  ;;
2)
  echo -e "${YELLOW}🔢 提升 minor 版本...${NC}"
  pnpm version minor
  ;;
3)
  echo -e "${YELLOW}🔢 提升 major 版本...${NC}"
  pnpm version major
  ;;
4)
  read -p "请输入版本号: " version
  echo -e "${YELLOW}🔢 设置版本为 $version...${NC}"
  pnpm version $version
  ;;
5)
  echo -e "${YELLOW}⏭️  跳过版本提升...${NC}"
  ;;
*)
  echo -e "${RED}❌ 无效选项${NC}"
  exit 1
  ;;
esac

# 获取当前版本
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo -e "${GREEN}📋 当前版本: $CURRENT_VERSION${NC}"

# 确认发布
echo -e "${YELLOW}❓ 确认发布到私有仓库吗? (y/N)${NC}"
read -p "" confirm

if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
  echo -e "${RED}❌ 取消发布${NC}"
  exit 1
fi

# 发布
echo -e "${YELLOW}🚀 发布到私有仓库...${NC}"
if pnpm publish; then
  echo -e "${GREEN}✅ 发布成功！${NC}" echo -e "${GREEN}📦 包名: @hanglin/request@$CURRENT_VERSION${NC}"

  # 推送 git 标签（如果版本有更新）
  if [ "$choice" != "5" ]; then
    echo -e "${YELLOW}🏷️  推送 git 标签...${NC}"
    git push origin --tags
  fi
else
  echo -e "${RED}❌ 发布失败${NC}"
  exit 1
fi

echo -e "${GREEN}🎉 发布完成！${NC}"
