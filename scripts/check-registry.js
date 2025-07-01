#!/usr/bin/env node

import { execSync } from 'child_process'

/**
 * 检查私有 npm registry 是否可用
 */
async function checkRegistry() {
  const registryUrl = 'http://hanglin.site:4873/'

  console.log('🔍 正在检查私有 npm registry...')
  console.log(`📍 Registry URL: ${registryUrl}`)

  try {
    // 方法1: 使用 fetch 检查健康状态
    const response = await fetch(registryUrl)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    console.log('✅ Registry 连接正常')

    // 方法2: 检查认证状态
    try {
      const whoamiResult = execSync(`npm whoami --registry ${registryUrl}`, {
        encoding: 'utf8',
        timeout: 5000
      })
      console.log('✅ 已认证用户:', whoamiResult.trim())
    } catch {
      console.error('❌ 认证检查失败，您需要登录:')
      console.error(`运行: npm login --registry ${registryUrl}`)
      console.error(`或者: npm adduser --registry ${registryUrl}`)
      process.exit(1)
    }

    // 方法3: 检查是否能获取 @hanglin scope 的包信息
    try {
      execSync(`npm view @hanglin/core --registry ${registryUrl}`, {
        encoding: 'utf8',
        timeout: 10000
      })
      console.log('✅ 可以访问 @hanglin scope 包信息')
    } catch {
      console.warn('⚠️  无法获取包信息（这可能是正常的，如果包尚未发布）')
    }
  } catch (error) {
    console.error('❌ Registry 检查失败:')
    console.error('错误信息:', error.message)
    console.error('\n🛠️  可能的解决方案:')
    console.error('1. 检查 hanglin.site:4873 服务是否启动')
    console.error('2. 检查网络连接')
    console.error('3. 检查防火墙设置')
    console.error('4. 验证 .npmrc 配置')

    process.exit(1)
  }
}

// 主函数
async function main() {
  console.log('🚀 开始发布前检查...\n')

  await checkRegistry()

  console.log('\n✅ 检查完成，可以开始发布！')
}

// 运行检查
main().catch(error => {
  console.error('❌ 检查过程中发生错误:', error)
  process.exit(1)
})
