import { ElMessage } from 'element-plus'
import { Mutable } from 'element-plus/es/utils'
export const message = (
  params: Mutable<{
    message: '操作成功'
    type?: 'success'
  }>,
) => {
  ElMessage({
    message: params?.message,
    type: params?.type,
  })
}
