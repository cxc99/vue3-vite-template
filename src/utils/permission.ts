import { Directive } from 'vue'
import { user } from '@/pinia/modules/user'
export const premission: Directive = {
  mounted(el, binding) {
    const storeUser = user()

    if (storeUser.roles.roleType == 'admin') return

    // 如果不传值则代表不做权限处理
    if (binding.value != undefined && binding.value != '') {
      if (storeUser.roles.buttonRules) {
        const targe = binding.value.find((targe: string) => {
          return !storeUser.roles.buttonRules.includes(targe)
        })

        !targe && el.remove()
      }
    }
  },
}
