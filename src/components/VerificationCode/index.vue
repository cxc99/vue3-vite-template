<template>
  <div>
    <canvas ref="canvas" @click="generateCaptcha"></canvas>
  </div>
</template>

<script setup lang="ts">
const captchaText = ref('')
const canvas = ref(null) as any
interface Prop {
  code?: string
  pass: boolean
}

const props = withDefaults(defineProps<Prop>(), {
  code: '',
  pass: () => false,
})

const emits = defineEmits<{
  (event: 'update:pass', val: boolean): void
}>()
const chars = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'a',
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p',
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
]

const generateCaptcha = () => {
  let captcha = ''
  for (let i = 0; i < 4; i++) {
    captcha += chars[Math.floor(Math.random() * chars.length)]
  }
  captchaText.value = captcha

  const ctx = canvas.value.getContext('2d')
  canvas.value.width = 100
  canvas.value.height = 50
  ctx.font = '28px Arial'
  ctx.fillStyle = 'black'
  ctx.fillText(captcha, 5, 28)
  emits('update:pass', false)
}
onMounted(() => {
  generateCaptcha()
})

watch(
  () => props.code,
  () => {
    emits(
      'update:pass',
      props.code.toLowerCase() == captchaText.value.toLowerCase(),
    )
  },
)
</script>

<style scoped></style>
