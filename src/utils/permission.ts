import { Directive } from 'vue'
import { user } from '@/pinia/modules/user'
export const premission: Directive = {
  mounted(el, binding) {
    const storeUser = user()
    // storeUser.roles.roleType

    if (storeUser.roles.roleType == 'admin') return

    // 如果不传值则代表不做权限处理
    if (binding.value != undefined && binding.value != '') {
      if (storeUser.roles.buttonRules) {
        !storeUser.roles.buttonRules.includes(binding.value) && el.remove()
      }
    }
  },
}